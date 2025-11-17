import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function ScrumBot({ message, onDismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onDismiss, 300)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [message, onDismiss])

  if (!message) return null

  return (
    <div className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-2xl p-4 max-w-xs flex items-start gap-3">
        <MessageCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}
