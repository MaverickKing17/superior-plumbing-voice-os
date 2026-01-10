import React from 'react';
import { Persona } from '../types';

interface HeroProps {
  persona: Persona;
  onVoiceToggle: () => void;
  isVoiceActive: boolean;
}

const Hero: React.FC<HeroProps> = ({ persona, onVoiceToggle, isVoiceActive }) => {
  const isEmergency = persona === Persona.SAM;

  return (
    <section className="relative overflow-hidden rounded-[4rem] bg-white shadow-[0_64px_128px_-16px_rgba(0,0,0,0.08)] border border-slate-100">
      <div className={`absolute top-0 right-0 w-2/3 h-full transition-all duration-1000 ${isEmergency ? 'bg-orange-600/[0.04]' : 'bg-blue-700/[0.04]'}`} style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-[680px]">
        <div className="p-10 md:p-20 space-y-12">
          <div className="space-y-6">
            <div className={`inline-flex items-center px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-4 shadow-sm border ${isEmergency ? 'bg-orange-600 text-white border-orange-500' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
               {isEmergency ? '🚨 PRIORITY DISPATCH ACTIVE' : '🏢 OFFICIAL ONTARIO MECHANICAL PARTNER'}
            </div>
            
            {isEmergency ? (
              <>
                <h2 className="text-5xl md:text-7xl font-black text-slate-950 leading-[0.85] tracking-tighter">
                  CRITICAL <br/> <span className="text-orange-600 underline decoration-orange-600/10">RESPONSE</span>
                </h2>
                <p className="text-slate-600 text-xl leading-relaxed font-medium max-w-lg">
                  Sam is overseeing mission-critical triage and asset recovery across the GTA. Licensed engineering teams are staged for <span className="text-slate-900 font-extrabold underline decoration-orange-500/30 underline-offset-4">rapid field mobilization</span>.
                </p>
                <div className="flex flex-wrap gap-6 pt-6">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-12 py-7 rounded-[2rem] font-black shadow-3xl transition-all flex items-center gap-5 transform active:scale-95 group relative ${
                      isVoiceActive 
                        ? 'bg-white text-orange-600 border-4 animate-active-glow-orange' 
                        : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200'
                    }`}
                  >
                     <span className="text-3xl group-hover:rotate-12 transition-transform">🎧</span> 
                     <span className="text-xl uppercase tracking-widest">{isVoiceActive ? 'AGENT ENGAGED' : 'INITIATE RESPONSE'}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-5xl md:text-7xl font-black text-slate-950 leading-[0.85] tracking-tighter uppercase">
                  HIGH-PERFORMANCE <br/> <span className="text-blue-700">MECHANICALS</span>
                </h2>
                <p className="text-slate-600 text-xl leading-relaxed font-medium max-w-lg">
                  Precision-engineered climate infrastructure for the Greater Toronto Area. Consult with Sarah to authorize your <span className="text-slate-950 font-black">$7,500 HRS rebate</span> eligibility.
                </p>
                <div className="flex flex-wrap gap-6 pt-6">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-12 py-7 rounded-[2rem] font-black shadow-3xl transition-all flex items-center gap-5 transform active:scale-95 group relative ${
                      isVoiceActive 
                        ? 'bg-white text-blue-700 border-4 animate-active-glow-blue' 
                        : 'bg-blue-700 text-white hover:bg-blue-800 shadow-blue-200'
                    }`}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">🎙️</span> 
                    <span className="text-xl uppercase tracking-widest">{isVoiceActive ? 'ADVISOR ACTIVE' : 'CONSULT ADVISOR'}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-12 text-slate-400">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">TSSA CERTIFICATION</span>
              <span className="text-slate-950 font-black text-base mt-1 tracking-tight">000394817</span>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">FIELD OPERATION</span>
              <span className="text-slate-950 font-black text-base mt-1 tracking-tight">GTA MOBILE FLEET</span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex justify-center p-16 relative">
           <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-[140px] opacity-30 transition-all duration-1000 ${isEmergency ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
              
              <div className="relative z-10 transition-all duration-700 group-hover:scale-[1.01]">
                <img 
                  src={isEmergency 
                    ? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&h=1000&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=1000&auto=format&fit=crop"
                  } 
                  alt={isEmergency ? "Emergency Dispatch Architect" : "Lead Technical Advisor"} 
                  className="w-[480px] h-[600px] object-cover rounded-[4rem] shadow-5xl border-[16px] border-white"
                />
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white p-10 rounded-[3rem] shadow-5xl border border-slate-50 z-20 transition-all duration-500 group-hover:-translate-y-2">
                 <div className="flex items-center gap-3 mb-2.5">
                    <span className={`w-3 h-3 rounded-full animate-pulse ${isEmergency ? 'bg-orange-500 shadow-orange-200 shadow-lg' : 'bg-green-500 shadow-green-200 shadow-lg'}`}></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">STATUS: MISSION READY</span>
                 </div>
                 <p className={`text-5xl font-black tracking-tighter ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                   {isEmergency ? '4h' : '24/7'}
                 </p>
                 <p className="text-[12px] font-black text-slate-950 uppercase tracking-[0.2em] mt-1.5">
                   {isEmergency ? 'GTA RESPONSE' : 'TECHNICAL ADVISORY'}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;