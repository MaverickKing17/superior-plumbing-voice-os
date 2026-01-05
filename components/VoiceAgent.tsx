
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { Persona } from '../types.ts';
import { SYSTEM_INSTRUCTIONS } from '../constants.tsx';

interface VoiceAgentProps {
  persona: Persona;
  isActive: boolean;
  onToggle: () => void;
  onTranscription: (text: string, role: 'user' | 'agent') => void;
}

const transferToHumanTool: FunctionDeclaration = {
  name: 'transferToHuman',
  parameters: {
    type: Type.OBJECT,
    description: 'Transfer the active voice call to a live human representative at Superior Plumbing & Heating.',
    properties: {
      reason: {
        type: Type.STRING,
        description: 'The reason for the transfer (e.g., persistent difficulty understanding input, customer requested human, or complex query).',
      },
    },
    required: ['reason'],
  },
};

const VoiceAgent: React.FC<VoiceAgentProps> = ({ persona, isActive, onToggle, onTranscription }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const prevPersonaRef = useRef<Persona>(persona);

  const getApiKey = () => {
    try {
      const win = window as any;
      if (win.process?.env?.API_KEY) return win.process.env.API_KEY;
      if (typeof process !== 'undefined' && process.env?.API_KEY) {
        return process.env.API_KEY;
      }
    } catch (e) {}
    return null;
  };

  const playActivationSound = (isEmergency: boolean) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    if (isEmergency) {
      const frequencies = [1200, 1400, 1300];
      frequencies.forEach((freq, i) => {
        const startTime = now + (i * 0.04);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
        gain.gain.linearRampToValueAtTime(0, startTime + 0.03);
        osc.connect(gain).connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.03);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  };

  const updateVisualizer = () => {
    if (!analyserRef.current || !visualizerRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const bars = visualizerRef.current.children;
    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i] as HTMLElement;
      const val = dataArray[i * 2] || 0;
      const height = Math.max(4, (val / 255) * 48);
      bar.style.height = `${height}px`;
    }
    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  };

  const decode = (base64: string) => {
    try {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (e) {
      return new Uint8Array(0);
    }
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startSession = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn('Superior Voice Core: Critical Authorization Missing.');
      return;
    }
    setIsConnecting(true);
    setIsTransferring(false);
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const analyser = outputCtx.createAnalyser();
      analyser.fftSize = 64; 
      analyserRef.current = analyser;
      analyser.connect(outputCtx.destination);
      
      audioContextRef.current = outputCtx;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            playActivationSound(persona === Persona.MIKE);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                if (session) session.sendRealtimeInput({ media: pcmBlob });
              }).catch(() => {});
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            animationFrameRef.current = requestAnimationFrame(updateVisualizer);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'transferToHuman') {
                  console.debug('TRANSFER TO HUMAN INITIATED: ', fc.args.reason);
                  setIsTransferring(true);
                  // Respond to the tool to clear model state before closing
                  sessionPromise.then(s => s.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { status: 'success', info: 'Transfer active' } }
                  }));
                  // Hang up after short delay so user hears the final phrase
                  setTimeout(() => {
                    onToggle(); 
                  }, 3000);
                }
              }
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current && analyserRef.current) {
              const audioCtx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
              const source = audioCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(analyserRef.current);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              setIsSpeaking(true);
              source.onended = () => {
                sourcesRef.current.delete(source);
                setIsSpeaking(sourcesRef.current.size > 0);
              };
            }

            if (message.serverContent?.inputTranscription) {
              onTranscription(message.serverContent.inputTranscription.text, 'user');
            }
            if (message.serverContent?.outputTranscription) {
              onTranscription(message.serverContent.outputTranscription.text, 'agent');
            }
          },
          onerror: () => setIsConnecting(false),
          onclose: () => {
            setIsConnecting(false);
            setIsSpeaking(false);
            cancelAnimationFrame(animationFrameRef.current);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTIONS[persona],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { 
                voiceName: persona === Persona.MELISSA ? 'Kore' : 'Fenrir' 
              }
            }
          },
          tools: [{ functionDeclarations: [transferToHumanTool] }],
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }
    cancelAnimationFrame(animationFrameRef.current);
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (isActive) {
      startSession();
    } else {
      stopSession();
    }
    return () => stopSession();
  }, [isActive]);

  useEffect(() => {
    if (prevPersonaRef.current !== persona) {
      if (isActive) {
        stopSession();
        startSession();
      }
      prevPersonaRef.current = persona;
    }
  }, [persona, isActive]);

  const isEmergency = persona === Persona.MIKE;

  return (
    <div className={`relative overflow-hidden p-6 rounded-[2rem] shadow-2xl transition-all duration-700 border-2 ${
      isEmergency ? 'bg-orange-600 border-orange-400' : 'bg-blue-900 border-blue-700'
    } text-white`}>
      
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 transition-colors duration-700 ${isEmergency ? 'bg-orange-200' : 'bg-blue-200'}`}></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className={`flex h-3 w-3 rounded-full ${isActive ? (isEmergency ? 'bg-orange-200 shadow-[0_0_15px_#fff] animate-pulse' : 'bg-green-400 animate-live') : 'bg-white/20'}`}></span>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">
              {isEmergency ? 'Mike (Emergency)' : 'Melissa (Sales)'}
            </h3>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">Enterprise Audio Protocol</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded bg-white/10 text-[10px] font-black uppercase tracking-widest border border-white/10`}>
           Live
        </div>
      </div>

      <div className="flex flex-col items-center py-4 relative z-10">
        {isTransferring ? (
          <div className="h-16 flex flex-col items-center justify-center animate-pulse">
            <p className="text-lg font-black uppercase tracking-[0.1em]">Transferring to Human...</p>
            <p className="text-[10px] opacity-70">Securing next available agent</p>
          </div>
        ) : (
          <div ref={visualizerRef} className="h-16 flex items-center justify-center gap-1.5 mb-8">
            {[...Array(16)].map((_, i) => (
              <div 
                key={i} 
                className={`v-bar ${isEmergency ? 'v-bar-mike' : 'v-bar-melissa'}`}
                style={{ height: '4px' }}
              ></div>
            ))}
          </div>
        )}

        <button 
          onClick={onToggle}
          className={`relative group transition-all duration-500 transform active:scale-95 ${isActive ? 'scale-110' : ''}`}
        >
           <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 opacity-50 ${isActive ? (isEmergency ? 'bg-orange-400' : 'bg-blue-400') : 'bg-black/40'}`}></div>
           
           <div className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 border-4 shadow-2xl ${
             isActive 
               ? 'bg-white text-blue-900 border-white' 
               : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
           }`}>
             {isConnecting ? (
               <div className={`w-10 h-10 border-4 rounded-full animate-spin ${isActive ? 'border-blue-900 border-t-transparent' : 'border-white border-t-transparent'}`}></div>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
               </svg>
             )}
           </div>
        </button>

        <div className="mt-8 text-center space-y-1">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70">
            {isTransferring ? 'CALL HANDOFF' : (isConnecting ? 'Establishing Line...' : (isActive ? (isSpeaking ? 'Agent Speaking' : 'Listening...') : 'Tap to Initiate'))}
          </p>
          <div className="flex justify-center gap-1">
             <div className={`w-1 h-1 rounded-full bg-white transition-opacity ${isActive ? 'animate-bounce' : 'opacity-20'}`}></div>
             <div className={`w-1 h-1 rounded-full bg-white transition-opacity delay-75 ${isActive ? 'animate-bounce' : 'opacity-20'}`}></div>
             <div className={`w-1 h-1 rounded-full bg-white transition-opacity delay-150 ${isActive ? 'animate-bounce' : 'opacity-20'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;
