import React, { useEffect, useState, useRef } from 'react';
import { Persona } from '../types';

interface VapiAgentProps {
  persona: Persona;
  isActive: boolean;
  onToggle: () => void;
}

const VapiAgent: React.FC<VapiAgentProps> = ({ persona, isActive, onToggle }) => {
  const [callStatus, setCallStatus] = useState<'inactive' | 'loading' | 'active'>('inactive');
  const vapiRef = useRef<any>(null);

  const VAPI_PUBLIC_KEY = "0b4a6b67-3152-40bb-b29e-8272cfd98b3a";
  
  const AGENT_IDS = {
    [Persona.SARAH]: "d8d63623-4803-4707-acd5-bfba01619825",
    [Persona.SAM]: "d8d63623-4803-4707-acd5-bfba01619825"
  };

  useEffect(() => {
    // Initialize Vapi SDK from global window object (provided by script tag in index.html)
    const initVapi = () => {
      const VapiConstructor = (window as any).Vapi;
      if (VapiConstructor && !vapiRef.current) {
        console.log("[VapiAgent] Initializing Vapi from global window");
        const vapi = new VapiConstructor(VAPI_PUBLIC_KEY);
        vapiRef.current = vapi;

        vapi.on('call-start', () => {
          console.log("[VapiAgent] Call started");
          setCallStatus('active');
        });

        vapi.on('call-end', () => {
          console.log("[VapiAgent] Call ended");
          setCallStatus('inactive');
          if (isActive) onToggle();
        });

        vapi.on('error', (e: any) => {
          console.error("[VapiAgent] SDK Error:", e);
          setCallStatus('inactive');
          if (isActive) onToggle();
        });
        return true;
      }
      return false;
    };

    // Retry initialization if script isn't quite ready
    const interval = setInterval(() => {
      if (initVapi()) clearInterval(interval);
    }, 200);

    return () => {
      clearInterval(interval);
      if (vapiRef.current) vapiRef.current.stop();
    };
  }, [isActive, onToggle]);

  useEffect(() => {
    const syncCall = async () => {
      const vapi = vapiRef.current;
      if (!vapi) return;

      if (isActive && callStatus === 'inactive') {
        const agentId = AGENT_IDS[persona];
        console.log(`[VapiAgent] Starting channel for ${persona}`);
        setCallStatus('loading');
        try {
          await vapi.start(agentId);
        } catch (err) {
          console.error("[VapiAgent] Failed to start:", err);
          setCallStatus('inactive');
          onToggle();
        }
      } else if (!isActive && (callStatus === 'active' || callStatus === 'loading')) {
        console.log("[VapiAgent] Closing channel");
        vapi.stop();
        setCallStatus('inactive');
      }
    };

    syncCall();
  }, [isActive, persona]);

  const isEmergency = persona === Persona.SAM;

  return (
    <div className={`p-10 rounded-[3rem] shadow-4xl transition-all duration-700 border-2 ${isEmergency ? 'bg-orange-600 border-orange-400' : 'bg-white border-blue-100'} group relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 transition-all duration-1000 ${isEmergency ? 'bg-white' : 'bg-blue-600'}`}></div>
      
      <div className="text-center mb-10 relative z-10">
        <h3 className={`text-base font-black uppercase tracking-[0.3em] ${isEmergency ? 'text-white' : 'text-slate-900'}`}>
          {isEmergency ? 'Sam: Emergency Dispatch' : 'Sarah: Rebate Specialist'}
        </h3>
        <p className={`text-[11px] font-black uppercase tracking-[0.1em] mt-2 opacity-50 ${isEmergency ? 'text-orange-100' : 'text-slate-400'}`}>
          Superior Voice OS v5.2
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
          disabled={callStatus === 'loading'}
          className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-5xl transform hover:scale-105 active:scale-95 ${isActive ? 'bg-red-500 text-white animate-pulse' : (isEmergency ? 'bg-white text-orange-600' : 'bg-blue-700 text-white')} ${callStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          {callStatus === 'loading' ? 'Establishing Line...' : (isActive ? 'Channel Encrypted' : `Talk to ${isEmergency ? 'Sam' : 'Sarah'}`)}
        </p>
      </div>
    </div>
  );
};

export default VapiAgent;