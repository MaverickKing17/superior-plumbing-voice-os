
import React from 'react';
import { Persona } from '../types.ts';

interface FooterProps {
  persona: Persona;
}

const Footer: React.FC<FooterProps> = ({ persona }) => {
  const isEmergency = persona === Persona.MIKE;

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // Special case for top
    if (id === '#top' || id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    const targetId = id.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Update URL without jump
      window.history.pushState(null, '', id);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const LogoIcon = () => (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl transition-all duration-500 shadow-lg ${isEmergency ? 'bg-orange-600 shadow-orange-200' : 'bg-blue-700 shadow-blue-200'}`}>
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 21c-4.418 0-8-3.582-8-8s8-11 8-11 8 6.582 8 11-3.582 8-8 8zm0-2c3.314 0 6-2.686 6-6 0-2.31-1.92-5.462-6-8.794-4.08 3.332-6 6.484-6 8.794 0 3.314 2.686 6 6 6z" />
      </svg>
    </div>
  );

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100 overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-[0.03] transition-colors duration-700 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Identity Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={handleScroll('#top')}>
              <LogoIcon />
              <div>
                <h3 className={`text-xl font-black uppercase tracking-tighter group-hover:opacity-80 transition-opacity ${isEmergency ? 'text-orange-900' : 'text-blue-900'}`}>
                  Superior <span className="text-gray-400">Plumbing</span>
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none">Professional Care Since 2010</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Providing elite HVAC and plumbing solutions across the GTA with a 100% satisfaction guarantee and 4-hour emergency response.
              </p>
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 shadow-sm">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">TSSA License: 000394817</span>
              </div>
            </div>

            <div className="flex gap-3">
              {['FB', 'IG', 'IN'].map((social) => (
                <div key={social} className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:border-gray-200 hover:-translate-y-1 transition-all cursor-pointer shadow-sm">
                  <span className="text-[10px] font-black text-gray-400">{social}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.15em] mb-8 pb-2 border-b border-gray-50">Our Services</h4>
            <ul className="space-y-5 text-sm font-semibold text-gray-500">
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors inline-flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-blue-700 mr-0 group-hover:mr-2 transition-all"></span>Emergency Repair</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors inline-flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-blue-700 mr-0 group-hover:mr-2 transition-all"></span>Heat Pump Installation</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors inline-flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-blue-700 mr-0 group-hover:mr-2 transition-all"></span>Drain Cleaning</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors inline-flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-blue-700 mr-0 group-hover:mr-2 transition-all"></span>Sewer Inspections</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors inline-flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-blue-700 mr-0 group-hover:mr-2 transition-all"></span>Furnace Maintenance</a></li>
            </ul>
          </div>

          {/* Quick Nav: Support */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.15em] mb-8 pb-2 border-b border-gray-50">Homeowner Help</h4>
            <ul className="space-y-5 text-sm font-semibold text-gray-500">
              <li><a href="#rebates" onClick={handleScroll('#rebates')} className="hover:text-blue-700 transition-colors">HRS Rebate Guide</a></li>
              <li><a href="#areas" onClick={handleScroll('#areas')} className="hover:text-blue-700 transition-colors">Service Locations</a></li>
              <li><a href="#book" onClick={handleScroll('#book')} className="hover:text-blue-700 transition-colors">Schedule Service</a></li>
              <li><a href="#rebates" onClick={handleScroll('#rebates')} className="hover:text-blue-700 transition-colors">Financing Options</a></li>
              <li><a href="#top" onClick={handleScroll('#top')} className="hover:text-blue-700 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Direct Dispatch Action Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className={`p-8 rounded-[2rem] border transition-all duration-500 relative overflow-hidden group ${isEmergency ? 'bg-orange-50/50 border-orange-100' : 'bg-blue-50/50 border-blue-100'}`}>
              <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 -mr-12 -mt-12 transition-colors duration-500 ${isEmergency ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
              
              <div className="relative z-10">
                <span className={`text-[10px] font-black uppercase tracking-[0.25em] block mb-2 ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>Emergency Hotline</span>
                <a href="tel:18669322818" className={`text-3xl font-black block transition-transform group-hover:scale-105 duration-300 ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                  (866) 932-2818
                </a>
                <div className="flex items-center gap-2 mt-4">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isEmergency ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Average Response: 18 Mins</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide leading-relaxed pl-1">
                4020A Sladeview Crescent Unit 6,<br/>
                Mississauga, ON L5L 6B1, Canada
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                {['BBB', 'GReview', 'SafeWork'].map((badge) => (
                  <div key={badge} className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-tighter hover:bg-white transition-colors cursor-default">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <p>© 2025 Superior Plumbing & Heating Ltd. Licensed & Bonded.</p>
          <div className="flex items-center gap-8">
            <a href="#top" onClick={handleScroll('#top')} className="hover:text-blue-700 transition-colors">Terms</a>
            <a href="#book" onClick={handleScroll('#book')} className="hover:text-blue-700 transition-colors">Careers</a>
            <span className="text-gray-200 select-none hidden md:inline">|</span>
            <span className="text-gray-300 select-none">Contractor ID: #SPH-2025-01</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
