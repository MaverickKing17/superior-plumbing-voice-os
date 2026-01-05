
import React from 'react';
import { Persona } from '../types.ts';

interface HeroProps {
  persona: Persona;
  onVoiceToggle: () => void;
  isVoiceActive: boolean;
}

const Hero: React.FC<HeroProps> = ({ persona, onVoiceToggle, isVoiceActive }) => {
  const isEmergency = persona === Persona.MIKE;

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-gray-100">
      <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-700 ${isEmergency ? 'bg-orange-600/10' : 'bg-blue-700/10'}`}></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-[450px]">
        <div className="p-8 md:p-16 space-y-8">
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm ${isEmergency ? 'bg-orange-600 text-white' : 'bg-green-50 text-green-700'}`}>
             {isEmergency ? '⚠️ Priority Dispatch Active' : '✅ 100% Satisfaction Guarantee'}
          </div>
          
          {isEmergency ? (
            <>
              <h2 className="text-4xl md:text-6xl font-black text-orange-950 leading-[1.1]">
                URGENT <br/> <span className="text-orange-600">DISPATCH</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Mike is routing elite technicians to your location. <strong>4-hour arrival</strong> guaranteed for no heat or flood emergencies.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={onVoiceToggle}
                  className={`px-10 py-5 rounded-2xl font-black shadow-2xl transition-all flex items-center gap-3 transform active:scale-95 ${isVoiceActive ? 'bg-white text-orange-600 border-4 border-orange-600' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                >
                   <span className="text-2xl">🚨</span> {isVoiceActive ? 'LISTENING TO EMERGENCY' : 'TALK TO DISPATCH'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-6xl font-black text-blue-950 leading-[1.1]">
                SMART <br/> <span className="text-blue-700">SOLUTIONS</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Speak with Melissa to schedule maintenance or verify your <strong>$7,500 Ontario HRS rebate</strong> eligibility instantly.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={onVoiceToggle}
                  className={`px-10 py-5 rounded-2xl font-black shadow-2xl transition-all flex items-center gap-3 transform active:scale-95 ${isVoiceActive ? 'bg-white text-blue-700 border-4 border-blue-700' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                >
                  <span className="text-2xl">🎙️</span> {isVoiceActive ? 'MELISSA IS LISTENING' : 'START VOICE INQUIRY'}
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="hidden md:flex justify-center p-12">
           <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-[100px] opacity-40 transition-colors duration-700 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}></div>
              
              {/* Mike's Image: High-performance field technician - REPLACED WITH REQUESTED IMAGE */}
              {isEmergency ? (
                <img 
                  src="https://i.ibb.co/99vGwK1F/gpt-image-1-5-a-Create-the-following.png" 
                  alt="Emergency Dispatcher Mike" 
                  className="relative z-10 w-96 h-96 object-cover rounded-[3rem] shadow-2xl border-8 border-white animate-message"
                />
              ) : (
                /* Melissa's Image: Professional advisor */
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&h=800&auto=format&fit=crop" 
                  alt="Home Advisor Melissa" 
                  className="relative z-10 w-96 h-96 object-cover rounded-[3rem] shadow-2xl border-8 border-white animate-message"
                />
              )}

              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 z-20 transition-transform hover:scale-110">
                 <p className={`text-3xl font-black ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                   {isEmergency ? '18m' : '24/7'}
                 </p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   {isEmergency ? 'Avg. Arrival' : 'Professional Support'}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
