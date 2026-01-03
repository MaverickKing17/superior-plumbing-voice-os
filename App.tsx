
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
        <Hero persona={activePersona} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ServiceCards />
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${activePersona === Persona.MIKE ? 'bg-orange-500' : 'bg-blue-600'} animate-pulse`}></span>
                Areas Served
              </h2>
              <p className="text-gray-600 mb-4">Mississauga, Brampton, Georgetown, East York, and the entire GTA region.</p>
              <div className="flex flex-wrap gap-2">
                {['Mississauga', 'Brampton', 'Oakville', 'Georgetown', 'Toronto', 'Etobicoke'].map(city => (
                  <span key={city} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{city}</span>
                ))}
              </div>
            </div>
          </div>
          
          <aside className="space-y-6">
            <div className={`sticky top-8 space-y-6 transition-all duration-500`}>
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
               <span className="font-bold text-gray-400">SUPERIOR PLUMBING & HEATING</span>
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
