import { useState, useEffect } from 'react'
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Writings from './pages/Writings'
import Contact from './pages/Contact'
import NeRFPost from './pages/blog/NeRFPost'
import ActivationPost from './pages/blog/ActivationPost'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'

const PAGES = { about: About, resume: Resume, portfolio: Portfolio, writings: Writings, contact: Contact }

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (raw.startsWith('blog/')) return { page: 'writings', post: raw.slice(5) }
  return { page: Object.keys(PAGES).includes(raw) ? raw : 'about', post: null }
}

const POSTS = {
  nerf:       { Component: NeRFPost,       title: 'NeRF: Representing Scenes as Neural Radiance Fields' },
  activation: { Component: ActivationPost, title: 'Why Do We Need Non-Linear Activation Functions?' },
}

/* Dark background: cool blue-black — precise and technical.
   Subtle indigo/blue blobs give the sidebar glass depth without the neon AI-glow look. */
const DARK_BG = {
  backgroundColor: '#080c18',
  backgroundImage: [
    'radial-gradient(ellipse 70% 55% at 5%  8%,  rgba(37,  99, 235, 0.11) 0%, transparent 55%)',
    'radial-gradient(ellipse 55% 45% at 95% 90%, rgba(14, 165, 233, 0.08) 0%, transparent 50%)',
    'radial-gradient(ellipse 35% 30% at 70% 40%, rgba(99, 102, 241, 0.05) 0%, transparent 45%)',
  ].join(', '),
  backgroundAttachment: 'fixed',
}

/* Light background: cool near-white */
const LIGHT_BG = { backgroundColor: '#f6f8fc' }

export default function App() {
  const [activePage, setActivePage] = useState(() => parseHash().page)
  const [activePost, setActivePost] = useState(() => parseHash().post)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light')
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
        style={dark ? DARK_BG : LIGHT_BG}
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
                />
              )}
            </div>

            <div id="main-scroll" className="flex-1 overflow-y-auto mt-4 flex flex-col">
              <div key={activePost || activePage} className="page-enter flex-1">
                {Post
                  ? <Post onBack={closePost} />
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
              />
            )}
            <div key={activePost || activePage} className="mt-3 page-enter">
              {Post
                ? <Post onBack={closePost} />
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
