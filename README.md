# SprintSync

A modern sprint planning and management tool designed for distributed teams across multiple time zones.

## Features

- 🎯 **Dashboard** - Overview of tasks, metrics, and team performance
- ✅ **Task Management** - Kanban board with drag-and-drop functionality
- 👥 **Team Management** - Organize teams by region and subteams
- 📁 **Project Tracking** - Monitor project progress and deadlines
- 📊 **Sprint Summary** - Analytics and reports for sprint performance
- 🎥 **Smart Meetings** - AI-powered meeting time suggestions with timezone comfort meters
- 🌍 **Global Time Zones** - Real-time clock for India, Germany, and US teams

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Neobrutalist Design** - Bold, high-contrast UI aesthetic

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Click "Deploy"

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
sprintsync/
├── src/
│   ├── components/
│   │   ├── DashboardNew.jsx    # Main dashboard
│   │   ├── TasksPage.jsx       # Task management
│   │   ├── TeamsPage.jsx       # Team organization
│   │   ├── ProjectsPage.jsx    # Project tracking
│   │   ├── SprintSummary.jsx   # Analytics
│   │   ├── MeetingsPage.jsx    # Meeting scheduler
│   │   ├── Sidebar.jsx         # Navigation
│   │   ├── TaskCard.jsx        # Task component
│   │   └── TaskModal.jsx       # Task creation modal
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/                     # Static assets
├── vercel.json                # Vercel configuration
└── package.json               # Dependencies

```

## Features in Detail

### Smart Meeting Scheduler

- Select primary regions for meeting attendees
- Get AI-powered time suggestions optimized for selected teams
- View comfort meters showing how suitable each time is for each region
- Direct Google Meet integration
- Warning system for meetings started outside scheduled time

### Task Management

- Drag-and-drop Kanban board
- Filter by status, region, and priority
- Real-time search
- Task creation with detailed agenda items

### Global Team Support

- Support for India, Germany, and US time zones
- Real-time clocks for all regions
- Comfort level indicators for meeting times
- Region-specific team organization

## License

MIT

## Author

Built with ❤️ for distributed teams
