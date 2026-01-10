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
    <section className="relative overflow-hidden rounded-[3.5rem] bg-white shadow-[0_48px_80px_-16px_rgba(0,0,0,0.06)] border border-slate-100">
      <div className={`absolute top-0 right-0 w-2/3 h-full transition-all duration-1000 ${isEmergency ? 'bg-orange-600/[0.03]' : 'bg-blue-700/[0.03]'}`} style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-[640px]">
        <div className="p-12 md:p-24 space-y-12">
          <div className="space-y-4">
            <div className={`inline-flex items-center px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm ${isEmergency ? 'bg-orange-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
               {isEmergency ? '🚨 PRIORITY DISPATCH ACTIVE' : '🏠 OFFICIAL ONTARIO SERVICE PARTNER'}
            </div>
            
            {isEmergency ? (
              <>
                <h2 className="text-6xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter">
                  URGENT <br/> <span className="text-orange-600">RESPONSE</span>
                </h2>
                <p className="text-slate-500 text-2xl leading-relaxed font-medium max-w-lg">
                  Sam is managing priority triage across the GTA. Licensed TSSA technicians are ready for <span className="text-slate-900 font-bold underline decoration-orange-500/30">4-hour emergency arrival</span>.
                </p>
                <div className="flex flex-wrap gap-6 pt-6">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-14 py-7 rounded-[2rem] font-black shadow-3xl transition-all flex items-center gap-5 transform active:scale-95 group ${
                      isVoiceActive 
                        ? 'bg-white text-orange-600 border-4 border-orange-600' 
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                  >
                     <span className="text-3xl group-hover:rotate-12 transition-transform">🎧</span> 
                     <span className="text-xl uppercase tracking-widest">{isVoiceActive ? 'SAM IS ACTIVE' : 'TALK TO SAM'}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-6xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter uppercase">
                  ELITE HVAC <br/> <span className="text-blue-700">SYSTEMS</span>
                </h2>
                <p className="text-slate-500 text-2xl leading-relaxed font-medium max-w-lg">
                  Precision-engineered home comfort for the GTA. Speak with <strong>Sarah</strong> to verify your <strong>$7,500 Ontario HRS rebate</strong> eligibility instantly.
                </p>
                <div className="flex flex-wrap gap-6 pt-6">
                  <button 
                    onClick={onVoiceToggle}
                    className={`px-14 py-7 rounded-[2rem] font-black shadow-3xl transition-all flex items-center gap-5 transform active:scale-95 group ${
                      isVoiceActive 
                        ? 'bg-white text-blue-700 border-4 border-blue-700' 
                        : 'bg-blue-700 text-white hover:bg-blue-800'
                    }`}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">🎙️</span> 
                    <span className="text-xl uppercase tracking-widest">{isVoiceActive ? 'SARAH IS ACTIVE' : 'TALK TO SARAH'}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-12 text-slate-400">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest">TSSA License</span>
              <span className="text-slate-900 font-bold">000394817</span>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest">Est. Coverage</span>
              <span className="text-slate-900 font-bold">GTA & Ontario</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center p-16 relative">
           <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-[140px] opacity-40 transition-all duration-1000 ${isEmergency ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
              
              <div className="relative z-10 transition-all duration-700 group-hover:scale-[1.03]">
                <img 
                  src={isEmergency 
                    ? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&h=1000&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=1000&auto=format&fit=crop"
                  } 
                  alt={isEmergency ? "Emergency Dispatch Sam" : "Service Lead Sarah"} 
                  className="w-[480px] h-[600px] object-cover rounded-[4.5rem] shadow-4xl border-[16px] border-white"
                />
              </div>

              {/* Status Badge Over Image */}
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[3rem] shadow-4xl border border-slate-50 z-20 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-5xl">
                 <div className="flex items-center gap-3 mb-2">
                    <span className={`w-3 h-3 rounded-full animate-pulse ${isEmergency ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Status: Active</span>
                 </div>
                 <p className={`text-5xl font-black ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                   {isEmergency ? '18m' : '24/7'}
                 </p>
                 <p className="text-[12px] font-black text-slate-900 uppercase tracking-widest mt-1">
                   {isEmergency ? 'Dispatch Window' : 'Expert Support'}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;