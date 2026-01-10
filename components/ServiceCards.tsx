import React from 'react';
import { SERVICES } from '../constants';

const ServiceCards: React.FC = () => {
  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="services" className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {SERVICES.map((service, index) => (
        <div 
          key={index} 
          className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1.5 duration-500"
        >
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform group-hover:bg-blue-50 group-hover:border-blue-100">
            {service.icon}
          </div>
          <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">{service.title}</h3>
          <p className="text-slate-600 text-base leading-relaxed font-medium">{service.description}</p>
          <a 
            href="#book" 
            onClick={scrollToBook}
            className="mt-6 inline-flex items-center gap-2 text-blue-700 text-[11px] font-black uppercase tracking-widest hover:gap-3 transition-all"
          >
            SYSTEM DETAILS <span className="text-lg">&rarr;</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;