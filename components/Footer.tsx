
import React from 'react';
import { Persona } from '../types.ts';

interface FooterProps {
  persona: Persona;
}

const Footer: React.FC<FooterProps> = ({ persona }) => {
  const isEmergency = persona === Persona.MIKE;

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id || id === '#top' || id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    const targetId = id.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', id);
    } else {
      // Fallback for live demo safety
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white pt-24 pb-0 border-t border-gray-100 font-['Inter'] relative overflow-hidden">
      {/* Dynamic background accent */}
      <div className={`absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none transition-colors duration-1000 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`} 
           style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-24">
          
          {/* Column 1: Enterprise Brand Identity */}
          <div className="space-y-10">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={handleScroll('#top')}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 group-hover:scale-110 ${isEmergency ? 'bg-orange-600 shadow-orange-200' : 'bg-blue-700 shadow-blue-200'}`}>
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M12 21c-4.418 0-8-3.582-8-8s8-11 8-11 8 6.582 8 11-3.582 8-8 8zm0-2c3.314 0 6-2.686 6-6 0-2.31-1.92-5.462-6-8.794-4.08 3.332-6 6.484-6 8.794 0 3.314 2.686 6 6 6z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-2xl font-black uppercase tracking-tight leading-none ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                  Superior <span className="text-gray-400 font-bold">Plumbing</span>
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Professional Care Since 2010</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-[16px] leading-relaxed max-w-[320px] font-medium">
              Providing elite HVAC and plumbing solutions across the GTA with a <span className="text-gray-900 font-extrabold underline decoration-blue-500/30 underline-offset-4">100% satisfaction guarantee</span> and 4-hour priority response.
            </p>

            <div className="space-y-6">
              <div className="inline-flex flex-col gap-1">
                <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Regulatory Compliance</span>
                <span className="text-[13px] font-bold text-gray-900">TSSA License No: 000394817</span>
              </div>
              <div className="flex gap-4">
                {['FB', 'IG', 'IN'].map((social) => (
                  <div key={social} className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-[12px] font-black text-gray-400 hover:bg-blue-700 hover:text-white transition-all cursor-pointer border border-gray-100 hover:shadow-lg hover:-translate-y-1">
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="lg:pt-4">
            <h4 className="text-[15px] font-black text-gray-950 uppercase tracking-[0.25em] mb-10 relative">
              Our Services
              <span className={`absolute -bottom-2 left-0 w-8 h-1 rounded-full ${isEmergency ? 'bg-orange-500' : 'bg-blue-700'}`}></span>
            </h4>
            <ul className="space-y-6 text-[15px] font-bold text-gray-500">
              {['Emergency Repair', 'Heat Pump Installation', 'Drain Cleaning', 'Sewer Inspections', 'Furnace Maintenance'].map((item) => (
                <li key={item} className="transition-transform hover:translate-x-2 duration-300">
                  <a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors flex items-center gap-4">
                    <span className={`w-1.5 h-1.5 rounded-full ${isEmergency ? 'bg-orange-300' : 'bg-blue-200'}`}></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Homeowner Support */}
          <div className="lg:pt-4">
            <h4 className="text-[15px] font-black text-gray-950 uppercase tracking-[0.25em] mb-10 relative">
              Homeowner Support
              <span className={`absolute -bottom-2 left-0 w-8 h-1 rounded-full ${isEmergency ? 'bg-orange-500' : 'bg-blue-700'}`}></span>
            </h4>
            <ul className="space-y-6 text-[15px] font-bold text-gray-500">
              {/* Corrected mapping to actual page IDs */}
              {[
                { label: 'HRS Rebate Guide', id: '#rebates' },
                { label: 'Service Locations', id: '#areas' },
                { label: 'Schedule Service', id: '#book' },
                { label: 'Financing Options', id: '#rebates' },
                { label: 'Privacy Policy', id: '#top' }
              ].map((item) => (
                <li key={item.label} className="transition-transform hover:translate-x-2 duration-300">
                  <a href={item.id} onClick={handleScroll(item.id)} className="hover:text-blue-700 transition-colors flex items-center gap-4">
                    <span className={`w-1.5 h-1.5 rounded-full ${isEmergency ? 'bg-orange-300' : 'bg-blue-200'}`}></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Dispatch Specialist Section */}
          <div className="space-y-10">
            <h4 className="text-[15px] font-black text-gray-950 uppercase tracking-[0.25em] lg:pt-4 relative">
              Direct Dispatch
              <span className={`absolute -bottom-2 left-0 w-8 h-1 rounded-full ${isEmergency ? 'bg-orange-500' : 'bg-blue-700'}`}></span>
            </h4>
            
            {/* High-Impact Emergency Card */}
            <div className={`p-8 rounded-[2rem] border-2 transition-all duration-700 group relative overflow-hidden shadow-2xl ${
              isEmergency 
                ? 'bg-orange-950 border-orange-500 shadow-orange-200/50' 
                : 'bg-blue-950 border-blue-600 shadow-blue-200/50'
            }`}>
              <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 -mr-12 -mt-12 transition-colors duration-1000 ${isEmergency ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isEmergency ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
                  <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${isEmergency ? 'text-orange-300' : 'text-blue-300'}`}>
                    Emergency Hotline
                  </span>
                </div>
                
                <a href="tel:18669322818" className="text-[34px] font-black block text-white tracking-tighter hover:scale-[1.02] transition-transform duration-300">
                  (866) 932-2818
                </a>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                    <p className="text-[11px] text-white font-black uppercase tracking-widest whitespace-nowrap">
                      Average Response: <span className={isEmergency ? 'text-orange-400' : 'text-blue-400'}>18 Mins</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Trust Indicators */}
            <div className="space-y-8 px-1">
              <div className="flex gap-4">
                <div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${isEmergency ? 'bg-orange-500/20' : 'bg-blue-600/20'}`}></div>
                <p className="text-[14px] text-gray-800 font-bold uppercase tracking-widest leading-relaxed">
                  4020A Sladeview Crescent Unit 6,<br/>
                  <span className="text-gray-400 font-semibold">Mississauga, ON L5L 6B1, Canada</span>
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {['BBB', 'GReview', 'SafeWork'].map((badge) => (
                  <div key={badge} className="px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-tighter shadow-sm hover:border-gray-400 hover:text-gray-900 hover:shadow-md transition-all cursor-default">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STRIKING ENTERPRISE UTILITY BAR */}
      <div className="bg-gray-950 text-white relative">
        <div className={`h-1 w-full ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)] ${isEmergency ? 'bg-orange-500 animate-pulse' : 'bg-blue-500'}`}></div>
              <p className="text-[14px] font-black uppercase tracking-[0.15em] text-white">
                © 2025 Superior Plumbing & Heating Ltd.
                <span className="mx-4 text-gray-600 font-normal">|</span>
                <span className="text-gray-400 font-bold tracking-normal lowercase">All Rights Reserved.</span>
              </p>
            </div>

            <div className="flex items-center gap-12 text-[13px] font-black uppercase tracking-[0.2em]">
              <a href="#legal" onClick={handleScroll('#top')} className="text-gray-400 hover:text-white transition-all hover:scale-105 border-b-2 border-transparent hover:border-blue-500 pb-1">Legal</a>
              <a href="#careers" onClick={handleScroll('#book')} className="text-gray-400 hover:text-white transition-all hover:scale-105 border-b-2 border-transparent hover:border-blue-500 pb-1">Careers</a>
              <a href="#sitemap" onClick={handleScroll('#top')} className="text-gray-400 hover:text-white transition-all hover:scale-105 border-b-2 border-transparent hover:border-blue-500 pb-1">Sitemap</a>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-px h-8 bg-gray-800 hidden lg:block"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Enterprise Asset ID</span>
                <div className={`px-4 py-1.5 rounded-lg border font-mono text-[14px] font-black tracking-tighter ${isEmergency ? 'border-orange-900 bg-orange-950/50 text-orange-400' : 'border-blue-900 bg-blue-950/50 text-blue-400'}`}>
                  #SPH-2025-ENT-01-V3
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-900 text-center">
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.6em] transition-all hover:text-gray-300 cursor-default">
              Elite Quality • Enterprise Grade Reliability • Professional Dispatch
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
