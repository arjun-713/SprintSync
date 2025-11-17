import { Folder, Calendar, Users, TrendingUp, Search, Bell, User } from 'lucide-react'
import Sidebar from './Sidebar'

const projectsData = [
  {
    id: 1,
    name: 'Customer Portal Redesign',
    status: 'In Progress',
    progress: 65,
    team: 'US',
    subteam: 'SDE',
    deadline: '2024-03-15',
    members: 8,
    color: '#0052CC'
  },
  {
    id: 2,
    name: 'API Gateway Migration',
    status: 'In Progress',
    progress: 45,
    team: 'India',
    subteam: 'DevOps',
    deadline: '2024-02-28',
    members: 5,
    color: '#36B37E'
  },
  {
    id: 3,
    name: 'Security Audit Q1',
    status: 'Planning',
    progress: 20,
    team: 'Germany',
    subteam: 'CyberSec',
    deadline: '2024-04-01',
    members: 4,
    color: '#FFAB00'
  },
  {
    id: 4,
    name: 'Mobile App v2.0',
    status: 'In Progress',
    progress: 80,
    team: 'US',
    subteam: 'SDE',
    deadline: '2024-02-20',
    members: 12,
    color: '#0052CC'
  },
  {
    id: 5,
    name: 'Data Pipeline Optimization',
    status: 'In Progress',
    progress: 55,
    team: 'India',
    subteam: 'Data Science',
    deadline: '2024-03-10',
    members: 6,
    color: '#36B37E'
  },
  {
    id: 6,
    name: 'UI Component Library',
    status: 'Completed',
    progress: 100,
    team: 'Germany',
    subteam: 'UI/UX',
    deadline: '2024-01-31',
    members: 5,
    color: '#FFAB00'
  }
]

export default function ProjectsPage({ onNavigate, activeNav }) {
  const getStatusColor = (status) => {
    if (status === 'Completed') return 'bg-[#C8F7DC]'
    if (status === 'In Progress') return 'bg-[#FFE5B4]'
    return 'bg-[#E8E4F3]'
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white border-b-4 border-black px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <h1 className="text-2xl font-black uppercase tracking-tight">PROJECTS</h1>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-12 pr-4 py-3 border-4 border-black focus:outline-none font-bold"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 border-4 border-black bg-white hover:bg-[#FFE5B4] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 border-4 border-black bg-white hover:bg-[#FFE5B4] flex items-center justify-center">
                <User className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-black border-4 border-black"></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#C8F7DC] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <Folder className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">Total</p>
            </div>
            <p className="text-5xl font-black">{projectsData.length}</p>
          </div>
          <div className="bg-[#FFE5B4] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">In Progress</p>
            </div>
            <p className="text-5xl font-black">
              {projectsData.filter(p => p.status === 'In Progress').length}
            </p>
          </div>
          <div className="bg-[#E8E4F3] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">Completed</p>
            </div>
            <p className="text-5xl font-black">
              {projectsData.filter(p => p.status === 'Completed').length}
            </p>
          </div>
          <div className="bg-[#FFB6C1] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">Members</p>
            </div>
            <p className="text-5xl font-black">
              {projectsData.reduce((sum, p) => sum + p.members, 0)}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map(project => (
            <div
              key={project.id}
              className="bg-white border-4 border-black p-6 hover:bg-[#E8E4F3] transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl font-black uppercase leading-tight">{project.name}</h3>
                <span className={`text-xs px-3 py-2 border-4 border-black font-black uppercase ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase">Progress</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{project.progress}%</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-6">
                  <div
                    className="h-full border-r-4 border-black transition-all"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: project.color
                    }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-3">
                <div className="border-t-4 border-black pt-3">
                  <span className="text-xs font-black uppercase block mb-1">Team:</span>
                  <span className="font-bold text-lg">{project.team} - {project.subteam}</span>
                </div>
                <div className="border-t-4 border-black pt-3">
                  <span className="text-xs font-black uppercase block mb-1">Deadline:</span>
                  <span className="font-bold text-lg">{project.deadline}</span>
                </div>
                <div className="border-t-4 border-black pt-3">
                  <span className="text-xs font-black uppercase block mb-1">Members:</span>
                  <span className="font-bold text-lg">{project.members}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </main>
    </div>
  )
}
