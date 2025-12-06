import { motion } from 'framer-motion';
import { CommunicationProfile } from '@/types/event';
import { X, Linkedin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProfiles } from '@/data/mockEventData';
import { useMemo } from 'react';

interface ProfileViewProps {
  profile: CommunicationProfile;
  onClose: () => void;
}

interface ConnectionNode {
  id: string;
  x: number;
  y: number;
  avatar?: string;
  name?: string;
}

export default function ProfileView({ profile, onClose }: ProfileViewProps) {
  const getConnectionLabel = (degree: 1 | 2 | 3) => {
    switch (degree) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
    }
  };

  // Generate connection nodes for the background graph
  const connectionNodes = useMemo(() => {
    const nodes: ConnectionNode[] = [];
    const connections = mockProfiles.filter(p => p.userId !== profile.userId).slice(0, 12);
    
    // Distribute nodes in a scattered pattern on the right side
    connections.forEach((conn, i) => {
      const angle = (i / connections.length) * Math.PI * 2;
      const radius = 150 + Math.random() * 150;
      nodes.push({
        id: conn.userId,
        x: 50 + Math.cos(angle) * radius + Math.random() * 80,
        y: 50 + Math.sin(angle) * radius + Math.random() * 80,
        avatar: conn.connectionDegree === 1 ? conn.avatar : undefined,
        name: conn.name,
      });
    });
    
    return nodes;
  }, [profile.userId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="h-full w-full relative overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
          <h1 className="text-lg font-medium text-muted-foreground">Profile Preview</h1>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Social Graph Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Connection lines from center to nodes */}
            {connectionNodes.map((node, i) => (
              <motion.line
                key={`line-${node.id}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${node.x}px)`}
                y2={`calc(50% + ${node.y - 200}px)`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-border"
              />
            ))}
          </svg>

          {/* Connection Nodes */}
          {connectionNodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 200 }}
              className="absolute w-12 h-12 rounded-full bg-card border border-border shadow-sm flex items-center justify-center overflow-hidden"
              style={{
                left: `calc(50% + ${node.x}px)`,
                top: `calc(50% + ${node.y - 200}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {node.avatar ? (
                <img src={node.avatar} alt={node.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">?</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-card rounded-2xl shadow-xl border border-border p-6 w-full max-w-sm"
          onClick={e => e.stopPropagation()}
        >
          {/* Name */}
          <h2 className="text-2xl font-bold text-foreground mb-4">{profile.name}</h2>

          {/* Large Photo with age badge */}
          <div className="relative mb-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full aspect-square object-cover rounded-xl"
            />
            {/* Age badge */}
            <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{profile.age}</span>
            </div>
            
            {/* Connection degree badge */}
            <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs font-medium text-primary-foreground">
                {getConnectionLabel(profile.connectionDegree)} connection
              </span>
            </div>
          </div>

          {/* Role and Company */}
          <div className="mb-3">
            <p className="text-sm font-medium text-foreground">{profile.role}</p>
            <p className="text-sm text-muted-foreground">{profile.company}</p>
          </div>

          {/* School */}
          <p className="text-sm text-muted-foreground mb-4">{profile.school}</p>

          {/* Bio section */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bio</p>
              <p className="text-sm text-foreground leading-relaxed">"{profile.bio}"</p>
            </div>
            
            {/* LinkedIn icon */}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[#0A66C2] hover:opacity-80 transition-opacity"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
          </div>

          {/* Already know indicator */}
          {profile.alreadyKnow && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-primary font-medium">✓ You already know each other</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
