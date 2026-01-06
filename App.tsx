
import React, { useState, useCallback } from 'react';
import { Persona, Message } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCards from './components/ServiceCards';
import VoiceAgent from './components/VoiceAgent';
import Transcript from './components/Transcript';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<Persona>(Persona.MELISSA);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  const handleNewTranscription = useCallback((text: string, role: 'user' | 'agent') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role, text, timestamp: new Date(), persona: activePersona
    };
    setMessages(prev => [...prev, newMessage]);

    if (activePersona === Persona.MELISSA && role === 'user') {
      const lower = text.toLowerCase();
      const emergencyWords = ['emergency', 'flood', 'no heat', 'burst', 'leak'];
      if (emergencyWords.some(w => lower.includes(w))) {
        setTimeout(() => setActivePersona(Persona.MIKE), 1500);
      }
    }
  }, [activePersona]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${activePersona === Persona.MIKE ? 'bg-orange-50' : 'bg-slate-50'}`}>
      <Header persona={activePersona} setPersona={setActivePersona} />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <Hero persona={activePersona} onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)} isVoiceActive={isVoiceActive} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <ServiceCards />
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
               <h2 className="text-3xl font-black mb-4 uppercase tracking-tight text-slate-900">Ontario HRS Rebates</h2>
               <p className="text-slate-500 mb-8 leading-relaxed font-medium">Secure up to $7,500 for high-efficiency heat pump upgrades. Melissa can verify your eligibility in seconds during a voice call.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                    <p className="text-xs font-black text-green-700 uppercase tracking-widest mb-1">Heat Pump</p>
                    <p className="text-4xl font-black text-green-900">$7,500</p>
                 </div>
                 <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-1">Insulation</p>
                    <p className="text-4xl font-black text-blue-900">$1,000</p>
                 </div>
               </div>
            </div>
          </div>
          <aside className="space-y-8">
            <div className="sticky top-28 space-y-8">
              <VoiceAgent persona={activePersona} isActive={isVoiceActive} onToggle={() => setIsVoiceActive(!isVoiceActive)} onTranscription={handleNewTranscription} />
              <Transcript messages={messages} persona={activePersona} />
            </div>
          </aside>
        </div>
      </main>
      <Footer persona={activePersona} />
    </div>
  );
};

export default App;
