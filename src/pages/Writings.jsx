import { useState } from 'react'
import { FiGithub, FiClock } from 'react-icons/fi'
import { blogPosts, research } from '../data'

export default function Writings({ openPost }) {
  const [tab, setTab] = useState('blog')

  return (
    <div className="glass rounded-2xl p-6 lg:p-8">

      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100
                     pb-2.5 border-b-2 border-accent/40 w-fit mb-6">
        Writings
      </h2>

      {/* Tab switcher */}
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
          {blogPosts.map(post => {
            const live = !!post.slug
            return (
              <article
                key={post.id}
                onClick={live ? () => openPost(post.slug) : undefined}
                className={[
                  'rounded-xl overflow-hidden glass-inner relative transition-all duration-200',
                  live
                    ? 'cursor-pointer hover:ring-1 hover:ring-accent/30 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]'
                    : 'opacity-60 select-none cursor-default',
                ].join(' ')}
              >
                {!live && (
                  <div className="absolute top-2 right-2 z-10 flex items-center gap-1
                                  glass text-[9px] font-semibold text-slate-500 dark:text-slate-400
                                  px-2 py-0.5 rounded-full">
                    <FiClock size={8}/> Coming Soon
                  </div>
                )}
                <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-white/[0.03]">
                  <img src={post.image} alt={post.title} loading="lazy"
                       className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold
                                     text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                                     border border-accent/[0.18] dark:border-accent/[0.20]
                                     px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-600">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1.5 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {tab === 'research' && (
        <div className="space-y-4">
          {research.map(pub => (
            <div key={pub.id} className="p-5 rounded-xl glass-inner">
              {/* Research badge — uses accent, not hardcoded violet */}
              <span className="inline-block text-[10px] font-semibold
                               text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                               border border-accent/[0.18] dark:border-accent/[0.20]
                               px-2.5 py-0.5 rounded-full mb-3">
                Research Project
              </span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1">{pub.title}</h3>
              <p className="text-xs italic text-slate-400 dark:text-slate-600 mb-1">{pub.venue}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">
                {pub.authors.map((a, i) => (
                  <span key={a}>
                    {i === 0
                      ? <strong className="font-semibold text-slate-700 dark:text-slate-300">{a}</strong>
                      : a}
                    {i < pub.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed mb-3">{pub.desc}</p>
              <div className="flex gap-2">
                {pub.links.map(({ label, url }) => (
                  <a key={label} href={url} target="_blank" rel="noopener"
                     className="btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                text-xs font-semibold
                                border border-accent/25 text-accent bg-accent/[0.06]
                                hover:bg-accent/[0.11] transition-colors duration-150">
                    <FiGithub size={11}/> {label}
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
