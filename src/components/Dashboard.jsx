import { useState, useEffect } from 'react'
import { Plus, BarChart3, ArrowLeft, Layers, Users, Folder } from 'lucide-react'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import TimezonePanel from './TimezonePanel'

export default function Dashboard({ tasks, setTasks, onNavigate }) {
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

  const getEmployeeCount = (region) => {
    // Simulate random employee counts
    const counts = { India: 4, Germany: 3, US: 5 }
    return counts[region]
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

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('landing')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#42526E]" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0052CC] rounded"></div>
                <div>
                  <h1 className="text-xl font-bold text-[#172B4D]">SprintSync</h1>
                  <p className="text-xs text-[#42526E]">Sprint Planning Board</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => onNavigate('teams')}
                  className="flex items-center gap-2 px-4 py-2 text-[#42526E] hover:text-[#0052CC] hover:bg-[#F4F5F7] rounded-lg transition-all font-semibold"
                >
                  <Users className="w-4 h-4" />
                  Teams
                </button>
                <button
                  onClick={() => onNavigate('projects')}
                  className="flex items-center gap-2 px-4 py-2 text-[#42526E] hover:text-[#0052CC] hover:bg-[#F4F5F7] rounded-lg transition-all font-semibold"
                >
                  <Folder className="w-4 h-4" />
                  Projects
                </button>
              </div>
            </div>
            <button
              onClick={() => onNavigate('summary')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0052CC] text-white rounded hover:bg-[#0747A6] transition-all shadow-sm font-semibold"
            >
              <BarChart3 className="w-5 h-5" />
              View Summary
            </button>
          </div>
        </div>

        {/* Real-time Clock Bar */}
        <div className="bg-[#F4F5F7] border-t border-gray-200">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#42526E] font-medium">India</span>
                <span className="text-[#172B4D] font-bold text-lg tabular-nums">
                  {getTimeForTimezone('Asia/Kolkata')}
                </span>
                <span className="text-[#36B37E] font-bold">({getEmployeeCount('India')})</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="text-[#42526E] font-medium">Germany</span>
                <span className="text-[#172B4D] font-bold text-lg tabular-nums">
                  {getTimeForTimezone('Europe/Berlin')}
                </span>
                <span className="text-[#FFAB00] font-bold">({getEmployeeCount('Germany')})</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="text-[#42526E] font-medium">US (PST)</span>
                <span className="text-[#172B4D] font-bold text-lg tabular-nums">
                  {getTimeForTimezone('America/Los_Angeles')}
                </span>
                <span className="text-[#0052CC] font-bold">({getEmployeeCount('US')})</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Backlog Column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#172B4D] flex items-center gap-2 text-base">
                  <Layers className="w-5 h-5 text-[#42526E]" />
                  Backlog
                  <span className="bg-[#DFE1E6] text-[#42526E] text-xs px-2.5 py-1 rounded-full font-semibold">
                    {getTasksByStatus('backlog').length}
                  </span>
                </h2>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full mb-4 px-4 py-3 border-2 border-dashed border-[#DFE1E6] rounded-lg text-[#42526E] hover:border-[#0052CC] hover:text-[#0052CC] hover:bg-[#DEEBFF] transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Create task
              </button>
              <div 
                className="space-y-3 min-h-[300px]"
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
          </div>

          {/* Sprint Board */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h2 className="font-bold text-[#172B4D] mb-5 text-lg">Active Sprint</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* To Do */}
                <div>
                  <div className="flex justify-between items-center mb-3 pb-3 border-b-2 border-[#0052CC]">
                    <h3 className="font-bold text-[#172B4D] text-sm uppercase tracking-wide">To Do</h3>
                    <span className="bg-[#DEEBFF] text-[#0052CC] text-xs px-2.5 py-1 rounded-full font-bold">
                      {getTasksByStatus('todo').length}
                    </span>
                  </div>
                  <div 
                    className="space-y-3 min-h-[500px] bg-[#F4F5F7] rounded-lg p-3"
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
                  <div className="flex justify-between items-center mb-3 pb-3 border-b-2 border-[#FFAB00]">
                    <h3 className="font-bold text-[#172B4D] text-sm uppercase tracking-wide">In Progress</h3>
                    <span className="bg-[#FFF0B3] text-[#FF991F] text-xs px-2.5 py-1 rounded-full font-bold">
                      {getTasksByStatus('inProgress').length}
                    </span>
                  </div>
                  <div 
                    className="space-y-3 min-h-[500px] bg-[#FFFAE6] rounded-lg p-3"
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
                  <div className="flex justify-between items-center mb-3 pb-3 border-b-2 border-[#36B37E]">
                    <h3 className="font-bold text-[#172B4D] text-sm uppercase tracking-wide">Done</h3>
                    <span className="bg-[#E3FCEF] text-[#00875A] text-xs px-2.5 py-1 rounded-full font-bold">
                      {getTasksByStatus('done').length}
                    </span>
                  </div>
                  <div 
                    className="space-y-3 min-h-[500px] bg-[#E3FCEF] rounded-lg p-3"
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

          {/* Timezone Panel */}
          <div className="lg:col-span-3">
            <TimezonePanel />
          </div>
        </div>
      </div>

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
