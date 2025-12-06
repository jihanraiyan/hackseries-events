import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Plus, Clock, MapPin, Send, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import ChemistryScore from '@/components/ChemistryScore';
import { mockEvents, mockProfiles } from '@/data/mockEventData';
import { toast } from '@/hooks/use-toast';

export default function EventDashboard() {
  const [events] = useState(() => {
    // Add some guests to demo events
    return mockEvents.map((event, i) => ({
      ...event,
      guests: mockProfiles.slice(i * 5, i * 5 + 5 + i * 2).map(p => ({
        userId: p.userId,
        name: p.name,
        avatar: p.avatar,
        rsvpStatus: Math.random() > 0.3 ? 'accepted' : 'pending' as const,
        individualChemistry: 70 + Math.random() * 25
      })),
      chemistryScore: 78 + i * 8
    }));
  });

  const handleSendInvites = (eventId: string) => {
    toast({
      title: "Invitations Sent!",
      description: "All pending guests have been notified.",
    });
  };

  const conversationStarters = [
    "Ask about their latest project in AI/ML",
    "Discuss recent funding trends in climate tech",
    "Share thoughts on the future of remote work"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container pt-24 pb-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Events</h1>
            <p className="text-muted-foreground">Manage and track your event chemistry</p>
          </div>
          <Link to="/create-event">
            <Button className="glow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={event.type === 'private' ? 'secondary' : 'outline'} className="mb-2">
                        {event.type}
                      </Badge>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                    </div>
                    <ChemistryScore score={event.chemistryScore} size="sm" showLabel={false} />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      7:00 PM
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {event.guests.length}/{event.maxAttendees} guests
                    </div>
                  </div>

                  {/* Guest List Preview */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Guest List</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.guests.slice(0, 6).map(guest => (
                        <div
                          key={guest.userId}
                          className="flex items-center gap-2 bg-secondary/50 rounded-full pl-1 pr-3 py-1"
                        >
                          <img src={guest.avatar} alt={guest.name} className="w-6 h-6 rounded-full" />
                          <span className="text-sm">{guest.name.split(' ')[0]}</span>
                          <Badge 
                            variant={guest.rsvpStatus === 'accepted' ? 'default' : 'outline'}
                            className={`text-xs ${guest.rsvpStatus === 'accepted' ? 'bg-chemistry-high' : ''}`}
                          >
                            {guest.rsvpStatus}
                          </Badge>
                        </div>
                      ))}
                      {event.guests.length > 6 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-sm">
                          +{event.guests.length - 6}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Conversation Starters */}
                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      AI Conversation Starters
                    </h4>
                    <ul className="space-y-1">
                      {conversationStarters.map((starter, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                          {starter}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      Edit Event
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => handleSendInvites(event.id)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reminders
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Events Yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first event and let AI help you find the perfect guests
            </p>
            <Link to="/create-event">
              <Button className="glow-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Event
              </Button>
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}
