import { FiSun, FiMoon } from 'react-icons/fi'
import AccentSwatch from './AccentSwatch'

const LABELS = {
  about: 'About', resume: 'Resume', portfolio: 'Portfolio',
  writings: 'Writings', contact: 'Contact',
}

export default function Navbar({ pages, active, onChange, dark, onToggleTheme, accent, onSetAccent }) {
  return (
    <nav className="glass rounded-2xl">
      {/* Tab row */}
      <div className="flex items-center p-1.5 gap-0.5">
        <ul className="flex flex-1 gap-0.5 overflow-x-auto">
          {pages.map(page => (
            <li key={page} className="flex">
              <button
                onClick={() => onChange(page)}
                className={[
                  'px-2.5 lg:px-4 py-2 text-xs lg:text-sm font-medium capitalize whitespace-nowrap rounded-xl',
                  'transition-all duration-200 active:scale-[0.97]',
                  active === page
                    ? 'bg-accent/[0.10] dark:bg-accent/[0.14] text-accent'
                    : 'text-slate-500 dark:text-slate-500 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:text-slate-800 dark:hover:text-slate-200',
                ].join(' ')}
              >
                {LABELS[page] ?? page}
              </button>
            </li>
          ))}
        </ul>

        {/* Controls — desktop only (inline) */}
        <div className="hidden lg:flex items-center gap-1.5 pl-1.5 ml-0.5 border-l border-black/[0.06] dark:border-white/[0.07]">
          <AccentSwatch accent={accent} onSetAccent={onSetAccent} />
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="btn-tactile w-8 h-8 rounded-xl glass-inner flex items-center justify-center
                       text-slate-400 dark:text-slate-500
                       hover:text-accent dark:hover:text-accent
                       transition-colors duration-150"
          >
            {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
        </div>
      </div>

      {/* Controls — mobile only (second row) */}
      <div className="lg:hidden flex items-center justify-center gap-2 px-1.5 pb-1.5 pt-0.5
                      border-t border-black/[0.05] dark:border-white/[0.05]">
        <AccentSwatch accent={accent} onSetAccent={onSetAccent} />
        <div className="w-px h-4 bg-black/[0.08] dark:bg-white/[0.08]" />
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="btn-tactile w-8 h-8 rounded-xl glass-inner flex items-center justify-center
                     text-slate-400 dark:text-slate-500
                     hover:text-accent dark:hover:text-accent
                     transition-colors duration-150"
        >
          {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>
      </div>
    </nav>
  )
}
