import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Send, Wand2, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import ChemistryGraph from '@/components/ChemistryGraph';
import ChemistryScore from '@/components/ChemistryScore';
import GuestCard from '@/components/GuestCard';
import InsightsPanel from '@/components/InsightsPanel';
import { mockProfiles } from '@/data/mockEventData';
import { CommunicationProfile } from '@/types/event';
import { calculateGroupChemistry, optimizeGuestList } from '@/services/chemistryCalculator';
import { toast } from '@/hooks/use-toast';

export default function GuestListBuilder() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuests, setSelectedGuests] = useState<CommunicationProfile[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedFilter) {
        return matchesSearch && profile.school === selectedFilter;
      }
      return matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const analysis = useMemo(() => {
    return calculateGroupChemistry(selectedGuests);
  }, [selectedGuests]);

  const allSchools = useMemo(() => {
    const schools = new Set<string>();
    mockProfiles.forEach(p => schools.add(p.school));
    return Array.from(schools).slice(0, 6);
  }, []);

  const toggleGuest = (profile: CommunicationProfile) => {
    setSelectedGuests(prev => {
      const isSelected = prev.some(g => g.userId === profile.userId);
      if (isSelected) {
        return prev.filter(g => g.userId !== profile.userId);
      }
      return [...prev, profile];
    });
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { optimizedGuests, removed } = optimizeGuestList(selectedGuests);
    
    if (removed.length > 0) {
      setSelectedGuests(optimizedGuests);
      toast({
        title: "Guest List Optimized! 🎉",
        description: `Removed ${removed.map(r => r.name).join(' & ')} to improve group chemistry.`,
      });
    } else {
      toast({
        title: "Already Optimized!",
        description: "Your guest list is already at peak chemistry.",
      });
    }
    
    setIsOptimizing(false);
  };

  const handleSendInvites = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    setShowInviteModal(false);
    
    toast({
      title: "Invitations Sent! 🚀",
      description: `${selectedGuests.length} personalized invitations are on their way.`,
    });
    
    navigate('/events');
  };

  // Get dimensions for the graph
  const [graphSize, setGraphSize] = useState({ width: 500, height: 400 });
  
  useEffect(() => {
    const updateSize = () => {
      const rightPanel = document.getElementById('right-panel');
      if (rightPanel) {
        setGraphSize({
          width: Math.min(rightPanel.clientWidth - 32, 600),
          height: 350
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-20 pb-12 px-4">
        <div className="grid lg:grid-cols-2 gap-6 min-h-[calc(100vh-8rem)]">
          {/* Left Panel - Guest Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1">Select Guests</h2>
              <p className="text-muted-foreground text-sm">
                {selectedGuests.length} guests selected
              </p>
            </div>

            {/* Search & Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, school, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                {allSchools.map(school => (
                  <Badge
                    key={school}
                    variant={selectedFilter === school ? "default" : "outline"}
                    className="cursor-pointer whitespace-nowrap text-xs"
                    onClick={() => setSelectedFilter(selectedFilter === school ? null : school)}
                  >
                    {school}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Guest List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              <AnimatePresence mode="popLayout">
                {filteredProfiles.map((profile, index) => (
                  <GuestCard
                    key={profile.userId}
                    profile={profile}
                    isSelected={selectedGuests.some(g => g.userId === profile.userId)}
                    onToggle={() => toggleGuest(profile)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Panel - Chemistry Visualization */}
          <motion.div
            id="right-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="glass rounded-xl p-6 flex-1 flex flex-col">
              {/* Chemistry Score */}
              <div className="text-center mb-6">
                <ChemistryScore score={analysis.groupScore} size="lg" />
              </div>

              {/* Graph */}
              <div className="flex-1 min-h-[300px] bg-background/30 rounded-lg mb-4">
                <ChemistryGraph
                  guests={selectedGuests}
                  analysis={analysis}
                  width={graphSize.width}
                  height={graphSize.height}
                />
              </div>

              {/* Insights */}
              <InsightsPanel analysis={analysis} />

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleOptimize}
                  disabled={selectedGuests.length < 3 || isOptimizing}
                >
                  {isOptimizing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="mr-2"
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Optimize Guest List
                    </>
                  )}
                </Button>
                
                <Button
                  className="flex-1 glow-primary"
                  onClick={() => setShowInviteModal(true)}
                  disabled={selectedGuests.length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Invites
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Send Invitations
            </DialogTitle>
            <DialogDescription>
              AI will personalize each invitation based on shared interests
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-3">
              {selectedGuests.slice(0, 3).map(guest => (
                <div key={guest.userId} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <img src={guest.avatar} alt={guest.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium">{guest.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Personalized message ready
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
              {selectedGuests.length > 3 && (
                <p className="text-sm text-muted-foreground text-center">
                  +{selectedGuests.length - 3} more guests
                </p>
              )}
            </div>

            <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm font-medium mb-2">Sample Message Preview:</p>
              <p className="text-sm text-muted-foreground italic">
                "Hey {selectedGuests[0]?.name.split(' ')[0] || 'there'}! You're invited to an exclusive event with fellow{' '}
                {selectedGuests[0]?.school || 'university'} alumni. Based on your profile, we think you'd be a great fit!"
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvites} disabled={isSending}>
              {isSending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  Send {selectedGuests.length} Invitations
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
