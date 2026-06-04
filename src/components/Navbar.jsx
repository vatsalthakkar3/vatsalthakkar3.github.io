import { FiSun, FiMoon } from 'react-icons/fi'

const LABELS = {
  about: 'About', resume: 'Resume', portfolio: 'Portfolio',
  writings: 'Writings', contact: 'Contact',
}

export default function Navbar({ pages, active, onChange, dark, onToggleTheme }) {
  return (
    <nav className="glass rounded-2xl">
      <div className="flex items-center p-1.5 gap-0.5">
        <ul className="flex flex-1 gap-0.5 overflow-x-auto">
          {pages.map(page => (
            <li key={page} className="flex">
              <button
                onClick={() => onChange(page)}
                className={[
                  'px-4 py-2 text-sm font-medium capitalize whitespace-nowrap rounded-xl',
                  /* Use the CSS var for transition easing so it respects prefers-reduced-motion
                     (the @media block in index.css sets transition: none for that case) */
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

        <div className="flex items-center pl-1.5 ml-0.5 border-l border-black/[0.06] dark:border-white/[0.07]">
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
    </nav>
  )
}
