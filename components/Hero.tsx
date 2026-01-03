
import React from 'react';
import { Persona } from '../types';

interface HeroProps {
  persona: Persona;
}

const Hero: React.FC<HeroProps> = ({ persona }) => {
  const isEmergency = persona === Persona.MIKE;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100">
      <div className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-700 ${isEmergency ? 'bg-orange-600/10' : 'bg-blue-700/10'}`}></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center min-h-[400px]">
        <div className="p-8 md:p-12 space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
            ✅ Licensed & Bonded Professionals
          </div>
          
          {isEmergency ? (
            <>
              <h2 className="text-4xl md:text-5xl font-black text-orange-900 leading-tight">
                URGENT DISPATCH <br/> <span className="text-orange-600">IN PROGRESS</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Emergency detected. Mike is on-call. We guarantee a technician arrival within <span className="font-bold text-orange-600 underline">4 hours</span> for all plumbing and heating emergencies.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-orange-600 text-white rounded-xl font-black shadow-xl hover:bg-orange-700 transition-all flex items-center gap-2">
                   <span>🚨</span> CALLING MIKE NOW...
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-black text-blue-900 leading-tight">
                YOUR LOCAL <br/> <span className="text-blue-700">PLUMBING EXPERTS</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience superior service with Sarah and our team. From high-efficiency heat pump rebates to complex plumbing repairs, we treat your home like our own.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-blue-700 text-white rounded-xl font-black shadow-xl hover:bg-blue-800 transition-all">
                  REQUEST SERVICE
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
              <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${isEmergency ? 'bg-orange-600' : 'bg-blue-600'}`}></div>
              <img 
                src={isEmergency 
                  ? "https://picsum.photos/id/101/600/600" // Representative image
                  : "https://picsum.photos/id/201/600/600"
                } 
                alt="Pro Technician" 
                className="relative z-10 w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 z-20">
                 <p className="text-2xl font-black text-blue-900">15+</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase">Years Experience</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
