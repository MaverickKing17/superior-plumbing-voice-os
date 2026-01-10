import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Persona, Message } from '../types';
import { SYSTEM_INSTRUCTIONS } from '../constants';

interface ChatWidgetProps {
  activePersona: Persona;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ activePersona }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isEmergency = activePersona === Persona.SAM;
  const personaName = isEmergency ? 'Sam' : 'Sarah';
  const accentColor = isEmergency ? 'bg-orange-600' : 'bg-blue-700';
  const textColor = isEmergency ? 'text-orange-600' : 'text-blue-700';
  const borderColor = isEmergency ? 'border-orange-500/20' : 'border-blue-500/20';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = isEmergency 
        ? "Sam here. What is the emergency address and the nature of the failure?" 
        : "Hello, I'm Sarah. Are you looking to authorize your HRS rebate eligibility or book a standard service?";
      
      setMessages([{
        id: 'initial',
        role: 'agent',
        text: greeting,
        timestamp: new Date(),
        persona: activePersona
      }]);
    }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
      persona: activePersona
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';
      
      // Prepare chat history for context
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      // Call generateContent with both model name and prompt (conversation history)
      const response = await ai.models.generateContent({
        model,
        contents: [
          ...history,
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTIONS[activePersona],
          temperature: 0.7,
        }
      });

      // Directly access .text property from GenerateContentResponse
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        text: response.text || "I encountered a connectivity issue. Please try again or call our dispatch directly.",
        timestamp: new Date(),
        persona: activePersona
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className={`w-[90vw] sm:w-[400px] h-[600px] max-h-[70vh] mb-4 bg-white rounded-[2.5rem] shadow-6xl border ${borderColor} overflow-hidden flex flex-col transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in`}>
          {/* Header */}
          <div className={`${accentColor} p-6 flex items-center justify-between text-white`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
                {isEmergency ? '🚨' : '👩‍💼'}
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-sm">{personaName}</h4>
                <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Superior AI Specialist</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium shadow-sm border ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : `bg-white text-slate-800 ${m.persona === Persona.SAM ? 'border-orange-100' : 'border-blue-100'} rounded-tl-none`
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${accentColor}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce delay-75 ${accentColor}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce delay-150 ${accentColor}`}></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${personaName}...`}
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-200 outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90 ${input.trim() ? accentColor : 'bg-slate-200 cursor-not-allowed'}`}
            >
              <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-6xl transition-all duration-500 hover:scale-110 active:scale-90 group ${isOpen ? 'bg-slate-900 rotate-90' : accentColor}`}
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
             <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-ping"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
