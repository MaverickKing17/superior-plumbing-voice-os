
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Persona } from '../types';
import { SYSTEM_INSTRUCTIONS } from '../constants';

interface VoiceAgentProps {
  persona: Persona;
  isActive: boolean;
  onToggle: () => void;
  onTranscription: (text: string, role: 'user' | 'agent') => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ persona, isActive, onToggle, onTranscription }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Helper functions for audio processing
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
            console.log('Session opened');
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
            // Audio output
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
              source.onended = () => sourcesRef.current.delete(source);
            }

            // Interruptions
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            // Transcription
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
            console.log('Session closed');
            setIsConnecting(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTIONS[persona],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { 
                voiceName: persona === Persona.SARAH ? 'Kore' : 'Fenrir' 
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
  };

  useEffect(() => {
    if (isActive) {
      startSession();
    } else {
      stopSession();
    }
    return () => stopSession();
  }, [isActive]);

  // Handle re-config when persona changes while active
  useEffect(() => {
    if (isActive && sessionRef.current) {
      // Re-start to apply new system instruction if persona changes
      stopSession();
      startSession();
    }
  }, [persona]);

  const isEmergency = persona === Persona.MIKE;

  return (
    <div className={`p-6 rounded-2xl shadow-xl transition-all duration-500 border-2 ${
      isEmergency ? 'bg-orange-600 border-orange-400' : 'bg-blue-800 border-blue-600'
    } text-white`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            {isEmergency ? 'Emergency Mode' : 'Superior Support'}
          </h3>
          <p className="text-xs opacity-70 mt-1">AI Voice Dispatcher v3.1</p>
        </div>
        <div className="flex gap-2">
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white/20 ${isActive ? 'bg-green-500/20' : 'bg-white/10'}`}>
              {persona === Persona.SARAH ? 'S' : 'M'}
           </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-8">
        <div className={`relative mb-8 group cursor-pointer transition-transform active:scale-95 ${isActive ? 'scale-110' : ''}`} onClick={onToggle}>
           <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
             isActive ? (isEmergency ? 'bg-white/40' : 'bg-blue-400/50') : 'bg-black/20'
           }`}></div>
           <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
             isActive ? 'bg-white text-blue-900 shadow-2xl' : 'bg-white/20 text-white border-2 border-white/40'
           }`}>
             {isConnecting ? (
               <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 {isActive ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                 ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                 )}
               </svg>
             )}
           </div>
        </div>
        <p className="text-sm font-bold tracking-widest uppercase mb-1">
          {isActive ? (isConnecting ? 'CONNECTING...' : 'LISTENING') : 'START VOICE CONSOLE'}
        </p>
        <p className="text-[10px] opacity-60 text-center px-4">
          Speak to {isEmergency ? 'Mike' : 'Sarah'} directly about your issue.
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-bold opacity-70">
         <span>LATENCY: 240MS</span>
         <span>SECURE ENCRYPTED LINE</span>
      </div>
    </div>
  );
};

export default VoiceAgent;
