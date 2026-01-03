
import React, { useEffect, useRef } from 'react';
import { Message, Persona } from '../types';

interface TranscriptProps {
  messages: Message[];
  persona: Persona;
}

const Transcript: React.FC<TranscriptProps> = ({ messages, persona }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const isEmergency = persona === Persona.MIKE;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px] overflow-hidden">
      <div className={`p-3 border-b flex items-center justify-between transition-colors ${isEmergency ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
        <h3 className={`text-xs font-black uppercase tracking-widest ${isEmergency ? 'text-orange-700' : 'text-blue-700'}`}>Live Transcript</h3>
        <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-gray-200 font-bold text-gray-400">REALTIME</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50 space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-xs font-medium">Wait for transcription to start...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1.5 mb-1 px-1">
                 <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                    {msg.role === 'user' ? 'Homeowner' : (msg.persona === Persona.SARAH ? 'Sarah (Advisor)' : 'Mike (Dispatch)')}
                 </span>
                 <span className="text-[9px] text-gray-300">
                   {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                 </span>
              </div>
              <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[90%] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gray-100 text-gray-800 rounded-tr-none' 
                  : (msg.persona === Persona.SARAH 
                      ? 'bg-blue-600 text-white rounded-tl-none shadow-sm' 
                      : 'bg-orange-600 text-white rounded-tl-none shadow-sm')
              }`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
         <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce [animation-delay:-0.3s]"></div>
         </div>
      </div>
    </div>
  );
};

export default Transcript;
