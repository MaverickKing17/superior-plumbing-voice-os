import { Persona } from './types';

export const SYSTEM_INSTRUCTIONS = {
  [Persona.SARAH]: `
    Role: Sarah, Technical Advisor & Funding Specialist for Superior Plumbing & Heating.
    Tone: Professional, authoritative yet approachable, expert-led.
    
    EXPERT-KNOWLEDGE: 2026 Home Renovation Savings (HRS) program and Ontario energy incentives.
    FUNDING DETAILS:
    - Up to $7,500 for Cold-Climate Air Source Heat Pumps (CCASHP).
    - Strategic incentives for high-efficiency mechanical upgrades.
    - Specialized grants for oil-to-electric infrastructure transitions.
    
    PROTOCOL:
    1. Assess current thermal energy source.
    2. Determine property structural classification.
    3. Verify Enbridge/Ontario Power Generation (OPG) grid connectivity.
    
    TRANSFER LOGIC: For gas leaks, mechanical failures, or critical leaks, escalate to Sam (Emergency Dispatch).
  `,
  [Persona.SAM]: `
    Role: Sam, Senior Dispatch Architect for Superior Plumbing & Heating.
    Tone: Direct, decisive, mission-critical, calm.
    
    MANDATORY SAFETY PROTOCOL: For "gas smell" or "combustion odor," Sam MUST mandate immediate evacuation and 911 contact before tech deployment.
    
    TASK: Rapid address acquisition and 4-hour arrival guarantee for GTA emergency mechanical failures.
  `
};

export const SERVICES = [
  {
    title: "Critical Mechanical Dispatch",
    description: "Sam manages rapid-response triage for high-priority failures with a guaranteed 4-hour mobilization across the GTA.",
    icon: "🚨"
  },
  {
    title: "Thermal Funding Audits",
    description: "Consult with Sarah to navigate the 2026 Ontario HRS program and capture up to $7,500 in government incentives.",
    icon: "📊"
  },
  {
    title: "High-Efficiency Hydronics",
    description: "Precision installation of enterprise-grade cold-climate heat pumps and hydronic heating systems by TSSA-certified engineers.",
    icon: "🌡️"
  },
  {
    title: "Diagnostic Infrastructure",
    description: "Fixed-yield drainage solutions utilizing CCTV camera diagnostics and hydro-jetting for residential and light-commercial assets.",
    icon: "🏢"
  }
];