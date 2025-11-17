import { useState } from 'react'
import { Users, ChevronRight, Search, Bell, User, ArrowLeft, Plus } from 'lucide-react'
import Sidebar from './Sidebar'
import TaskModal from './TaskModal'

const teamsData = {
  India: {
    color: '#36B37E',
    bgColor: '#E3FCEF',
    subteams: [
      { name: 'SDE', members: 12, lead: 'Raj Kumar' },
      { name: 'DevOps', members: 5, lead: 'Priya Singh' },
      { name: 'CyberSec', members: 4, lead: 'Amit Patel' },
      { name: 'QA', members: 8, lead: 'Sneha Reddy' },
      { name: 'Data Science', members: 6, lead: 'Arjun Mehta' }
    ]
  },
  Germany: {
    color: '#FFAB00',
    bgColor: '#FFF0B3',
    subteams: [
      { name: 'SDE', members: 10, lead: 'Hans Mueller' },
      { name: 'DevOps', members: 4, lead: 'Anna Schmidt' },
      { name: 'CyberSec', members: 3, lead: 'Klaus Weber' },
      { name: 'QA', members: 6, lead: 'Maria Fischer' },
      { name: 'UI/UX', members: 5, lead: 'Stefan Wagner' }
    ]
  },
  US: {
    color: '#0052CC',
    bgColor: '#DEEBFF',
    subteams: [
      { name: 'SDE', members: 15, lead: 'John Smith' },
      { name: 'DevOps', members: 6, lead: 'Sarah Johnson' },
      { name: 'CyberSec', members: 5, lead: 'Michael Brown' },
      { name: 'QA', members: 9, lead: 'Emily Davis' },
      { name: 'Product', members: 7, lead: 'David Wilson' }
    ]
  }
}

export default function TeamsPage({ onNavigate, activeNav, tasks, setTasks }) {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedSubteam, setSelectedSubteam] = useState(null)

  const handleAssignTask = (subteam) => {
    setSelectedSubteam({ region: selectedTeam, subteam: subteam.name })
    setShowTaskModal(true)
  }

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(),
      status: 'backlog'
    }
    if (setTasks) {
      setTasks(prevTasks => [...prevTasks, task])
    }
    setShowTaskModal(false)
    setSelectedSubteam(null)
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
              <h1 className="text-2xl font-black uppercase tracking-tight">TEAMS</h1>
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
        {!selectedTeam ? (
          /* Team Selection View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(teamsData).map(([region, data]) => (
              <div
                key={region}
                onClick={() => setSelectedTeam(region)}
                className="bg-white border-4 border-black p-6 cursor-pointer transition-all hover:bg-[#FFE5B4] group"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black uppercase">{region}</h2>
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-all" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase text-sm">Total Subteams</span>
                    <span className="text-2xl font-black bg-black text-white px-3 py-1 border-4 border-black">{data.subteams.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase text-sm">Total Members</span>
                    <span className="text-2xl font-black bg-black text-white px-3 py-1 border-4 border-black">
                      {data.subteams.reduce((sum, st) => sum + st.members, 0)}
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t-4 border-black">
                  <div className="flex flex-wrap gap-2">
                    {data.subteams.map(st => (
                      <span
                        key={st.name}
                        className="text-xs px-3 py-2 border-4 border-black font-black uppercase"
                        style={{ backgroundColor: data.bgColor }}
                      >
                        {st.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Subteam Details View */
          <div>
            <button
              onClick={() => setSelectedTeam(null)}
              className="mb-8 flex items-center gap-2 px-6 py-3 border-4 border-black bg-white hover:bg-[#C8F7DC] transition-all font-black uppercase"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Teams
            </button>
            <div className="mb-8 bg-[#FFE5B4] border-4 border-black p-6">
              <h2 className="text-4xl font-black uppercase mb-2">{selectedTeam} Teams</h2>
              <p className="text-lg font-bold">
                {teamsData[selectedTeam].subteams.reduce((sum, st) => sum + st.members, 0)} total members across {teamsData[selectedTeam].subteams.length} subteams
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamsData[selectedTeam].subteams.map(subteam => (
                <div
                  key={subteam.name}
                  className="bg-white border-4 border-black p-6 hover:bg-[#E8E4F3] transition-all"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black uppercase">{subteam.name}</h3>
                    <span
                      className="px-4 py-2 border-4 border-black font-black text-lg"
                      style={{ 
                        backgroundColor: teamsData[selectedTeam].bgColor
                      }}
                    >
                      {subteam.members}
                    </span>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="border-t-4 border-black pt-3">
                      <span className="text-xs font-black uppercase block mb-1">Team Lead:</span>
                      <span className="font-bold text-lg">{subteam.lead}</span>
                    </div>
                    <div className="border-t-4 border-black pt-3">
                      <span className="text-xs font-black uppercase block mb-1">Members:</span>
                      <span className="font-bold text-lg">{subteam.members} people</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssignTask(subteam)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black uppercase text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Assign Task
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </main>

      {/* Task Assignment Modal */}
      {showTaskModal && selectedSubteam && (
        <TaskModal 
          onClose={() => {
            setShowTaskModal(false)
            setSelectedSubteam(null)
          }}
          onAdd={addTask}
          prefilledData={{
            region: selectedSubteam.region,
            subteam: selectedSubteam.subteam
          }}
        />
      )}
    </div>
  )
}
