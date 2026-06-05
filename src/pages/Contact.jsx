import { useState } from 'react'
import { FiLinkedin, FiGithub, FiMail, FiSend, FiCheckCircle, FiArrowUpRight, FiMapPin, FiClock } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { profile } from '../data'

const inp = 'w-full px-3.5 py-2.5 rounded-xl text-sm glass-inner text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors duration-150'

export default function Contact({ showToast }) {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [msg, setMsg]         = useState('')
  const [sent, setSent] = useState(false)

  const valid = name.trim() && email.includes('@') && msg.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_self')
    setSent(true)
  }

  const copyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(profile.email).then(() => showToast('Email copied!'))
  }

  const links = [
    { Icon: FiLinkedin, label: 'LinkedIn',   sub: 'vatsal-thakkar',         href: profile.links.linkedin },
    { Icon: FiGithub,   label: 'GitHub',     sub: 'vatsalthakkar3',         href: profile.links.github },
    { Icon: SiLeetcode, label: 'LeetCode',   sub: 'Vatsalthakkar3',         href: profile.links.leetcode },
    { Icon: FiMail,     label: 'Email',      sub: profile.email,            href: '#', onClick: copyEmail, external: false },
  ]

  return (
    <div className="glass rounded-2xl p-6 lg:p-8 flex flex-col h-full">

      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100
                     pb-2.5 border-b-2 border-accent/40 w-fit mb-8">
        Contact
      </h2>

      <div className="grid lg:grid-cols-[1fr_252px] gap-6 items-start flex-1 min-h-0">

        {/* Left — form */}
        <div className="flex flex-col h-full">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Send a message
          </h3>

          {sent ? (
            <div className="flex flex-col items-center justify-center gap-3 flex-1 text-center">
              <FiCheckCircle size={40} className="text-emerald-400" />
              <p className="font-semibold text-slate-900 dark:text-slate-100">Message sent</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                I'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-3.5">
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Full Name
                  </label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                         placeholder="Your name" required className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Email
                  </label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                         placeholder="you@example.com" required className={inp} />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Message
                </label>
                <textarea value={msg} onChange={e => setMsg(e.target.value)}
                          placeholder="Your message" required
                          className={`${inp} resize-none flex-1 min-h-[120px]`} />
              </div>
              <button
                type="submit"
                disabled={!valid}
                className="btn-tactile flex items-center gap-2 px-6 py-2.5 rounded-xl
                           text-sm font-semibold
                           border border-accent/28 text-accent bg-accent/[0.07]
                           hover:bg-accent/[0.13] hover:border-accent/42
                           disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors duration-150"
              >
                <FiSend size={13}/>
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right — links + availability */}
        <div className="space-y-3">

          {/* Social / contact links */}
          {links.map(({ Icon, label, sub, href, onClick, external = true }) => (
            <a
              key={label}
              href={href}
              onClick={onClick}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener' : undefined}
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

          {/* Availability card */}
          <div className="glass-inner rounded-xl p-3.5 space-y-3">
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
      </div>
    </div>
  )
}
