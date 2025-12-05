import { CommunicationProfile, Event, Guest } from '@/types/event';

const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
];

const interestsPool = [
  'AI/ML', 'Startups', 'Venture Capital', 'Design', 'Product', 'Engineering',
  'Marketing', 'Sales', 'Finance', 'Crypto', 'Web3', 'Climate Tech',
  'Healthcare', 'EdTech', 'Gaming', 'Music', 'Photography', 'Travel',
  'Fitness', 'Food & Wine', 'Art', 'Philosophy', 'Books', 'Podcasts'
];

const names = [
  'Marcus Chen', 'Lisa Rodriguez', 'Alex Thompson', 'Sarah Kim', 'David Patel',
  'Emma Wilson', 'James Liu', 'Olivia Martinez', 'Michael Brown', 'Sophia Lee',
  'Daniel Garcia', 'Isabella Taylor', 'William Anderson', 'Mia Johnson', 'Benjamin Davis',
  'Charlotte Moore', 'Ethan Jackson', 'Amelia White', 'Alexander Harris', 'Harper Martin'
];

function getRandomInterests(): string[] {
  const count = Math.floor(Math.random() * 4) + 2;
  const shuffled = [...interestsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomConversationStyle(): 'listener' | 'balanced' | 'dominator' {
  const styles: ('listener' | 'balanced' | 'dominator')[] = ['listener', 'balanced', 'balanced', 'balanced', 'dominator'];
  return styles[Math.floor(Math.random() * styles.length)];
}

function getRandomResponseSpeed(): 'fast' | 'medium' | 'slow' {
  const speeds: ('fast' | 'medium' | 'slow')[] = ['fast', 'fast', 'medium', 'medium', 'slow'];
  return speeds[Math.floor(Math.random() * speeds.length)];
}

export const mockProfiles: CommunicationProfile[] = names.map((name, index) => {
  // Make Marcus and Lisa dominators for the demo
  const isDominator = name === 'Marcus Chen' || name === 'Lisa Rodriguez';
  
  return {
    userId: `user-${index + 1}`,
    name,
    avatar: avatars[index],
    interests: getRandomInterests(),
    responseSpeed: getRandomResponseSpeed(),
    socialCatalystScore: isDominator ? 4 + Math.random() * 2 : 5 + Math.random() * 5,
    participationRate: 0.4 + Math.random() * 0.5,
    conversationStyle: isDominator ? 'dominator' : getRandomConversationStyle()
  };
});

// Make specific profiles for demo narrative
mockProfiles[0] = {
  ...mockProfiles[0],
  conversationStyle: 'dominator',
  socialCatalystScore: 4.2
};

mockProfiles[1] = {
  ...mockProfiles[1],
  conversationStyle: 'dominator',
  socialCatalystScore: 3.8
};

// Make Alex a social catalyst
mockProfiles[2] = {
  ...mockProfiles[2],
  conversationStyle: 'balanced',
  socialCatalystScore: 9.2
};

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Founder Dinner - Series A Celebration',
    description: 'An intimate dinner for founders who recently closed their Series A. Share war stories and celebrate wins.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    host: 'user-1',
    type: 'private',
    maxAttendees: 10,
    guests: [],
    chemistryScore: 0
  },
  {
    id: 'event-2',
    title: 'Tech & Wine Meetup',
    description: 'Casual networking over wine tasting. Meet fellow tech enthusiasts in a relaxed setting.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    host: 'user-2',
    type: 'public',
    maxAttendees: 25,
    guests: [],
    chemistryScore: 0
  }
];

// Pre-calculated pairwise chemistry for demo
export const pairwiseChemistryMap: Record<string, number> = {};

// Generate pairwise scores
mockProfiles.forEach((profile1, i) => {
  mockProfiles.forEach((profile2, j) => {
    if (i < j) {
      const key = `${profile1.userId}_${profile2.userId}`;
      // Marcus and Lisa have low chemistry with each other and others
      if (profile1.name === 'Marcus Chen' || profile2.name === 'Marcus Chen' ||
          profile1.name === 'Lisa Rodriguez' || profile2.name === 'Lisa Rodriguez') {
        if ((profile1.name === 'Marcus Chen' && profile2.name === 'Lisa Rodriguez') ||
            (profile1.name === 'Lisa Rodriguez' && profile2.name === 'Marcus Chen')) {
          pairwiseChemistryMap[key] = 35 + Math.random() * 15; // Very low
        } else {
          pairwiseChemistryMap[key] = 55 + Math.random() * 20; // Low-medium
        }
      } else {
        // Normal chemistry calculation
        const sharedInterests = profile1.interests.filter(i => profile2.interests.includes(i)).length;
        const baseScore = 70 + sharedInterests * 5;
        const catalystBonus = (profile1.socialCatalystScore + profile2.socialCatalystScore) / 4;
        pairwiseChemistryMap[key] = Math.min(98, baseScore + catalystBonus + Math.random() * 10);
      }
    }
  });
});
