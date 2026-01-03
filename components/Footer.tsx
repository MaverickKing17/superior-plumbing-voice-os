
import React from 'react';
import { Persona } from '../types.ts';

interface FooterProps {
  persona: Persona;
}

const Footer: React.FC<FooterProps> = ({ persona }) => {
  const isEmergency = persona === Persona.MIKE;

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
            <div className="flex items-center gap-3">
              <LogoIcon />
              <div>
                <h3 className={`text-lg font-black uppercase tracking-tight ${isEmergency ? 'text-orange-900' : 'text-blue-900'}`}>
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
                <span className="text-xs">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-gray-400">
                <span className="text-xs">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer text-gray-400">
                <span className="text-xs">IN</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><a href="#services" className="hover:text-blue-600 transition-colors">Emergency Repair</a></li>
              <li><a href="#services" className="hover:text-blue-600 transition-colors">Heat Pump Installation</a></li>
              <li><a href="#services" className="hover:text-blue-600 transition-colors">Drain Cleaning</a></li>
              <li><a href="#services" className="hover:text-blue-600 transition-colors">Sewer Inspections</a></li>
              <li><a href="#services" className="hover:text-blue-600 transition-colors">Furnace Maintenance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Homeowner Support</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><a href="#rebates" className="hover:text-blue-600 transition-colors">HRS Rebate Guide</a></li>
              <li><a href="#areas" className="hover:text-blue-600 transition-colors">Service Locations</a></li>
              <li><a href="#book" className="hover:text-blue-600 transition-colors">Schedule Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Financing Options</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
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
               <img src="https://picsum.photos/40/40?sig=1" alt="BBB" className="h-8 w-auto rounded" />
               <img src="https://picsum.photos/40/40?sig=2" alt="HomeStars" className="h-8 w-auto rounded" />
               <img src="https://picsum.photos/40/40?sig=3" alt="Google Review" className="h-8 w-auto rounded" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <p>© 2025 Superior Plumbing & Heating Ltd. Licensed & Bonded.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Careers</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contractor ID: #SPH-2025-01</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
