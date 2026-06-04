import { useState, useEffect } from 'react'

export default function Typewriter({ items }) {
  const [text, setText] = useState('')
  const [itemIdx, setItemIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = items[itemIdx]
    const delay = deleting ? 45 : 90

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDeleting(false)
          setItemIdx((i) => (i + 1) % items.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, itemIdx, items])

  return (
    <span>
      {text}
      <span className="cursor-blink" />
    </span>
  )
}
