import { FiCalendar, FiClock } from 'react-icons/fi'

const BASE = '/blog/activation/'

function Figure({ src, alt, caption, size }) {
  const sizeClass = { sm: 'max-w-xs mx-auto', md: 'max-w-sm mx-auto', lg: 'max-w-lg mx-auto', xl: 'max-w-xl mx-auto', full: '' }[size ?? 'full']
  return (
    <figure className={`my-6 ${sizeClass}`}>
      <div className="rounded-xl overflow-hidden glass-inner bg-slate-50 dark:bg-white/[0.02]">
        <img src={`${BASE}${src}`} alt={alt} loading="lazy" className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-600 italic leading-snug px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function InlineMath({ children }) {
  return (
    <code className="font-mono text-[12.5px] text-accent bg-accent/[0.07] dark:bg-accent/[0.09]
                     px-1.5 py-0.5 rounded border border-accent/[0.16] dark:border-accent/[0.18]">
      {children}
    </code>
  )
}

function MathBlock({ children }) {
  return (
    <div className="my-5 overflow-x-auto flex justify-center">
      <div className="font-mono text-[13px] text-accent bg-accent/[0.07] dark:bg-accent/[0.09]
                      border border-accent/[0.18] dark:border-accent/[0.20]
                      px-5 py-4 rounded-xl whitespace-pre flex-shrink-0 leading-7">
        {children}
      </div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="text-[17px] font-semibold text-slate-900 dark:text-slate-100 mb-4
                     pb-2.5 border-b border-slate-200 dark:border-white/[0.07]">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Callout({ label, children }) {
  return (
    <div className="my-4 p-4 rounded-xl glass-inner border-l-2 border-accent/40">
      {label && <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5">{label}</p>}
      <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">{children}</p>
    </div>
  )
}

function Bullet({ items }) {
  return (
    <ul className="space-y-2.5 my-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 items-start">
          <span className="mt-2 w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const SECTIONS = [
  { id: 'hook',       label: 'The Setup' },
  { id: 'math',       label: 'The Math' },
  { id: 'collapse',   label: 'The Collapse' },
  { id: 'why',        label: 'Why It Matters' },
  { id: 'fix',        label: 'The Fix' },
  { id: 'summary',    label: 'Summary' },
]

export default function ActivationPost() {
  return (
    <div className="glass rounded-2xl p-5 lg:p-8">

      {/* Header */}
      <header className="mb-8 pb-6 border-b border-slate-200 dark:border-white/[0.07]">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="text-[10px] font-semibold text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                           border border-accent/[0.18] dark:border-accent/[0.20] px-2.5 py-0.5 rounded-full">
            Deep Learning
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <FiCalendar size={9} /> Jan 10, 2023
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <FiClock size={9} /> ~8 min read
          </span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-3">
          Why Do We Need Non-Linear Activation Functions?
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[68ch] mb-4">
          Strip the activation functions from any neural network — GPT, ResNet, DALL-E —
          and every single one collapses into a single equation you could write on a napkin.
          Here's why, and what activation functions do about it.
        </p>

        <p className="text-xs text-slate-400 dark:text-slate-600">Vatsal Thakkar · University of Georgia</p>
      </header>

      {/* Layout: TOC + article */}
      <div className="lg:grid lg:grid-cols-[176px_1fr] lg:gap-10 items-start">

        {/* Sticky TOC */}
        <aside className="hidden lg:block sticky top-6 min-w-0">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-3">
            Contents
          </p>
          <nav className="space-y-2">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`}
                 onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                 className="block text-[11px] text-slate-500 dark:text-slate-500 hover:text-accent transition-colors duration-150 py-0.5 cursor-pointer leading-snug">
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Article */}
        <article className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-[1.9] min-w-0">

          {/* ── The Setup ─────────────────────────────────────────────────── */}
          <Section id="hook" title="The Setup: A Seemingly Powerful Machine">
            <p>
              Imagine you've just built a neural network. It has 50 layers, millions of parameters,
              matrix multiplications cascading from input to output. Surely it can learn anything, right?
            </p>

            <p>
              Now I tell you: remove the activation functions between the layers. Keep everything else
              exactly the same — the weights, the biases, the architecture. What does your 50-layer
              network compute now?
            </p>

            <p>
              A straight line. One linear equation. Identical in expressivity to a single-layer
              linear regression model you could fit in a spreadsheet.
            </p>

            <p>
              This is the main reason why activation functions exist — and understanding
              <em>why</em> linearity collapses everything is the key to understanding how
              neural networks get their power.
            </p>

            <Callout label="The question we're answering">
              We need a non-linear activation function — ReLU, tanh, sigmoid, GELU — to
              compute complex functions using neural networks. But <em>why</em> exactly?
              What breaks if we don't have one? Let's build the intuition from scratch.
            </Callout>
          </Section>

          {/* ── The Math ──────────────────────────────────────────────────── */}
          <Section id="math" title="The Math: A Two-Layer Network">
            <p>
              Start simple. Consider a two-layer neural network taking three inputs{' '}
              <InlineMath>x₁, x₂, x₃</InlineMath>, passing them through a hidden layer,
              and producing a prediction <InlineMath>ŷ</InlineMath>.
            </p>

            <Figure src="network.png" alt="Two-layer neural network diagram" size="lg"
              caption="A two-layer network: inputs x₁, x₂, x₃ → hidden layer-1 → output layer-2 → prediction ŷ." />

            <p>
              With an activation function <InlineMath>g(z)</InlineMath>, each layer computes:
            </p>

            <MathBlock>{`Layer 1:   z¹ = W¹ · x + b¹
           a¹ = g(z¹)

Layer 2:   z² = W² · a¹ + b²
           a² = g(z²)`}</MathBlock>

            <p>Where:</p>

            <Bullet items={[
              <><InlineMath>W¹, b¹</InlineMath> are the weight matrix and bias of layer 1</>,
              <><InlineMath>W², b²</InlineMath> are the weight matrix and bias of layer 2</>,
              <><InlineMath>g(z)</InlineMath> is the activation function — ReLU, tanh, sigmoid, or anything non-linear</>,
            ]} />

            <p>
              The activation <InlineMath>g(z)</InlineMath> is the non-linear "kink" between the
              two linear transformations. It's what allows the network to bend its decision
              boundary into shapes that lines can't make.
            </p>
          </Section>

          {/* ── The Collapse ──────────────────────────────────────────────── */}
          <Section id="collapse" title="The Collapse: What Happens Without Non-Linearity">
            <p>
              Now remove <InlineMath>g(z)</InlineMath>. Or equivalently, replace it with the
              identity function: <InlineMath>g(z) = z</InlineMath>. Your activations become:
            </p>

            <MathBlock>{`a¹ = z¹      (no transformation)
a² = z²      (no transformation)`}</MathBlock>

            <p>
              Substitute into layer 2 and expand:
            </p>

            <MathBlock>{`z² = W² · a¹ + b²
   = W² · z¹ + b²
   = W² · (W¹ · x + b¹) + b²
   = W²W¹ · x + W²b¹ + b²
   = W' · x + b'`}</MathBlock>

            <p>
              Where <InlineMath>W' = W²W¹</InlineMath> and <InlineMath>b' = W²b¹ + b²</InlineMath>.
              The two-layer network is now just a single linear equation{' '}
              <InlineMath>W'x + b'</InlineMath>. It is really just a one-layer network.
            </p>

            <Callout label="The key insight">
              This isn't specific to two layers. A 100-layer network with no activation functions
              is still just <InlineMath>W'x + b'</InlineMath> — one giant matrix multiplication,
              because the product of any number of linear transformations is itself a linear
              transformation. You can stack as many layers as you want; without non-linearity,
              you get nothing more complex than a line.
            </Callout>

            <div className="glass-inner rounded-xl p-5 my-4">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-3">
                To see why this generalizes: three layers without activation
              </p>
              <div className="overflow-x-auto">
                <div className="font-mono text-[12px] text-accent whitespace-pre leading-7 flex-shrink-0 inline-block">
{`z³ = W³ · (W² · (W¹ · x + b¹) + b²) + b³
   = W³W²W¹ · x + [W³W²b¹ + W³b² + b³]
   = W'' · x + b''     ← still linear`}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                No matter how deep you go, the composition of linear functions is always linear.
                Depth buys you nothing without non-linearity.
              </p>
            </div>
          </Section>

          {/* ── Why It Matters ────────────────────────────────────────────── */}
          <Section id="why" title="Why Linearity Is the Enemy">
            <p>
              So we've shown that removing activations collapses the network into a linear function.
              But why is linearity actually a problem? Here are three concrete reasons:
            </p>

            <div className="space-y-5 mt-2">

              <div className="glass-inner rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  1. Linear models can't solve XOR — and almost nothing in the real world is XOR-easy
                </h3>
                <p className="text-xs leading-relaxed">
                  The XOR problem: you have four points — (0,0), (1,1) outputting 0, and (0,1), (1,0)
                  outputting 1. Can you draw a straight line that correctly separates them? No. The
                  classes are arranged in a checkerboard pattern that no linear boundary can split.
                </p>
                <p className="text-xs leading-relaxed mt-2">
                  Real classification problems — cancer vs. benign, spam vs. not spam, cat vs. dog —
                  are vastly more complex than XOR. Their decision boundaries twist and fold through
                  high-dimensional space in ways that require curves, not lines.
                  A linear model simply cannot represent them.
                </p>
              </div>

              <div className="glass-inner rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  2. Linear functions have tiny expressive power
                </h3>
                <p className="text-xs leading-relaxed">
                  A linear function in <InlineMath>n</InlineMath> dimensions is described
                  by just <InlineMath>n + 1</InlineMath> numbers. No matter how many layers
                  you stack without non-linearity, the whole thing collapses to those same numbers.
                </p>
                <p className="text-xs leading-relaxed mt-2">
                  With enough neurons and non-linearities, a network can approximate{' '}
                  <strong className="font-semibold text-slate-800 dark:text-slate-200">any function</strong>.
                  This is called the Universal Approximation Theorem — and it only holds
                  because of non-linearity.
                </p>
              </div>

              <div className="glass-inner rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  3. Layers can't build on each other without non-linearity
                </h3>
                <p className="text-xs leading-relaxed">
                  Part of what makes deep networks powerful is the idea of hierarchical
                  representations: early layers learn simple patterns (edges, textures),
                  middle layers combine them into parts (eyes, wheels), later layers
                  combine parts into objects (faces, cars).
                </p>
                <p className="text-xs leading-relaxed mt-2">
                  This only works if each layer can do something new with what it receives.
                  With only linear layers, each layer's output is just a reshuffled version
                  of the previous one — no new structure is learned. Non-linearity is what
                  lets each layer learn something genuinely new.
                </p>
              </div>

            </div>
          </Section>

          {/* ── The Fix ───────────────────────────────────────────────────── */}
          <Section id="fix" title="The Fix: A Small Kink Changes Everything">
            <p>
              The solution is to insert a non-linear function between every pair of linear layers.
              It doesn't need to be complicated — even a function as simple as{' '}
              <InlineMath>max(0, z)</InlineMath> is enough to break the linearity and unlock the
              network's full representational power.
            </p>

            <p>The most common choices:</p>

            <div className="space-y-3 mt-3">
              {[
                {
                  name: 'ReLU (Rectified Linear Unit)',
                  formula: 'g(z) = max(0, z)',
                  desc: 'Zero for negative inputs, linear for positive. Simple, fast to compute, and works remarkably well in practice. The most widely used activation in deep networks today. Dead neurons (always outputting zero) can be an issue.'
                },
                {
                  name: 'Leaky ReLU',
                  formula: 'g(z) = z if z > 0, else αz  (α ≈ 0.01)',
                  desc: 'Like ReLU but with a small slope for negative inputs, which keeps gradients flowing and avoids dead neurons entirely.'
                },
                {
                  name: 'tanh (Hyperbolic Tangent)',
                  formula: 'g(z) = (eᶻ − e⁻ᶻ) / (eᶻ + e⁻ᶻ)',
                  desc: 'Squashes inputs to the range (−1, 1). Zero-centered, which makes optimization slightly easier than sigmoid. Common in RNNs.'
                },
                {
                  name: 'GELU (Gaussian Error Linear Unit)',
                  formula: 'g(z) ≈ z · Φ(z)',
                  desc: 'A smooth, probabilistic activation used in transformers (BERT, GPT). Outperforms ReLU on many language tasks by being differentiable everywhere.'
                },
              ].map(({ name, formula, desc }) => (
                <div key={name} className="glass-inner rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{name}</p>
                      <code className="text-[11px] font-mono text-accent/80">{formula}</code>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed pl-4">{desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-4">
              All of these are non-linear, but they are also <em>simple</em>. ReLU is just
              a threshold. Tanh is a smooth squash. The power of a deep network doesn't
              come from complicated activation functions — it comes from applying millions
              of simple non-linearities, one after another. Each small kink lets the next
              layer build on the last in a way that pure linear math never could.
            </p>

            <Callout label="The intuition in one sentence">
              A non-linear activation is the small kink between layers that lets each layer
              learn something new from the previous one — and that difference, repeated
              millions of times, is what gives neural networks their power.
            </Callout>
          </Section>

          {/* ── Summary ───────────────────────────────────────────────────── */}
          <Section id="summary" title="Summary">
            <p>
              Without non-linear activation functions, neural networks — no matter how deep —
              are equivalent to a single linear transformation. Here's the full picture:
            </p>

            <Bullet items={[
              'Any composition of linear functions is itself a linear function. Stacking layers without non-linearity changes nothing.',
              'Linear models can only learn linear decision boundaries — they cannot solve problems like XOR, let alone image classification.',
              'Non-linear activations give networks their universal approximation property: the ability to represent any continuous function.',
              'They enable hierarchical learning: each layer extracts qualitatively different, higher-level features from the one before it.',
              'The activation function itself can be simple — ReLU is just max(0, z) — but even this minimal non-linearity is sufficient to unlock the full representational power of deep learning.',
            ]} />

            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.07] text-xs text-slate-400 dark:text-slate-600 mt-6">
              <p>Written by Vatsal Thakkar · University of Georgia</p>
            </div>
          </Section>

        </article>
      </div>
    </div>
  )
}
