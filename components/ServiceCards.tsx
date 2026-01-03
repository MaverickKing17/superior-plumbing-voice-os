
import React from 'react';
import { SERVICES } from '../constants';

const ServiceCards: React.FC = () => {
  const scrollToBook = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {SERVICES.map((service, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
          <a 
            href="#book" 
            onClick={scrollToBook}
            className="mt-4 inline-block text-blue-600 text-sm font-bold hover:underline transition-all"
          >
            Explore more &rarr;
          </a>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
