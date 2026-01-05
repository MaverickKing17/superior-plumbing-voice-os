
import React from 'react';
import { Persona } from '../types.ts';

interface HeroProps {
  persona: Persona;
  onVoiceToggle: () => void;
  isVoiceActive: boolean;
}

const Hero: React.FC<HeroProps> = ({ persona, onVoiceToggle, isVoiceActive }) => {
  const isEmergency = persona === Persona.MIKE;

  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
      <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-700 ${isEmergency ? 'bg-orange-600/10' : 'bg-blue-700/10'}`}></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-[400px]">
        <div className="p-8 md:p-12 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
            ✅ Superior Performance Guaranteed
          </div>
          
          {isEmergency ? (
            <>
              <h2 className="text-4xl md:text-5xl font-black text-orange-900 leading-tight">
                EMERGENCY DISPATCH <br/> <span className="text-orange-600">IS LIVE</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Emergency triage active. Mike is standing by to route an elite technician to your GTA address within <span className="font-bold text-orange-600 underline">4 hours</span>.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onVoiceToggle}
                  className={`px-8 py-4 rounded-xl font-black shadow-xl transition-all flex items-center gap-2 transform active:scale-95 ${isVoiceActive ? 'bg-white text-orange-600 border-2 border-orange-600' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                >
                   <span>🚨</span> {isVoiceActive ? 'DISPATCHER LISTENING' : 'SPEAK TO DISPATCH'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-black text-blue-900 leading-tight">
                MEET MELISSA <br/> <span className="text-blue-700">YOUR HOME ADVISOR</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Expert support for plumbing repairs, HVAC installations, and Ontario HRS rebates. We handle your home maintenance so you don't have to.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onVoiceToggle}
                  className={`px-8 py-4 rounded-xl font-black shadow-xl transition-all flex items-center gap-2 transform active:scale-95 ${isVoiceActive ? 'bg-white text-blue-700 border-2 border-blue-700' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                >
                  <span>🎙️</span> {isVoiceActive ? 'MELISSA IS LISTENING' : 'START VOICE INQUIRY'}
                </button>
                <div className="flex flex-col justify-center">
                   <p className="text-xs font-bold text-gray-400 uppercase">Save up to</p>
                   <p className="text-xl font-bold text-green-600">$7,500 in Rebates</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="hidden md:flex justify-center p-8">
           <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}></div>
              <img 
                src={isEmergency 
                  ? "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&h=600&auto=format&fit=crop" 
                  : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&h=600&auto=format&fit=crop"
                } 
                alt="Elite Advisor" 
                className="relative z-10 w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white transition-opacity duration-500"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 z-20">
                 <p className="text-2xl font-black text-blue-900">2026</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase">Compliant Solutions</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
