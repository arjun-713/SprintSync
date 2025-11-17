import { useState, useEffect } from 'react'
import { 
  CheckSquare, RefreshCw,
  Plus, Search, Bell, User, Calendar, Clock, Users, LayoutDashboard
} from 'lucide-react'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import Sidebar from './Sidebar'

export default function DashboardNew({ tasks, setTasks, onNavigate, activeNav }) {
  const [showModal, setShowModal] = useState(false)
  const [draggedTask, setDraggedTask] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeForTimezone = (timezone) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false,
      timeZone: timezone 
    }
    return new Intl.DateTimeFormat('en-US', options).format(currentTime)
  }

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(),
      status: 'backlog'
    }
    setTasks([...tasks, task])
  }

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleDragStart = (task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (status) => {
    if (draggedTask) {
      moveTask(draggedTask.id, status)
      setDraggedTask(null)
    }
  }

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  const completedTasks = tasks.filter(t => t.status === 'done').length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

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
              <h1 className="text-2xl font-black uppercase tracking-tight">SPRINTSYNC</h1>
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
          {/* Welcome Section */}
          <div className="mb-8 bg-[#FFE5B4] border-4 border-black p-6">
            <p className="text-sm font-bold uppercase mb-1">DECEMBER 22ND, 2023</p>
            <h1 className="text-4xl font-black uppercase mb-2">
              HI TEAM, LET'S BE PRODUCTIVE TODAY
            </h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs font-bold uppercase mb-1">Employee ID:</p>
                <p className="text-lg font-black">WSF00124</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase mb-1">Joining Date:</p>
                <p className="text-lg font-black">May 10, 2023</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase mb-1">Performance:</p>
                <p className="text-lg font-black">80%</p>
              </div>
            </div>
          </div>

          {/* Time Zone Bar */}
          <div className="bg-white border-4 border-black p-6 mb-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="border-4 border-black p-4 bg-[#E8E4F3]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-black border-4 border-black flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-black uppercase">India</p>
                </div>
                <p className="text-4xl font-black tabular-nums">
                  {getTimeForTimezone('Asia/Kolkata')}
                </p>
                <p className="text-sm font-bold mt-1">(4 online)</p>
              </div>
              <div className="border-4 border-black p-4 bg-[#E8E4F3]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-black border-4 border-black flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-black uppercase">Germany</p>
                </div>
                <p className="text-4xl font-black tabular-nums">
                  {getTimeForTimezone('Europe/Berlin')}
                </p>
                <p className="text-sm font-bold mt-1">(3 online)</p>
              </div>
              <div className="border-4 border-black p-4 bg-[#E8E4F3]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-black border-4 border-black flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-black uppercase">US (PST)</p>
                </div>
                <p className="text-4xl font-black tabular-nums">
                  {getTimeForTimezone('America/Los_Angeles')}
                </p>
                <p className="text-sm font-bold mt-1">(5 online)</p>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#C8F7DC] border-4 border-black p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <p className="text-sm font-black uppercase">Tasks Done</p>
              </div>
              <p className="text-5xl font-black mb-2">{completedTasks}</p>
              <p className="text-sm font-bold">+{completionRate}% THIS WEEK</p>
            </div>
            <div className="bg-[#C8F7DC] border-4 border-black p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <p className="text-sm font-black uppercase">Active</p>
              </div>
              <p className="text-5xl font-black mb-2">
                {getTasksByStatus('todo').length + getTasksByStatus('inProgress').length}
              </p>
              <p className="text-sm font-bold">IN PROGRESS</p>
            </div>
            <div className="bg-[#C8F7DC] border-4 border-black p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <p className="text-sm font-black uppercase">Total</p>
              </div>
              <p className="text-5xl font-black mb-2">{totalTasks}</p>
              <p className="text-sm font-bold">ALL TASKS</p>
            </div>
            <div className="bg-[#C8F7DC] border-4 border-black p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-sm font-black uppercase">Team</p>
              </div>
              <p className="text-5xl font-black mb-2">12</p>
              <p className="text-sm font-bold">MEMBERS</p>
            </div>
          </div>

          {/* Sprint Board */}
          <div className="bg-white border-4 border-black p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black uppercase">TASKS UPDATES</h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black uppercase"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Backlog */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-4 border-black">
                  <h3 className="font-black uppercase text-lg">Backlog</h3>
                  <span className="bg-black text-white px-3 py-1 font-black border-4 border-black">
                    {getTasksByStatus('backlog').length}
                  </span>
                </div>
                <div 
                  className="space-y-3 min-h-[400px] bg-[#F5F5F5] border-4 border-black p-3"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop('backlog')}
                >
                  {getTasksByStatus('backlog').map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onDragStart={handleDragStart}
                    />
                  ))}
                </div>
              </div>

              {/* To Do */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-4 border-black">
                  <h3 className="font-black uppercase text-lg">To Do</h3>
                  <span className="bg-[#C8F7DC] text-black px-3 py-1 font-black border-4 border-black">
                    {getTasksByStatus('todo').length}
                  </span>
                </div>
                <div 
                  className="space-y-3 min-h-[400px] bg-[#C8F7DC] border-4 border-black p-3"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop('todo')}
                >
                  {getTasksByStatus('todo').map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onDragStart={handleDragStart}
                    />
                  ))}
                </div>
              </div>

              {/* In Progress */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-4 border-black">
                  <h3 className="font-black uppercase text-lg">In Progress</h3>
                  <span className="bg-[#FFE5B4] text-black px-3 py-1 font-black border-4 border-black">
                    {getTasksByStatus('inProgress').length}
                  </span>
                </div>
                <div 
                  className="space-y-3 min-h-[400px] bg-[#FFE5B4] border-4 border-black p-3"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop('inProgress')}
                >
                  {getTasksByStatus('inProgress').map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onDragStart={handleDragStart}
                    />
                  ))}
                </div>
              </div>

              {/* Done */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-4 border-black">
                  <h3 className="font-black uppercase text-lg">Done</h3>
                  <span className="bg-[#E8E4F3] text-black px-3 py-1 font-black border-4 border-black">
                    {getTasksByStatus('done').length}
                  </span>
                </div>
                <div 
                  className="space-y-3 min-h-[400px] bg-[#E8E4F3] border-4 border-black p-3"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop('done')}
                >
                  {getTasksByStatus('done').map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onDragStart={handleDragStart}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Task Modal */}
      {showModal && (
        <TaskModal 
          onClose={() => setShowModal(false)} 
          onAdd={addTask}
        />
      )}
    </div>
  )
}
