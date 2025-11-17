# 🚀 Quick Start Guide

## Run the Application

```bash
npm run dev
```

Then open your browser to the URL shown (typically http://localhost:5173)

## Project Structure

```
sprintsync/
├── src/
│   ├── components/
│   │   ├── AIAssistant.jsx      # Floating AI bot with context-aware tips
│   │   ├── Dashboard.jsx        # Main sprint board with drag-and-drop
│   │   ├── LandingPage.jsx      # Hero section with animated globe
│   │   ├── ScrumBot.jsx         # Contextual message notifications
│   │   ├── SprintSummary.jsx    # Analytics and charts page
│   │   ├── TaskCard.jsx         # Draggable task component
│   │   ├── TaskModal.jsx        # Task creation form
│   │   └── TimezonePanel.jsx    # Time zone overlap visualization
│   ├── App.jsx                  # Main app with routing logic
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind imports
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Features to Try

1. **Landing Page** → Click "Launch Dashboard"
2. **Drag Tasks** → Move tasks between Backlog, To Do, In Progress, Done
3. **Create Task** → Click "+ New Task" in Backlog
4. **Time Slider** → Adjust time to see overlap hours glow green
5. **AI Assistant** → Click the bot icon (bottom-right) for tips
6. **Scrum Bot** → Watch for contextual messages (bottom-left)
7. **Generate Summary** → View charts and export PDF

## Pre-populated Demo Data

- API Integration (India, High, 8hrs)
- UI Polish (Germany, Medium, 5hrs)
- Test Automation (US, Low, 6hrs)

## Key Interactions

- **Drag & Drop**: Smooth animations with visual feedback
- **Time Zone Overlap**: 3:30-5:00 PM IST highlighted in green
- **AI Context**: Changes based on board state
- **Export PDF**: Shows success toast notification

Enjoy exploring SprintSync! 🎉
