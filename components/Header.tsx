import React from 'react';
import { Persona } from '../types';

interface HeaderProps {
  persona: Persona;
  setPersona?: (p: Persona) => void;
}

const Header: React.FC<HeaderProps> = ({ persona, setPersona }) => {
  const isEmergency = persona === Persona.SAM;

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const togglePersona = () => {
    if (setPersona) {
      setPersona(isEmergency ? Persona.SARAH : Persona.SAM);
    }
  };

  return (
    <nav className={`bg-white border-b-[6px] transition-colors duration-500 ${isEmergency ? 'border-orange-600' : 'border-blue-700'} sticky top-0 z-50 shadow-md`}>
      <div className="max-w-[1600px] mx-auto px-8 sm:px-12">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-5 cursor-pointer group" 
              onClick={scrollToSection('top')}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-3xl font-black transition-all duration-500 shadow-xl group-hover:scale-110 ${isEmergency ? 'bg-orange-600 shadow-orange-100' : 'bg-blue-700 shadow-blue-100'}`}>
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                  <path d="M12 21c-4.418 0-8-3.582-8-8s8-11 8-11 8 6.582 8 11-3.582 8-8 8zm0-2c3.314 0 6-2.686 6-6 0-2.31-1.92-5.462-6-8.794-4.08 3.332-6 6.484-6 8.794 0 3.314 2.686 6 6 6z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-2xl font-black uppercase tracking-tighter leading-none ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                  Superior <span className="text-slate-400 font-bold">Plumbing</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-black mt-1 leading-none">ENTERPRISE OS</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 md:gap-12">
            <button 
              onClick={togglePersona}
              className={`hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-xl border-2 text-[11px] font-black uppercase tracking-widest transition-all ${isEmergency ? 'border-orange-100 text-orange-600 bg-orange-50 hover:bg-orange-100' : 'border-blue-100 text-blue-700 bg-blue-50 hover:bg-blue-100'}`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current"></span>
              </span>
              Mode: {isEmergency ? 'Service' : 'Emergency'}
            </button>

            <div className="hidden xl:flex gap-10 font-black text-slate-400 text-[13px] uppercase tracking-[0.2em]">
              <a href="#services" onClick={scrollToSection('services')} className="hover:text-blue-700 transition-colors">Infrastructure</a>
              <a href="#rebates" onClick={scrollToSection('rebates')} className="hover:text-blue-700 transition-colors">Capital Rebates</a>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mb-1">Direct Line</p>
              <a href="tel:18669322818" className={`text-2xl font-black transition-colors tracking-tighter ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                (866) 932-2818
              </a>
            </div>

            <button 
              onClick={scrollToSection('book')}
              className={`hidden md:block px-10 py-4 rounded-2xl font-black text-[13px] uppercase tracking-widest text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${isEmergency ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-100' : 'bg-blue-700 hover:bg-blue-800 shadow-blue-100'}`}
            >
              DEPLOY TECH
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;