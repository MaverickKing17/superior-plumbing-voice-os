
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
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col h-[450px] overflow-hidden">
      <div className={`p-4 border-b flex items-center justify-between transition-colors duration-500 ${isEmergency ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full animate-live ${isEmergency ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
           <h3 className={`text-sm font-black uppercase tracking-widest ${isEmergency ? 'text-orange-700' : 'text-blue-700'}`}>
             Live Dispatch Transcript
           </h3>
        </div>
        <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-gray-200 font-bold text-gray-400 shadow-sm flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
          REAL-TIME
        </span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-5 scroll-smooth bg-gradient-to-b from-transparent to-gray-50/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Listening for Audio</p>
              <p className="text-xs text-gray-300 mt-1">Start the voice console to begin dispatch transcription</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isAgent = msg.role === 'agent';
            const isMike = msg.persona === Persona.MIKE;
            return (
              <div key={msg.id} className={`flex flex-col animate-message ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1.5 px-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                   <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm ${
                     msg.role === 'user' ? 'bg-gray-400' : (isMike ? 'bg-orange-600' : 'bg-blue-700')
                   }`}>
                      {msg.role === 'user' ? 'U' : (isMike ? 'M' : 'S')}
                   </div>
                   <div className="flex flex-col">
                     <span className={`text-[9px] font-black uppercase tracking-wider ${msg.role === 'user' ? 'text-gray-500 text-right' : 'text-gray-400'}`}>
                        {msg.role === 'user' ? 'Homeowner' : (isMike ? 'Mike (Emergency Dispatch)' : 'Sarah (Home Advisor)')}
                     </span>
                   </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user' 
                    ? 'bg-white text-gray-700 border border-gray-100 rounded-tr-none' 
                    : (isMike 
                        ? 'bg-orange-600 text-white rounded-tl-none ring-1 ring-orange-500/50' 
                        : 'bg-blue-700 text-white rounded-tl-none ring-1 ring-blue-600/50')
                }`}>
                  {msg.text}
                </div>
                <span className={`text-[8px] mt-1 opacity-40 font-mono ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className={`p-3 border-t flex items-center justify-between transition-colors duration-500 ${isEmergency ? 'bg-orange-600/5' : 'bg-blue-600/5'}`}>
         <div className="flex gap-1.5 px-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isEmergency ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] ${isEmergency ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] ${isEmergency ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
         </div>
         <span className={`text-[9px] font-black uppercase tracking-tighter opacity-50 ${isEmergency ? 'text-orange-900' : 'text-blue-900'}`}>
            {isEmergency ? 'SECURE EMERGENCY LINE ACTIVE' : 'SECURE SERVICE LINE ENCRYPTED'}
         </span>
      </div>
    </div>
  );
};

export default Transcript;
