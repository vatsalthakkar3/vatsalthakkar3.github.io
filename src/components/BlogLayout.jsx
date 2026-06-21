import { useState, useEffect, useRef } from 'react'
import { FiCalendar, FiClock, FiTwitter, FiLinkedin, FiLink } from 'react-icons/fi'
import { SiYcombinator, SiReddit } from 'react-icons/si'
import Mermaid from './Mermaid'

function Callout({ label, children }) {
  return (
    <div className="my-6 p-5 rounded-xl
                    border border-accent/[0.20] dark:border-accent/[0.24]
                    bg-accent/[0.04] dark:bg-accent/[0.06]">
      {label && (
        <p className="text-[11px] font-semibold text-accent uppercase tracking-wide mb-2.5">
          {label}
        </p>
      )}
      <div className="text-[14px] text-slate-600 dark:text-slate-400 leading-[1.72] [&>p]:mb-0">
        {children}
      </div>
    </div>
  )
}

function Figure({ src, alt, caption, size, wide = false }) {
  const sizeClass = {
    sm: 'max-w-xs mx-auto', md: 'max-w-sm mx-auto',
    lg: 'max-w-lg mx-auto', xl: 'max-w-xl mx-auto', full: '',
  }[size ?? 'full']
  return (
    <figure className={['my-7', wide ? '-mx-2 sm:mx-0' : '', sizeClass].filter(Boolean).join(' ')}>
      <div className="rounded-xl overflow-hidden glass-inner bg-slate-50 dark:bg-white/[0.02]">
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-[12px] text-slate-400 dark:text-slate-600
                               italic leading-snug px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function TwoUp({ left, right }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-7">
      <Figure {...left} />
      <Figure {...right} />
    </div>
  )
}

function InlineMath({ children }) {
  return (
    <code className="font-mono text-[13px] text-accent bg-accent/[0.07] dark:bg-accent/[0.09]
                     px-1.5 py-0.5 rounded border border-accent/[0.16] dark:border-accent/[0.18]">
      {children}
    </code>
  )
}

function MathBlock({ children }) {
  return (
    <div className="my-6 overflow-x-auto flex justify-center">
      <div className="font-mono text-[13.5px] text-accent bg-accent/[0.07] dark:bg-accent/[0.09]
                      border border-accent/[0.18] dark:border-accent/[0.20]
                      px-6 py-5 rounded-xl whitespace-pre flex-shrink-0 leading-7">
        {children}
      </div>
    </div>
  )
}

function StepCard({ n, title, children }) {
  return (
    <div className="flex gap-3.5 items-start glass-inner rounded-xl p-4">
      <span className="w-6 h-6 rounded-full bg-accent/[0.09] border border-accent/[0.18]
                       flex items-center justify-center flex-shrink-0 mt-0.5
                       text-[10px] font-bold text-accent">{n}</span>
      <div>
        <p className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200 mb-1">{title}</p>
        <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">{children}</p>
      </div>
    </div>
  )
}

function InfoCard({ title, children }) {
  return (
    <div className="glass-inner rounded-xl p-4">
      {title && <h4 className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>}
      <div className="text-[13.5px] leading-relaxed space-y-2 text-slate-600 dark:text-slate-400">{children}</div>
    </div>
  )
}

function BulletCard({ title, children, danger = false }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl glass-inner items-start">
      <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${danger ? 'bg-rose-400' : 'bg-accent'}`} />
      <div>
        {title && <p className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200 mb-0.5">{title}</p>}
        <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">{children}</p>
      </div>
    </div>
  )
}

function FormulaCard({ name, formula, children }) {
  return (
    <div className="glass-inner rounded-xl p-4">
      <div className="flex items-start gap-3 mb-2">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200">{name}</p>
          <code className="text-[12px] font-mono text-accent/80">{formula}</code>
        </div>
      </div>
      <p className="text-[13.5px] leading-relaxed pl-4 text-slate-600 dark:text-slate-400">{children}</p>
    </div>
  )
}

function CodeProof({ title, code, children }) {
  return (
    <div className="glass-inner rounded-xl p-5 my-5">
      {title && <p className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200 mb-3">{title}</p>}
      <div className="overflow-x-auto">
        <div className="font-mono text-[12.5px] text-accent whitespace-pre leading-7 flex-shrink-0 inline-block">
          {code}
        </div>
      </div>
      {children && <p className="text-[13.5px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{children}</p>}
    </div>
  )
}

const SHARE_PLATFORMS = [
  {
    key: 'x',
    label: 'X',
    Icon: FiTwitter,
    href: (url, title) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    Icon: FiLinkedin,
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    key: 'hn',
    label: 'Hacker News',
    Icon: SiYcombinator,
    href: (url, title) => `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
  },
  {
    key: 'reddit',
    label: 'Reddit',
    Icon: SiReddit,
    href: (url, title) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
]

function ShareBar({ title, slug, showToast }) {
  const url = `${window.location.origin}${window.location.pathname}#/blog/${slug}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      showToast?.('Link copied!')
    } catch {
      showToast?.('Copy failed')
    }
  }

  return (
    <div className="mt-10 pt-5 border-t border-slate-200 dark:border-white/[0.07]
                    flex items-center gap-0.5 flex-wrap">
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mr-2 flex-shrink-0">
        Share
      </span>
      {SHARE_PLATFORMS.map(({ key, label, Icon, href }) => (
        <a
          key={key}
          href={href(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tactile flex items-center gap-1 px-2.5 py-1.5 rounded-md
                     text-[12px] text-slate-400 dark:text-slate-500
                     hover:text-accent hover:bg-accent/[0.07]
                     transition-all duration-150"
        >
          <Icon size={13} />
          {label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="btn-tactile flex items-center gap-1 px-2.5 py-1.5 rounded-md
                   text-[12px] text-slate-400 dark:text-slate-500
                   hover:text-accent hover:bg-accent/[0.07]
                   transition-all duration-150"
      >
        <FiLink size={13} />
        Copy link
      </button>
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
      <ul className="space-y-1 border-l border-slate-200 dark:border-white/[0.07]">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={[
                'block text-[12px] leading-snug py-1 pl-3 -ml-px transition-all duration-150 border-l',
                h.level === 3 ? 'pl-6' : '',
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

export const mdxComponents = {
  h2: ({ children, id }) => (
    <h2 id={id} className="text-[19px] font-semibold text-slate-900 dark:text-slate-100
                           mb-4 mt-10 first:mt-0 pb-3 scroll-mt-6
                           border-b border-slate-200 dark:border-white/[0.07]">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="text-[15.5px] font-semibold text-slate-800 dark:text-slate-200
                           mb-3 mt-8 scroll-mt-6">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[14.5px] leading-[1.8] mb-5 text-slate-600 dark:text-slate-400 text-pretty">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="space-y-2.5 my-4">{children}</ul>,
  ol: ({ children }) => <ol className="space-y-2.5 my-4 list-decimal list-inside">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-3 items-start">
      <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
      <span className="text-[14.5px] leading-[1.8] text-slate-600 dark:text-slate-400">{children}</span>
    </li>
  ),
  Mermaid,
  pre: ({ children, className, 'data-language': lang, ...props }) => {
    const label = lang && lang !== 'plaintext' && lang !== 'text' ? lang : null
    return (
      <div className="my-6 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08]
                      bg-white dark:bg-[#0d1117]">
        {label && (
          <div className="flex items-center px-4 py-2.5
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
            'overflow-x-auto p-5 font-mono text-[13px] leading-relaxed',
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
      <code className="font-mono text-[13px] text-accent bg-accent/[0.07] dark:bg-accent/[0.09]
                       px-1.5 py-0.5 rounded border border-accent/[0.16] dark:border-accent/[0.18]">
        {children}
      </code>
    )
  },
  blockquote: ({ children }) => (
    <div className="my-6 px-5 py-4 rounded-xl
                    bg-slate-50 dark:bg-white/[0.04]
                    border border-slate-200 dark:border-white/[0.09]
                    text-[14px] text-slate-600 dark:text-slate-400 leading-[1.72] [&>p]:mb-0">
      {children}
    </div>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-800 dark:text-slate-200">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <div className="sep my-10" />,
  img: ({ src, alt }) => (
    <figure className="my-7">
      <div className="rounded-xl overflow-hidden glass-inner bg-slate-50 dark:bg-white/[0.02]">
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
      </div>
      {alt && (
        <figcaption className="mt-2.5 text-center text-[12px] text-slate-400 dark:text-slate-600
                               italic leading-snug px-2">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener"
       className="text-accent underline underline-offset-2 decoration-accent/40
                  hover:decoration-accent transition-colors duration-150">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-xl glass-inner">
      <table className="w-full text-[13.5px] text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200
                   border-b border-slate-200 dark:border-white/[0.07]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400
                   border-b border-slate-100 dark:border-white/[0.04]">{children}</td>
  ),
  Callout,
  Figure,
  TwoUp,
  InlineMath,
  MathBlock,
  StepCard,
  InfoCard,
  BulletCard,
  FormulaCard,
  CodeProof,
}

export default function BlogLayout({ frontmatter, children, showToast }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const [progress, setProgress] = useState(0)
  const articleRef = useRef(null)

  useEffect(() => {
    const els = [...(articleRef.current?.querySelectorAll('h2[id], h3[id]') ?? [])]
    setHeadings(els.map(el => ({
      id: el.id,
      text: el.textContent,
      level: el.tagName === 'H2' ? 2 : 3,
    })))
  }, [children])

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

  // Reading progress — works for both desktop (#main-scroll) and mobile (window)
  useEffect(() => {
    const el = document.getElementById('main-scroll')
    const target = el ?? window
    const calc = () => {
      const top    = el ? el.scrollTop    : window.scrollY
      const height = el
        ? el.scrollHeight - el.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(100, (top / height) * 100) : 0)
    }
    target.addEventListener('scroll', calc, { passive: true })
    return () => target.removeEventListener('scroll', calc)
  }, [])

  return (
    <>
      {/* Reading progress — sticks to top of #main-scroll while article scrolls */}
      <div
        className="sticky top-0 z-10 h-[2px] bg-accent transition-[width] duration-75"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="glass rounded-2xl p-5 lg:p-10">
      <div className="max-w-[860px] mx-auto">

      {/* Post header */}
      <header className="mb-8 pb-7 border-b border-slate-200 dark:border-white/[0.07]">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          {frontmatter.category && (
            <span className="text-[10px] font-semibold text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                             border border-accent/[0.18] dark:border-accent/[0.20] px-2.5 py-0.5 rounded-full">
              {frontmatter.category}
            </span>
          )}
          {frontmatter.date && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <FiCalendar size={10} /> {frontmatter.date}
            </span>
          )}
          {frontmatter.readTime && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <FiClock size={10} /> {frontmatter.readTime}
            </span>
          )}
        </div>

        <h1 className="text-[22px] lg:text-[28px] font-bold
                       text-slate-900 dark:text-slate-100 leading-tight text-balance mb-4">
          {frontmatter.title}
        </h1>

        {frontmatter.desc && (
          <p className="text-[13.5px] text-slate-500 dark:text-slate-400 leading-[1.7]
                        max-w-[64ch] mb-4 text-pretty">
            {frontmatter.desc}
          </p>
        )}

        <p className="text-xs text-slate-400 dark:text-slate-600">Vatsal Thakkar · University of Georgia</p>
      </header>

      <div className="flex gap-12">
        <article
          ref={articleRef}
          className="flex-1 min-w-0 text-slate-600 dark:text-slate-400"
        >
          {children}
          <ShareBar title={frontmatter.title} slug={frontmatter.slug} showToast={showToast} />
        </article>

        {headings.length > 0 && (
          <aside className="hidden xl:block w-48 flex-shrink-0 self-start sticky top-4">
            <TableOfContents headings={headings} activeId={activeId} />
          </aside>
        )}
      </div>{/* /flex */}
      </div>{/* /max-w */}
      </div>{/* /glass */}
    </>
  )
}
