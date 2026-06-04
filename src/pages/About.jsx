import { FiCloud, FiCpu, FiMapPin, FiCalendar } from 'react-icons/fi'
import { stats, services, profile } from '../data'

const SERVICE_COLORS = {
  blue:   'text-sky-500    dark:text-sky-400',
  violet: 'text-violet-500 dark:text-violet-400',
  emerald:'text-emerald-500 dark:text-emerald-400',
  amber:  'text-amber-500  dark:text-amber-400',
  sky:    'text-cyan-500   dark:text-cyan-400',
  rose:   'text-rose-500   dark:text-rose-400',
}

const ACTIVE_WORK = [
  'Managed Infrastructure Platform (Terraform / AKS)',
  'LLM inference optimization (vLLM / NVIDIA NIM)',
  'Agentic cloud cost optimization',
]

function FocusGroup({ label, icon: Icon, items }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Icon size={13} className="text-accent/70 flex-shrink-0" />
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
      </div>
      <div className="grid sm:grid-cols-3 gap-x-6 gap-y-5">
        {items.map(({ title, desc, Icon: ItemIcon, color }) => (
          <div key={title} className="flex items-start gap-2.5">
            <span className={`mt-0.5 flex-shrink-0 ${SERVICE_COLORS[color] || SERVICE_COLORS.blue}`}>
              <ItemIcon size={16} />
            </span>
            <div>
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 leading-snug">
                {title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const cloudServices = services.filter(s => s.category === 'cloud')
  const mlServices    = services.filter(s => s.category === 'ml')

  return (
    <div className="glass rounded-2xl p-6 lg:p-8 space-y-8">

      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100
                     pb-2.5 border-b-2 border-accent/40 w-fit">
        About me
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center py-5 px-2 rounded-xl glass-inner">
            <div className="text-2xl font-bold text-accent leading-none">{value}</div>
            <div className="text-[11px] font-medium text-slate-400 dark:text-slate-600 mt-2">{label}</div>
          </div>
        ))}
      </div>

      {/* Bio — two column: narrative left, current-role card right */}
      <div className="grid lg:grid-cols-[1fr_240px] gap-6 items-start">

        {/* Narrative text fills the left column fully */}
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-[1.85]">
          <p>
            Cloud Infrastructure and AI Platform Engineer at{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">ASML</strong>{' '}
            in the San Francisco Bay Area, building managed infrastructure platforms on Azure with
            Terraform, Kubernetes, and Azure Databricks — and optimizing LLM inference for
            production GPU workloads.
          </p>
          <p>
            Before ASML, built production RAG pipelines with MoE routing and fine-tuned LLMs using
            LoRA at{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">ColomboAI</strong>,
            deploying vLLM and Triton inference stacks on GCP Vertex AI. At UGA's{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">Hoarfrost Lab</strong>,
            designed a multimodal model bridging DNA sequences and natural language via GPT-4 and
            Llama-2 for biological function prediction.
          </p>
          <p>
            Also researched the explainability of{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">Stable Diffusion</strong>{' '}
            — mapping which image regions attend to individual text tokens using DAAM attention
            analysis. Research interests span XAI, multimodal architectures, and efficient LLM
            inference systems. MS Computer Science,{' '}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">University of Georgia</strong>{' '}
            (GPA 3.89).
          </p>
        </div>

        {/* Current role + active work — right column anchors the blank space */}
        <div className="glass-inner rounded-xl p-4 space-y-4">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 mb-2">
              Currently at
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
              ASML Holding
            </p>
            <p className="text-xs text-accent mt-0.5">Cloud Infrastructure Engineer</p>
            <div className="flex items-center gap-1 mt-2">
              <FiMapPin size={10} className="text-slate-400 dark:text-slate-600 flex-shrink-0" />
              <span className="text-[11px] text-slate-400 dark:text-slate-600">
                {profile.location}
              </span>
            </div>
          </div>

          <div className="sep" />

          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 mb-2.5">
              Active work
            </p>
            <ul className="space-y-1.5">
              {ACTIVE_WORK.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[5px] w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Dual-focus capability groups */}
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-5">
          What I build
        </h3>
        <div className="space-y-6">
          <FocusGroup label="Cloud & Infrastructure" icon={FiCloud} items={cloudServices} />
          <div className="sep" />
          <FocusGroup label="AI & Machine Learning"  icon={FiCpu}   items={mlServices} />
        </div>
      </div>
    </div>
  )
}
