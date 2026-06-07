import { FiLinkedin, FiGithub, FiMail, FiArrowUpRight, FiMapPin, FiClock, FiCopy } from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { profile } from '../data'

const links = [
  { Icon: FiLinkedin, label: 'LinkedIn',  sub: 'vatsal-thakkar-880320161', href: profile.links.linkedin },
  { Icon: FiGithub,   label: 'GitHub',    sub: 'vatsalthakkar3',           href: profile.links.github },
  { Icon: SiLeetcode, label: 'LeetCode',  sub: 'Vatsalthakkar3',           href: profile.links.leetcode },
  { Icon: FaXTwitter, label: 'X',         sub: '@VatsalThakkar33',         href: profile.links.twitter },
]

export default function Contact({ showToast }) {
  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => showToast('Email copied!'))
  }

  return (
    <div className="glass rounded-2xl p-6 lg:p-8 flex flex-col h-full">

      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100
                     pb-2.5 border-b-2 border-accent/40 w-fit mb-2">
        Contact
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Open to full-time roles, research collaborations, and interesting conversations.
      </p>

      {/* Email CTA */}
      <button
        onClick={copyEmail}
        className="btn-tactile w-full flex items-center gap-4 p-5 rounded-2xl glass-inner mb-6
                   text-left group hover:border-accent/30 transition-all duration-150"
      >
        <span className="w-11 h-11 rounded-xl bg-accent/[0.10] dark:bg-accent/[0.14]
                         border border-accent/[0.18] flex items-center justify-center flex-shrink-0">
          <FiMail size={18} className="text-accent" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider
                        text-slate-400 dark:text-slate-500 mb-0.5">
            Email
          </p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
            {profile.email}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold
                         text-accent bg-accent/[0.08] border border-accent/20
                         px-2.5 py-1 rounded-lg flex-shrink-0
                         group-hover:bg-accent/[0.14] transition-colors duration-150">
          <FiCopy size={10} /> Copy
        </span>
      </button>

      {/* Social links grid */}
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {links.map(({ Icon, label, sub, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener"
            className="btn-tactile flex items-center gap-3 p-3.5 rounded-xl glass-inner
                       text-slate-700 dark:text-slate-300
                       hover:text-accent dark:hover:text-accent
                       hover:border-accent/22 dark:hover:border-accent/18
                       transition-all duration-150 group"
          >
            <span className="w-8 h-8 rounded-lg bg-accent/[0.09] dark:bg-accent/[0.12]
                             border border-accent/[0.14] flex items-center justify-center flex-shrink-0">
              <Icon size={14} className="text-accent" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold leading-snug">{label}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-600 truncate">{sub}</p>
            </div>
            <FiArrowUpRight size={13}
              className="text-slate-400 dark:text-slate-600
                         group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                         transition-transform duration-150 flex-shrink-0" />
          </a>
        ))}
      </div>

      {/* Availability card — pushed to bottom */}
      <div className="glass-inner rounded-xl p-4 mt-auto space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Open to full-time roles
          </span>
        </div>
        <div className="sep" />
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <FiMapPin size={10} className="text-accent/60 flex-shrink-0" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">San Francisco Bay Area, CA (PST)</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock size={10} className="text-accent/60 flex-shrink-0" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Responds within 24 hours</span>
          </div>
        </div>
      </div>

    </div>
  )
}
