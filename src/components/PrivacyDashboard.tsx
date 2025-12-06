import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Calendar, Activity, Linkedin } from 'lucide-react';
import { currentUserProfile } from '@/data/mockEventData';

export default function PrivacyDashboard() {
  const [settings, setSettings] = useState({
    enableAnalysis: true,
    shareAvailability: true,
    appearInRecommendations: true
  });

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy Controls
          </CardTitle>
          <CardDescription>
            Manage how your communication patterns are used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Enable communication analysis</p>
                <p className="text-sm text-muted-foreground">Analyze behavioral patterns to predict chemistry</p>
              </div>
            </div>
            <Switch
              checked={settings.enableAnalysis}
              onCheckedChange={(checked) => setSettings(s => ({ ...s, enableAnalysis: checked }))}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Share availability for events</p>
                <p className="text-sm text-muted-foreground">Let hosts see when you're free</p>
              </div>
            </div>
            <Switch
              checked={settings.shareAvailability}
              onCheckedChange={(checked) => setSettings(s => ({ ...s, shareAvailability: checked }))}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Appear in event recommendations</p>
                <p className="text-sm text-muted-foreground">Be suggested as a potential guest</p>
              </div>
            </div>
            <Switch
              checked={settings.appearInRecommendations}
              onCheckedChange={(checked) => setSettings(s => ({ ...s, appearInRecommendations: checked }))}
            />
          </motion.div>
        </CardContent>
      </Card>

      {/* Your Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl shadow-lg border border-border p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
        
        {/* Photo with age badge */}
        <div className="relative mb-4">
          <img
            src={currentUserProfile.avatar}
            alt={currentUserProfile.name}
            className="w-full aspect-square object-cover rounded-xl"
          />
          <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{currentUserProfile.age}</span>
          </div>
        </div>

        {/* Role and Company */}
        <p className="text-sm font-medium text-foreground">{currentUserProfile.role}</p>
        <p className="text-sm text-muted-foreground mb-1">{currentUserProfile.company}</p>
        <p className="text-sm text-muted-foreground mb-4">{currentUserProfile.school}</p>

        {/* Bio section */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bio</p>
            <p className="text-sm text-foreground leading-relaxed">"{currentUserProfile.bio}"</p>
          </div>
          
          {currentUserProfile.linkedinUrl && (
            <a
              href={currentUserProfile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[#0A66C2] hover:opacity-80 transition-opacity"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Privacy First</p>
              <p className="text-sm text-muted-foreground mt-1">
                We never read message content. Only behavioral patterns like response times and conversation flow are analyzed.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
