import { FiCheckCircle } from 'react-icons/fi'

export default function Toast({ message }) {
  if (!message) return null
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50
                    flex items-center gap-2 px-4 py-2.5 rounded-full
                    glass text-sm font-medium shadow-lg
                    text-slate-800 dark:text-slate-200
                    animate-[pageEnter_0.2s_ease_both]
                    pointer-events-none select-none whitespace-nowrap">
      <FiCheckCircle size={14} className="text-emerald-500" />
      {message}
    </div>
  )
}
