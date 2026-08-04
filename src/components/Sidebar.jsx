import { useState } from 'react'
import {
  FiMail, FiMapPin, FiBook, FiStar, FiDownload,
  FiLinkedin, FiGithub,
  FiChevronDown, FiChevronUp,
} from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { profile } from '../data'
import Typewriter from './Typewriter'

const FOCUS = [
  'Cloud Infra · Azure / GCP / AWS',
  'LLM Inference Optimization',
  'Agentic AI Systems',
  'Multimodal AI Research',
]

export default function Sidebar({ showToast, desktop }) {
  const [expanded, setExpanded] = useState(false)

  const copyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(profile.email).then(() => showToast('Email copied!'))
  }

  const contacts = [
    { Icon: FiMail,   label: 'Email',      value: profile.email,      onClick: copyEmail, href: '#', title: 'Click to copy' },
    { Icon: FiMapPin, label: 'Location',   value: profile.location },
    { Icon: FiBook,   label: 'University', value: profile.university },
    { Icon: FiStar,   label: 'GPA',        value: profile.gpa },
  ]

  const socials = [
    { Icon: FiLinkedin, href: profile.links.linkedin, label: 'LinkedIn' },
    { Icon: FiGithub,   href: profile.links.github,   label: 'GitHub' },
    { Icon: SiLeetcode, href: profile.links.leetcode, label: 'LeetCode' },
    { Icon: FaXTwitter, href: profile.links.twitter,  label: 'X' },
  ]

  if (desktop) {
    return (
      <div className="h-full glass-sidebar rounded-3xl flex flex-col overflow-hidden">

        <div className="h-0.5 bg-accent/35 flex-shrink-0" />

        {/* Scrollable content area */}
        <div className="flex-1 flex flex-col overflow-y-auto px-5 py-5">

          {/* Status badge */}
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold
                             uppercase tracking-wider
                             text-emerald-600 dark:text-emerald-400
                             bg-emerald-50 dark:bg-emerald-900/25
                             border border-emerald-200 dark:border-emerald-700/50
                             px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
              Open to Full-Time &amp; Research
            </span>
          </div>

          {/* Avatar + name */}
          <div className="flex flex-col items-center text-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-[22px] bg-accent/15 blur-md dark:bg-accent/20" />
              <img
                src={profile.avatar}
                alt="Vatsal Thakkar"
                loading="eager"
                className="relative w-32 h-32 rounded-2xl object-cover
                           ring-2 ring-accent/25 dark:ring-accent/20
                           avatar-ring"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                {profile.name}
              </h1>
              <p className="text-sm text-accent font-medium mt-1 h-5">
                <Typewriter items={profile.roles} />
              </p>
            </div>
          </div>

          <div className="sep" />

          {/* Contact items */}
          <ul className="space-y-3 my-4">
            {contacts.map(({ Icon, label, value, onClick, href, title }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-accent/[0.09] dark:bg-accent/[0.12]
                                 border border-accent/[0.14] dark:border-accent/[0.16]
                                 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-accent" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-wider
                                text-slate-400 dark:text-slate-600 mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} onClick={onClick} title={title}
                       className="text-xs text-slate-700 dark:text-slate-300
                                  hover:text-accent dark:hover:text-accent
                                  block truncate transition-colors duration-150">
                      {value}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-700 dark:text-slate-300 block truncate">
                      {value}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Focus card — fills dead space below contacts */}
          <div className="mt-auto">
            <div className="glass-inner rounded-xl p-3.5">
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 mb-2.5">
                Current Focus
              </p>
              <ul className="space-y-1.5">
                {FOCUS.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[5px] w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
                    <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Fixed footer: social icons + download */}
        <div className="px-5 pb-5 flex-shrink-0">
          <div className="sep mb-4" />

          <div className="flex items-center justify-between mb-4">
            {socials.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                 className="btn-tactile w-10 h-10 rounded-xl glass-inner flex items-center justify-center
                            text-slate-400 dark:text-slate-500
                            hover:text-accent dark:hover:text-accent
                            hover:border-accent/25 dark:hover:border-accent/20
                            transition-colors duration-150">
                <Icon size={16} />
              </a>
            ))}
          </div>

          <a href={profile.links.resume} download target="_blank" rel="noopener"
             className="btn-tactile flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                        text-sm font-semibold text-accent
                        border border-accent/30 bg-accent/[0.07]
                        dark:border-accent/25 dark:bg-accent/[0.08]
                        hover:bg-accent/[0.13] dark:hover:bg-accent/[0.13]
                        hover:border-accent/45 dark:hover:border-accent/38
                        transition-colors duration-150">
            <FiDownload size={14} />
            Download CV
          </a>
        </div>
      </div>
    )
  }

  /* ── Mobile ─────────────────────────────────────────────────────────────── */
  return (
    <div className="px-3 pt-3 pb-2">
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-xl bg-accent/15 blur-sm dark:bg-accent/20" />
            <img src={profile.avatar} alt="Vatsal Thakkar" loading="eager"
                 className="relative w-14 h-14 rounded-xl object-cover ring-1 ring-accent/25" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider
                             text-emerald-600 dark:text-emerald-400
                             bg-emerald-50 dark:bg-emerald-900/20
                             border border-emerald-200 dark:border-emerald-700/50
                             px-2 py-0.5 rounded-full mb-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Open to Roles
            </span>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{profile.name}</h1>
            <p className="text-xs text-accent h-4"><Typewriter items={profile.roles} /></p>
          </div>

          <button onClick={() => setExpanded(e => !e)}
                  className="btn-tactile flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-500
                             glass-inner rounded-lg px-2.5 py-1.5 flex-shrink-0
                             transition-colors duration-150">
            {expanded ? 'Hide' : 'Show'}
            {expanded ? <FiChevronUp size={10}/> : <FiChevronDown size={10}/>}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4">
            <div className="sep" />
            <ul className="space-y-3">
              {contacts.map(({ Icon, label, value, onClick, href, title }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-accent/[0.09] dark:bg-accent/[0.12]
                                   border border-accent/[0.14] flex items-center justify-center flex-shrink-0">
                    <Icon size={12} className="text-accent" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600">{label}</p>
                    {href
                      ? <a href={href} onClick={onClick} title={title}
                           className="text-xs text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent truncate block transition-colors duration-150">{value}</a>
                      : <span className="text-xs text-slate-700 dark:text-slate-300 block truncate">{value}</span>
                    }
                  </div>
                </li>
              ))}
            </ul>
            <div className="sep" />
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                   className="btn-tactile w-8 h-8 rounded-lg glass-inner flex items-center justify-center
                              text-slate-400 dark:text-slate-500 hover:text-accent transition-colors duration-150">
                  <Icon size={13}/>
                </a>
              ))}
              <a href={profile.links.resume} download target="_blank" rel="noopener"
                 className="btn-tactile ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                            border border-accent/28 text-accent bg-accent/[0.07] hover:bg-accent/[0.13]
                            transition-colors duration-150">
                <FiDownload size={11}/> CV
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
