
export enum Persona {
  SARAH = 'SARAH',
  MIKE = 'MIKE'
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
  persona: Persona;
}

export interface VoiceConfig {
  voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}
