import { useEffect, useRef, useState } from 'react'

let mermaidReady = false

async function ensureMermaid(dark) {
  const m = await import('mermaid')
  m.default.initialize({
    startOnLoad: false,
    theme: dark ? 'dark' : 'neutral',
    themeVariables: dark
      ? { background: 'transparent', primaryColor: '#1e3a5f', lineColor: '#60a5fa' }
      : { background: 'transparent', primaryColor: '#dbeafe', lineColor: '#2563eb' },
  })
  mermaidReady = true
  return m.default
}

export default function Mermaid({ chart, dark }) {
  const ref = useRef(null)
  const [svg, setSvg] = useState('')
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    let cancelled = false
    ensureMermaid(dark).then(async (m) => {
      if (cancelled) return
      try {
        const { svg: out } = await m.render(id.current, chart)
        if (!cancelled) setSvg(out)
      } catch {
        // render error — leave blank
      }
    })
    return () => { cancelled = true }
  }, [chart, dark])

  return svg
    ? <div ref={ref} className="my-4 flex justify-center overflow-x-auto"
           dangerouslySetInnerHTML={{ __html: svg }} />
    : <div ref={ref} className="my-4 h-16 flex items-center justify-center text-xs text-slate-400">
        Rendering diagram…
      </div>
}
