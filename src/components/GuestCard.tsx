import { motion } from 'framer-motion';
import { CommunicationProfile } from '@/types/event';
import { getIndividualChemistry } from '@/services/chemistryCalculator';
import { Plus, Minus, Zap, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GuestCardProps {
  profile: CommunicationProfile;
  isSelected: boolean;
  onToggle: () => void;
  index?: number;
}

export default function GuestCard({ profile, isSelected, onToggle, index = 0 }: GuestCardProps) {
  const chemistry = getIndividualChemistry(profile);
  
  const getChemistryColor = (score: number) => {
    if (score >= 85) return 'text-chemistry-high';
    if (score >= 70) return 'text-chemistry-medium';
    return 'text-chemistry-low';
  };

  const getStyleIcon = () => {
    switch (profile.conversationStyle) {
      case 'dominator': return <MessageCircle className="w-3 h-3" />;
      case 'listener': return <Clock className="w-3 h-3" />;
      default: return <Zap className="w-3 h-3" />;
    }
  };

  const getStyleLabel = () => {
    switch (profile.conversationStyle) {
      case 'dominator': return 'Leads discussions';
      case 'listener': return 'Great listener';
      default: return 'Balanced';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass rounded-lg p-4 transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary' : 'hover:bg-card/80'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {profile.socialCatalystScore > 7 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-chemistry-high rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
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
          
          <div className="flex flex-wrap gap-1 mt-1">
            {profile.interests.slice(0, 3).map(interest => (
              <Badge key={interest} variant="secondary" className="text-xs px-2 py-0">
                {interest}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            {getStyleIcon()}
            <span>{getStyleLabel()}</span>
          </div>
        </div>
        
        <Button
          size="icon"
          variant={isSelected ? "destructive" : "default"}
          onClick={onToggle}
          className="shrink-0"
        >
          {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>
    </motion.div>
  );
}
