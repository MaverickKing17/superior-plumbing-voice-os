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
    // Scroll to the AI agent to show the user the session has started
    const agentSection = document.getElementById('ai-agent-interface');
    if (agentSection) {
      agentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-1000 ${activePersona === Persona.SAM ? 'bg-orange-50' : 'bg-white'}`}>
      <Header persona={activePersona} setPersona={(p) => setActivePersona(p as Persona)} />
      
      <main>
        {/* Full-width Hero Section */}
        <div className="max-w-[1600px] mx-auto px-8 py-12">
          <Hero 
            persona={activePersona} 
            onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)} 
            isVoiceActive={isVoiceActive} 
          />
        </div>

        {/* Trust Badges / Stats Section */}
        <section className="bg-slate-50 border-y border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">4-Hour</p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Arrival Window</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">100%</p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">TSSA</p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Certified Techs</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">$7,500</p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Max Rebate</p>
            </div>
          </div>
        </section>

        {/* Core Content Layout */}
        <div className="max-w-7xl mx-auto px-8 py-32 space-y-32">
          
          {/* Services Section */}
          <section id="services">
            <div className="mb-16">
              <h2 className="text-xs font-black text-blue-700 uppercase tracking-[0.5em] mb-6">Elite Engineering Capabilities</h2>
              <h3 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-none">Enterprise HVAC & Plumbing</h3>
            </div>
            <ServiceCards />
          </section>

          {/* AI Feature Section - Wide Layout */}
          <section id="ai-agent-interface" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-slate-950 rounded-[4rem] overflow-hidden shadow-4xl p-16 lg:p-24 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent_70%)]"></div>
            
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Next-Gen Dispatch Engine</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                Experience <br/> <span className="text-blue-500 underline decoration-blue-500/20">Instant</span> <br/> Voice Response
              </h3>
              <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-lg">
                Eliminate hold times permanently. Our AI Dispatch system connects you to specialized agents for verification and triage in under 200ms.
              </p>
              <ul className="space-y-6">
                {['Direct Line Encryption (256-bit)', 'Real-time Eligibility Algorithms', 'Immediate Priority Triage Logic'].map((feat) => (
                  <li key={feat} className="flex items-center gap-4 text-base font-bold text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <section id="rebates" className="bg-white p-12 md:p-24 rounded-[4.5rem] shadow-2xl border border-slate-100 flex flex-col xl:flex-row gap-20 items-stretch">
            <div className="flex-1 space-y-12 py-4">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Funding Window</span>
                  </div>
                  <h3 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-950 leading-[0.85]">Ontario HRS <br/> Rebate 2026</h3>
                  <p className="text-slate-600 text-2xl leading-relaxed font-medium max-w-xl">
                    As authorized partners for the Home Renovation Savings program, we facilitate high-yield capital returns for infrastructure upgrades.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-10 rounded-[3rem] bg-emerald-50/40 border border-emerald-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="relative z-10">
                      <p className="text-[12px] font-black text-emerald-700 uppercase tracking-[0.3em] mb-4">Maximum Grant</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900">$</span>
                        <p className="text-7xl font-black text-slate-950 tracking-tighter">7,500</p>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 mt-4 uppercase tracking-widest">Cold-Climate Payout</p>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/30 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                 </div>
                 
                 <div className="p-10 rounded-[3rem] bg-blue-50/40 border border-blue-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="relative z-10">
                      <p className="text-[12px] font-black text-blue-700 uppercase tracking-[0.3em] mb-4">Audit Credit</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-900">$</span>
                        <p className="text-7xl font-black text-slate-950 tracking-tighter">600</p>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 mt-4 uppercase tracking-widest">Reimbursement</p>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                 </div>
               </div>

               <div className="pt-4">
                 <button 
                  onClick={triggerSarahEligibility}
                  className="w-full md:w-auto px-16 py-8 bg-slate-950 text-white text-xl font-black rounded-[2rem] shadow-4xl hover:bg-slate-800 transition-all active:scale-95 uppercase tracking-[0.15em] flex items-center justify-center gap-4 group"
                >
                   <span>Verify Eligibility Instantly</span>
                   <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                 </button>
                 <p className="mt-4 text-center md:text-left text-slate-400 text-xs font-bold uppercase tracking-widest">AI verification starts Sarah's voice session</p>
               </div>
            </div>
            
            <div className="flex-shrink-0 w-full xl:w-[600px] rounded-[4.5rem] relative overflow-hidden shadow-6xl group">
               <img 
                 src="https://i.ibb.co/Qvhhy8t8/hunyuan-image-3-0-b-Replace-the-current.png" 
                 alt="Superior Infrastructure Visualization" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
               
               {/* Refined Image Overlay/Caption */}
               <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]"></div>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-200">System Analytics Status</p>
                  </div>
                  <h4 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">Elite Infrastructure Verification</h4>
                  <p className="text-slate-300 text-sm font-medium tracking-wide">Real-time thermal compliance mapping active for all Greater Toronto Area nodes.</p>
               </div>
            </div>
          </section>

        </div>
      </main>

      <Footer persona={activePersona} />

      {/* Persistent Floating Contact Button (Mobile) */}
      <div className="fixed bottom-10 right-10 z-[60] lg:hidden">
        <button 
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-4xl transition-all ${isVoiceActive ? 'bg-red-500 scale-110' : 'bg-blue-700'}`}
        >
          {isVoiceActive ? (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;