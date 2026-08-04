import { FiBook, FiBriefcase, FiAward, FiCpu, FiDownload } from 'react-icons/fi'
import { education, experience, certifications, skillCategories, profile } from '../data'

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-8 rounded-xl glass-inner flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-accent" />
      </span>
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
    </div>
  )
}

function hl(text, terms = []) {
  let out = text
  terms.forEach(t => {
    out = out.replace(t, `<strong class="font-semibold text-accent">${t}</strong>`)
  })
  return out
}

function BulletList({ bullets, highlights = [] }) {
  return (
    <div className="space-y-2">
      {bullets.map((d, i) => (
        <div key={i} className="flex gap-2.5 items-start">
          <span className="mt-[7px] w-1 h-1 rounded-full bg-accent/45 flex-shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-[1.8]"
             dangerouslySetInnerHTML={{ __html: hl(d, highlights) }} />
        </div>
      ))}
    </div>
  )
}

/* Grouped employer — renders a company header with nested roles (ASML pattern) */
function EmployerGroup({ employer, totalPeriod, roles }) {
  return (
    <div className="relative pb-8 last:pb-0">
      {/* Anchor dot — larger for employer-level */}
      <span className="absolute left-0 top-[4px] w-3.5 h-3.5 rounded-full
                       bg-accent/20 ring-2 ring-accent/35
                       flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-accent/80" />
      </span>
      {/* Vertical connector */}
      <span className="absolute left-[6px] top-6 bottom-0 w-px
                       bg-gradient-to-b from-accent/30 via-accent/10 to-transparent" />

      {/* Company header */}
      <div className="pl-8 mb-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {employer}
          </span>
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 italic">
            {totalPeriod}
          </span>
        </div>
      </div>

      {/* Individual roles nested inside the employer */}
      <div className="pl-8 space-y-6">
        {roles.map(r => (
          <div key={r.role} className="relative pl-5">
            <span className="absolute left-0 top-[5px] w-2 h-2 rounded-full
                             bg-accent/55 ring-[3px] ring-accent/10" />
            <span className="inline-flex items-center mb-1.5 text-[10px] font-semibold
                             text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                             border border-accent/[0.18] dark:border-accent/[0.20]
                             px-2.5 py-0.5 rounded-full">
              {r.period}
            </span>
            <h4 className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mb-2.5 leading-snug">
              {r.role}
            </h4>
            <BulletList bullets={r.bullets} highlights={r.highlights} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* Standalone timeline entry for single-role companies */
function TimelineItem({ title, sub, period, bullets, highlights = [] }) {
  return (
    <div className="relative pl-6 pb-7 last:pb-0 group">
      <span className="absolute left-0 top-[6px] w-2.5 h-2.5 rounded-full
                       bg-accent/70 ring-[3px] ring-accent/12 dark:ring-accent/10
                       group-hover:ring-accent/30 group-hover:bg-accent
                       transition-all duration-300" />
      <span className="absolute left-[4px] top-4 bottom-0 w-px
                       bg-gradient-to-b from-accent/20 via-accent/08 to-transparent" />

      <span className="inline-flex items-center mb-2 text-[10px] font-semibold
                       text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                       border border-accent/[0.18] dark:border-accent/[0.20]
                       px-2.5 py-0.5 rounded-full">
        {period}
      </span>

      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-0.5 leading-snug">
        {title}
      </h4>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 italic">{sub}</p>
      <BulletList bullets={bullets} highlights={highlights} />
    </div>
  )
}

export default function Resume() {
  return (
    <div className="space-y-4 pb-2">

      {/* Header */}
      <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Resume
        </h2>
        <a
          href={profile.links.resume}
          download
          target="_blank"
          rel="noopener"
          className="btn-tactile flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                     text-accent border border-accent/28 dark:border-accent/22
                     bg-accent/[0.07] dark:bg-accent/[0.08]
                     hover:bg-accent/[0.13] hover:border-accent/45
                     transition-colors duration-150"
        >
          <FiDownload size={13} />
          Download PDF
        </a>
      </div>

      {/* Skills — full width, at the top for quick scanning */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={FiCpu} title="Technical Skills" />
        <div className="space-y-6">
          {skillCategories.map(({ name, skills }) => (
            <div key={name}>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 mb-3">{name}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(({ name: sName, Icon, color, emoji }) => (
                  <span
                    key={sName}
                    className="btn-tactile flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                               text-xs font-medium glass-inner cursor-default
                               text-slate-700 dark:text-slate-300
                               hover:text-accent dark:hover:text-accent
                               hover:border-accent/28 dark:hover:border-accent/22
                               transition-colors duration-150"
                  >
                    {Icon
                      ? <Icon size={13} style={{ color, flexShrink: 0 }} />
                      : <span style={{ fontSize: 12, lineHeight: 1 }}>{emoji}</span>
                    }
                    {sName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience — full width so the timeline can breathe */}
      <div className="glass rounded-2xl p-6">
        <SectionHeader icon={FiBriefcase} title="Experience" />
        <div>
          {experience.map(entry =>
            entry.isGroup ? (
              <EmployerGroup
                key={entry.id}
                employer={entry.employer}
                totalPeriod={entry.totalPeriod}
                roles={entry.roles}
              />
            ) : (
              <TimelineItem
                key={entry.id}
                title={entry.role}
                sub={entry.org}
                period={entry.period}
                bullets={entry.bullets}
                highlights={entry.highlights}
              />
            )
          )}
        </div>
      </div>

      {/* Education + Certifications side by side */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-6">
          <SectionHeader icon={FiBook} title="Education" />
          <div>
            {education.map(e => (
              <TimelineItem
                key={e.school}
                title={e.degree}
                sub={`${e.school} · ${e.location}`}
                period={e.period}
                bullets={[`GPA: ${e.gpa}`, `Courses: ${e.courses}`]}
                highlights={[]}
              />
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <SectionHeader icon={FiAward} title="Certifications" />
          <ul className="space-y-2.5">
            {certifications.map(c => (
              <li
                key={c.name}
                className="hover-lift flex items-center gap-3 p-3.5 rounded-xl glass-inner cursor-default"
              >
                <span className="w-7 h-7 rounded-lg bg-accent/[0.09] dark:bg-accent/[0.12]
                                 flex items-center justify-center flex-shrink-0">
                  <FiAward size={12} className="text-accent" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                    {c.name}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
