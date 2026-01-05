
import React from 'react';
import { Persona } from '../types.ts';

interface HeaderProps {
  persona: Persona;
  setPersona?: (p: Persona) => void;
}

const Header: React.FC<HeaderProps> = ({ persona, setPersona }) => {
  const isEmergency = persona === Persona.MIKE;

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
      setPersona(isEmergency ? Persona.MELISSA : Persona.MIKE);
    }
  };

  return (
    <nav className={`bg-white border-b-4 transition-colors duration-500 ${isEmergency ? 'border-orange-600' : 'border-blue-700'} sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" 
              onClick={scrollToSection('top')}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-black transition-all duration-500 shadow-lg group-hover:scale-105 ${isEmergency ? 'bg-orange-600 shadow-orange-100' : 'bg-blue-700 shadow-blue-100'}`}>
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M12 21c-4.418 0-8-3.582-8-8s8-11 8-11 8 6.582 8 11-3.582 8-8 8zm0-2c3.314 0 6-2.686 6-6 0-2.31-1.92-5.462-6-8.794-4.08 3.332-6 6.484-6 8.794 0 3.314 2.686 6 6 6z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-bold uppercase tracking-tight ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                  Superior <span className="text-gray-500 font-medium">Plumbing</span>
                </h1>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold -mt-1 leading-none">Enterprise Solutions</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={togglePersona}
              className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-all ${isEmergency ? 'border-orange-200 text-orange-600 bg-orange-50' : 'border-blue-200 text-blue-700 bg-blue-50'}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              Demo: Switch View
            </button>

            <div className="hidden xl:flex gap-6 font-semibold text-gray-600">
              <a href="#services" onClick={scrollToSection('services')} className="hover:text-blue-700 transition-colors">Services</a>
              <a href="#rebates" onClick={scrollToSection('rebates')} className="hover:text-blue-700 transition-colors">Rebates</a>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Emergency Line</p>
              <a href="tel:18669322818" className={`text-lg font-black transition-colors ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                (866) 932-2818
              </a>
            </div>

            <button 
              onClick={scrollToSection('book')}
              className={`hidden sm:block px-6 py-2.5 rounded-xl font-black text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isEmergency ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-700 hover:bg-blue-800'}`}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
