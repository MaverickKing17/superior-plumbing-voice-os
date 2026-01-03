
import React from 'react';
import { Persona } from '../types';

interface HeaderProps {
  persona: Persona;
}

const Header: React.FC<HeaderProps> = ({ persona }) => {
  const isEmergency = persona === Persona.MIKE;

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`bg-white border-b-4 transition-colors duration-500 ${isEmergency ? 'border-orange-600' : 'border-blue-700'} sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl font-bold transition-colors ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}>
                S
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-black uppercase tracking-tight ${isEmergency ? 'text-orange-900' : 'text-blue-900'}`}>
                  Superior <span className="text-gray-500">Plumbing & Heating</span>
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold -mt-1">Expert Service Since 2010</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-6 font-semibold text-gray-600">
              <a 
                href="#services" 
                onClick={scrollToSection('services')} 
                className={`hover:text-blue-700 transition-colors cursor-pointer ${isEmergency ? 'hover:text-orange-600' : 'hover:text-blue-700'}`}
              >
                Services
              </a>
              <a 
                href="#rebates" 
                onClick={scrollToSection('rebates')} 
                className={`hover:text-blue-700 transition-colors cursor-pointer ${isEmergency ? 'hover:text-orange-600' : 'hover:text-blue-700'}`}
              >
                Rebates
              </a>
              <a 
                href="#areas" 
                onClick={scrollToSection('areas')} 
                className={`hover:text-blue-700 transition-colors cursor-pointer ${isEmergency ? 'hover:text-orange-600' : 'hover:text-blue-700'}`}
              >
                Areas
              </a>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-400 font-bold uppercase">Order a Specialist</p>
              <a href="tel:18669349139" className={`text-xl font-bold transition-colors ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>
                (866) 934-9139
              </a>
            </div>
            <button 
              onClick={scrollToSection('book')}
              className={`hidden sm:block px-6 py-2.5 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 ${isEmergency ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-700 hover:bg-blue-800'}`}
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
