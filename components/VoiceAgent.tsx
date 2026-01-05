
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Persona } from '../types.ts';
import { SYSTEM_INSTRUCTIONS } from '../constants.tsx';

interface VoiceAgentProps {
  persona: Persona;
  isActive: boolean;
  onToggle: () => void;
  onTranscription: (text: string, role: 'user' | 'agent') => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ persona, isActive, onToggle, onTranscription }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const prevPersonaRef = useRef<Persona>(persona);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
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

  const playTransitionSignal = (toPersona: Persona) => {
    const announcement = toPersona === Persona.MIKE 
      ? "Switching to Emergency Dispatch Mode." 
      : "Transferring to Melissa, Home Comfort Advisor.";
    const utterance = new SpeechSynthesisUtterance(announcement);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const startSession = async () => {
    if (!process.env.API_KEY) return;
    setIsConnecting(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const audioCtx = audioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
              const source = audioCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioCtx.destination);
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
          onerror: (e) => {
            console.error('Live API Error', e);
            setIsConnecting(false);
          },
          onclose: () => {
            setIsConnecting(false);
            setIsSpeaking(false);
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
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
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
      setIsSwitching(true);
      const timer = setTimeout(() => setIsSwitching(false), 800);
      if (isActive) {
        playTransitionSignal(persona);
        stopSession();
        startSession();
      }
      prevPersonaRef.current = persona;
      return () => clearTimeout(timer);
    }
  }, [persona, isActive]);

  const isEmergency = persona === Persona.MIKE;

  return (
    <div className={`relative overflow-hidden p-6 rounded-2xl shadow-xl transition-all duration-500 border-2 ${
      isEmergency ? 'bg-orange-600 border-orange-400' : 'bg-blue-800 border-blue-600'
    } text-white`}>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            {isEmergency ? 'Mike (Dispatch)' : 'Melissa (Advisor)'}
          </h3>
          <p className="text-xs opacity-70 mt-1 uppercase tracking-tighter">Verified Enterprise AI Line</p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white/20 transition-all ${isSwitching ? 'scale-125 rotate-12 bg-white text-gray-900' : ''}`}>
           {persona === Persona.MELISSA ? 'M' : 'E'}
        </div>
      </div>

      <div className="flex flex-col items-center py-6 relative z-10">
        <div className="h-12 flex items-center justify-center gap-1 mb-6">
          {isSpeaking ? (
            [...Array(15)].map((_, i) => (
              <div key={i} className={`${isEmergency ? 'visualizer-bar-mike' : 'visualizer-bar-sarah'} animate-wave-md`} style={{ animationDelay: `${i * 0.05}s` }}></div>
            ))
          ) : (
            [...Array(15)].map((_, i) => (
              <div key={i} className={`w-[3px] h-1 rounded-full opacity-20 ${isEmergency ? 'bg-orange-200' : 'bg-blue-200'}`}></div>
            ))
          )}
        </div>

        <div className={`relative mb-8 group cursor-pointer transition-transform active:scale-95 ${isActive ? 'scale-110' : ''}`} onClick={onToggle}>
           <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${isActive ? (isEmergency ? 'bg-white/40' : 'bg-blue-400/50') : 'bg-black/20'}`}></div>
           <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-white text-blue-900 shadow-2xl' : 'bg-white/20 text-white border-2 border-white/40'}`}>
             {isConnecting ? (
               <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
               </svg>
             )}
           </div>
        </div>
        <p className="text-sm font-bold tracking-widest uppercase mb-1">
          {isActive ? (isConnecting ? 'CONNECTING...' : (isSpeaking ? 'AGENT SPEAKING...' : 'LISTENING')) : 'ACTIVATE VOICE TRIAGE'}
        </p>
      </div>
    </div>
  );
};

export default VoiceAgent;
