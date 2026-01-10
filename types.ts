export enum Persona {
  CHLOE = 'CHLOE',
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