import { useState } from 'react'
import { 
  LayoutDashboard, CheckSquare, BarChart3, Settings, LogOut,
  Users, Folder, ChevronRight, ChevronLeft, Video
} from 'lucide-react'

export default function Sidebar({ activeNav, onNavigate }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <aside className={`${sidebarExpanded ? 'w-64' : 'w-20'} bg-[#C8F7DC] border-r-4 border-black flex flex-col py-6 transition-all duration-300 relative`}>
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
        className="absolute -right-3 top-6 w-6 h-12 bg-black border-4 border-black flex items-center justify-center hover:bg-[#FFE5B4] transition-all z-10"
        title={sidebarExpanded ? "Collapse" : "Expand"}
      >
        {sidebarExpanded ? (
          <ChevronLeft className="w-4 h-4 text-white" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Logo */}
      <div className={`mb-8 ${sidebarExpanded ? 'px-6' : 'flex justify-center'}`}>
        <div className={`flex items-center gap-3 ${sidebarExpanded ? '' : 'justify-center'}`}>
          <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-xl">S</span>
          </div>
          {sidebarExpanded && (
            <span className="text-xl font-black uppercase whitespace-nowrap">SprintSync</span>
          )}
        </div>
      </div>

      {/* Navigation Icons */}
      <nav className={`flex-1 flex flex-col gap-4 ${sidebarExpanded ? 'px-6' : 'items-center'}`}>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black flex items-center justify-center gap-3 transition-all group relative ${
            activeNav === 'dashboard'
              ? 'bg-black text-white'
              : 'bg-white hover:bg-[#FFE5B4]'
          }`}
          title={!sidebarExpanded ? "Dashboard" : ""}
        >
          <LayoutDashboard className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Dashboard</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Dashboard
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('tasks')}
          className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black flex items-center justify-center gap-3 transition-all group relative ${
            activeNav === 'tasks'
              ? 'bg-black text-white'
              : 'bg-white hover:bg-[#FFE5B4]'
          }`}
          title={!sidebarExpanded ? "Tasks" : ""}
        >
          <CheckSquare className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Tasks</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Tasks
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('teams')}
          className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black flex items-center justify-center gap-3 transition-all group relative ${
            activeNav === 'teams'
              ? 'bg-black text-white'
              : 'bg-white hover:bg-[#FFE5B4]'
          }`}
          title={!sidebarExpanded ? "Teams" : ""}
        >
          <Users className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Teams</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Teams
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('projects')}
          className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black flex items-center justify-center gap-3 transition-all group relative ${
            activeNav === 'projects'
              ? 'bg-black text-white'
              : 'bg-white hover:bg-[#FFE5B4]'
          }`}
          title={!sidebarExpanded ? "Projects" : ""}
        >
          <Folder className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Projects</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Projects
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('summary')}
          className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black flex items-center justify-center gap-3 transition-all group relative ${
            activeNav === 'summary'
              ? 'bg-black text-white'
              : 'bg-white hover:bg-[#FFE5B4]'
          }`}
          title={!sidebarExpanded ? "Reports" : ""}
        >
          <BarChart3 className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Reports</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Reports
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('meetings')}
          className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black flex items-center justify-center gap-3 transition-all group relative ${
            activeNav === 'meetings'
              ? 'bg-black text-white'
              : 'bg-white hover:bg-[#FFE5B4]'
          }`}
          title={!sidebarExpanded ? "Meetings" : ""}
        >
          <Video className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Meetings</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Meetings
            </span>
          )}
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className={`flex flex-col gap-4 ${sidebarExpanded ? 'px-6' : 'items-center'}`}>
        <button className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black bg-white hover:bg-[#FFE5B4] flex items-center justify-center gap-3 transition-all group relative`}
          title={!sidebarExpanded ? "Settings" : ""}
        >
          <Settings className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Settings</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Settings
            </span>
          )}
        </button>
        <button 
          onClick={() => onNavigate('landing')}
          className={`${sidebarExpanded ? 'w-full justify-start px-4' : 'w-12'} h-12 border-4 border-black bg-white hover:bg-[#FFE5B4] flex items-center justify-center gap-3 transition-all group relative`}
          title={!sidebarExpanded ? "Logout" : ""}
        >
          <LogOut className={`w-6 h-6 ${sidebarExpanded ? 'flex-shrink-0' : ''}`} />
          {sidebarExpanded && <span className="font-black uppercase text-sm">Logout</span>}
          {!sidebarExpanded && (
            <span className="absolute left-full ml-4 px-3 py-2 bg-black text-white border-4 border-black font-black uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}
