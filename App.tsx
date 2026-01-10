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
    <div className={`min-h-screen transition-colors duration-1000 ${activePersona === Persona.SAM ? 'bg-orange-50' : 'bg-white'}`}>
      <Header persona={activePersona} setPersona={(p) => setActivePersona(p as Persona)} />
      
      <main>
        {/* Full-width Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Hero 
            persona={activePersona} 
            onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)} 
            isVoiceActive={isVoiceActive} 
          />
        </div>

        {/* Trust Badges / Stats Section */}
        <section className="bg-slate-50 border-y border-slate-100 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-slate-900">4-Hour</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Arrival Window</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">100%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">TSSA</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Certified Techs</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">$7,500</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Max Rebate</p>
            </div>
          </div>
        </section>

        {/* Core Content Layout */}
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
          
          {/* Services Section */}
          <section id="services">
            <div className="mb-12">
              <h2 className="text-sm font-black text-blue-700 uppercase tracking-[0.3em] mb-4">Elite Capabilities</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Enterprise HVAC & Plumbing</h3>
            </div>
            <ServiceCards />
          </section>

          {/* AI Feature Section - Wide Layout */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-950 rounded-[3rem] overflow-hidden shadow-3xl p-12 lg:p-20 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent_70%)]"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Next-Gen Dispatch</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                Experience Instant <br/> <span className="text-blue-500">Voice Response</span>
              </h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                Don't wait on hold. Our AI Dispatch system connects you to Sarah for rebates or Sam for emergencies in milliseconds.
              </p>
              <ul className="space-y-4">
                {['Direct Line Encryption', 'Real-time Eligibility Check', 'Immediate Priority Triage'].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10">
              <VapiAgent 
                persona={activePersona} 
                isActive={isVoiceActive} 
                onToggle={() => setIsVoiceActive(!isVoiceActive)} 
              />
            </div>
          </section>

          {/* Rebates Section */}
          <section id="rebates" className="bg-white p-12 md:p-20 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
               <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em]">Government Funding</h2>
               <h3 className="text-4xl font-black tracking-tight text-slate-900 leading-none">Ontario HRS Rebate Program 2026</h3>
               <p className="text-slate-500 text-lg leading-relaxed font-medium">
                 We are authorized partners for the Home Renovation Savings program. Get tax-free money back for upgrading to precision heat pump technology.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                    <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-2">Maximum Rebate</p>
                    <p className="text-5xl font-black text-green-900">$7,500</p>
                 </div>
                 <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-2">Audit Reimbursement</p>
                    <p className="text-5xl font-black text-blue-900">$600</p>
                 </div>
               </div>
               <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                 VIEW ELIGIBILITY GUIDE
               </button>
            </div>
            <div className="flex-shrink-0 w-full md:w-80 h-80 bg-slate-100 rounded-[2.5rem] relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop" alt="Heat Pump Installation" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </section>

        </div>
      </main>

      <Footer persona={activePersona} />

      {/* Persistent Floating Contact Button (Mobile) */}
      <div className="fixed bottom-8 right-8 z-[60] lg:hidden">
        <button 
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all ${isVoiceActive ? 'bg-red-500 scale-110' : 'bg-blue-700'}`}
        >
          {isVoiceActive ? (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;