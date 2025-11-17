import { useState } from 'react'
import { Plus, Filter, Search, Bell, User } from 'lucide-react'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import Sidebar from './Sidebar'

export default function TasksPage({ tasks, setTasks, onNavigate, activeNav }) {
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [draggedTask, setDraggedTask] = useState(null)

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(),
      status: 'backlog'
    }
    setTasks([...tasks, task])
  }

  const handleDragStart = (task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (status) => {
    if (draggedTask) {
      setTasks(tasks.map(task => 
        task.id === draggedTask.id ? { ...task, status } : task
      ))
      setDraggedTask(null)
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesRegion = filterRegion === 'all' || task.region === filterRegion
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesRegion && matchesPriority && matchesSearch
  })

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(task => task.status === status)
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
              <h1 className="text-2xl font-black uppercase tracking-tight">ALL TASKS</h1>
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
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black uppercase"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
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
        <div className="bg-white border-4 border-black p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-6 h-6" />
            <h2 className="text-xl font-black uppercase">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs font-black uppercase mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full pl-11 pr-4 py-3 border-4 border-black focus:outline-none font-bold"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-black uppercase mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold bg-white"
              >
                <option value="all">All Status</option>
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-xs font-black uppercase mb-2">Region</label>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold bg-white"
              >
                <option value="all">All Regions</option>
                <option value="US">🇺🇸 US</option>
                <option value="India">🇮🇳 India</option>
                <option value="Germany">🇩🇪 Germany</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-xs font-black uppercase mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t-4 border-black">
            <p className="font-black uppercase text-sm">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </p>
          </div>
        </div>

        {/* Task Board */}
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-black uppercase mb-6">Task Board</h2>
          
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

      {/* Task Modal */}
      {showModal && (
        <TaskModal 
          onClose={() => setShowModal(false)} 
          onAdd={addTask}
        />
      )}
      </main>
    </div>
  )
}
