
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
      {/* Subtle brand-colored background accent */}
      <div className={`absolute top-0 right-0 w-1/4 h-full opacity-[0.03] pointer-events-none transition-colors duration-1000 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`} 
           style={{ clipPath: 'polygon(100% 0, 15% 100%, 100% 100%)' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Column 1: Enterprise Brand Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={handleScroll('#top')}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:rotate-6 ${isEmergency ? 'bg-orange-600 shadow-orange-200' : 'bg-blue-700 shadow-blue-200'}`}>
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                  <path d="M12 21c-4.418 0-8-3.582-8-8s8-11 8-11 8 6.582 8 11-3.582 8-8 8zm0-2c3.314 0 6-2.686 6-6 0-2.31-1.92-5.462-6-8.794-4.08 3.332-6 6.484-6 8.794 0 3.314 2.686 6 6 6z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-2xl font-black uppercase tracking-tighter leading-none ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                  Superior <span className="text-gray-400 font-semibold">Plumbing</span>
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mt-1.5">Professional Care Since 2010</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[300px] font-medium">
              Providing elite HVAC and plumbing solutions across the GTA with a 100% satisfaction guarantee and 4-hour emergency response.
            </p>

            <div className="space-y-5">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.15em] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">TSSA License No: 000394817</span>
              <div className="flex gap-4">
                {['FB', 'IG', 'IN'].map((social) => (
                  <div key={social} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[11px] font-black text-gray-400 hover:bg-blue-700 hover:text-white transition-all cursor-pointer border border-gray-100 hover:shadow-lg hover:-translate-y-1">
                    {social}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] mb-10 border-l-4 border-blue-700 pl-4">Our Services</h4>
            <ul className="space-y-6 text-[15px] font-bold text-gray-500">
              {['Emergency Repair', 'Heat Pump Installation', 'Drain Cleaning', 'Sewer Inspections', 'Furnace Maintenance'].map((item) => (
                <li key={item} className="transition-transform hover:translate-x-1 duration-200">
                  <a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-700 transition-colors flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Homeowner Support */}
          <div>
            <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] mb-10 border-l-4 border-blue-700 pl-4">Homeowner Support</h4>
            <ul className="space-y-6 text-[15px] font-bold text-gray-500">
              {['HRS Rebate Guide', 'Service Locations', 'Schedule Service', 'Financing Options', 'Privacy Policy'].map((item) => (
                <li key={item} className="transition-transform hover:translate-x-1 duration-200">
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} onClick={handleScroll('#top')} className="hover:text-blue-700 transition-colors flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Dispatch Specialist Section */}
          <div className="space-y-8">
            <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] mb-10 border-l-4 border-blue-700 pl-4">Direct Dispatch</h4>
            
            <div className={`p-8 rounded-[2.5rem] border transition-all duration-1000 group relative overflow-hidden shadow-2xl ${isEmergency ? 'bg-orange-50/80 border-orange-200 shadow-orange-100/50' : 'bg-blue-50/80 border-blue-100 shadow-blue-100/50'}`}>
              <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 -mr-8 -mt-8 transition-colors duration-1000 ${isEmergency ? 'bg-orange-600' : 'bg-blue-600'}`}></div>
              
              <span className={`text-[11px] font-black uppercase tracking-[0.3em] block mb-3 ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>Emergency Hotline</span>
              <a href="tel:18669322818" className={`text-3xl font-black block group-hover:scale-[1.03] transition-transform duration-500 tracking-tighter ${isEmergency ? 'text-orange-950' : 'text-blue-900'}`}>
                (866) 932-2818
              </a>
              <div className="flex items-center gap-2 mt-5">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isEmergency ? 'bg-orange-500' : 'bg-blue-600'}`}></div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Average Response: 18 Mins</p>
              </div>
            </div>

            <div className="space-y-7 pl-1">
              <p className="text-[12px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed border-l-2 border-gray-100 pl-4">
                4020A Sladeview Crescent Unit 6,<br/>
                Mississauga, ON L5L 6B1, Canada
              </p>
              
              <div className="flex items-center gap-4">
                {['BBB', 'GReview', 'SafeWork'].map((badge) => (
                  <div key={badge} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-tighter shadow-sm hover:border-gray-300 hover:text-gray-600 transition-all cursor-default">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom high-contrast utility bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">
          <p>© 2025 Superior Plumbing & Heating Ltd. Licensed & Bonded Enterprise.</p>
          <div className="flex items-center gap-10">
            <a href="#top" onClick={handleScroll('#top')} className="hover:text-blue-700 transition-colors">Legal Terms</a>
            <a href="#book" onClick={handleScroll('#book')} className="hover:text-blue-700 transition-colors">Join Our Team</a>
            <span className="text-gray-200 hidden md:inline select-none">|</span>
            <span className="text-gray-300 select-none">ID: #SPH-2025-01-V3</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
