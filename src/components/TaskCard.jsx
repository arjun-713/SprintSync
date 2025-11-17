import { Clock } from 'lucide-react'

const regionColors = {
  US: 'bg-[#E8E4F3]',
  India: 'bg-[#C8F7DC]',
  Germany: 'bg-[#FFE5B4]'
}

const priorityConfig = {
  Low: { color: 'bg-white', label: 'LOW' },
  Medium: { color: 'bg-[#FFE5B4]', label: 'MED' },
  High: { color: 'bg-[#FFB6C1]', label: 'HIGH' }
}

export default function TaskCard({ task, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className="bg-white p-4 border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform cursor-move"
    >
      <h4 className="font-black text-sm uppercase mb-3 leading-tight">
        {task.name}
      </h4>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs px-2 py-1 font-black border-2 border-black ${regionColors[task.region]}`}>
          {task.region}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 font-black border-2 border-black ${priorityConfig[task.priority].color}`}>
            {priorityConfig[task.priority].label}
          </span>
          <div className="flex items-center gap-1 text-xs font-black bg-white border-2 border-black px-2 py-1">
            <Clock className="w-3 h-3" />
            {task.hours}h
          </div>
        </div>
      </div>
    </div>
  )
}
