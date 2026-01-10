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

  const triggerSarahEligibility = () => {
    setActivePersona(Persona.SARAH);
    setIsVoiceActive(true);
    const agentSection = document.getElementById('ai-agent-interface');
    if (agentSection) {
      agentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  return (
    <div className={`min-h-screen transition-all duration-1000 ${activePersona === Persona.SAM ? 'bg-orange-50/30' : 'bg-white'}`}>
      <Header persona={activePersona} setPersona={(p) => setActivePersona(p as Persona)} />
      
      <main>
        {/* Hero Section */}
        <div className="max-w-[1500px] mx-auto px-6 lg:px-8 py-2">
          <Hero 
            persona={activePersona} 
            onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)} 
            isVoiceActive={isVoiceActive} 
          />
        </div>

        {/* Enterprise Trust Grid */}
        <section className="bg-slate-50 border-y border-slate-200/60 py-8">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter">4-Hour</p>
              <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.5em] mt-3">GTA Dispatch SLA</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter">100%</p>
              <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.5em] mt-3">Execution Bond</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter">TSSA</p>
              <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.5em] mt-3">Field Engineering</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-slate-950 tracking-tighter">$7,500</p>
              <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.5em] mt-3">Capital Incentive</p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-8 py-16 space-y-20">
          
          {/* Services Section */}
          <section id="services">
            <div className="mb-10">
              <h2 className="text-[8px] font-black text-blue-700 uppercase tracking-[0.6em] mb-2">Core Operational Services</h2>
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase">Elite HVAC <br/>& Mechanical Systems</h3>
            </div>
            <ServiceCards />
          </section>

          {/* AI Dispatch Section */}
          <section id="ai-agent-interface" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-6xl p-6 lg:p-14 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,#1d4ed8,transparent_60%)]"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-400">Autonomous Dispatch Engaged</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.85] uppercase">
                Instant <br/> <span className="text-blue-500">Response</span> <br/> Protocol
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-lg">
                Direct-to-engineer voice routing using proprietary language models optimized for GTA residential mechanical systems.
              </p>
              <ul className="space-y-3 pt-2">
                {['Biometric Voice Authentication', 'Real-time Triage Algorithms', 'ISO-Standard Routing'].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <VapiAgent 
                  persona={activePersona} 
                  isActive={isVoiceActive} 
                  onToggle={() => setIsVoiceActive(!isVoiceActive)} 
                />
              </div>
            </div>
          </section>

          {/* Rebates Section - UPDATED WITH USER PROVIDED ASSET */}
          <section id="rebates" className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col xl:flex-row">
            {/* Left Content Column */}
            <div className="flex-1 p-8 lg:p-14 space-y-8 flex flex-col justify-center">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[7px] font-black uppercase tracking-[0.4em]">Funding Portfolio: Active</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-950 leading-[0.9] uppercase">Ontario HRS <br/> Program 2026</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-lg">
                    As authorized service providers for the Home Renovation Savings program, we secure strategic capital for high-performance mechanical upgrades.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 rounded-[1.5rem] bg-[#F7FFF9] border border-green-100/50 shadow-sm">
                    <p className="text-[8px] font-black text-green-700 uppercase tracking-[0.4em] mb-2">Max Capital Grant</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-slate-400">$</span>
                      <p className="text-3xl font-black text-slate-950 tracking-tighter leading-none">7,500</p>
                    </div>
                    <p className="text-[7px] font-black text-slate-400 mt-3 uppercase tracking-[0.2em]">Cold-Climate Incentives</p>
                 </div>
                 
                 <div className="p-6 rounded-[1.5rem] bg-[#F5F9FF] border border-blue-100/50 shadow-sm">
                    <p className="text-[8px] font-black text-blue-700 uppercase tracking-[0.4em] mb-2">Audit Reimbursement</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-slate-400">$</span>
                      <p className="text-3xl font-black text-slate-950 tracking-tighter leading-none">600</p>
                    </div>
                    <p className="text-[7px] font-black text-slate-400 mt-3 uppercase tracking-[0.2em]">Guaranteed Compliance</p>
                 </div>
               </div>

               <div className="pt-2">
                 <button 
                  onClick={triggerSarahEligibility}
                  className="w-full sm:w-auto px-8 py-5 bg-slate-950 text-white text-sm font-black rounded-[1.25rem] shadow-xl hover:bg-slate-800 transition-all active:scale-95 uppercase tracking-[0.3em] flex items-center justify-center gap-3 group"
                >
                   <span>Initiate Funding Audit</span>
                   <span className="text-lg group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                 </button>
                 <p className="mt-4 text-center sm:text-left text-slate-400 text-[8px] font-black uppercase tracking-[0.4em]">Secured session initiates Sarah's triage protocol</p>
               </div>
            </div>
            
            {/* Right Image Column - UPDATED: SHOWS TECHNICIAN & VAN (USER PROVIDED URL) */}
            <div className="w-full xl:w-1/2 relative min-h-[450px] xl:min-h-[550px]">
               <img 
                 src="https://i.ibb.co/Qvhhy8t8/hunyuan-image-3-0-b-Replace-the-current.png" 
                 alt="Superior Technician with Service Van" 
                 className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-1000 hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent"></div>
               
               <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-950/20 backdrop-blur-2xl rounded-[1.75rem] border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <p className="text-[8px] font-black uppercase tracking-[0.6em] text-blue-100">Mechanical Analytics</p>
                  </div>
                  <h4 className="text-xl font-black text-white tracking-tighter leading-none mb-1">Compliance Verification</h4>
                  <p className="text-slate-200 text-[10px] font-medium tracking-tight">Enterprise fleet and licensed technicians staged for immediate GTA mobilization.</p>
               </div>
            </div>
          </section>

        </div>
      </main>

      <Footer persona={activePersona} />

      <div className="fixed bottom-6 right-6 z-[60] lg:hidden">
        <button 
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-6xl transition-all active:scale-90 ${isVoiceActive ? 'bg-red-500' : 'bg-blue-700'}`}
        >
          {isVoiceActive ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;