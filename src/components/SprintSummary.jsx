import { useState } from 'react'
import { Download, Calendar, CheckCircle2, Search, Bell, User } from 'lucide-react'
import Sidebar from './Sidebar'

export default function SprintSummary({ tasks, onNavigate, activeNav }) {
  const [showToast, setShowToast] = useState(false)

  const handleExport = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getTasksByRegion = () => {
    const regions = { US: 0, India: 0, Germany: 0 }
    tasks.forEach(task => {
      regions[task.region]++
    })
    return regions
  }

  const getTasksByStatus = () => {
    const statuses = {
      backlog: tasks.filter(t => t.status === 'backlog').length,
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'inProgress').length,
      done: tasks.filter(t => t.status === 'done').length
    }
    return statuses
  }

  const regionData = getTasksByRegion()
  const statusData = getTasksByStatus()
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0)
  const completedHours = tasks.filter(t => t.status === 'done').reduce((sum, task) => sum + task.hours, 0)

  const nextSprintDate = new Date()
  nextSprintDate.setDate(nextSprintDate.getDate() + 14)

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
              <h1 className="text-2xl font-black uppercase tracking-tight">SPRINT SUMMARY</h1>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#C8F7DC] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">Total Tasks</p>
            </div>
            <p className="text-5xl font-black">{tasks.length}</p>
          </div>

          <div className="bg-[#FFE5B4] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">Completed</p>
            </div>
            <p className="text-5xl font-black">{statusData.done}</p>
          </div>

          <div className="bg-[#E8E4F3] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">Total Hours</p>
            </div>
            <p className="text-5xl font-black">{totalHours}h</p>
          </div>

          <div className="bg-[#FFB6C1] border-4 border-black p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase">Done Hours</p>
            </div>
            <p className="text-5xl font-black">{completedHours}h</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tasks by Region */}
          <div className="bg-white border-4 border-black p-6">
            <h2 className="text-2xl font-black uppercase mb-6">Tasks by Region</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase">🇺🇸 US Team</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{regionData.US}</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-8">
                  <div
                    className="bg-[#E8E4F3] h-full border-r-4 border-black transition-all duration-500"
                    style={{ width: `${(regionData.US / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase">🇮🇳 India Team</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{regionData.India}</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-8">
                  <div
                    className="bg-[#C8F7DC] h-full border-r-4 border-black transition-all duration-500"
                    style={{ width: `${(regionData.India / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase">🇩🇪 Germany Team</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{regionData.Germany}</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-8">
                  <div
                    className="bg-[#FFE5B4] h-full border-r-4 border-black transition-all duration-500"
                    style={{ width: `${(regionData.Germany / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks by Status */}
          <div className="bg-white border-4 border-black p-6">
            <h2 className="text-2xl font-black uppercase mb-6">Tasks by Status</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase">Backlog</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{statusData.backlog}</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-8">
                  <div
                    className="bg-[#F5F5F5] h-full border-r-4 border-black transition-all duration-500"
                    style={{ width: `${(statusData.backlog / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase">To Do</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{statusData.todo}</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-8">
                  <div
                    className="bg-[#C8F7DC] h-full border-r-4 border-black transition-all duration-500"
                    style={{ width: `${(statusData.todo / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase">In Progress</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{statusData.inProgress}</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-8">
                  <div
                    className="bg-[#FFE5B4] h-full border-r-4 border-black transition-all duration-500"
                    style={{ width: `${(statusData.inProgress / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase">Done</span>
                  <span className="text-lg font-black bg-black text-white px-3 py-1 border-4 border-black">{statusData.done}</span>
                </div>
                <div className="w-full bg-white border-4 border-black h-8">
                  <div
                    className="bg-[#E8E4F3] h-full border-r-4 border-black transition-all duration-500"
                    style={{ width: `${(statusData.done / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Sprint */}
        <div className="bg-[#FFB6C1] border-4 border-black p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black uppercase mb-3">Next Sprint Suggested</h2>
              <p className="text-lg font-bold">
                Starting: {nextSprintDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-center">
          <button
            onClick={handleExport}
            className="px-10 py-4 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all flex items-center gap-3 text-lg font-black uppercase"
          >
            <Download className="w-6 h-6" />
            Export as PDF
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C8F7DC] border-4 border-black px-6 py-4 animate-slideUp flex items-center gap-3">
          <div className="w-10 h-10 bg-black border-4 border-black flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-black uppercase">PDF exported successfully!</span>
        </div>
      )}
      </main>
    </div>
  )
}
