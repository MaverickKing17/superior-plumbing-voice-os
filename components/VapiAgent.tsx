import React, { useEffect, useState } from 'react';
import { Persona } from '../types';

interface VapiAgentProps {
  persona: Persona;
  isActive: boolean;
  onToggle: () => void;
}

declare global {
  interface Window {
    vapi: any;
  }
}

const VapiAgent: React.FC<VapiAgentProps> = ({ persona, isActive, onToggle }) => {
  const [callStatus, setCallStatus] = useState<'inactive' | 'loading' | 'active'>('inactive');

  const VAPI_PUBLIC_KEY = "0b4a6b67-3152-40bb-b29e-8272cfd98b3a";
  
  const AGENT_IDS = {
    [Persona.SARAH]: "d8d63623-4803-4707-acd5-bfba01619825",
    [Persona.SAM]: "d8d63623-4803-4707-acd5-bfba01619825"
  };

  useEffect(() => {
    const handleCallStart = () => setCallStatus('active');
    const handleCallEnd = () => {
      setCallStatus('inactive');
      if (isActive) onToggle();
    };

    if (window.vapi) {
      window.vapi.on('call-start', handleCallStart);
      window.vapi.on('call-end', handleCallEnd);
    }

    return () => {
      if (window.vapi) {
        window.vapi.off('call-start', handleCallStart);
        window.vapi.off('call-end', handleCallEnd);
      }
    };
  }, [isActive, onToggle]);

  useEffect(() => {
    if (isActive && callStatus === 'inactive') {
      startVapiCall();
    } else if (!isActive && callStatus === 'active') {
      stopVapiCall();
    }
  }, [isActive, persona]);

  const startVapiCall = async () => {
    if (!window.vapi) {
      console.warn("Vapi SDK not yet initialized.");
      onToggle();
      return;
    }
    
    const currentAgentId = AGENT_IDS[persona];

    if (!currentAgentId) {
      console.error(`Agent ID for ${persona} not configured.`);
      onToggle();
      return;
    }

    setCallStatus('loading');
    try {
      await window.vapi.start(currentAgentId, VAPI_PUBLIC_KEY);
    } catch (e) {
      console.error("Vapi Start Error:", e);
      setCallStatus('inactive');
      onToggle();
    }
  };

  const stopVapiCall = () => {
    if (window.vapi) {
      window.vapi.stop();
    }
  };

  const isEmergency = persona === Persona.SAM;

  return (
    <div className={`p-10 rounded-[3rem] shadow-4xl transition-all duration-700 border-2 ${isEmergency ? 'bg-orange-600 border-orange-400' : 'bg-white border-blue-100'} group relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 transition-all duration-1000 ${isEmergency ? 'bg-white' : 'bg-blue-600'}`}></div>
      
      <div className="text-center mb-10 relative z-10">
        <h3 className={`text-base font-black uppercase tracking-[0.3em] ${isEmergency ? 'text-white' : 'text-slate-900'}`}>
          {isEmergency ? 'Sam: Elite Dispatch' : 'Sarah: Client Success'}
        </h3>
        <p className={`text-[11px] font-black uppercase tracking-[0.1em] mt-2 opacity-50 ${isEmergency ? 'text-orange-100' : 'text-slate-400'}`}>
          Encrypted AI Interface v4.2
        </p>
      </div>

      <div className="flex flex-col items-center py-6 relative z-10">
        <div className="h-20 flex items-center justify-center gap-2 mb-12">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 rounded-full transition-all duration-300 ${callStatus === 'active' ? (isEmergency ? 'bg-white' : 'bg-blue-600') : (isEmergency ? 'bg-white/20' : 'bg-slate-100')}`} 
              style={{ 
                height: callStatus === 'active' ? `${Math.random() * 60 + 10}px` : '6px',
                transitionDelay: `${i * 40}ms`
              }}
            ></div>
          ))}
        </div>

        <button 
          onClick={onToggle} 
          className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-5xl transform hover:scale-105 active:scale-95 ${isActive ? 'bg-red-500 text-white animate-pulse' : (isEmergency ? 'bg-white text-orange-600' : 'bg-blue-700 text-white')}`}
        >
          {callStatus === 'loading' ? (
            <div className="w-12 h-12 border-[5px] border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>

        <p className={`mt-10 text-[12px] font-black uppercase tracking-[0.3em] ${isEmergency ? 'text-orange-50' : 'text-slate-900'}`}>
          {callStatus === 'loading' ? 'Establishing Line...' : (isActive ? 'Channel Encrypted' : `Connect to ${isEmergency ? 'Sam' : 'Sarah'}`)}
        </p>
      </div>
    </div>
  );
};

export default VapiAgent;