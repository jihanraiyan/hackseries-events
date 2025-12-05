import { CommunicationProfile, ChemistryAnalysis } from '@/types/event';
import { pairwiseChemistryMap } from '@/data/mockEventData';

export function calculateGroupChemistry(guests: CommunicationProfile[]): ChemistryAnalysis {
  if (guests.length === 0) {
    return {
      groupScore: 0,
      insights: [],
      warnings: [],
      pairwiseScores: {}
    };
  }

  if (guests.length === 1) {
    return {
      groupScore: 85,
      insights: ['Add more guests to see chemistry predictions'],
      warnings: [],
      pairwiseScores: {}
    };
  }

  const insights: string[] = [];
  const warnings: string[] = [];
  const pairwiseScores: Record<string, number> = {};

  // Count social catalysts (high scores)
  const catalysts = guests.filter(g => g.socialCatalystScore > 7);
  if (catalysts.length > 0) {
    insights.push(`${catalysts.length} social catalyst${catalysts.length > 1 ? 's' : ''} present`);
  }

  // Check for conversation dominators
  const dominators = guests.filter(g => g.conversationStyle === 'dominator');
  if (dominators.length >= 2) {
    warnings.push(`${dominators[0].name} & ${dominators[1].name} both dominate conversations`);
  }

  // Check for listeners
  const listeners = guests.filter(g => g.conversationStyle === 'listener');
  if (listeners.length > guests.length * 0.6) {
    warnings.push('Too many passive participants - energy may be low');
  }

  // Check interest overlap
  const allInterests = guests.flatMap(g => g.interests);
  const interestCounts = allInterests.reduce((acc, interest) => {
    acc[interest] = (acc[interest] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const sharedInterests = Object.entries(interestCounts)
    .filter(([_, count]) => count >= Math.ceil(guests.length * 0.5))
    .map(([interest]) => interest);

  if (sharedInterests.length > 0) {
    insights.push(`Common ground: ${sharedInterests.slice(0, 2).join(', ')}`);
  }

  // Calculate pairwise scores
  let totalPairwiseScore = 0;
  let pairCount = 0;

  guests.forEach((guest1, i) => {
    guests.forEach((guest2, j) => {
      if (i < j) {
        const key1 = `${guest1.userId}_${guest2.userId}`;
        const key2 = `${guest2.userId}_${guest1.userId}`;
        const score = pairwiseChemistryMap[key1] || pairwiseChemistryMap[key2] || 75;
        pairwiseScores[key1] = score;
        totalPairwiseScore += score;
        pairCount++;
      }
    });
  });

  // Calculate base score from pairwise
  let baseScore = pairCount > 0 ? totalPairwiseScore / pairCount : 75;

  // Apply bonuses and penalties
  const catalystBonus = catalysts.length * 3;
  const dominatorPenalty = dominators.length >= 2 ? 15 : (dominators.length === 1 ? 5 : 0);
  
  // Balance bonus
  const balanced = guests.filter(g => g.conversationStyle === 'balanced').length;
  const balanceRatio = balanced / guests.length;
  const balanceBonus = balanceRatio > 0.5 ? 5 : 0;

  if (balanceRatio > 0.6) {
    insights.push('Balanced energy distribution');
  }

  // Fast responders bonus
  const fastResponders = guests.filter(g => g.responseSpeed === 'fast').length;
  if (fastResponders >= guests.length * 0.5) {
    insights.push('High engagement potential');
  }

  // Final calculation
  const groupScore = Math.min(98, Math.max(45, Math.round(
    baseScore + catalystBonus - dominatorPenalty + balanceBonus
  )));

  return {
    groupScore,
    insights: insights.slice(0, 4),
    warnings,
    pairwiseScores
  };
}

export function optimizeGuestList(
  guests: CommunicationProfile[]
): { optimizedGuests: CommunicationProfile[]; removed: CommunicationProfile[] } {
  // For demo: Remove dominators if there are multiple
  const dominators = guests.filter(g => g.conversationStyle === 'dominator');
  
  if (dominators.length >= 2) {
    // Remove the dominator with lower social catalyst score
    const sortedDominators = dominators.sort((a, b) => a.socialCatalystScore - b.socialCatalystScore);
    const toRemove = sortedDominators.slice(0, dominators.length - 1);
    const removeIds = new Set(toRemove.map(d => d.userId));
    
    return {
      optimizedGuests: guests.filter(g => !removeIds.has(g.userId)),
      removed: toRemove
    };
  }

  // If no obvious optimization, keep as is
  return {
    optimizedGuests: guests,
    removed: []
  };
}

export function getIndividualChemistry(profile: CommunicationProfile): number {
  // Base score from social catalyst score
  const baseScore = 60 + (profile.socialCatalystScore * 3);
  
  // Bonus for balanced conversationalists
  const styleBonus = profile.conversationStyle === 'balanced' ? 5 : 
                     profile.conversationStyle === 'listener' ? 2 : -3;
  
  // Fast responders get a bonus
  const speedBonus = profile.responseSpeed === 'fast' ? 3 : 
                     profile.responseSpeed === 'medium' ? 1 : 0;
  
  return Math.min(99, Math.max(50, Math.round(baseScore + styleBonus + speedBonus)));
}
