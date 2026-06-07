import { useState, useEffect } from 'react'
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Writings from './pages/Writings'
import Contact from './pages/Contact'
import BlogLayout, { mdxComponents } from './components/BlogLayout'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'
import AccentSwatch from './components/AccentSwatch'

const PAGES = { about: About, resume: Resume, portfolio: Portfolio, writings: Writings, contact: Contact }

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (raw.startsWith('blog/')) return { page: 'writings', post: raw.slice(5) }
  return { page: Object.keys(PAGES).includes(raw) ? raw : 'about', post: null }
}

// Auto-discover MDX posts from src/posts/ — files starting with _ are skipped (no slug)
const _mdxModules = import.meta.glob('./posts/*.mdx', { eager: true })
const _mdxPosts = Object.fromEntries(
  Object.values(_mdxModules)
    .filter(m => m.frontmatter?.slug)
    .map(m => [m.frontmatter.slug, { Component: m.default, title: m.frontmatter.title, meta: m.frontmatter, mdx: true }])
)

const POSTS = _mdxPosts

const DARK_BG = {
  backgroundColor: '#0a0a0e',
  backgroundImage:
    'radial-gradient(ellipse 65% 45% at 8% 6%, rgba(37, 99, 235, 0.045) 0%, transparent 60%)',
  backgroundAttachment: 'fixed',
}

const DARK_BG_AMBER = {
  backgroundColor: '#0b0a08',
  backgroundImage:
    'radial-gradient(ellipse 65% 45% at 8% 6%, rgba(180, 83, 9, 0.05) 0%, transparent 60%)',
  backgroundAttachment: 'fixed',
}

const LIGHT_BG       = { backgroundColor: '#f6f8fc' }
const LIGHT_BG_AMBER = { backgroundColor: '#fffbf0' }

export default function App() {
  const [activePage, setActivePage] = useState(() => parseHash().page)
  const [activePost, setActivePost] = useState(() => parseHash().post)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light')
  const [accent, setAccent] = useState(() => localStorage.getItem('accent') || 'blue')
  const [toast, setToast] = useState('')

  // Sync hash → state (browser back/forward)
  useEffect(() => {
    const onHashChange = () => {
      const { page, post } = parseHash()
      setActivePage(page)
      setActivePost(post)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Sync state → hash
  useEffect(() => {
    const target = activePost ? `#/blog/${activePost}` : `#/${activePage}`
    if (window.location.hash !== target) window.location.hash = target
  }, [activePage, activePost])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    document.documentElement.classList.toggle('amber', accent === 'amber')
    localStorage.setItem('accent', accent)
  }, [accent])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const scrollTop = () => {
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navigate = (p) => {
    setActivePage(p)
    setActivePost(null)
    scrollTop()
  }

  const openPost = (slug) => {
    setActivePost(slug)
    scrollTop()
  }

  const closePost = () => {
    setActivePost(null)
    setActivePage('writings')
  }

  const Page = PAGES[activePage]
  const postEntry = activePost ? POSTS[activePost] : null
  const Post      = postEntry?.Component ?? null
  const postTitle = postEntry?.title ?? ''

  return (
    <>
      <div
        className="min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300"
        style={dark
          ? (accent === 'amber' ? DARK_BG_AMBER : DARK_BG)
          : (accent === 'amber' ? LIGHT_BG_AMBER : LIGHT_BG)}
      >
        {/* ── Desktop ──────────────────────────────────────────────────────── */}
        <div className="hidden lg:flex h-screen overflow-hidden max-w-[1260px] mx-auto">

          {/* Sidebar — hidden in reading mode */}
          {!Post && (
            <div className="w-[296px] flex-shrink-0 h-full py-4 pl-4">
              <Sidebar showToast={showToast} desktop />
            </div>
          )}

          <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden px-4 py-4">
            <div className="flex-shrink-0">
              {Post ? (
                /* Slim reading bar */
                <div className="glass rounded-2xl">
                  <div className="flex items-center gap-2 p-1.5">
                    <button onClick={closePost}
                      className="btn-tactile flex items-center gap-1.5 px-3 py-2 rounded-xl
                                 text-sm font-medium text-slate-500 dark:text-slate-400
                                 hover:text-accent hover:bg-black/[0.04] dark:hover:bg-white/[0.05]
                                 transition-colors duration-150">
                      <FiArrowLeft size={14} /> Writings
                    </button>
                    <div className="w-px h-4 bg-black/[0.08] dark:bg-white/[0.08] mx-0.5 flex-shrink-0" />
                    <span className="flex-1 text-xs text-slate-400 dark:text-slate-500 truncate min-w-0">
                      {postTitle}
                    </span>
                    <AccentSwatch accent={accent} onSetAccent={setAccent} />
                    <button onClick={() => setDark(d => !d)} aria-label="Toggle theme"
                      className="btn-tactile w-8 h-8 rounded-xl glass-inner flex items-center justify-center
                                 text-slate-400 dark:text-slate-500 hover:text-accent
                                 transition-colors duration-150 flex-shrink-0">
                      {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
                    </button>
                  </div>
                </div>
              ) : (
                <Navbar
                  pages={Object.keys(PAGES)}
                  active={activePage}
                  onChange={navigate}
                  dark={dark}
                  onToggleTheme={() => setDark(d => !d)}
                  accent={accent}
                  onSetAccent={setAccent}
                />
              )}
            </div>

            <div id="main-scroll" className="flex-1 overflow-y-auto mt-4 flex flex-col">
              <div key={activePost || activePage} className="page-enter flex-1">
                {Post
                  ? postEntry.mdx
                    ? <BlogLayout frontmatter={postEntry.meta}><Post components={mdxComponents} /></BlogLayout>
                    : <Post onBack={closePost} />
                  : <Page showToast={showToast} openPost={openPost} />
                }
              </div>
              <footer className="text-center py-6 space-y-1">
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-600 tracking-wide">
                  Vatsal Thakkar
                </p>
                <p className="text-[10px] text-slate-300 dark:text-slate-700">
                  © 2026 · All rights reserved
                </p>
              </footer>
            </div>
          </main>
        </div>

        {/* ── Mobile ────────────────────────────────────────────────────────── */}
        <div className="lg:hidden">
          {!Post && <Sidebar showToast={showToast} />}
          <div className="px-3 pb-24">
            {Post ? (
              <div className="glass rounded-2xl mt-3 mb-3">
                <div className="flex items-center gap-2 p-1.5">
                  <button onClick={closePost}
                    className="btn-tactile flex items-center gap-1.5 px-3 py-2 rounded-xl
                               text-sm font-medium text-slate-500 dark:text-slate-400
                               hover:text-accent transition-colors duration-150">
                    <FiArrowLeft size={14} /> Writings
                  </button>
                  <span className="flex-1 text-xs text-slate-400 truncate min-w-0">{postTitle}</span>
                  <AccentSwatch accent={accent} onSetAccent={setAccent} />
                  <button onClick={() => setDark(d => !d)} aria-label="Toggle theme"
                    className="btn-tactile w-8 h-8 rounded-xl glass-inner flex items-center justify-center
                               text-slate-400 dark:text-slate-500 hover:text-accent transition-colors flex-shrink-0">
                    {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
                  </button>
                </div>
              </div>
            ) : (
              <Navbar
                pages={Object.keys(PAGES)}
                active={activePage}
                onChange={navigate}
                dark={dark}
                onToggleTheme={() => setDark(d => !d)}
                accent={accent}
                onSetAccent={setAccent}
              />
            )}
            <div key={activePost || activePage} className="mt-3 page-enter">
              {Post
                ? postEntry.mdx
                  ? <BlogLayout frontmatter={postEntry.meta}><Post components={mdxComponents} /></BlogLayout>
                  : <Post onBack={closePost} />
                : <Page showToast={showToast} openPost={openPost} />
              }
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <Toast message={toast} />
    </>
  )
}
