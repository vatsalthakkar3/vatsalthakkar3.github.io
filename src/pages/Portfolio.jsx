import { useState } from 'react'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
import { projects } from '../data'

const FILTERS = ['All', 'Deep Learning', 'Applications', 'Web Development']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active.toLowerCase())

  return (
    <div className="glass rounded-2xl p-6 lg:p-8">

      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100
                     pb-2.5 border-b-2 border-accent/40 w-fit mb-6">
        Portfolio
      </h2>

      {/* Filters — pill buttons with tactile feedback */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={[
              'px-4 py-1.5 rounded-full text-xs font-semibold',
              'transition-all duration-200 active:scale-[0.97]',
              active === f
                ? 'bg-accent/[0.10] dark:bg-accent/[0.14] border border-accent/35 text-accent'
                : 'glass-inner text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300',
            ].join(' ')}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(project => (
          <article
            key={project.id}
            className="flex flex-col rounded-xl overflow-hidden glass-inner
                       hover:border-accent/20 dark:hover:border-accent/16
                       transition-all duration-200 group
                       hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/35"
          >
            <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-white/[0.03]">
              {project.featured && (
                <span className="absolute top-2 left-2 z-10 flex items-center gap-1
                                 bg-amber-400 text-amber-900 text-[10px] font-bold
                                 px-2 py-0.5 rounded-full shadow">
                  <FiStar size={8} /> Featured
                </span>
              )}
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col flex-1 p-4">
              {/* Category — plain small text, no uppercase tracking eyebrow */}
              <p className="text-[10px] font-medium text-slate-400 dark:text-slate-600 mb-1 capitalize">
                {project.category}
              </p>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2
                             group-hover:text-accent transition-colors duration-150">
                {project.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed flex-1 mb-3">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium
                                             glass-inner text-slate-500 dark:text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {project.links.map(({ label, url, icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener"
                    className="btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                               text-xs font-semibold
                               border border-accent/22 text-accent bg-accent/[0.06]
                               hover:bg-accent/[0.11] transition-colors duration-150"
                  >
                    {icon === 'github' ? <FiGithub size={11}/> : <FiExternalLink size={11}/>}
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
