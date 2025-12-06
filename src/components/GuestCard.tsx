import { motion } from 'framer-motion';
import { CommunicationProfile } from '@/types/event';
import { getIndividualChemistry } from '@/services/chemistryCalculator';
import { Plus, Minus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GuestCardProps {
  profile: CommunicationProfile;
  isSelected: boolean;
  onToggle: () => void;
  onViewProfile?: () => void;
  index?: number;
}

export default function GuestCard({ profile, isSelected, onToggle, onViewProfile, index = 0 }: GuestCardProps) {
  const chemistry = getIndividualChemistry(profile);
  
  const getChemistryColor = (score: number) => {
    if (score >= 85) return 'text-chemistry-high';
    if (score >= 70) return 'text-chemistry-medium';
    return 'text-chemistry-low';
  };

  const getConnectionLabel = (degree: 1 | 2 | 3) => {
    switch (degree) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass rounded-lg p-4 transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-2 ring-primary' : 'hover:bg-card/80'
      }`}
      onClick={onViewProfile}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {profile.alreadyKnow && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Users className="w-3 h-3 text-primary-foreground" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{profile.name}</h3>
            <span className={`font-mono text-sm font-bold ${getChemistryColor(chemistry)}`}>
              {chemistry}%
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground truncate">
            {profile.role} at {profile.company}
          </p>
          
          <div className="flex flex-wrap gap-1 mt-1">
            <Badge variant="secondary" className="text-xs px-2 py-0">
              {profile.school}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-0">
              {getConnectionLabel(profile.connectionDegree)}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-0">
              {profile.age}
            </Badge>
          </div>
        </div>
        
        <Button
          size="icon"
          variant={isSelected ? "destructive" : "default"}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="shrink-0"
        >
          {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>
    </motion.div>
  );
}
