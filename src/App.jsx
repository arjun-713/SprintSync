import { useState } from 'react'
import LandingPage from './components/LandingPage'
import DashboardNew from './components/DashboardNew'
import SprintSummary from './components/SprintSummary'
import TeamsPage from './components/TeamsPage'
import ProjectsPage from './components/ProjectsPage'
import TasksPage from './components/TasksPage'
import MeetingsPage from './components/MeetingsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [activeNav, setActiveNav] = useState('dashboard')
  const [tasks, setTasks] = useState([
    { id: 1, name: "API Integration", region: "India", subteam: "DevOps", project: "API Gateway Migration", priority: "High", hours: 8, status: "backlog" },
    { id: 2, name: "UI Polish", region: "Germany", subteam: "UI/UX", project: "UI Component Library", priority: "Medium", hours: 5, status: "backlog" },
    { id: 3, name: "Test Automation", region: "US", subteam: "QA", project: "Mobile App v2.0", priority: "Low", hours: 6, status: "backlog" }
  ])

  const navigateTo = (page) => {
    setCurrentPage(page)
    setActiveNav(page)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && <LandingPage onNavigate={navigateTo} />}
      {currentPage === 'dashboard' && (
        <DashboardNew 
          tasks={tasks} 
          setTasks={setTasks} 
          onNavigate={navigateTo}
          activeNav={activeNav}
        />
      )}
      {currentPage === 'tasks' && (
        <TasksPage 
          tasks={tasks} 
          setTasks={setTasks} 
          onNavigate={navigateTo}
          activeNav={activeNav}
        />
      )}
      {currentPage === 'summary' && (
        <SprintSummary 
          tasks={tasks} 
          onNavigate={navigateTo}
          activeNav={activeNav}
        />
      )}
      {currentPage === 'teams' && (
        <TeamsPage 
          onNavigate={navigateTo}
          activeNav={activeNav}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
      {currentPage === 'projects' && (
        <ProjectsPage 
          onNavigate={navigateTo}
          activeNav={activeNav}
        />
      )}
      {currentPage === 'meetings' && (
        <MeetingsPage 
          onNavigate={navigateTo}
          activeNav={activeNav}
        />
      )}
      {/* Debug: Show current page if no match */}
      {!['landing', 'dashboard', 'tasks', 'summary', 'teams', 'projects', 'meetings'].includes(currentPage) && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
            <p className="text-xl mb-4">Current page: {currentPage}</p>
            <button 
              onClick={() => navigateTo('dashboard')}
              className="px-6 py-3 bg-black text-white border-4 border-black font-black uppercase"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
