import { useState } from 'react'
import { X } from 'lucide-react'

const subteamsData = {
  US: ['SDE', 'DevOps', 'CyberSec', 'QA', 'Product'],
  India: ['SDE', 'DevOps', 'CyberSec', 'QA', 'Data Science'],
  Germany: ['SDE', 'DevOps', 'CyberSec', 'QA', 'UI/UX']
}

const projectsData = [
  'Customer Portal Redesign',
  'API Gateway Migration',
  'Security Audit Q1',
  'Mobile App v2.0',
  'Data Pipeline Optimization',
  'UI Component Library'
]

export default function TaskModal({ onClose, onAdd, prefilledData }) {
  const [formData, setFormData] = useState({
    name: '',
    region: prefilledData?.region || 'US',
    subteam: prefilledData?.subteam || 'SDE',
    project: 'Customer Portal Redesign',
    priority: 'Medium',
    hours: 4
  })
  const [errors, setErrors] = useState({})

  const handleRegionChange = (region) => {
    setFormData({
      ...formData,
      region,
      subteam: subteamsData[region][0]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required'
    }
    if (formData.hours < 1 || formData.hours > 40) {
      newErrors.hours = 'Hours must be between 1 and 40'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAdd(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-[#FFE5B4] border-4 border-black p-8 w-full max-w-lg animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black uppercase">Create Task</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 border-4 border-black bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-xs font-black uppercase mb-2">
              Task Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold"
              placeholder="What needs to be done?"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-2 font-black">{errors.name}</p>
            )}
          </div>

          {/* Team Region */}
          <div>
            <label className="block text-xs font-black uppercase mb-2">
              Team Region *
            </label>
            <select
              value={formData.region}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold bg-white"
            >
              <option value="US">🇺🇸 US Team</option>
              <option value="India">🇮🇳 India Team</option>
              <option value="Germany">🇩🇪 Germany Team</option>
            </select>
          </div>

          {/* Subteam */}
          <div>
            <label className="block text-xs font-black uppercase mb-2">
              Subteam *
            </label>
            <select
              value={formData.subteam}
              onChange={(e) => setFormData({ ...formData, subteam: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold bg-white"
            >
              {subteamsData[formData.region].map(subteam => (
                <option key={subteam} value={subteam}>{subteam}</option>
              ))}
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block text-xs font-black uppercase mb-2">
              Project *
            </label>
            <select
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold bg-white"
            >
              {projectsData.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-black uppercase mb-3">
              Priority *
            </label>
            <div className="flex gap-3">
              {['Low', 'Medium', 'High'].map((priority) => (
                <label key={priority} className="flex-1">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`px-4 py-3 border-4 border-black text-center font-black uppercase cursor-pointer transition-all ${
                    formData.priority === priority 
                      ? 'bg-black text-white' 
                      : 'bg-white hover:bg-[#C8F7DC]'
                  }`}>
                    {priority}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Estimated Hours */}
          <div>
            <label className="block text-xs font-black uppercase mb-2">
              Estimated Hours *
            </label>
            <input
              type="number"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border-4 border-black focus:outline-none font-bold"
              min="1"
              max="40"
              placeholder="e.g., 8"
            />
            {errors.hours && (
              <p className="text-red-600 text-sm mt-2 font-black">{errors.hours}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-4 border-black bg-white hover:bg-[#E8E4F3] transition-all font-black uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black uppercase"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
