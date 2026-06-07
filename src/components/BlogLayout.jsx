import { useState, useEffect, useRef } from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'
import Mermaid from './Mermaid'

function Callout({ label, children }) {
  return (
    <div className="my-4 p-4 rounded-xl glass-inner border-l-2 border-accent/40">
      {label && <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5">{label}</p>}
      <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">{children}</p>
    </div>
  )
}

function TableOfContents({ headings, activeId }) {
  if (!headings.length) return null
  return (
    <nav aria-label="On this page">
      <p className="text-[10px] font-semibold uppercase tracking-widest
                    text-slate-400 dark:text-slate-600 mb-3">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-slate-200 dark:border-white/[0.07]">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={[
                'block text-[11px] leading-snug py-0.5 pl-3 -ml-px transition-all duration-150 border-l',
                h.level === 3 ? 'pl-5' : '',
                activeId === h.id
                  ? 'text-accent font-medium border-accent'
                  : 'text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 border-transparent',
              ].join(' ')}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// HTML element overrides — applied to all MDX content
export const mdxComponents = {
  h2: ({ children, id }) => (
    <h2 id={id} className="text-[17px] font-semibold text-slate-900 dark:text-slate-100
                           mb-4 mt-10 first:mt-0 pb-2.5 scroll-mt-6
                           border-b border-slate-200 dark:border-white/[0.07]">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 mt-6 scroll-mt-6">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="leading-[1.9] mb-4">{children}</p>,
  ul: ({ children }) => <ul className="space-y-2 my-3">{children}</ul>,
  ol: ({ children }) => <ol className="space-y-2 my-3 list-decimal list-inside">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-2.5 items-start">
      <span className="mt-2.5 w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  Mermaid,
  pre: ({ children, className, 'data-language': lang, ...props }) => {
    const label = lang && lang !== 'plaintext' && lang !== 'text' ? lang : null
    return (
      <div className="my-5 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08]
                      bg-white dark:bg-[#0d1117]">
        {label && (
          <div className="flex items-center justify-between px-4 py-2
                          bg-black/[0.04] dark:bg-white/[0.03]
                          border-b border-black/[0.06] dark:border-white/[0.05]">
            <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">
              {label}
            </span>
          </div>
        )}
        <pre
          {...props}
          className={[
            'overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed',
            className ?? '',
          ].join(' ')}
        >
          {children}
        </pre>
      </div>
    )
  },
  code: ({ children, className }) => {
    if (typeof children !== 'string') return <code className={className}>{children}</code>
    if (className) return <code className={className}>{children}</code>
    return (
      <code className="font-mono text-[12.5px] text-accent bg-accent/[0.07] dark:bg-accent/[0.09]
                       px-1.5 py-0.5 rounded border border-accent/[0.16] dark:border-accent/[0.18]">
        {children}
      </code>
    )
  },
  blockquote: ({ children }) => (
    <div className="my-4 p-4 rounded-xl glass-inner border-l-2 border-accent/40
                    text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed [&>p]:mb-0">
      {children}
    </div>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-800 dark:text-slate-200">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <div className="sep my-8" />,
  img: ({ src, alt }) => (
    <figure className="my-6">
      <div className="rounded-xl overflow-hidden glass-inner bg-slate-50 dark:bg-white/[0.02]">
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-600 italic leading-snug px-2">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener" className="text-accent hover:underline underline-offset-2">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl glass-inner">
      <table className="w-full text-xs text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 font-semibold text-slate-800 dark:text-slate-200
                   border-b border-slate-200 dark:border-white/[0.07]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-slate-600 dark:text-slate-400
                   border-b border-slate-100 dark:border-white/[0.04]">{children}</td>
  ),
  Callout,
}

export default function BlogLayout({ frontmatter, children }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const articleRef = useRef(null)

  // Extract headings after render
  useEffect(() => {
    const els = [...(articleRef.current?.querySelectorAll('h2[id], h3[id]') ?? [])]
    setHeadings(els.map(el => ({
      id: el.id,
      text: el.textContent,
      level: el.tagName === 'H2' ? 2 : 3,
    })))
  }, [children])

  // Highlight active heading on scroll
  useEffect(() => {
    if (!headings.length) return
    const scrollEl = document.getElementById('main-scroll') ?? undefined
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { root: scrollEl, rootMargin: '-8% 0% -80% 0%', threshold: 0 }
    )
    const els = articleRef.current?.querySelectorAll('h2[id], h3[id]') ?? []
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  return (
    <div className="glass rounded-2xl p-5 lg:p-8">
      <header className="mb-8 pb-6 border-b border-slate-200 dark:border-white/[0.07]">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          {frontmatter.category && (
            <span className="text-[10px] font-semibold text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                             border border-accent/[0.18] dark:border-accent/[0.20] px-2.5 py-0.5 rounded-full">
              {frontmatter.category}
            </span>
          )}
          {frontmatter.date && (
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <FiCalendar size={9} /> {frontmatter.date}
            </span>
          )}
          {frontmatter.readTime && (
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <FiClock size={9} /> {frontmatter.readTime}
            </span>
          )}
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-3">
          {frontmatter.title}
        </h1>

        {frontmatter.desc && (
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[68ch] mb-4">
            {frontmatter.desc}
          </p>
        )}

        <p className="text-xs text-slate-400 dark:text-slate-600">Vatsal Thakkar · University of Georgia</p>
      </header>

      <div className="flex gap-10">
        <article ref={articleRef} className="flex-1 min-w-0 text-sm text-slate-600 dark:text-slate-400 leading-[1.9]">
          {children}
        </article>

        {headings.length > 0 && (
          <aside className="hidden xl:block w-44 flex-shrink-0">
            <div className="sticky top-4">
              <TableOfContents headings={headings} activeId={activeId} />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
