
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
             Active Secure Transcript
           </h3>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-5 scroll-smooth bg-gray-50/30">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 px-8 text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Awaiting Audio Input...</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isAgent = msg.role === 'agent';
            const isMike = msg.persona === Persona.MIKE;
            return (
              <div key={msg.id} className={`flex flex-col animate-message ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 mb-1.5 px-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                   <span className={`text-[9px] font-black uppercase tracking-wider ${msg.role === 'user' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {msg.role === 'user' ? 'Homeowner' : (isMike ? 'Mike (Emergency)' : 'Melissa (Advisor)')}
                   </span>
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user' 
                    ? 'bg-white text-gray-700 border border-gray-100 rounded-tr-none' 
                    : (isMike 
                        ? 'bg-orange-600 text-white rounded-tl-none' 
                        : 'bg-blue-700 text-white rounded-tl-none')
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Transcript;
