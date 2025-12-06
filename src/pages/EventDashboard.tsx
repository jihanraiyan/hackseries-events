import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Plus, Clock, MapPin, Check, X, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/Navbar';
import { mockEvents, mockProfiles } from '@/data/mockEventData';
import { toast } from '@/hooks/use-toast';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: Date;
    location?: string;
    guestCount: number;
    maxAttendees: number;
    coverGradient?: string;
    host?: string;
    rsvpStatus?: 'going' | 'maybe' | 'pending';
  };
  isHosted?: boolean;
}

function EventCard({ event, isHosted = false }: EventCardProps) {
  const isPast = event.date < new Date();
  const isUpcoming = !isPast;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Link to={`/events/${event.id}`}>
        <div className={`rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all hover:shadow-lg ${isPast ? 'opacity-60' : ''}`}>
          {/* Cover */}
          <div className="relative h-32 sm:h-40 overflow-hidden">
            <div className={`absolute inset-0 ${
              event.coverGradient || 'bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30'
            }`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-foreground/10" />
            </div>
            
            {/* Date Badge */}
            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center min-w-[52px]">
              <div className="text-xs font-medium text-muted-foreground uppercase">
                {event.date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
              <div className="text-lg font-bold leading-tight">
                {event.date.getDate()}
              </div>
            </div>

            {/* RSVP Status for invited events */}
            {!isHosted && event.rsvpStatus && (
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={event.rsvpStatus === 'going' ? 'default' : 'secondary'}
                  className={event.rsvpStatus === 'going' ? 'bg-chemistry-high text-primary-foreground' : ''}
                >
                  {event.rsvpStatus === 'going' ? 'Going' : event.rsvpStatus === 'maybe' ? 'Maybe' : 'Pending'}
                </Badge>
              </div>
            )}

            {/* Menu for hosted events */}
            {isHosted && (
              <div className="absolute top-3 right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Event</DropdownMenuItem>
                    <DropdownMenuItem>Manage Guests</DropdownMenuItem>
                    <DropdownMenuItem>Send Reminders</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 truncate">{event.title}</h3>
            
            {!isHosted && event.host && (
              <p className="text-sm text-muted-foreground mb-2">Hosted by {event.host}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </div>
              {event.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[120px]">{event.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {event.guestCount} {isHosted ? `/ ${event.maxAttendees}` : 'going'}
              </div>
            </div>

            {/* RSVP Buttons for pending invites */}
            {!isHosted && event.rsvpStatus === 'pending' && (
              <div className="flex gap-2 mt-4">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({ title: "RSVP Updated", description: "You're going to this event!" });
                  }}
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Going
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({ title: "RSVP Updated", description: "You've declined this invite." });
                  }}
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Decline
                </Button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function EventDashboard() {
  // Your hosted events with unique gradients
  const gradients = [
    'bg-gradient-to-br from-primary/40 via-primary/20 to-secondary/30',
    'bg-gradient-to-br from-secondary/40 via-accent/20 to-primary/30',
  ];

  const hostedEvents = mockEvents.map((event, i) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: 'New York, NY',
    guestCount: 5 + i * 2,
    maxAttendees: event.maxAttendees,
    coverGradient: gradients[i % gradients.length],
  }));

  // Events you're invited to
  const invitedEvents = [
    {
      id: 'inv-1',
      title: 'Summer Rooftop Mixer',
      description: 'Networking event for tech professionals',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      location: 'Brooklyn, NY',
      guestCount: 24,
      maxAttendees: 40,
      host: 'Sarah Chen',
      rsvpStatus: 'pending' as const,
      coverGradient: 'bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-purple-500/30',
    },
    {
      id: 'inv-2',
      title: 'Founder Dinner',
      description: 'Intimate dinner for startup founders',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Manhattan, NY',
      guestCount: 12,
      maxAttendees: 15,
      host: 'Alex Rivera',
      rsvpStatus: 'going' as const,
      coverGradient: 'bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-teal-500/30',
    },
    {
      id: 'inv-3',
      title: 'Design Community Meetup',
      description: 'Monthly gathering for designers',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      location: 'Williamsburg, NY',
      guestCount: 35,
      maxAttendees: 50,
      host: 'Maya Johnson',
      rsvpStatus: 'maybe' as const,
      coverGradient: 'bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-pink-500/30',
    },
  ];

  const pendingCount = invitedEvents.filter(e => e.rsvpStatus === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-4xl pt-24 pb-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Events</h1>
          <Link to="/create-event">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="hosting" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="hosting" className="flex-1">
              Hosting
              {hostedEvents.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                  {hostedEvents.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="invited" className="flex-1">
              Invited
              {pendingCount > 0 && (
                <Badge className="ml-2 h-5 px-1.5 bg-primary">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hosting">
            {hostedEvents.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {hostedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <EventCard event={event} isHosted />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState type="hosting" />
            )}
          </TabsContent>

          <TabsContent value="invited">
            {invitedEvents.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {invitedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState type="invited" />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function EmptyState({ type }: { type: 'hosting' | 'invited' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
        <Calendar className="w-10 h-10 text-muted-foreground/50" />
      </div>
      <h2 className="text-lg font-semibold mb-2">
        {type === 'hosting' ? 'No Events Yet' : 'No Invites Yet'}
      </h2>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        {type === 'hosting' 
          ? 'Create your first event and invite guests with chemistry-matched recommendations.'
          : "When you're invited to events, they'll show up here."
        }
      </p>
      {type === 'hosting' && (
        <Link to="/create-event">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      )}
    </motion.div>
  );
}