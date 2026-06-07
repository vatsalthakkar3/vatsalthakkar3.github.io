import { FiCalendar, FiClock } from 'react-icons/fi'

const BASE = '/blog/nerf/'

/* size: 'sm' | 'md' | 'lg' | 'full' (default) */
function Figure({ src, alt, caption, size, wide = false }) {
  const sizeClass = {
    sm:   'max-w-xs  mx-auto',
    md:   'max-w-sm  mx-auto',
    lg:   'max-w-lg  mx-auto',
    xl:   'max-w-xl  mx-auto',
    full: '',
  }[size ?? 'full']

  return (
    <figure className={`my-6 ${wide ? '-mx-2 sm:mx-0' : ''} ${sizeClass}`}>
      <div className="rounded-xl overflow-hidden glass-inner bg-slate-50 dark:bg-white/[0.02]">
        <img src={`${BASE}${src}`} alt={alt} loading="lazy"
             className="w-full h-auto block" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-600 italic leading-snug px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function TwoUp({ left, right }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 my-6">
      <Figure {...left} />
      <Figure {...right} />
    </div>
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
                      px-5 py-4 rounded-xl whitespace-nowrap flex-shrink-0 text-center">
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
      {label && (
        <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5">{label}</p>
      )}
      <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">{children}</p>
    </div>
  )
}

function Bullet({ items }) {
  return (
    <ul className="space-y-2 my-2">
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
  { id: 'hook',      label: 'The Problem' },
  { id: 'prior',     label: 'What Came Before' },
  { id: 'idea',      label: 'The Core Idea' },
  { id: 'volume',    label: 'Volume Rendering' },
  { id: 'encoding',  label: 'Positional Encoding' },
  { id: 'sampling',  label: 'Hierarchical Sampling' },
  { id: 'training',  label: 'Training' },
  { id: 'results',   label: 'Results' },
  { id: 'limits',    label: 'Limitations' },
  { id: 'future',    label: 'What Came After' },
]

export default function NeRFPost() {
  return (
    <div className="glass rounded-2xl p-5 lg:p-8">

      {/* Header */}
      <header className="mb-8 pb-6 border-b border-slate-200 dark:border-white/[0.07]">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="text-[10px] font-semibold text-accent bg-accent/[0.09] dark:bg-accent/[0.12]
                           border border-accent/[0.18] dark:border-accent/[0.20]
                           px-2.5 py-0.5 rounded-full">
            Deep Learning
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <FiCalendar size={9} /> Mar 23, 2023
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <FiClock size={9} /> ~15 min read
          </span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100
                       leading-tight mb-3">
          NeRF: Teaching a Neural Network to Be a 3D Scene
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[70ch] mb-4">
          How a humble 9-layer MLP, trained only on 2D photographs, learned to synthesize
          photorealistic views of 3D scenes from any angle — and why it works.
        </p>

        <div className="text-xs text-slate-400 dark:text-slate-600 space-y-0.5">
          <p>Based on: Mildenhall, Srinivasan, Tancik, Barron, Ramamoorthi, Ng — ECCV 2020</p>
          <p>Presented by Vatsal Thakkar · University of Georgia · CSCI 8000</p>
        </div>
      </header>

      {/* Hero */}
      <Figure
        src="image38.png"
        alt="NeRF pipeline overview"
        caption="The full NeRF pipeline: sample points along camera rays → query the MLP → volume rendering → 2D pixel color."
      />

      {/* Layout: sticky TOC + article */}
      <div className="lg:grid lg:grid-cols-[176px_1fr] lg:gap-10 items-start mt-8">

        {/* Sticky TOC — overflow-x-hidden must NOT be on any parent or sticky breaks */}
        <aside className="hidden lg:block sticky top-6 min-w-0">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-600
                        uppercase tracking-wider mb-3">
            Contents
          </p>
          <nav className="space-y-2">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`}
                 onClick={e => {
                   e.preventDefault()
                   document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                 }}
                 className="block text-[11px] text-slate-500 dark:text-slate-500
                            hover:text-accent transition-colors duration-150 py-0.5 cursor-pointer
                            leading-snug">
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Article */}
        <article className="space-y-12 text-sm text-slate-600 dark:text-slate-400 leading-[1.9] min-w-0">

          {/* ── The Problem ───────────────────────────────────────────────── */}
          <Section id="hook" title="The Problem: Seeing What You've Never Seen">
            <p>
              Here is a simple question: you take 50 photographs of your coffee mug
              from different angles. Can a computer figure out what the mug looks like from an
              angle you <em>never</em> photographed?
            </p>

            <p>
              Not by stitching photos together. Not by building a 3D model in Blender.
              From scratch, purely from those 50 images — and render it photorealistic
              from any viewpoint, including from behind, from below, from angles that never
              existed in your dataset.
            </p>

            <p>
              This is called <strong className="font-semibold text-slate-800 dark:text-slate-200">novel view synthesis</strong>,
              and it had been a hard problem in computer vision for years. In 2020, a team from
              UC Berkeley and Google Research published NeRF — Neural Radiance Fields — and solved it
              in a way nobody expected: with a small neural network and classical physics.
            </p>

            <Figure
              src="image30.gif"
              alt="From sparse photos to novel views"
              caption="NeRF takes a sparse set of photographs (left) and synthesizes photorealistic novel views of the same scene (right) — from angles never captured."
            />

            <Callout label="The result">
              After training for 1–2 days on a single GPU, NeRF can render the scene from any
              camera position. Move the virtual camera anywhere — orbit the object, zoom in,
              look from below. Every frame is synthesized by the network, not interpolated
              from the training images.
            </Callout>
          </Section>

          {/* ── What Came Before ──────────────────────────────────────────── */}
          <Section id="prior" title="What Came Before (and Why It Wasn't Enough)">
            <p>
              To appreciate NeRF, you need to understand the wall that earlier methods kept
              hitting. They all tried to represent 3D scenes <em>explicitly</em> — as physical
              structures you could store in memory.
            </p>

            <p>
              The classic approach: a <strong className="font-semibold text-slate-800 dark:text-slate-200">voxel grid</strong>.
              Divide space into a 3D array of small cubes (voxels), each storing a color and
              opacity. Simple to understand — but very expensive in memory. A 512×512×512 grid
              needs over a billion cells. Storing it takes ~1 GB. And it still looks blocky
              at that resolution. Scale to 1024³ and you're at 8 GB. Storage grows as the
              <em>cube</em> of the resolution.
            </p>

            <div className="space-y-4 my-2">
              <div className="glass-inner rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Scene Representation Networks (SRNs)
                </h4>
                <p className="text-xs leading-relaxed">
                  SRNs use an MLP to map each 3D location to a feature vector, then use a
                  recurrent network to predict colors from those features. Clever — but the
                  underlying representation still struggles to capture fine geometric detail,
                  and the rendering is slow.
                </p>
                <Figure src="image17.png" alt="SRN method" size="lg"
                  caption="SRN: each 3D coordinate maps to a feature vector; an RNN decodes colors from those features." />
              </div>

              <div className="glass-inner rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Local Light Field Fusion (LLFF)
                </h4>
                <p className="text-xs leading-relaxed">
                  LLFF works well for scenes with many densely-sampled forward-facing images.
                  It predicts an RGB-depth grid per view using a 3D convolutional network, then
                  blends them. Beautiful results for its target use case — but it needs a lot of
                  images and falls apart on complex, non-frontal geometry.
                </p>
              </div>

              <div className="glass-inner rounded-xl p-4">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Neural Volumes (NV)
                </h4>
                <p className="text-xs leading-relaxed">
                  NV trains a deep 3D convolutional network to predict a discretized voxel grid.
                  Fast to train (under 10 minutes!) but the output grid takes gigabytes to store,
                  and the method only handles bounded scenes with a known background.
                </p>
              </div>
            </div>

            <p>
              All three methods have the same core problem: they break space into fixed boxes.
              The finer the boxes, the more memory you need.
              NeRF avoids this by never using a grid at all.
            </p>
          </Section>

          {/* ── The Core Idea ─────────────────────────────────────────────── */}
          <Section id="idea" title="The Core Idea: A Scene Is a Function">
            <p>
              Here is the insight that makes NeRF work. Instead of <em>storing</em> the scene
              as a 3D structure, <em>learn a function that describes it</em>.
            </p>

            <p>
              Specifically: at any 3D point <InlineMath>(x, y, z)</InlineMath> in space, looking
              from viewing direction <InlineMath>(θ, φ)</InlineMath>, the function outputs two things:
            </p>

            <Bullet items={[
              'The RGB color emitted at that point from that viewing direction.',
              'The volume density σ — essentially, how much matter is packed at this location. A density near 0 means empty space. A high density means a solid surface.',
            ]} />

            <Figure src="image4.png" alt="5D function diagram" size="lg"
              caption="The 5D input (x,y,z,θ,φ) maps to color (r,g,b) and density σ. The entire scene lives in this mapping." />

            <p>
              That's the entire representation. No voxel grid. No mesh. No point cloud.
              Just a function — a continuous mathematical description of the scene —
              encoded in the weights of a 9-layer fully connected neural network with
              256 channels per layer. No convolutions. No recurrent connections.
              Just matrix multiplications and ReLU activations, end to end.
            </p>

            <Callout label="Why this is remarkable">
              A trained NeRF for a complex real-world scene fits in about 5 MB. Compare that
              to the ~1 GB needed for a voxel grid of equivalent effective resolution.
              The network compresses the scene by learning the structure of the radiance
              field — essentially, what a physical scene looks like from any viewpoint.
            </Callout>

            <p>
              One subtle design choice: density <InlineMath>σ</InlineMath> is predicted from
              location only — not from viewing direction. Color <em>is</em> conditioned on
              direction. This is physically motivated: geometry (density) doesn't change based
              on where you look from, but appearance does. A shiny surface looks different from
              different angles (specular highlights), and the network needs to capture that.
            </p>

            <Figure src="image58.png" alt="View-dependent color" size="xl"
              caption="Density depends only on location (view-invariant geometry). Color depends on both location and direction — capturing how specularity changes with viewpoint." />

            <p>
              Training this network is also simple: just minimize the difference between the
              pixel colors it predicts and the actual pixel colors in the training photos.
              No 3D ground truth. No depth labels. Just: "your predicted color at these pixels
              is wrong — adjust your weights until it isn't."
            </p>

            <Figure src="image3.png" alt="NeRF system overview" size="xl"
              caption="Overview: multiple posed training images → optimize MLP weights → render novel views by querying the trained function." />
          </Section>

          {/* ── Volume Rendering ──────────────────────────────────────────── */}
          <Section id="volume" title="Volume Rendering: How to Turn a Function Into a Pixel">
            <p>
              Knowing the scene function is one thing. Turning it into a 2D image is another.
              NeRF uses <strong className="font-semibold text-slate-800 dark:text-slate-200">classical volume rendering</strong> —
              a technique from graphics that has been around since the 1980s — to do this.
            </p>

            <p>
              Imagine staring through a tube into a foggy room. Light from the far end of the
              room travels toward you. As it does, the fog absorbs some of it. Denser fog at
              any point means more absorption, less light reaching your eye from beyond that point.
              By the time light arrives at you, the final color you perceive is a weighted sum
              of all the colors emitted at every point along that tube — weighted by how much
              light from each point actually made it through the fog to reach you.
            </p>

            <p>
              That's volume rendering. For each pixel in the output image, NeRF shoots a
              ray from the camera through that pixel and into the scene. The ray is described
              by an origin <InlineMath>o</InlineMath> and a direction <InlineMath>d</InlineMath>,
              so any point on the ray is simply <InlineMath>r(t) = o + t·d</InlineMath> for
              some distance <InlineMath>t</InlineMath>.
            </p>

            <Figure src="image28.png" alt="Camera ray and volume rendering" size="xl"
              caption="Each pixel generates a ray from the camera origin through that pixel into the scene. The ray is marched through 3D space, sampling points for the network." />

            <p>
              Along the ray, between a near bound <InlineMath>t_n</InlineMath> and far bound{' '}
              <InlineMath>t_f</InlineMath>, the network is queried at many points. At each
              point <InlineMath>r(t)</InlineMath> it returns a density <InlineMath>σ(t)</InlineMath>{' '}
              and color <InlineMath>c(t, d)</InlineMath>. The final pixel color is the integral:
            </p>

            <MathBlock>
              C(r) = ∫ T(t) · σ(r(t)) · c(r(t), d) dt
            </MathBlock>
            <MathBlock>
              where T(t) = exp(−∫ σ(r(s)) ds from t_n to t)
            </MathBlock>

            <p>
              The <InlineMath>T(t)</InlineMath> term is called <em>transmittance</em> — the
              probability that a photon traveling from <InlineMath>t_n</InlineMath> reaches
              point <InlineMath>t</InlineMath> without being absorbed. If there's dense
              geometry between the camera and a point, <InlineMath>T(t)</InlineMath> is close to
              zero — that point is occluded and contributes almost nothing to the final pixel.
            </p>

            <TwoUp
              left={{ src: 'image23.png', alt: 'Density profile', size: 'full',
                caption: 'Density σ(t) along a ray. Peaks mark surfaces; flat regions are empty space.' }}
              right={{ src: 'image26.png', alt: 'Rendering equation decomposed', size: 'full',
                caption: 'Breaking down the integrand: transmittance × density × color.' }}
            />

            <p>
              The continuous integral can't be computed analytically, so NeRF approximates it
              numerically using <strong className="font-semibold text-slate-800 dark:text-slate-200">stratified sampling</strong>:
              divide the ray into <InlineMath>N</InlineMath> evenly-spaced bins and draw one
              sample uniformly at random from within each bin. This gives better coverage than
              purely uniform or purely random sampling:
            </p>

            <MathBlock>
              Ĉ(r) = Σᵢ Tᵢ · (1 − exp(−σᵢ δᵢ)) · cᵢ
            </MathBlock>
            <MathBlock>
              where Tᵢ = exp(−Σⱼ₌₁ⁱ⁻¹ σⱼ δⱼ)  and  δᵢ = tᵢ₊₁ − tᵢ
            </MathBlock>

            <p>
              Here <InlineMath>δᵢ</InlineMath> is the distance between adjacent samples,
              and <InlineMath>(1 − exp(−σᵢ δᵢ))</InlineMath> is the fraction of light
              contributed by segment <InlineMath>i</InlineMath>. Crucially, this discrete
              approximation is differentiable — gradients flow back through it during training.
            </p>

            <Figure src="image22.png" alt="Quadrature estimate" size="xl"
              caption="The discrete estimate: each ray segment contributes a weighted color. Segments near dense surfaces dominate; empty segments contribute near zero." />
          </Section>

          {/* ── Positional Encoding ───────────────────────────────────────── */}
          <Section id="encoding" title="Positional Encoding: Teaching the Network to See Detail">
            <p>
              Here's the problem that almost sank NeRF before it got off the ground.
            </p>

            <p>
              When you feed raw coordinates like <InlineMath>(0.37, 0.82, 0.14)</InlineMath>{' '}
              into a neural network with ReLU activations, the network tends to learn smooth,
              blurry outputs. It can pick up broad color regions — like sky and grass — but
              sharp edges and fine textures are hard to learn.
            </p>

            <p>
              A NeRF without this fix produces results that are correct in broad strokes,
              but too blurry to be useful.
            </p>

            <Figure src="image31.gif" alt="With and without Fourier features"
              caption="Left: network operating on raw coordinates — blurry and oversmoothed. Right: network with frequency mapping — sharp edges, fine texture." />

            <p>
              The fix is <strong className="font-semibold text-slate-800 dark:text-slate-200">positional encoding</strong> —
              and it's elegant. Instead of passing the raw coordinates to the network, first
              transform them through a series of sinusoidal functions at exponentially increasing
              frequencies:
            </p>

            <MathBlock>
              γ(p) = (sin(2⁰πp), cos(2⁰πp), sin(2¹πp), cos(2¹πp), …, sin(2^(L−1)πp), cos(2^(L−1)πp))
            </MathBlock>

            <p>
              Think of it like a piano. One key gives you one note. The full keyboard gives
              you every octave. By mapping a coordinate onto <InlineMath>2L</InlineMath>{' '}
              different frequencies — <InlineMath>L = 10</InlineMath> for 3D position,
              <InlineMath>L = 4</InlineMath> for viewing direction — you give the network
              everything it needs to learn fine detail. The high-frequency terms capture sharp
              edges; the low-frequency terms handle broad color regions.
            </p>

            <Figure src="image29.png" alt="Positional encoding formula" size="lg"
              caption="The γ(·) mapping applied to each coordinate: 2L sinusoids at exponentially increasing frequencies, expanding 3 numbers into 60." />

            <p>
              Why more frequencies for position than direction? Position determines geometry
              (fine structural detail); direction determines appearance changes like specularities
              (which are spatially smoother). The authors tuned these values empirically —
              and the ablation studies confirm they matter.
            </p>

            <p>
              The visual difference is dramatic. These two renders are of the same scene,
              identical in every way except for positional encoding:
            </p>

            <TwoUp
              left={{ src: 'image35.gif', alt: 'Naive NeRF without PE', size: 'full',
                caption: 'No positional encoding: the network smooths over all fine detail.' }}
              right={{ src: 'image36.gif', alt: 'Full NeRF with PE', size: 'full',
                caption: 'With positional encoding: sharp geometry, preserved fine structure.' }}
            />
          </Section>

          {/* ── Hierarchical Sampling ─────────────────────────────────────── */}
          <Section id="sampling" title="Hierarchical Sampling: Don't Sample the Ocean Looking for Fish">
            <p>
              Stratified sampling divides each ray into equal-sized bins and samples one
              point per bin. It's unbiased and general — but think about where those samples
              actually land. Most of any 3D scene is empty space. For a scene of a flower vase
              on a table, maybe 95% of every ray travels through air. Uniform sampling wastes
              almost all compute budget on empty regions.
            </p>

            <p>
              The solution: use two networks, a <strong className="font-semibold text-slate-800 dark:text-slate-200">coarse</strong>{' '}
              and a <strong className="font-semibold text-slate-800 dark:text-slate-200">fine</strong>.
            </p>

            <div className="space-y-3 my-2">
              {[
                { n: '1', title: 'Coarse pass', desc: 'Sample 64 points uniformly along the ray. Run the coarse network to get a rough density estimate at each point. This tells us where the geometry probably is.' },
                { n: '2', title: 'Informed sampling', desc: 'Treat the coarse density output as a probability distribution. Sample 128 additional points from this distribution — concentrated near regions of high density, where the surfaces are.' },
                { n: '3', title: 'Fine pass', desc: 'Evaluate the fine network on the union of coarse + fine samples (192 points total) to compute the final pixel color.' },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex gap-3 items-start glass-inner rounded-xl p-4">
                  <span className="w-6 h-6 rounded-full bg-accent/[0.09] border border-accent/[0.18]
                                   flex items-center justify-center flex-shrink-0 mt-0.5
                                   text-[10px] font-bold text-accent">{n}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-0.5">{title}</p>
                    <p className="text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Figure src="image56.png" alt="Hierarchical sampling diagram" size="xl"
              caption="Uniform coarse samples (top) give a rough density map. Fine samples (bottom) concentrate where the geometry actually is — near peaks in the coarse density." />

            <p>
              The coarse network finds where the geometry is. The fine network then places
              its samples there. Together they get the quality of 192 well-placed samples,
              with far less wasted compute than 192 random ones.
            </p>
          </Section>

          {/* ── Training ──────────────────────────────────────────────────── */}
          <Section id="training" title="Training: Overfit the Scene, Generalize the View">
            <p>
              Once you understand volume rendering and hierarchical sampling, the training
              loop becomes surprisingly simple.
            </p>

            <p>
              Each iteration: randomly pick 4096 pixels from across all training images.
              For each pixel, shoot a ray, run hierarchical sampling (64 coarse + 128 fine points),
              and query the network at each point. Compute the rendered pixel color via volume
              rendering. Compare to the actual pixel color in the training image. Minimize the
              squared error — summed across both the coarse and fine estimates:
            </p>

            <MathBlock>
              L = Σᵣ [ ‖C(r) − Ĉ_coarse(r)‖² + ‖C(r) − Ĉ_fine(r)‖² ]
            </MathBlock>

            <Figure src="image33.png" alt="Loss function" size="lg"
              caption="The loss: squared pixel reconstruction error from both coarse and fine network estimates. No 3D supervision needed — only 2D pixel colors." />

            <p>
              That's the entire training objective. No depth labels, no 3D ground truth,
              no semantic annotations. The only teacher is: "your predicted pixel color is
              wrong. Here's by how much."
            </p>

            <p>
              NeRF is trained to <em>overfit</em> a single scene intentionally. The goal is
              not to generalize to new scenes — it's to memorize this particular scene with
              enough fidelity to synthesize it from any viewpoint. Each scene gets its own
              set of weights, trained from scratch over 100K–300K iterations (~1–2 days
              on a V100 GPU).
            </p>

            <Figure src="image51.png" alt="Full network architecture" size="xl"
              caption="The full 9-layer MLP: position (x,y,z) goes through 8 layers to predict density σ; then direction (d) is appended for one final layer to predict color (r,g,b)." />
          </Section>

          {/* ── Results ───────────────────────────────────────────────────── */}
          <Section id="results" title="Results: State of the Art by a Significant Margin">
            <p>
              NeRF was evaluated across three types of scenes:
            </p>

            <div className="space-y-2 my-3">
              {[
                ['Diffuse Synthetic 360°', '4 simple CG objects, 512×512, upper hemisphere camera. 479 training / 1000 test views.'],
                ['Realistic Synthetic 360°', '8 complex CG objects with non-Lambertian materials, 800×800. 100 training / 200 test views.'],
                ['Real Forward-Facing Scenes', '8 real scenes captured with handheld cameras, 20–62 images each at 1008×756.'],
              ].map(([name, desc]) => (
                <div key={name} className="flex gap-2.5 items-start glass-inner rounded-xl p-3.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{name}</p>
                    <p className="text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              On all three datasets, NeRF outperformed every prior method on every metric —
              PSNR (higher is better, measures pixel-level reconstruction accuracy), SSIM
              (structural similarity), and LPIPS (perceptual similarity measured through
              a pretrained network's activations, lower is better):
            </p>

            <Figure src="image46.png" alt="Quantitative results" size="xl"
              caption="NeRF vs. SRN, LLFF, and Neural Volumes. NeRF wins on all metrics across all three dataset types." />

            <p>
              The numbers tell part of the story. The images tell the rest. On the Realistic
              Synthetic 360° dataset — which includes challenging materials like shiny metal,
              glass-like surfaces, and complex subsurface scattering — NeRF reproduces geometry
              and appearance with a level of fidelity that prior methods simply couldn't achieve:
            </p>

            <Figure src="image62.png" alt="Qualitative comparison" wide
              caption="Qualitative comparison on Realistic Synthetic 360°: SRN (blurry), LLFF (better but artifacts), Neural Volumes (blocky) vs. NeRF (rightmost — sharp, correct specularities, fine geometry)." />

            <Figure src="image64.png" alt="Real-world scene comparison" wide
              caption="Real-world forward-facing scenes: NeRF synthesizes sharp, geometrically consistent novel views; baselines show ghosting, blurring, and structural inconsistencies." />

            <p>
              One particularly telling test: specular highlights. When you move around a shiny
              object, the bright spot moves with you — it's a function of both the surface
              geometry and your viewing direction. Getting this right requires the network to
              understand geometry accurately enough to compute how light bounces off it.
              NeRF does this. Other methods blur the highlights or place them incorrectly.
            </p>

            <Figure src="image13.gif" alt="360-degree NeRF rendering"
              caption="NeRF rendering a continuous 360° orbit around a synthetic object. Every frame is synthesized from the MLP — none are training images." />

            <p>
              The ablation studies confirm that each architectural choice matters. Removing
              positional encoding causes the largest single drop in PSNR. Removing view-dependence
              causes blurry specularities. Removing hierarchical sampling reduces quality
              measurably. Each piece earns its place:
            </p>

            <Figure src="image60.png" alt="Ablation studies" size="xl"
              caption="Ablation on Realistic Synthetic 360°: every component contributes. Positional encoding has the largest impact." />
          </Section>

          {/* ── Limitations ───────────────────────────────────────────────── */}
          <Section id="limits" title="Limitations: What NeRF Can't Do (Yet)">
            <p>
              NeRF is a remarkable result, but it comes with real constraints worth understanding:
            </p>

            <div className="space-y-2 mt-3">
              {[
                ['Static scenes only', 'Everything in the training images must be in the same place in every photo. A person walking through the scene, or leaves blowing in the wind, breaks the core assumption. NeRF tries to memorize a fixed scene — any dynamic content confuses it.'],
                ['Per-scene training', 'A trained NeRF knows exactly one scene. Want to render a new scene? Train from scratch. There is no transfer learning, no generalization. The weights of one NeRF mean nothing for another.'],
                ['Training time', '1–2 days on a V100-class GPU per scene. At the time of publication, this was the cost of getting these results.'],
                ['Slow inference', 'Rendering a single image requires running the MLP hundreds of times per pixel (one query per sample along each ray). At inference time, this is not fast.'],
                ['Camera poses required', 'NeRF needs the exact camera position and orientation for every training image — it does not figure this out on its own. In practice, you run COLMAP (a structure-from-motion tool) on your photos first.'],
                ['Transparent objects', 'Volume density works naturally for opaque surfaces. Glass, water, and semi-transparent materials are fundamentally harder — the assumption that density determines occlusion breaks down.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-2.5 p-3.5 rounded-xl glass-inner items-start">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-0.5">{title}</p>
                    <p className="text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Future Directions ─────────────────────────────────────────── */}
          <Section id="future" title="What Came After: NeRF Opened a Floodgate">
            <p>
              NeRF sparked an explosion of follow-up research. Within two years, nearly
              every limitation above had a published solution. Three directions are
              especially notable:
            </p>

            <div className="space-y-8 mt-4">

              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  NeRF in the Wild — Photos From the Internet
                </h3>
                <p className="text-xs mb-3 leading-relaxed">
                  The original NeRF demands controlled, consistent conditions. Every photo
                  must show the same scene in the same lighting with no dynamic objects.
                  <em>NeRF in the Wild</em> extends this to uncontrolled internet photo
                  collections — think tourist photos of the Eiffel Tower, taken in all
                  seasons, at all hours of the day, with people walking through them.
                  It handles this by learning a per-image appearance embedding that captures
                  lighting variation, and a separate network for transient content (the tourists).
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  NeRV — Change the Lighting After the Fact
                </h3>
                <p className="text-xs mb-3 leading-relaxed">
                  NeRF bakes lighting into its color predictions. Once trained, you can't
                  change the light. NeRV (Neural Reflectance and Visibility Fields) decomposes
                  the scene into geometry, material reflectance, and lighting — so you can
                  relight the scene under novel illumination conditions after training.
                  The animation below shows a scene being relit in real time.
                </p>
                <Figure src="image57.gif" alt="NeRV relighting" size="xl"
                  caption="NeRV: a trained scene relit under different illumination — the geometry and materials stay fixed while the lighting changes." />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  DreamFusion — Text to 3D
                </h3>
                <p className="text-xs mb-3 leading-relaxed">
                  What if you could generate a NeRF from a text prompt — with no training
                  images at all? DreamFusion does this by combining NeRF with a pretrained
                  2D diffusion model (Imagen). The key insight: you don't need 3D training
                  data if you have a strong enough 2D prior. The diffusion model acts as a
                  critic — given a rendered view of the NeRF, it asks "does this look like
                  a photo of [the prompt]?" and backpropagates that signal into the NeRF
                  weights. After thousands of iterations, the NeRF converges to a 3D scene
                  consistent with the text description, renderable from any angle.
                </p>
                <Figure src="image59.gif" alt="DreamFusion text-to-3D" size="xl"
                  caption="DreamFusion: a text prompt alone generates a full 3D scene as a NeRF — no photographs required." />
              </div>
            </div>

            <Callout label="The bigger picture">
              NeRF turned a hard 3D problem (scene reconstruction) into a simpler one: fit a
              function to 2D pixel colors. The idea of storing a scene as a function instead
              of a grid turned out to be very powerful. Gaussian Splatting, 3D Diffusion Models,
              and Neural Scene Simulation all built on this idea.
            </Callout>
          </Section>

          {/* Summary */}
          <Section id="summary" title="What NeRF Did">
            <p>
              In a single sentence: NeRF showed that a tiny neural network, trained only on
              2D photographs, can reconstruct a 3D scene well enough to synthesize
              photorealistic novel views — by learning to <em>be</em> the scene rather than
              trying to model it explicitly.
            </p>

            <Bullet items={[
              'Represent the scene as a 5D continuous function (x,y,z,θ,φ) → (r,g,b,σ) encoded in a 9-layer MLP.',
              'Render novel views via classical volume rendering — differentiable and physics-grounded.',
              'Use positional encoding to give the MLP the frequency basis it needs for fine detail.',
              'Use hierarchical coarse-to-fine sampling to concentrate compute near actual geometry.',
              'Train by minimizing 2D pixel reconstruction error — no 3D supervision needed.',
            ]} />

            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.07] text-xs text-slate-400 dark:text-slate-600 space-y-1.5 mt-6">
              <p>
                Paper: Ben Mildenhall, Pratul P. Srinivasan, Matthew Tancik, Jonathan T. Barron,
                Ravi Ramamoorthi, Ren Ng. <em>NeRF: Representing Scenes as Neural Radiance Fields for
                View Synthesis.</em> ECCV 2020.
              </p>
              <p>
                Images and animations from the original paper and{' '}
                <a href="https://www.matthewtancik.com/nerf" target="_blank" rel="noopener"
                   className="text-accent hover:underline">matthewtancik.com/nerf</a>.
              </p>
            </div>
          </Section>

        </article>
      </div>
    </div>
  )
}
