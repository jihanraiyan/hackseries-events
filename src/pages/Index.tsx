import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight tracking-tight">
            Curate the perfect{' '}
            <span className="text-accent-blue italic">guest list</span>{' '}
            instantly.
          </h1>
          
          <div className="flex flex-col items-center gap-4 mt-12">
            <Link to="/create-event">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background px-12 py-5 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
              >
                Try it out
              </motion.button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            <Link to="/events" className="hover:text-foreground transition-colors underline underline-offset-4">
              Already have an account? Sign in →
            </Link>
          </p>
        </motion.div>

        {/* Footer links */}
        <div className="absolute bottom-8 flex gap-6 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Use</a>
        </div>
      </main>
    </div>
  );
}
