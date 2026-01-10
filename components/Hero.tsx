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
    <section className="relative overflow-hidden rounded-[4.5rem] bg-white shadow-[0_64px_128px_-16px_rgba(0,0,0,0.08)] border border-slate-100">
      <div className={`absolute top-0 right-0 w-2/3 h-full transition-all duration-1000 ${isEmergency ? 'bg-orange-600/[0.04]' : 'bg-blue-700/[0.04]'}`} style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-[720px]">
        <div className="p-12 md:p-28 space-y-16">
          <div className="space-y-6">
            <div className={`inline-flex items-center px-8 py-3 rounded-full text-[13px] font-black uppercase tracking-[0.4em] mb-6 shadow-sm border ${isEmergency ? 'bg-orange-600 text-white border-orange-500' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
               {isEmergency ? '🚨 PRIORITY DISPATCH ACTIVE' : '🏠 OFFICIAL ONTARIO SERVICE PARTNER'}
            </div>
            
            {isEmergency ? (
              <>
                <h2 className="text-7xl md:text-9xl font-black text-slate-950 leading-[0.85] tracking-tighter">
                  URGENT <br/> <span className="text-orange-600 underline decoration-orange-600/10">RESPONSE</span>
                </h2>
                <p className="text-slate-600 text-2xl leading-relaxed font-medium max-w-xl">
                  Sam is coordinating critical asset recovery and triage across the GTA. TSSA licensed engineering teams are staged for <span className="text-slate-900 font-extrabold underline decoration-orange-500/30 underline-offset-4">18-minute mobilization</span>.
                </p>
                <div className="flex flex-wrap gap-8 pt-8">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-16 py-8 rounded-[2.5rem] font-black shadow-4xl transition-all flex items-center gap-6 transform active:scale-95 group relative ${
                      isVoiceActive 
                        ? 'bg-white text-orange-600 border-4 animate-active-glow-orange' 
                        : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200'
                    }`}
                  >
                     <span className="text-4xl group-hover:rotate-12 transition-transform">🎧</span> 
                     <span className="text-2xl uppercase tracking-widest">{isVoiceActive ? 'SAM IS ACTIVE' : 'INITIATE TRIAGE'}</span>
                     {isVoiceActive && (
                        <span className="absolute -top-4 -right-4 bg-orange-600 text-white text-[11px] px-4 py-1.5 rounded-full font-black animate-pulse shadow-xl border-2 border-white">LIVE DISPATCH</span>
                     )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-7xl md:text-9xl font-black text-slate-950 leading-[0.85] tracking-tighter uppercase">
                  ELITE HVAC <br/> <span className="text-blue-700">SYSTEMS</span>
                </h2>
                <p className="text-slate-600 text-2xl leading-relaxed font-medium max-w-xl">
                  Precision-engineered climate control for the Greater Toronto Area. Consult with <strong>Sarah</strong> to authorize your <strong>$7,500 capital rebate</strong> eligibility.
                </p>
                <div className="flex flex-wrap gap-8 pt-8">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-16 py-8 rounded-[2.5rem] font-black shadow-4xl transition-all flex items-center gap-6 transform active:scale-95 group relative ${
                      isVoiceActive 
                        ? 'bg-white text-blue-700 border-4 animate-active-glow-blue' 
                        : 'bg-blue-700 text-white hover:bg-blue-800 shadow-blue-200'
                    }`}
                  >
                    <span className="text-4xl group-hover:scale-110 transition-transform">🎙️</span> 
                    <span className="text-2xl uppercase tracking-widest">{isVoiceActive ? 'SARAH IS ACTIVE' : 'TALK TO SARAH'}</span>
                    {isVoiceActive && (
                        <span className="absolute -top-4 -right-4 bg-blue-700 text-white text-[11px] px-4 py-1.5 rounded-full font-black animate-pulse shadow-xl border-2 border-white">ENCRYPTED LINE</span>
                     )}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-16 text-slate-400">
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">TSSA REGISTRATION</span>
              <span className="text-slate-950 font-black text-lg mt-1 tracking-tight">000394817</span>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">OPERATIONAL SCALE</span>
              <span className="text-slate-950 font-black text-lg mt-1 tracking-tight">GTA & ONTARIO WIDE</span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex justify-center p-20 relative">
           <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-[160px] opacity-30 transition-all duration-1000 ${isEmergency ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
              
              <div className="relative z-10 transition-all duration-700 group-hover:scale-[1.02]">
                <img 
                  src={isEmergency 
                    ? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&h=1000&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=1000&auto=format&fit=crop"
                  } 
                  alt={isEmergency ? "Emergency Dispatch Sam" : "Service Lead Sarah"} 
                  className="w-[540px] h-[680px] object-cover rounded-[5rem] shadow-5xl border-[20px] border-white"
                />
              </div>

              {/* Status Badge Over Image */}
              <div className="absolute -bottom-12 -left-12 bg-white p-12 rounded-[4rem] shadow-5xl border border-slate-50 z-20 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-6xl">
                 <div className="flex items-center gap-4 mb-3">
                    <span className={`w-4 h-4 rounded-full animate-pulse ${isEmergency ? 'bg-orange-500 shadow-orange-200 shadow-lg' : 'bg-green-500 shadow-green-200 shadow-lg'}`}></span>
                    <span className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">NODE STATUS: ACTIVE</span>
                 </div>
                 <p className={`text-6xl font-black tracking-tighter ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                   {isEmergency ? '18m' : '24/7'}
                 </p>
                 <p className="text-[14px] font-black text-slate-950 uppercase tracking-[0.2em] mt-2">
                   {isEmergency ? 'DISPATCH LATENCY' : 'EXPERT AVAILABILITY'}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;