export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  host: string;
  type: 'private' | 'public';
  maxAttendees: number;
  guests: Guest[];
  chemistryScore: number;
}

export interface Guest {
  userId: string;
  name: string;
  avatar: string;
  interests: string[];
  rsvpStatus: 'pending' | 'accepted' | 'declined';
  individualChemistry: number;
}

export interface CommunicationProfile {
  userId: string;
  name: string;
  avatar: string;
  interests: string[];
  responseSpeed: 'fast' | 'medium' | 'slow';
  socialCatalystScore: number;
  participationRate: number;
  conversationStyle: 'listener' | 'balanced' | 'dominator';
}

export interface ChemistryAnalysis {
  groupScore: number;
  insights: string[];
  warnings: string[];
  pairwiseScores: Record<string, number>;
}

export interface GraphNode {
  id: string;
  name: string;
  avatar: string;
  chemistry: number;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  strength: number;
}
