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
      insights: ['Add more guests to see vibe predictions'],
      warnings: [],
      pairwiseScores: {}
    };
  }

  const insights: string[] = [];
  const warnings: string[] = [];
  const pairwiseScores: Record<string, number> = {};

  // Check for people who already know each other
  const alreadyKnowCount = guests.filter(g => g.alreadyKnow).length;
  if (alreadyKnowCount >= 2) {
    insights.push(`${alreadyKnowCount} people already connected`);
  }

  // Check for 1st degree connections
  const firstDegree = guests.filter(g => g.connectionDegree === 1).length;
  if (firstDegree > 0) {
    insights.push(`${firstDegree} direct connection${firstDegree > 1 ? 's' : ''}`);
  }

  // Check school diversity
  const schools = new Set(guests.map(g => g.school));
  if (schools.size === 1) {
    insights.push(`All from ${guests[0].school}`);
  } else if (schools.size <= 3) {
    insights.push('Great school diversity');
  }

  // Check age range
  const ages = guests.map(g => g.age);
  const ageRange = Math.max(...ages) - Math.min(...ages);
  if (ageRange > 15) {
    warnings.push('Wide age range - may affect dynamics');
  } else if (ageRange <= 5) {
    insights.push('Similar age group');
  }

  // Check gender balance
  const genderCounts = guests.reduce((acc, g) => {
    acc[g.gender] = (acc[g.gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const genderValues = Object.values(genderCounts);
  if (genderValues.length > 1) {
    const maxGender = Math.max(...genderValues);
    const minGender = Math.min(...genderValues);
    if (maxGender / minGender <= 2) {
      insights.push('Balanced gender mix');
    }
  }

  // Calculate pairwise scores
  let totalPairwiseScore = 0;
  let pairCount = 0;

  guests.forEach((guest1, i) => {
    guests.forEach((guest2, j) => {
      if (i < j) {
        const key1 = `${guest1.userId}_${guest2.userId}`;
        const key2 = `${guest2.userId}_${guest1.userId}`;
        const score = pairwiseChemistryMap[key1] || pairwiseChemistryMap[key2] || 70;
        pairwiseScores[key1] = score;
        totalPairwiseScore += score;
        pairCount++;
      }
    });
  });

  // Calculate base score from pairwise
  let baseScore = pairCount > 0 ? totalPairwiseScore / pairCount : 70;

  // Apply bonuses
  const connectionBonus = firstDegree * 2;
  const knowBonus = alreadyKnowCount * 2;
  
  // Final calculation
  const groupScore = Math.min(98, Math.max(45, Math.round(
    baseScore + connectionBonus + knowBonus
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
  // For demo: Remove 3rd degree connections to improve chemistry
  const thirdDegree = guests.filter(g => g.connectionDegree === 3 && !g.alreadyKnow);
  
  if (thirdDegree.length > 0 && guests.length > 5) {
    // Remove up to 2 third degree connections
    const toRemove = thirdDegree.slice(0, 2);
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
  let score = 65; // Base score
  
  // 1st degree connections get bonus
  if (profile.connectionDegree === 1) score += 15;
  else if (profile.connectionDegree === 2) score += 8;
  
  // Already know them - bonus
  if (profile.alreadyKnow) score += 10;
  
  // Add some randomness based on userId for consistency
  const hash = profile.userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  score += (hash % 10);
  
  return Math.min(99, Math.max(50, Math.round(score)));
}
