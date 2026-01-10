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
    <section className="relative overflow-hidden rounded-[3rem] bg-white shadow-[0_48px_96px_-16px_rgba(0,0,0,0.06)] border border-slate-100">
      <div className={`absolute top-0 right-0 w-2/3 h-full transition-all duration-1000 ${isEmergency ? 'bg-orange-600/[0.04]' : 'bg-blue-700/[0.04]'}`} style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-[600px]">
        <div className="p-8 md:p-16 lg:p-20 space-y-10">
          <div className="space-y-5">
            <div className={`inline-flex items-center px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-2 shadow-sm border ${isEmergency ? 'bg-orange-600 text-white border-orange-500' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
               {isEmergency ? '🚨 PRIORITY DISPATCH ACTIVE' : '🏢 OFFICIAL ONTARIO MECHANICAL PARTNER'}
            </div>
            
            {isEmergency ? (
              <>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-[0.85] tracking-tighter">
                  CRITICAL <br/> <span className="text-orange-600 underline decoration-orange-600/10">RESPONSE</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium max-w-lg">
                  Sam is overseeing mission-critical triage and asset recovery across the GTA. Licensed engineering teams are staged for <span className="text-slate-900 font-extrabold underline decoration-orange-500/30 underline-offset-4">rapid field mobilization</span>.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-10 py-6 rounded-[1.5rem] font-black shadow-xl transition-all flex items-center gap-4 transform active:scale-95 group relative ${
                      isVoiceActive 
                        ? 'bg-white text-orange-600 border-2 animate-active-glow-orange' 
                        : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100'
                    }`}
                  >
                     <span className="text-2xl group-hover:rotate-12 transition-transform">🎧</span> 
                     <span className="text-base uppercase tracking-widest">{isVoiceActive ? 'AGENT ENGAGED' : 'INITIATE RESPONSE'}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-[0.85] tracking-tighter uppercase">
                  HIGH-PERFORMANCE <br/> <span className="text-blue-700">MECHANICALS</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium max-w-lg">
                  Precision-engineered climate infrastructure for the Greater Toronto Area. Consult with Sarah to authorize your <span className="text-slate-950 font-black">$7,500 HRS rebate</span> eligibility.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-10 py-6 rounded-[1.5rem] font-black shadow-xl transition-all flex items-center gap-4 transform active:scale-95 group relative ${
                      isVoiceActive 
                        ? 'bg-white text-blue-700 border-2 animate-active-glow-blue' 
                        : 'bg-blue-700 text-white hover:bg-blue-800 shadow-blue-100'
                    }`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">🎙️</span> 
                    <span className="text-base uppercase tracking-widest">{isVoiceActive ? 'ADVISOR ACTIVE' : 'CONSULT ADVISOR'}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-10 text-slate-400">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">TSSA CERTIFICATION</span>
              <span className="text-slate-950 font-black text-sm mt-1 tracking-tight">000394817</span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">FIELD OPERATION</span>
              <span className="text-slate-950 font-black text-sm mt-1 tracking-tight">GTA MOBILE FLEET</span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex justify-center p-12 relative">
           <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-[120px] opacity-25 transition-all duration-1000 ${isEmergency ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
              
              <div className="relative z-10 transition-all duration-700 group-hover:scale-[1.01]">
                <img 
                  src={isEmergency 
                    ? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&h=800&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&h=800&auto=format&fit=crop"
                  } 
                  alt={isEmergency ? "Emergency Dispatch Architect" : "Lead Technical Advisor"} 
                  className="w-[400px] h-[520px] object-cover rounded-[3rem] shadow-5xl border-[12px] border-white"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-[2rem] shadow-5xl border border-slate-50 z-20 transition-all duration-500 group-hover:-translate-y-2">
                 <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isEmergency ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">STATUS: MISSION READY</span>
                 </div>
                 <p className={`text-4xl font-black tracking-tighter ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                   {isEmergency ? '4h' : '24/7'}
                 </p>
                 <p className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em] mt-1">
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