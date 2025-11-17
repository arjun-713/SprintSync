import { useState } from 'react'
import { Bot, X } from 'lucide-react'

export default function AIAssistant({ tasks }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const getContextMessage = () => {
    const backlogCount = tasks.filter(t => t.status === 'backlog').length
    const todoCount = tasks.filter(t => t.status === 'todo').length
    const inProgressCount = tasks.filter(t => t.status === 'inProgress').length
    const doneCount = tasks.filter(t => t.status === 'done').length
    const totalTasks = tasks.length

    if (totalTasks === 0) {
      return "👋 Add tasks to get started with your sprint planning!"
    }
    if (backlogCount > 0 && todoCount === 0) {
      return "📋 Ready to plan your sprint? Drag tasks to the board!"
    }
    if (doneCount === totalTasks && totalTasks > 0) {
      return "🎉 Sprint completed! Generate summary to wrap up!"
    }
    if (inProgressCount > 0 && todoCount > 0 && doneCount > 0) {
      return "✨ Great sprint balance! Team is making solid progress!"
    }
    if (inProgressCount > 3) {
      return "⚠️ Many tasks in progress. Consider focusing on completion!"
    }
    
    return "👋 Best overlap: 3:30-5:00 PM IST\n💡 Suggested meeting slot created!"
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {showTooltip && (
        <div className="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl p-4 w-72 animate-slideUp border border-gray-200">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Assistant</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {getContextMessage()}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
