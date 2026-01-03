
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Persona, Message } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCards from './components/ServiceCards';
import VoiceAgent from './components/VoiceAgent';
import Transcript from './components/Transcript';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<Persona>(Persona.SARAH);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  // Track transcription to detect emergency keywords
  const handleNewTranscription = useCallback((text: string, role: 'user' | 'agent') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role,
      text,
      timestamp: new Date(),
      persona: activePersona
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Persona Switching Logic
    if (activePersona === Persona.SARAH && role === 'user') {
      const lowerText = text.toLowerCase();
      const emergencyKeywords = ['emergency', 'no heat', 'flood', 'burst', 'gas leak', 'broken pipe', 'leaking'];
      if (emergencyKeywords.some(kw => lowerText.includes(kw))) {
        // Switch to Mike after a short delay to allow Sarah to finish her "transfer" line
        setTimeout(() => {
          setActivePersona(Persona.MIKE);
        }, 1500);
      }
    }
  }, [activePersona]);

  const toggleVoice = () => setIsVoiceActive(!isVoiceActive);

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      activePersona === Persona.MIKE ? 'bg-orange-50' : 'bg-gray-50'
    }`}>
      <Header persona={activePersona} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Hero persona={activePersona} onVoiceToggle={toggleVoice} isVoiceActive={isVoiceActive} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section id="services" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Core Services</h2>
              <ServiceCards />
            </section>

            <section id="rebates" className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 scroll-mt-24 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -mr-8 -mt-8"></div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">💰</span> 2026 Home Renovation Savings
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Take advantage of the Ontario HRS program. Sarah can guide you through the audit process to maximize your returns.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <p className="text-xs font-bold text-green-700 uppercase mb-1">Heat Pump Upgrade</p>
                  <p className="text-2xl font-black text-green-800">Up to $7,500</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 uppercase mb-1">Attic Insulation</p>
                  <p className="text-2xl font-black text-blue-800">$1,000 Flat Rate</p>
                </div>
              </div>
            </section>

            <section id="book" className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 scroll-mt-24">
              <div className="max-w-xl">
                <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase">Schedule Your Service</h2>
                <p className="text-gray-500 mb-8">Fill out the form below or use our AI Voice Dispatcher for immediate support.</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                  </div>
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                  <textarea placeholder="How can we help?" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"></textarea>
                  <button type="submit" className={`w-full py-4 rounded-xl font-black text-white shadow-xl transition-all transform active:scale-[0.98] ${activePersona === Persona.MIKE ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-700 hover:bg-blue-800'}`}>
                    CONFIRM BOOKING
                  </button>
                </form>
              </div>
            </section>

            <div id="areas" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 scroll-mt-24">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${activePersona === Persona.MIKE ? 'bg-orange-500' : 'bg-blue-600'} animate-pulse`}></span>
                Areas Served
              </h2>
              <p className="text-gray-600 mb-4">Mississauga, Brampton, Georgetown, East York, and the entire GTA region.</p>
              <div className="flex flex-wrap gap-2">
                {['Mississauga', 'Brampton', 'Oakville', 'Georgetown', 'Toronto', 'Etobicoke', 'North York', 'Scarborough'].map(city => (
                  <span key={city} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{city}</span>
                ))}
              </div>
            </div>
          </div>
          
          <aside className="space-y-6">
            <div className={`sticky top-24 space-y-6 transition-all duration-500`}>
              <VoiceAgent 
                persona={activePersona} 
                isActive={isVoiceActive} 
                onToggle={toggleVoice} 
                onTranscription={handleNewTranscription}
              />
              <Transcript messages={messages} persona={activePersona} />
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <img src="https://picsum.photos/40/40?grayscale" alt="Logo" className="rounded opacity-50" />
               <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">SUPERIOR PLUMBING & HEATING</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Superior Plumbing & Heating. All rights reserved. 
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
