export enum Persona {
  SARAH = 'SARAH',
  SAM = 'SAM'
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
  persona: Persona;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}