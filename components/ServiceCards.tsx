import React from 'react';
import { SERVICES } from '../constants';

const ServiceCards: React.FC = () => {
  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('ai-agent-interface');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="services" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {SERVICES.map((service, index) => (
        <div 
          key={index} 
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-1.5 duration-500"
        >
          <div className="w-14 h-14 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform group-hover:bg-blue-50 group-hover:border-blue-100">
            {service.icon}
          </div>
          <h3 className="text-xl font-black text-slate-950 mb-2 tracking-tight">{service.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">{service.description}</p>
          <a 
            href="#ai-agent-interface" 
            onClick={scrollToBook}
            className="mt-5 inline-flex items-center gap-2 text-blue-700 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all"
          >
            SYSTEM DETAILS <span className="text-base">&rarr;</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;