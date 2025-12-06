# Guest Chemistry - AI-Powered Event Guest Curation

A modern React application that helps event organizers curate the perfect guest list using AI-powered chemistry analysis and availability optimization.

## Overview

Guest Chemistry is a sophisticated event planning tool that goes beyond simple RSVPs. It analyzes guest compatibility, visualizes social connections, and automatically finds the best meeting times for your group.

## Features

### 🎯 Smart Guest Curation
- **Chemistry Analysis**: AI-powered compatibility scoring between guests
- **Auto-Curation**: One-click guest list optimization based on social chemistry
- **Visual Chemistry Graph**: Interactive force-directed graph showing guest connections

### 📅 Availability Optimization
- **Group Availability Heatmap**: Visual representation of when guests are available
- **Auto-Scheduling**: Automatically finds the best time slot for all guests
- **Pre-set User Availability**: Remembers your typical availability patterns

### 🎉 Event Management
- **Create Events**: Easy event creation with cover images and details
- **Guest Management**: Add, remove, and manage guests for any event
- **RSVP Tracking**: Track guest responses and attendance

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix primitives)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Data Fetching**: TanStack React Query
- **Graph Visualization**: react-force-graph-2d
- **Charts**: Recharts

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── AvailabilityHeatmap.tsx   # Group availability visualization
│   ├── ChemistryGraph.tsx        # Force-directed guest network graph
│   ├── ChemistryScore.tsx        # Chemistry percentage display
│   ├── GuestCard.tsx             # Individual guest card component
│   ├── InsightsPanel.tsx         # Chemistry insights display
│   ├── Navbar.tsx                # Navigation bar
│   └── ProfileView.tsx           # Guest profile modal
├── pages/               # Route page components
│   ├── Index.tsx                 # Landing page
│   ├── CreateEvent.tsx           # Event creation form
│   ├── EventDashboard.tsx        # Events list (hosting/invited)
│   ├── EventDetail.tsx           # Single event view
│   ├── EditEvent.tsx             # Event editing
│   ├── GuestListBuilder.tsx      # Guest curation interface
│   └── Privacy.tsx               # Privacy policy
├── services/            # Business logic
│   └── chemistryCalculator.ts    # Chemistry scoring algorithms
├── data/                # Mock data
│   └── mockEventData.ts          # Sample events and profiles
├── types/               # TypeScript type definitions
│   └── event.ts                  # Event and guest types
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── App.tsx              # Main app with routing
```

## Key Components

### ChemistryGraph
Interactive force-directed graph visualizing guest relationships. Node size represents chemistry score, and connection lines show compatibility strength.

### AvailabilityHeatmap
7-day × 13-hour grid showing group availability. Green cells indicate more guests available, helping identify optimal meeting times.

### GuestListBuilder
Main curation interface combining guest selection, chemistry visualization, and availability analysis in a two-panel layout.

## Design System

The app uses a clean, minimal design inspired by Series.so:
- **Colors**: Pure white background with black text and blue accents
- **Typography**: Inter for UI, Instrument Serif for headlines
- **Spacing**: Consistent padding and margins using Tailwind scale
- **Corners**: Rounded elements (rounded-xl, rounded-2xl)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero |
| `/create-event` | Create a new event |
| `/guest-builder` | Guest curation interface |
| `/guest-builder?eventId=X` | Edit guests for existing event |
| `/events` | Event dashboard |
| `/events/:eventId` | Event details |
| `/events/:eventId/edit` | Edit event details |
| `/privacy` | Privacy policy |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## How can I edit this code?

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

**Use your preferred IDE**

Clone this repo and push changes. The only requirement is having Node.js & npm installed.

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

## Deployment

Open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Future Enhancements

- Backend integration with Supabase for data persistence
- Real authentication system
- Email invitations
- Calendar integrations (Google Calendar, Outlook)
- Real-time guest availability sync
