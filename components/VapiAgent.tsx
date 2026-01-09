
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

  /**
   * TODO: PASTE YOUR VAPI CREDENTIALS BELOW
   * These can be found in your Vapi Dashboard (vapi.ai)
   */
  const VAPI_PUBLIC_KEY = "YOUR_VAPI_PUBLIC_KEY_HERE";
  const VAPI_AGENT_ID = "YOUR_VAPI_AGENT_ID_HERE";

  useEffect(() => {
    // Vapi Event Listeners
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
  }, [isActive]);

  const startVapiCall = async () => {
    if (!window.vapi) {
      console.warn("Vapi SDK not yet initialized. Please ensure the script in index.html is loading correctly.");
      onToggle();
      return;
    }
    
    if (VAPI_PUBLIC_KEY === "YOUR_VAPI_PUBLIC_KEY_HERE") {
      alert("Please configure your Vapi Public Key and Agent ID in VapiAgent.tsx");
      onToggle();
      return;
    }

    setCallStatus('loading');
    try {
      await window.vapi.start(VAPI_AGENT_ID, VAPI_PUBLIC_KEY);
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

  const isEmergency = persona === Persona.MIKE;

  return (
    <div className={`p-8 rounded-[2rem] shadow-2xl transition-all duration-700 border-2 ${isEmergency ? 'bg-orange-600 border-orange-400' : 'bg-blue-900 border-blue-700'} text-white`}>
      <div className="text-center mb-8">
        <h3 className="text-sm font-black uppercase tracking-widest">{isEmergency ? 'Mike (Emergency)' : 'Sarah (Home Advisor)'}</h3>
        <p className="text-[10px] opacity-50 font-bold uppercase tracking-tighter">Superior Voice Network</p>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="h-16 flex items-center justify-center gap-1.5 mb-8">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full transition-all duration-300 ${callStatus === 'active' ? 'bg-white' : 'bg-white/10'}`} 
              style={{ 
                height: callStatus === 'active' ? `${Math.random() * 40 + 5}px` : '4px',
                transitionDelay: `${i * 50}ms`
              }}
            ></div>
          ))}
        </div>

        <button 
          onClick={onToggle} 
          className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-3xl ${isActive ? 'bg-white text-blue-900 scale-110' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {callStatus === 'loading' ? (
            <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>

        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-70 text-center">
          {callStatus === 'loading' ? 'Establishing Line...' : (isActive ? 'Channel Encrypted' : 'Tap to speak with Sarah')}
        </p>
      </div>
    </div>
  );
};

export default VapiAgent;
