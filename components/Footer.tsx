
import React from 'react';
import { Persona } from '../types.ts';

interface FooterProps {
  persona: Persona;
}

const Footer: React.FC<FooterProps> = ({ persona }) => {
  const isEmergency = persona === Persona.MIKE;

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === '#top' || id === '#') {
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
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100 font-['Inter'] relative overflow-hidden">
      {/* Subtle background flair */}
      <div className={`absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none transition-colors duration-700 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`} 
           style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={handleScroll('#top')}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-105 ${isEmergency ? 'bg-orange-600 shadow-orange-100' : 'bg-blue-700 shadow-blue-100'}`}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12 21c-4.418 0-8-3.582-8-8s8-11 8-11 8 6.582 8 11-3.582 8-8 8zm0-2c3.314 0 6-2.686 6-6 0-2.31-1.92-5.462-6-8.794-4.08 3.332-6 6.484-6 8.794 0 3.314 2.686 6 6 6z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-xl font-bold uppercase tracking-tight leading-none ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                  Superior <span className="text-gray-400 font-medium">Plumbing</span>
                </h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Professional Care Since 2010</p>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
              Providing elite HVAC and plumbing solutions across the GTA with a 100% satisfaction guarantee and 4-hour emergency response.
            </p>

            <div className="space-y-4">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">TSSA License No: 000394817</span>
              <div className="flex gap-3">
                {['FB', 'IG', 'IN'].map((social) => (
                  <div key={social} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-blue-700 hover:text-white transition-all cursor-pointer border border-transparent hover:shadow-md">
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.15em] mb-8">Our Services</h4>
            <ul className="space-y-5 text-sm font-medium text-gray-500">
              {['Emergency Repair', 'Heat Pump Installation', 'Drain Cleaning', 'Sewer Inspections', 'Furnace Maintenance'].map((item) => (
                <li key={item}>
                  <a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Homeowner Support */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.15em] mb-8">Homeowner Support</h4>
            <ul className="space-y-5 text-sm font-medium text-gray-500">
              {['HRS Rebate Guide', 'Service Locations', 'Schedule Service', 'Financing Options', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} onClick={handleScroll('#top')} className="hover:text-blue-700 transition-colors block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Dispatch */}
          <div className="space-y-8">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.15em] mb-8">Direct Dispatch</h4>
            
            <div className={`p-8 rounded-3xl border transition-all duration-700 group relative ${isEmergency ? 'bg-orange-50/60 border-orange-100 shadow-orange-100/50 shadow-xl' : 'bg-blue-50/60 border-blue-100 shadow-blue-100/50 shadow-xl'}`}>
              <span className={`text-[10px] font-black uppercase tracking-[0.25em] block mb-2 ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>Emergency Hotline</span>
              <a href="tel:18669322818" className={`text-3xl font-black block group-hover:scale-[1.02] transition-transform duration-300 ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                (866) 932-2818
              </a>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">Average Response: 18 Mins</p>
            </div>

            <div className="space-y-6">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide leading-relaxed">
                4020A Sladeview Crescent Unit 6,<br/>
                Mississauga, ON L5L 6B1, Canada
              </p>
              
              <div className="flex items-center gap-3">
                {['BBB', 'GReview', 'SafeWork'].map((badge) => (
                  <div key={badge} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[9px] font-black text-gray-300 uppercase tracking-tighter shadow-sm hover:border-gray-200 transition-colors cursor-default">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom utility */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
          <p>© 2025 Superior Plumbing & Heating Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#top" onClick={handleScroll('#top')} className="hover:text-blue-700 transition-colors">Legal</a>
            <a href="#book" onClick={handleScroll('#book')} className="hover:text-blue-700 transition-colors">Careers</a>
            <span className="text-gray-200 hidden md:inline">|</span>
            <span className="text-gray-300">Contractor ID: #SPH-2025-01</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
