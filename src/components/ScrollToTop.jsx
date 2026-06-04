import { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-50
                 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700
                 text-white shadow-lg flex items-center justify-center
                 transition-all hover:shadow-blue-200 dark:hover:shadow-blue-900"
    >
      <FiArrowUp size={18} />
    </button>
  )
}
