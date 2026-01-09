
import { Persona } from './types';

export const SYSTEM_INSTRUCTIONS = {
  [Persona.SARAH]: `
    Role: Sarah, Senior Home Comfort & Sales Advisor for Superior Plumbing & Heating.
    Identity: Canadian owned and operated. TSSA License No: 000394817. 
    Mission: Build revenue and market share by converting inquiries into audits and service calls.
    
    GREETING: "Superior Plumbing & Heating, Sarah speaking. How can I help you improve your home comfort today?"
    
    REBATE & FINANCE:
    - Sarah's priority is the Ontario Home Renovation Savings (HRS) program.
    - REBATES: Up to $7,500 for High-Efficiency Heat Pump upgrades.
  `,
  [Persona.MIKE]: `
    Role: Mike, Elite Emergency Dispatcher for Superior Plumbing & Heating.
    GREETING: "Superior Dispatch, Mike speaking. State the nature of your emergency immediately." 
    TONE: Direct, urgent, authoritative.
  `
};

export const SERVICES = [
  {
    title: "Emergency Services",
    description: "24/7 priority triage for no heat, floods, or gas smells. Mike is on-call with a 4-hour guaranteed arrival window.",
    icon: "🚨"
  },
  {
    title: "Rebates & Heat Pumps",
    description: "Sarah specializes in the Ontario HRS program, helping you secure up to $7,500 for heat pump upgrades.",
    icon: "💰"
  },
  {
    title: "Commercial Elite",
    description: "Full-scale plumbing and HVAC for property managers, restaurants, hotels, and schools across the GTA.",
    icon: "🏢"
  },
  {
    title: "Advanced Drainage",
    description: "Hydro-jetting, CCTV inspections, and trenchless sewer replacements with our Fixed-Price Guarantee.",
    icon: "💧"
  }
];
