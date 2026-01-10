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
    // Smooth scroll to the AI dispatch interface
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
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10">
          <Hero 
            persona={activePersona} 
            onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)} 
            isVoiceActive={isVoiceActive} 
          />
        </div>

        {/* Enterprise Trust Grid */}
        <section className="bg-slate-50 border-y border-slate-200/60 py-20">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            <div>
              <p className="text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter">4-Hour</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Emergency Arrival</p>
            </div>
            <div>
              <p className="text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter">100%</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Satisfaction Bond</p>
            </div>
            <div>
              <p className="text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter">TSSA</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Certified Engineering</p>
            </div>
            <div>
              <p className="text-5xl lg:text-6xl font-black text-slate-950 tracking-tighter">$7,500</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Maximum Grant</p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-8 py-32 space-y-40">
          
          {/* Services Section */}
          <section id="services">
            <div className="mb-20">
              <h2 className="text-xs font-black text-blue-700 uppercase tracking-[0.6em] mb-6">Superior Core Operations</h2>
              <h3 className="text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-[0.9]">Enterprise HVAC <br/>& Infrastructure</h3>
            </div>
            <ServiceCards />
          </section>

          {/* AI Dispatch Section */}
          <section id="ai-agent-interface" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center bg-slate-950 rounded-[5rem] overflow-hidden shadow-6xl p-12 lg:p-28 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,#1d4ed8,transparent_60%)]"></div>
            
            <div className="relative z-10 space-y-12">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400">Live AI Dispatch Active</span>
              </div>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                Zero <br/> <span className="text-blue-500">Wait</span> <br/> Logic
              </h3>
              <p className="text-slate-400 text-2xl leading-relaxed font-medium max-w-lg">
                Direct-to-expert voice routing using proprietary LLM architecture for GTA home services.
              </p>
              <ul className="space-y-8 pt-4">
                {['Military-Grade Audio Encryption', 'Real-time Triage Logic', 'Instant Tech Authorization'].map((feat) => (
                  <li key={feat} className="flex items-center gap-6 text-xl font-bold text-slate-300">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
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
          <section id="rebates" className="bg-white p-12 lg:p-28 rounded-[5rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col xl:flex-row gap-24 items-stretch">
            <div className="flex-1 space-y-14 flex flex-col justify-center">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">2026 Funding Window Active</span>
                  </div>
                  <h3 className="text-7xl md:text-8xl font-black tracking-tighter text-slate-950 leading-[0.8]">HRS <br/> Rebate <br/> 2026</h3>
                  <p className="text-slate-500 text-2xl leading-relaxed font-medium max-w-xl">
                    As authorized partners for the Home Renovation Savings program, we facilitate high-yield capital returns for infrastructure upgrades.
                  </p>
               </div>
               
               <div className="flex flex-wrap gap-6">
                 {/* Card 1: Maximum Grant */}
                 <div className="flex-1 min-w-[280px] p-12 rounded-[3.5rem] bg-[#F7FFF9] border-2 border-green-100/50 shadow-sm group hover:border-green-300 transition-colors">
                    <p className="text-[12px] font-black text-green-700 uppercase tracking-[0.4em] mb-6">Maximum Grant</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-400">$</span>
                      <p className="text-8xl font-black text-slate-950 tracking-tighter leading-none">7,500</p>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 mt-6 uppercase tracking-[0.2em]">Cold-Climate Funding</p>
                 </div>
                 
                 {/* Card 2: Audit Credit */}
                 <div className="flex-1 min-w-[280px] p-12 rounded-[3.5rem] bg-[#F5F9FF] border-2 border-blue-100/50 shadow-sm group hover:border-blue-300 transition-colors">
                    <p className="text-[12px] font-black text-blue-700 uppercase tracking-[0.4em] mb-6">Audit Credit</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-400">$</span>
                      <p className="text-8xl font-black text-slate-950 tracking-tighter leading-none">600</p>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 mt-6 uppercase tracking-[0.2em]">Full Reimbursement</p>
                 </div>
               </div>

               <div className="pt-8">
                 <button 
                  onClick={triggerSarahEligibility}
                  className="w-full md:w-auto px-16 py-9 bg-slate-950 text-white text-2xl font-black rounded-[2.5rem] shadow-5xl hover:bg-slate-800 transition-all active:scale-95 uppercase tracking-[0.2em] flex items-center justify-center gap-6 group overflow-hidden relative"
                >
                   <span className="relative z-10">Verify Eligibility Instantly</span>
                   <span className="text-3xl relative z-10 group-hover:translate-x-3 transition-transform duration-500">→</span>
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 </button>
                 <p className="mt-6 text-center md:text-left text-slate-400 text-xs font-black uppercase tracking-[0.3em]">AI Verification session starts Sarah's protocol</p>
               </div>
            </div>
            
            {/* Visual Infrastructure Column */}
            <div className="flex-shrink-0 w-full xl:w-[640px] rounded-[5rem] relative overflow-hidden shadow-6xl group border-[12px] border-white">
               <img 
                 src="https://i.ibb.co/Qvhhy8t8/hunyuan-image-3-0-b-Replace-the-current.png" 
                 alt="Superior Infrastructure Visualization" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
               
               {/* Sophisticated Overlay Panel */}
               <div className="absolute bottom-12 left-12 right-12 p-10 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_12px_#60a5fa]"></div>
                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-100">Analytics Active</p>
                  </div>
                  <h4 className="text-4xl font-black text-white tracking-tighter leading-none mb-3">Elite Infrastructure Verification</h4>
                  <p className="text-slate-300 text-lg font-medium tracking-tight">Real-time thermal compliance mapping engaged for all GTA grid nodes.</p>
               </div>
            </div>
          </section>

        </div>
      </main>

      <Footer persona={activePersona} />

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-12 right-12 z-[60] lg:hidden">
        <button 
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-6xl transition-all active:scale-90 ${isVoiceActive ? 'bg-red-500 scale-110' : 'bg-blue-700'}`}
        >
          {isVoiceActive ? (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;