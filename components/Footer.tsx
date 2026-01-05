
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white pt-24 pb-0 border-t border-slate-100 font-['Inter'] relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none transition-colors duration-1000 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`} 
           style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="space-y-12">
            <div className="flex items-center gap-5 cursor-pointer group" onClick={handleScroll('#top')}>
              <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl transition-all duration-500 group-hover:scale-110 ${isEmergency ? 'bg-orange-600 shadow-orange-100' : 'bg-blue-700 shadow-blue-100'}`}>
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                  <path d="M12 21c-4.418 0-8-3.582-8-8s8-11 8-11 8 6.582 8 11-3.582 8-8 8zm0-2c3.314 0 6-2.686 6-6 0-2.31-1.92-5.462-6-8.794-4.08 3.332-6 6.484-6 8.794 0 3.314 2.686 6 6 6z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-2xl font-black uppercase tracking-tight leading-none ${isEmergency ? 'text-slate-950' : 'text-blue-950'}`}>
                  Superior <span className="text-slate-400 font-bold">Plumbing</span>
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 leading-none">Enterprise Solutions</p>
              </div>
            </div>
            
            <p className="text-slate-500 text-[17px] leading-relaxed max-w-[320px] font-medium">
              Providing elite HVAC and plumbing solutions across the GTA with a <span className="text-slate-900 font-extrabold underline decoration-blue-500/20 underline-offset-4">100% satisfaction guarantee</span>.
            </p>

            <div className="space-y-8">
              <div className="inline-flex flex-col gap-1">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Compliance Verify</span>
                <span className="text-[14px] font-bold text-slate-900">TSSA License: 000394817</span>
              </div>
              
              <div className="flex gap-4">
                {['FB', 'IG', 'IN'].map((social) => (
                  <div key={social} className="w-12 h-12 rounded-[1rem] bg-[#F8FAFC] flex items-center justify-center text-[13px] font-black text-[#94A3B8] hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-1 active:scale-95">
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pt-6">
            <h4 className="text-[13px] font-black text-slate-950 uppercase tracking-[0.3em] mb-12 relative">
              Our Services
              <span className={`absolute -bottom-3 left-0 w-10 h-1 rounded-full ${isEmergency ? 'bg-orange-500' : 'bg-blue-700'}`}></span>
            </h4>
            <ul className="space-y-6 text-[16px] font-semibold text-slate-500">
              {['Emergency Repair', 'Heat Pump Specialist', 'Drain Cleaning', 'Sewer Inspections', 'Furnace Maintenance'].map((item) => (
                <li key={item} className="transition-transform hover:translate-x-3 duration-300">
                  <a href="#services" onClick={handleScroll('#services')} className="hover:text-slate-950 transition-colors flex items-center gap-4 group text-sm">
                    <span className={`w-2 h-2 rounded-full transition-all group-hover:scale-150 ${isEmergency ? 'bg-orange-300' : 'bg-blue-300'}`}></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-6">
            <h4 className="text-[13px] font-black text-slate-950 uppercase tracking-[0.3em] mb-12 relative">
              Resources
              <span className={`absolute -bottom-3 left-0 w-10 h-1 rounded-full ${isEmergency ? 'bg-orange-500' : 'bg-blue-700'}`}></span>
            </h4>
            <ul className="space-y-6 text-[16px] font-semibold text-slate-500">
              {[
                { label: 'HRS Rebate Guide', id: '#rebates' },
                { label: 'Service Coverage', id: '#areas' },
                { label: 'Instant Dispatch', id: '#book' },
                { label: 'Financing Options', id: '#rebates' },
                { label: 'Privacy Protocol', id: '#top' }
              ].map((item) => (
                <li key={item.label} className="transition-transform hover:translate-x-3 duration-300">
                  <a href={item.id} onClick={handleScroll(item.id)} className="hover:text-slate-950 transition-colors flex items-center gap-4 group text-sm">
                    <span className={`w-2 h-2 rounded-full transition-all group-hover:scale-150 ${isEmergency ? 'bg-orange-300' : 'bg-blue-300'}`}></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-12">
            <h4 className="text-[13px] font-black text-slate-950 uppercase tracking-[0.3em] lg:pt-6 relative">
              Direct Support
              <span className={`absolute -bottom-3 left-0 w-10 h-1 rounded-full ${isEmergency ? 'bg-orange-500' : 'bg-blue-700'}`}></span>
            </h4>
            
            <div className={`p-10 rounded-[2.5rem] border-2 transition-all duration-700 group relative overflow-hidden shadow-3xl ${
              isEmergency 
                ? 'bg-slate-950 border-orange-500 shadow-orange-900/10' 
                : 'bg-slate-950 border-blue-600 shadow-blue-900/10'
            }`}>
              <div className={`absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-20 -mr-16 -mt-16 transition-colors duration-1000 ${isEmergency ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-3 h-3 rounded-full animate-pulse ${isEmergency ? 'bg-orange-400 shadow-[0_0_10px_#fb923c]' : 'bg-blue-400 shadow-[0_0_10px_#60a5fa]'}`}></span>
                  <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isEmergency ? 'text-orange-300' : 'text-blue-300'}`}>
                    PRIORITY HOTLINE
                  </span>
                </div>
                
                <a href="tel:18669322818" className="text-[32px] font-black block text-white tracking-tighter hover:scale-[1.02] transition-transform duration-300 origin-left">
                  (866) 932-2818
                </a>
                
                <div className="mt-8 flex items-center justify-between">
                  <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                    <p className="text-[12px] text-white font-black uppercase tracking-widest whitespace-nowrap">
                      RESPONSE: <span className={isEmergency ? 'text-orange-400' : 'text-blue-400'}>18 MINS</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10 px-2">
              <div className="flex gap-5">
                <div className={`w-1.5 h-14 rounded-full flex-shrink-0 ${isEmergency ? 'bg-orange-500/20' : 'bg-blue-600/20'}`}></div>
                <p className="text-[15px] text-slate-800 font-bold uppercase tracking-widest leading-relaxed">
                  4020A Sladeview Crescent Unit 6,<br/>
                  <span className="text-slate-400 font-semibold text-[13px]">Mississauga, ON L5L 6B1</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RE-ORGANIZED BOTTOM BAR */}
      <div className="bg-slate-950 text-white border-t border-slate-900">
        <div className={`h-1.5 w-full ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}></div>
        
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
            {/* Copyright block */}
            <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full ${isEmergency ? 'bg-orange-500 animate-pulse' : 'bg-blue-500'}`}></div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="text-[13px] font-black uppercase tracking-[0.05em] text-white whitespace-nowrap">
                  © 2025 SUPERIOR PLUMBING & HEATING LTD.
                </p>
                <div className="w-px h-4 bg-slate-800 hidden sm:block"></div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  enterprise asset
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
              <a href="#legal" onClick={handleScroll('#top')} className="text-slate-400 hover:text-white transition-all">LEGAL</a>
              <a href="#careers" onClick={handleScroll('#book')} className="text-slate-400 hover:text-white transition-all">CAREERS</a>
              <a href="#sitemap" onClick={handleScroll('#top')} className="text-slate-400 hover:text-white transition-all">SITEMAP</a>
            </div>

            {/* Tech Status section */}
            <div className="flex items-center gap-6">
              <div className="w-px h-8 bg-slate-800 hidden lg:block"></div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">SYSTEM STATUS</span>
                <div className={`px-4 py-1.5 rounded-lg border font-mono text-[11px] font-black tracking-tight whitespace-nowrap ${
                  isEmergency 
                    ? 'border-orange-900/40 bg-orange-950/30 text-orange-400' 
                    : 'border-blue-900/40 bg-blue-950/30 text-blue-400'
                }`}>
                  #SPH-7492-LIVE
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
