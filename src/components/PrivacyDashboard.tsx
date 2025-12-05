import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Calendar, Zap, Clock, MessageSquare, Activity } from 'lucide-react';

export default function PrivacyDashboard() {
  const [settings, setSettings] = useState({
    enableAnalysis: true,
    shareAvailability: true,
    appearInRecommendations: true
  });

  const communicationProfile = {
    responseSpeed: 'Fast responder',
    socialStyle: 'Connector',
    socialScore: 8.2,
    participation: 'Active contributor'
  };

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

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Your Communication Profile
          </CardTitle>
          <CardDescription>
            How AI perceives your communication style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Clock className="w-4 h-4" />
                Response Speed
              </div>
              <p className="font-semibold text-lg">{communicationProfile.responseSpeed}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Zap className="w-4 h-4" />
                Social Style
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">{communicationProfile.socialStyle}</p>
                <Badge variant="default" className="bg-chemistry-high text-primary-foreground">
                  {communicationProfile.socialScore}/10
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-lg bg-secondary/50 sm:col-span-2"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <MessageSquare className="w-4 h-4" />
                Participation
              </div>
              <p className="font-semibold text-lg">{communicationProfile.participation}</p>
            </motion.div>
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
        </CardContent>
      </Card>
    </div>
  );
}
