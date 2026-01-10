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
    <section className="relative overflow-hidden rounded-[3rem] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100">
      <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-1000 ${isEmergency ? 'bg-orange-600/[0.03]' : 'bg-blue-700/[0.03]'}`}></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-[520px]">
        <div className="p-10 md:p-20 space-y-10">
          <div className={`inline-flex items-center px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] mb-2 shadow-sm ${isEmergency ? 'bg-orange-600 text-white' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
             {isEmergency ? '🚨 EMERGENCY DISPATCH ACTIVE' : '🏠 OFFICIAL REBATE PARTNER'}
          </div>
          
          {isEmergency ? (
            <>
              <h2 className="text-5xl md:text-7xl font-black text-slate-950 leading-[0.95] tracking-tight">
                URGENT <br/> <span className="text-orange-600">RESPONSE</span>
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-md">
                Sam is dispatching elite technicians across the GTA. <strong>4-hour arrival</strong> guaranteed for all critical failures.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={onVoiceToggle}
                  className={`px-12 py-6 rounded-2xl font-black shadow-2xl transition-all flex items-center gap-4 transform active:scale-95 group ${
                    isVoiceActive 
                      ? 'bg-white text-orange-600 border-4 border-orange-600' 
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                   <span className="text-2xl group-hover:rotate-12 transition-transform">🎧</span> 
                   {isVoiceActive ? 'SAM IS LISTENING' : 'TALK TO DISPATCH'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-5xl md:text-7xl font-black text-slate-950 leading-[0.95] tracking-tight">
                SMART <br/> <span className="text-blue-700">SAVINGS</span>
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-md">
                Speak with <strong>Chloe</strong> to verify your eligibility for the <strong>$7,500 Ontario HRS rebate</strong> program instantly.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={onVoiceToggle}
                  className={`px-12 py-6 rounded-2xl font-black shadow-2xl transition-all flex items-center gap-4 transform active:scale-95 group ${
                    isVoiceActive 
                      ? 'bg-white text-blue-700 border-4 border-blue-700' 
                      : 'bg-blue-700 text-white hover:bg-blue-800'
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🎙️</span> 
                  {isVoiceActive ? 'CHLOE IS LISTENING' : 'TALK TO CHLOE'}
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="hidden md:flex justify-center p-16">
           <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-[120px] opacity-30 transition-all duration-1000 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}></div>
              
              {isEmergency ? (
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&h=800&auto=format&fit=crop" 
                  alt="Emergency Dispatcher Sam" 
                  className="relative z-10 w-[420px] h-[420px] object-cover rounded-[4rem] shadow-2xl border-[12px] border-white transition-all duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=800&auto=format&fit=crop" 
                  alt="Home Advisor Chloe" 
                  className="relative z-10 w-[420px] h-[420px] object-cover rounded-[4rem] shadow-2xl border-[12px] border-white transition-all duration-500 group-hover:scale-[1.02]"
                />
              )}

              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 z-20 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-3xl">
                 <p className={`text-4xl font-black ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                   {isEmergency ? '18m' : '24/7'}
                 </p>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">
                   {isEmergency ? 'Avg. Arrival' : 'Direct Support'}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;