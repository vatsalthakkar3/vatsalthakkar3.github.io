const OPTIONS = [
  { key: 'blue',  color: '#2563eb', label: 'Blue'  },
  { key: 'amber', color: '#d97706', label: 'Amber' },
]

export default function AccentSwatch({ accent, onSetAccent }) {
  return (
    <div className="flex items-center rounded-full p-0.5 gap-0.5
                    bg-black/[0.04] dark:bg-white/[0.04]
                    border border-black/[0.07] dark:border-white/[0.08]">
      {OPTIONS.map(({ key, color, label }) => {
        const active = accent === key
        return (
          <button
            key={key}
            onClick={() => onSetAccent(key)}
            title={label}
            className={[
              'flex items-center h-6 rounded-full transition-all duration-200',
              'pl-1.5 pr-1.5 gap-0 lg:gap-1.5 lg:pr-2.5',
              active
                ? 'bg-white dark:bg-white/[0.12] shadow-sm'
                : 'opacity-40 hover:opacity-65',
            ].join(' ')}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200"
              style={{ backgroundColor: color, transform: active ? 'scale(1.2)' : 'scale(1)' }}
            />
            <span
              className="hidden lg:block text-[10px] font-semibold tracking-wide leading-none"
              style={{ color: active ? color : undefined }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
