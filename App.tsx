import React, { useState } from 'react';
import { Persona } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCards from './components/ServiceCards';
import VapiAgent from './components/VapiAgent';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<Persona>(Persona.SARAH);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  return (
    <div className={`min-h-screen transition-colors duration-1000 ${activePersona === Persona.MIKE ? 'bg-orange-50' : 'bg-slate-50'}`}>
      <Header persona={activePersona} setPersona={(p) => setActivePersona(p as Persona)} />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <Hero 
          persona={activePersona} 
          onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)} 
          isVoiceActive={isVoiceActive} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <ServiceCards />
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
               <h2 className="text-3xl font-black mb-4 uppercase tracking-tight text-slate-900">Ontario HRS Rebates</h2>
               <p className="text-slate-500 mb-8 leading-relaxed font-medium">Secure up to $7,500 for high-efficiency heat pump upgrades. Sarah can verify your eligibility in seconds during a voice call.</p>
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
              <VapiAgent 
                persona={activePersona} 
                isActive={isVoiceActive} 
                onToggle={() => setIsVoiceActive(!isVoiceActive)} 
              />
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Secure Voice Channel</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  You are connecting to our encrypted enterprise AI dispatcher. State your issue clearly for priority routing.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer persona={activePersona} />
    </div>
  );
};

export default App;