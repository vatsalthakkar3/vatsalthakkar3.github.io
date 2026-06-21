import { useState } from 'react'
import { FiGithub, FiClock, FiFileText, FiDatabase, FiExternalLink, FiCalendar } from 'react-icons/fi'
import { blogPosts, research } from '../data'

const LINK_ICONS = {
  github:  <FiGithub size={11} />,
  paper:   <FiFileText size={11} />,
  dataset: <FiDatabase size={11} />,
}

export default function Writings({ openPost }) {
  const [tab, setTab] = useState('blog')

  return (
    <div className="glass rounded-2xl p-6 lg:p-8">

      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100
                     pb-2.5 border-b-2 border-accent/40 w-fit mb-6">
        Writings
      </h2>

      <div className="flex gap-1 mb-6 p-1 glass-inner rounded-xl w-fit">
        {[{ key: 'blog', label: 'Blog Posts' }, { key: 'research', label: 'Research' }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={[
              'px-4 py-1.5 text-sm font-medium rounded-lg',
              'transition-all duration-200 active:scale-[0.97]',
              tab === key
                ? 'bg-accent/[0.10] dark:bg-accent/[0.14] text-accent'
                : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'blog' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {blogPosts.map(post => (
            <article
              key={post.id}
              onClick={() => openPost(post.slug)}
              className="cursor-pointer group hover-lift rounded-2xl overflow-hidden glass-inner"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-white/[0.03]">
                {post.image
                  ? <img src={post.image} alt={post.title} loading="lazy"
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  : <div className="w-full h-full flex items-center justify-center
                                    text-slate-300 dark:text-slate-700 text-[11px] font-medium">
                      {post.category}
                    </div>
                }
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2.5 flex-wrap mb-2.5">
                  {(Array.isArray(post.tags) ? post.tags : post.category ? [post.category] : []).map(tag => (
                    <span key={tag} className="text-[10px] font-semibold text-accent
                                     bg-accent/[0.09] dark:bg-accent/[0.12]
                                     border border-accent/[0.18] dark:border-accent/[0.20]
                                     px-2.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                  <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                    <FiCalendar size={9} /> {post.date}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                      <FiClock size={9} /> {post.readTime}
                    </span>
                  )}
                </div>
                <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100
                               leading-snug line-clamp-2 mb-1.5
                               group-hover:text-accent transition-colors duration-150">
                  {post.title}
                </h3>
                <p className="text-[13px] text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-3">
                  {post.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === 'research' && (
        <div className="space-y-4">
          {research.map(pub => (
            <div key={pub.id} className="p-5 rounded-xl glass-inner">
              <span className="inline-block text-[10px] font-semibold
                               text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                               border border-accent/[0.18] dark:border-accent/[0.20]
                               px-2.5 py-0.5 rounded-full mb-3">
                {pub.badge ?? 'Research Project'}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1">{pub.title}</h3>
              <p className="text-xs italic text-slate-400 dark:text-slate-600 mb-1">{pub.venue}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">
                {pub.authors.map((a, i) => (
                  <span key={a}>
                    {a.includes('Vatsal')
                      ? <strong className="font-semibold text-slate-700 dark:text-slate-300">{a}</strong>
                      : a}
                    {i < pub.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed mb-3">{pub.desc}</p>
              <div className="flex gap-2">
                {pub.links.map(({ label, url, icon }) => (
                  <a key={label} href={url} target="_blank" rel="noopener"
                     className="btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                text-xs font-semibold
                                border border-accent/25 text-accent bg-accent/[0.06]
                                hover:bg-accent/[0.11] transition-colors duration-150">
                    {LINK_ICONS[icon] ?? <FiExternalLink size={11} />} {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
