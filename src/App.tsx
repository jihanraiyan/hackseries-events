import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateEvent from "./pages/CreateEvent";
import GuestListBuilder from "./pages/GuestListBuilder";
import EventDashboard from "./pages/EventDashboard";
import EventDetail from "./pages/EventDetail";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/guest-builder" element={<GuestListBuilder />} />
            <Route path="/events" element={<EventDashboard />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
