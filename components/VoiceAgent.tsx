import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { Persona } from '../types';
import { SYSTEM_INSTRUCTIONS } from '../constants';

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
    description: 'Transfer the active voice call to a human representative.',
    properties: {
      reason: { type: Type.STRING, description: 'The reason for the transfer.' },
    },
    required: ['reason'],
  },
};

const VoiceAgent: React.FC<VoiceAgentProps> = ({ persona, isActive, onToggle, onTranscription }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  };

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
    return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
  };

  const startSession = async () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return;
    setIsConnecting(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputContextRef.current = inputCtx;
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              sessionPromise.then(s => s.sendRealtimeInput({ media: createBlob(inputData) }));
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'transferToHuman') {
                  sessionPromise.then(s => s.sendToolResponse({
                    functionResponses: { id: fc.id, name: fc.name, response: { result: 'ok' } }
                  }));
                  onToggle(); // Close session
                }
              }
            }
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const audioCtx = audioContextRef.current;
              if (audioCtx) {
                const buffer = await decodeAudioData(decode(message.serverContent.modelTurn.parts[0].inlineData.data), audioCtx, 24000, 1);
                const source = audioCtx.createBufferSource();
                source.buffer = buffer;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
                source.connect(audioCtx.destination);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
                setIsSpeaking(true);
                source.onended = () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) setIsSpeaking(false);
                };
              }
            }
            if (message.serverContent?.inputTranscription) onTranscription(message.serverContent.inputTranscription.text, 'user');
            if (message.serverContent?.outputTranscription) onTranscription(message.serverContent.outputTranscription.text, 'agent');
          },
          onerror: (e) => { console.error(e); setIsConnecting(false); },
          onclose: () => setIsConnecting(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTIONS[persona],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: persona === Persona.MELISSA ? 'Kore' : 'Fenrir' } } },
          tools: [{ functionDeclarations: [transferToHumanTool] }],
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
    if (sessionRef.current) sessionRef.current.close();
    [audioContextRef, inputContextRef].forEach(ref => {
      if (ref.current) ref.current.close();
      ref.current = null;
    });
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsSpeaking(false);
    setIsUserTalking(false);
  };

  useEffect(() => {
    if (isActive) startSession(); else stopSession();
    return () => stopSession();
  }, [isActive, persona]);

  const isEmergency = persona === Persona.MIKE;

  return (
    <div className={`p-8 rounded-[2rem] shadow-2xl transition-all duration-700 border-2 ${isEmergency ? 'bg-orange-600 border-orange-400' : 'bg-blue-900 border-blue-700'} text-white`}>
      <div className="text-center mb-8">
        <h3 className="text-sm font-black uppercase tracking-widest">{isEmergency ? 'Mike (Emergency)' : 'Melissa (Sales)'}</h3>
        <p className="text-[10px] opacity-50 font-bold uppercase tracking-tighter">Superior Voice Protocol</p>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="h-16 flex items-center justify-center gap-1.5 mb-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`w-1 rounded-full transition-all duration-200 ${isActive ? 'bg-white' : 'bg-white/10'}`} style={{ height: isSpeaking ? `${Math.random() * 40 + 5}px` : '4px' }}></div>
          ))}
        </div>

        <button onClick={onToggle} className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-3xl ${isActive ? 'bg-white text-blue-900 scale-110' : 'bg-white/10 text-white hover:bg-white/20'}`}>
          {isConnecting ? (
            <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>

        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
          {isConnecting ? 'Establishing Line...' : (isActive ? (isSpeaking ? 'Agent Speaking' : 'Listening...') : 'Tap to Initiate')}
        </p>
      </div>
    </div>
  );
};

export default VoiceAgent;