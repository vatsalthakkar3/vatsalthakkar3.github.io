import { useEffect, useRef, useState } from 'react'

function useDark() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark'))
    )
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return dark
}

const THEME = {
  dark: {
    background: 'transparent',
    mainBkg: '#1e293b',
    nodeBorder: '#3b82f6',
    clusterBkg: '#0f172a',
    clusterBorder: '#3b82f6',
    titleColor: '#e2e8f0',
    edgeLabelBackground: '#0f172a',
    lineColor: '#60a5fa',
    primaryColor: '#1e3a5f',
    primaryBorderColor: '#3b82f6',
    primaryTextColor: '#e2e8f0',
    secondaryColor: '#162032',
    secondaryBorderColor: '#3b82f6',
    secondaryTextColor: '#e2e8f0',
    tertiaryColor: '#0d1b2e',
    tertiaryBorderColor: '#2563eb',
    tertiaryTextColor: '#e2e8f0',
    fontFamily: 'ui-monospace, SFMono-Regular, monospace',
    fontSize: '14px',
    actorBkg: '#1e3a5f',
    actorBorder: '#3b82f6',
    actorTextColor: '#e2e8f0',
    actorLineColor: '#60a5fa',
    signalColor: '#60a5fa',
    signalTextColor: '#e2e8f0',
    labelBoxBkgColor: '#1e293b',
    labelBoxBorderColor: '#3b82f6',
    labelTextColor: '#e2e8f0',
    loopTextColor: '#e2e8f0',
    noteBorderColor: '#3b82f6',
    noteBkgColor: '#0f172a',
    noteTextColor: '#e2e8f0',
    activationBorderColor: '#60a5fa',
    activationBkgColor: '#1e3a5f',
    sequenceNumberColor: '#e2e8f0',
    pie1: '#1d4ed8', pie2: '#0d9488', pie3: '#7c3aed',
    pie4: '#b45309', pie5: '#be123c', pie6: '#15803d',
    pieTitleTextColor: '#e2e8f0',
    pieLegendTextColor: '#94a3b8',
    pieStrokeColor: '#1e293b',
    pieOuterStrokeColor: '#334155',
  },
  light: {
    background: 'transparent',
    mainBkg: '#eff6ff',
    nodeBorder: '#2563eb',
    clusterBkg: '#f0f4ff',
    clusterBorder: '#93c5fd',
    titleColor: '#1e293b',
    edgeLabelBackground: '#f8fafc',
    lineColor: '#2563eb',
    primaryColor: '#dbeafe',
    primaryBorderColor: '#2563eb',
    primaryTextColor: '#1e293b',
    secondaryColor: '#f1f5f9',
    secondaryBorderColor: '#93c5fd',
    secondaryTextColor: '#334155',
    tertiaryColor: '#f8fafc',
    tertiaryBorderColor: '#bfdbfe',
    tertiaryTextColor: '#334155',
    fontFamily: 'ui-monospace, SFMono-Regular, monospace',
    fontSize: '14px',
    actorBkg: '#dbeafe',
    actorBorder: '#2563eb',
    actorTextColor: '#1e293b',
    actorLineColor: '#2563eb',
    signalColor: '#2563eb',
    signalTextColor: '#1e293b',
    labelBoxBkgColor: '#f1f5f9',
    labelBoxBorderColor: '#93c5fd',
    labelTextColor: '#1e293b',
    loopTextColor: '#1e293b',
    noteBorderColor: '#93c5fd',
    noteBkgColor: '#eff6ff',
    noteTextColor: '#1e293b',
    activationBorderColor: '#2563eb',
    activationBkgColor: '#dbeafe',
    sequenceNumberColor: '#1e293b',
    pie1: '#2563eb', pie2: '#0d9488', pie3: '#7c3aed',
    pie4: '#d97706', pie5: '#e11d48', pie6: '#16a34a',
    pieTitleTextColor: '#1e293b',
    pieLegendTextColor: '#475569',
    pieStrokeColor: '#ffffff',
    pieOuterStrokeColor: '#93c5fd',
  },
}

async function renderChart(chart, dark, id) {
  const m = (await import('mermaid')).default
  m.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: dark ? THEME.dark : THEME.light,
    flowchart: { htmlLabels: true, curve: 'basis' },
    sequence: { mirrorActors: false },
  })
  return m.render(id, chart)
}

export default function Mermaid({ chart }) {
  const dark = useDark()
  const [svg, setSvg] = useState('')
  const ref = useRef(null)
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    let cancelled = false
    renderChart(chart, dark, id.current)
      .then(({ svg: out }) => { if (!cancelled) setSvg(out) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [chart, dark])

  return svg
    ? <div ref={ref} className="my-4 flex justify-center overflow-x-auto"
           dangerouslySetInnerHTML={{ __html: svg }} />
    : <div ref={ref} className="my-4 h-16 flex items-center justify-center text-xs text-slate-400">
        Rendering diagram…
      </div>
}
