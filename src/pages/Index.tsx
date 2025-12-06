import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        {/* Centered content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Get connected with{' '}
            <span className="text-primary">anyone</span>{' '}
            instantly.
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/create-event">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg">
                Try it out
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            <Link to="/events" className="hover:underline">
              Already have an account? Sign in →
            </Link>
          </p>
        </motion.div>

        {/* Footer links */}
        <div className="absolute bottom-6 flex gap-6 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Use</a>
        </div>
      </main>
    </div>
  );
}
