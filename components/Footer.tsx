
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
      console.warn(`Element with id ${targetId} not found.`);
      // Fallback to top if target missing
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
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100 overflow-hidden relative">
      {/* Background Decor */}
      <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-5 transition-colors duration-700 ${isEmergency ? 'bg-orange-600' : 'bg-blue-700'}`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={handleScroll('#top')}>
              <LogoIcon />
              <div>
                <h3 className={`text-lg font-black uppercase tracking-tight group-hover:opacity-80 transition-opacity ${isEmergency ? 'text-orange-900' : 'text-blue-900'}`}>
                  Superior <span className="text-gray-400">Plumbing</span>
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Professional Care Since 2010</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Providing elite HVAC and plumbing solutions across the GTA with a 100% satisfaction guarantee and 4-hour emergency response.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-gray-400">
                <span className="text-[10px] font-bold">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-gray-400">
                <span className="text-[10px] font-bold">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-gray-400">
                <span className="text-[10px] font-bold">IN</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-600 transition-colors block">Emergency Repair</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-600 transition-colors block">Heat Pump Installation</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-600 transition-colors block">Drain Cleaning</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-600 transition-colors block">Sewer Inspections</a></li>
              <li><a href="#services" onClick={handleScroll('#services')} className="hover:text-blue-600 transition-colors block">Furnace Maintenance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Homeowner Support</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><a href="#rebates" onClick={handleScroll('#rebates')} className="hover:text-blue-600 transition-colors block">HRS Rebate Guide</a></li>
              <li><a href="#areas" onClick={handleScroll('#areas')} className="hover:text-blue-600 transition-colors block">Service Locations</a></li>
              <li><a href="#book" onClick={handleScroll('#book')} className="hover:text-blue-600 transition-colors block">Schedule Service</a></li>
              <li><a href="#rebates" onClick={handleScroll('#rebates')} className="hover:text-blue-600 transition-colors block">Financing Options</a></li>
              <li><a href="#top" onClick={handleScroll('#top')} className="hover:text-blue-600 transition-colors block">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact & Badge */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Direct Dispatch</h4>
            <div className={`p-4 rounded-2xl border flex flex-col gap-2 transition-colors duration-500 ${isEmergency ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isEmergency ? 'text-orange-600' : 'text-blue-700'}`}>Emergency HotLine</span>
              <a href="tel:18669349139" className={`text-xl font-black ${isEmergency ? 'text-orange-900' : 'text-blue-900'}`}>(866) 934-9139</a>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Average response: 18 mins</p>
            </div>
            <div className="flex items-center gap-3 grayscale opacity-60">
               <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold">BBB</div>
               <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold">GReview</div>
               <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold">SafeWork</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <p>© 2025 Superior Plumbing & Heating Ltd. Licensed & Bonded.</p>
          <div className="flex gap-6">
            <a href="#top" onClick={handleScroll('#top')} className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#book" onClick={handleScroll('#book')} className="hover:text-blue-600 transition-colors">Careers</a>
            <span className="text-gray-300 select-none">Contractor ID: #SPH-2025-01</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
