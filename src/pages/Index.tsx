import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Zap, Shield, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export default function Index() {
  const features = [
    {
      icon: Zap,
      title: 'Chemistry Predictions',
      description: 'AI analyzes behavioral patterns to predict which guests will click'
    },
    {
      icon: Users,
      title: 'Smart Guest Lists',
      description: 'Build the perfect mix with real-time chemistry visualization'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'We never read messages - only behavioral patterns are analyzed'
    }
  ];

  const stats = [
    { value: '92%', label: 'Average chemistry match' },
    { value: '3x', label: 'Better engagement' },
    { value: '500+', label: 'Events powered' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-radial opacity-50" />
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Predict Event Chemistry
                <span className="text-gradient-primary"> Before It Happens</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                AI-powered event planning that predicts which guest combinations will create the best conversations. 
                Think Moneyball, but for social events.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create-event">
                  <Button size="lg" className="w-full sm:w-auto glow-primary animate-pulse-glow">
                    Create Your Event
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/events">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Calendar className="w-5 h-5 mr-2" />
                    View Events
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 border-y border-border bg-secondary/20">
          <div className="container">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our AI analyzes communication patterns to predict social chemistry
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-radial">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="glass rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto"
            >
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Create Unforgettable Events?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join hosts who use AI to build events with perfect chemistry
              </p>
              <Link to="/create-event">
                <Button size="lg" className="glow-primary">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
