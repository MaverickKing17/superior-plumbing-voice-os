import React, { useState } from 'react';
import { Persona } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCards from './components/ServiceCards';
import VapiAgent from './components/VapiAgent';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activePersona, setActivePersona] = useState<Persona>(Persona.CHLOE);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  
  return (
    <div className={`min-h-screen transition-colors duration-1000 ${activePersona === Persona.SAM ? 'bg-orange-50' : 'bg-slate-50'}`}>
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
            <div id="rebates" className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
               <h2 className="text-3xl font-black mb-4 uppercase tracking-tight text-slate-900">Ontario HRS Rebates</h2>
               <p className="text-slate-500 mb-8 leading-relaxed font-medium">Secure up to $7,500 for high-efficiency heat pump upgrades. Chloe can verify your eligibility in seconds during a voice call.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                    <p className="text-xs font-black text-green-700 uppercase tracking-widest mb-1">Max Rebate</p>
                    <p className="text-4xl font-black text-green-900">$7,500</p>
                 </div>
                 <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-1">Assessment</p>
                    <p className="text-4xl font-black text-blue-900">$600 Reim.</p>
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
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Priority Routing</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Connecting to our encrypted AI dispatcher. Chloe handles routine and rebates, while Sam manages emergency dispatch.
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