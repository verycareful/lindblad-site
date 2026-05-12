import { useEffect, useState } from 'react';
import { Counter, SectionHeader, Stat } from './components/atoms';
import { CircuitDiagram, HERO_CIRCUIT } from './components/circuit';
import { Footer, Nav } from './components/chrome';
import type { PageName } from './types';

function PageFrame({ active, children }: { active: PageName; children: React.ReactNode }) {
  return (
    <>
      <Nav active={active} />
      {children}
      <Footer />
    </>
  );
}

function HomeHero() {
  return (
    <section style={{ paddingTop: 80, paddingBottom: 64, borderTop: 0 }}>
      <div className="container">
        <div className="flex gap-12 items-center">
          <span className="dot-pulse" />
          <span className="eyebrow">RELEASE R.1.4.1 · 233 TESTS · 36 SUITES · ALL PASSING</span>
        </div>
        <h1 className="h-display mt-24">
          Quantum
          <br />
          <span style={{ color: 'var(--orange)' }}>simulation,</span>
          <br />
          compiled.
        </h1>
        <div className="flex gap-32 mt-32" style={{ flexWrap: 'wrap', maxWidth: 920 }}>
          <p className="lead" style={{ flex: '1 1 420px' }}>
            A high-performance C++23 framework for circuit construction, exact and approximate simulation, transpilation, noise modeling, and variational algorithms - engineered for research throughput.
          </p>
          <div className="flex gap-12" style={{ alignSelf: 'flex-end', flexWrap: 'wrap' }}>
            <a href="https://github.com/verycareful/lindblad" target="_blank" rel="noopener" className="btn btn-primary">↗ GITHUB</a>
            <a href="https://github.com/verycareful/lindblad/releases" target="_blank" rel="noopener" className="btn">↗ RELEASES</a>
            <a href="#quickstart" className="btn">QUICK START</a>
          </div>
        </div>

        <div className="card mt-64" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="flex justify-between items-center" style={{ padding: '14px 22px', borderBottom: '1px solid var(--rule)' }}>
            <div className="flex gap-12 items-center">
              <span className="tag tag-orange"><span className="dot" />LIVE</span>
              <span className="mono text-dim" style={{ fontSize: 12 }}>./examples/maqaoa_5q.cpp · QuantumCircuit qc(5);</span>
            </div>
            <span className="mono text-faint" style={{ fontSize: 12 }}>STATEVECTOR · OpenMP · 5 qubits · 32 amplitudes</span>
          </div>
          <div style={{ padding: '32px 22px 24px' }}>
            <CircuitDiagram circuit={HERO_CIRCUIT} height={340} />
          </div>
          <div className="flex justify-between items-center" style={{ padding: '12px 22px', borderTop: '1px solid var(--rule)', flexWrap: 'wrap', gap: 12 }}>
            <span className="mono text-faint" style={{ fontSize: 12 }}>1 H-LAYER · 2 RZ(γ) ENT BLOCKS · 1 RX(β) MIXER · MEASURE-Z</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--orange)' }}>↳ ⟨H⟩ = −2.847 · |10110⟩ p=0.41</span>
          </div>
        </div>

        <div className="grid mt-64" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <Stat label="QUBITS BENCHED" value={<Counter to={20} />} sub="MA-QAOA layerwise · 1380 params" />
          <Stat label="SIMULATOR BACKENDS" value={<Counter to={4} />} sub="Statevector · DM · Clifford · MPS" accent="var(--orange)" />
          <Stat label="ALGORITHMS" value={<Counter to={9} />} sub="VQE · QAOA · MA-QAOA · Grover · QPE · BV · DJ · Simon · Ising" accent="var(--blue)" />
          <Stat label="LINES OF C++" value={<Counter to={42000} suffix="+" />} sub="233 unit tests · 36 test suites" />
        </div>
      </div>
    </section>
  );
}

const ALGO_MATRIX = [
  [2, 1, 0, 1],
  [2, 2, 0, 1],
  [2, 1, 0, 1],
  [2, 1, 0, 0],
  [2, 1, 0, 1],
  [2, 1, 1, 1],
  [2, 1, 1, 0],
  [2, 1, 1, 0],
] as const;

const ALGO_NAMES = ['VQE', 'QAOA', 'MA-QAOA', 'QPE', 'Grover', 'BV', 'Deutsch-Jozsa', 'Simon'] as const;
const SIM_NAMES = ['Statevector', 'Density Matrix', 'Clifford', 'MPS'] as const;

function CapabilityMatrix() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          num="01 / 06"
          kicker="CAPABILITY MATRIX"
          title="Every algorithm. Every simulator."
          desc="Lindblad ships a complete vertical stack: algorithm → primitive → transpiler → simulator → noise model. Mix and match without leaving the framework."
        />
        <div className="card" style={{ padding: 0, overflow: 'auto' }}>
          <table className="mono" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 720 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rule-strong)', background: 'var(--surface-2)' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 500, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11 }}>Algorithm</th>
                {SIM_NAMES.map((name) => (
                  <th key={name} style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 500, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11 }}>{name}</th>
                ))}
                <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 500, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11 }}>Noise</th>
                <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 500, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11 }}>Gradient</th>
              </tr>
            </thead>
            <tbody>
              {ALGO_NAMES.map((name, index) => (
                <tr key={name} style={{ borderBottom: index === ALGO_NAMES.length - 1 ? 0 : '1px solid var(--rule)' }}>
                  <td style={{ padding: '14px 20px', color: 'var(--ink)' }}>{name}</td>
                  {ALGO_MATRIX[index].map((value, column) => (
                    <td key={column} style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {value === 2 ? <span style={{ color: 'var(--orange)', fontWeight: 600 }}>●</span> : null}
                      {value === 1 ? <span style={{ color: 'var(--ink-dim)' }}>○</span> : null}
                      {value === 0 ? <span style={{ color: 'var(--ink-faint)' }}>·</span> : null}
                    </td>
                  ))}
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--blue)' }}>●</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: index < 3 ? 'var(--orange)' : 'var(--ink-faint)' }}>{index < 3 ? '●' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-24 mono" style={{ padding: '12px 20px', borderTop: '1px solid var(--rule)', background: 'var(--surface-2)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.06em', flexWrap: 'wrap' }}>
            <span><span style={{ color: 'var(--orange)' }}>●</span> NATIVE / OPTIMIZED</span>
            <span><span style={{ color: 'var(--ink-dim)' }}>○</span> SUPPORTED</span>
            <span><span>·</span> N/A</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURE_CARDS = [
  {
    n: '01',
    title: 'Orbit-QAOA',
    desc: 'Symmetry-reduced parameterization via orbit assignments - collapse equivalent terms onto a single shared angle, dramatically reducing the variational landscape.',
    code: 'MAQAOA::Options::orbit_assignments',
  },
  {
    n: '02',
    title: 'PI-MA-QAOA initialization',
    desc: 'Physics-informed beta init: expensive generators get larger angles, cheap ones smaller. All initial parameters perturbed by reproducible U(-0.05, 0.05) noise - multi-seed landscape exploration.',
    code: 'mixer_weights · beta_base · seed',
  },
  {
    n: '03',
    title: 'True heavy-hex topology',
    desc: 'Real IBM heavy-hex coupling maps. Three-pass bidirectional SABRE layout heuristic with H_basic + H_extended SWAP-routing lookahead.',
    code: 'Transpiler::Layout::SABRE_3PASS',
  },
  {
    n: '04',
    title: 'Exact noise modeling',
    desc: 'Kraus channels with thermal-relaxation, depolarizing, amplitude/phase damping. NoiseModel::from_t1_t2() builds device-realistic noise from per-qubit T1/T2/gate-time specs.',
    code: 'NoiseModel::from_t1_t2(...)',
  },
  {
    n: '05',
    title: 'Vectorised expectation',
    desc: 'SparsePauliOp::expectation_value_batch() evaluates ⟨ψᵢ|H|ψᵢ⟩ across many states in one Eigen-backed pass.',
    code: 'expectation_value_batch(states)',
  },
  {
    n: '06',
    title: 'Convergence diagnostics',
    desc: 'Distinguishes true completion from iteration-limit exhaustion. Per-layer costs, layer nfev, wall-time-by-layer for research-grade analysis.',
    code: 'Result::wall_time_by_layer',
  },
];

function CodeSample() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          num="02 / 06"
          kicker="API SURFACE"
          title="Fluent C++. Zero boilerplate."
          desc="A circuit, a Hamiltonian, and an optimizer. The transpiler caches intermediate results across calls. The estimator parallelizes the parameter-shift rule."
        />
        <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.2fr) minmax(320px, 1fr)', gap: 24 }}>
          <div className="code-block" dangerouslySetInnerHTML={{ __html:
`<span class="cm">// MA-QAOA on a microgrid commitment problem</span>
<span class="kw">#include</span> <span class="st">&lt;lindblad/algorithms.hpp&gt;</span>
<span class="kw">#include</span> <span class="st">&lt;lindblad/ising.hpp&gt;</span>

<span class="kw">using namespace</span> lindblad;

<span class="ty">auto</span> H = IsingHamiltonian::<span class="fn">from_qubo</span>(Q);
<span class="ty">MAQAOA</span>::<span class="ty">Options</span> opt;
opt.<span class="nm">p_max</span>           = <span class="nu">6</span>;
opt.<span class="nm">budget_per_layer</span>= <span class="nu">500</span>;
opt.<span class="nm">mixer_weights</span>   = <span class="fn">orbits_by_power</span>(H.powers, <span class="nu">1e-3</span>);
opt.<span class="nm">seed</span>            = <span class="nu">42</span>;

<span class="ty">MAQAOA</span> solver(H.<span class="fn">to_sparse_pauli_op</span>(), opt);
<span class="ty">auto</span> result = solver.<span class="fn">optimize</span>();

std::cout &lt;&lt; <span class="st">"E ="</span> &lt;&lt; result.<span class="nm">final_cost</span>
          &lt;&lt; <span class="st">"  bits ="</span> &lt;&lt; result.<span class="nm">best_bitstring</span>;
<span class="cm">// E = -260.639  bits = 01101100000110011011</span>`
          }} />
          <div className="flex-col gap-16">
            <div className="card corners">
              <div className="label">PARAMETER-SHIFT GRADIENTS</div>
              <h3 className="h3 mt-16">2P parallelized</h3>
              <p className="text-dim mt-8" style={{ fontSize: 14 }}>
                <span className="mono">Estimator::gradient()</span> evaluates the analytic parameter-shift rule with all 2P circuits dispatched in parallel via OpenMP.
              </p>
            </div>
            <div className="card corners">
              <div className="label">TRANSPILER CACHE</div>
              <h3 className="h3 mt-16">Skip SABRE on rerun</h3>
              <p className="text-dim mt-8" style={{ fontSize: 14 }}>
                Structure-keyed caching means repeat estimator calls on the same circuit topology bypass SABRE layout and ZYZ decomposition.
              </p>
            </div>
            <div className="card corners">
              <div className="label">DIRECT EVOLUTION</div>
              <h3 className="h3 mt-16">3-5× wall-time</h3>
              <p className="text-dim mt-8" style={{ fontSize: 14 }}>
                MA-QAOA inner loops bypass <span className="mono">QuantumCircuit</span> construction and dispatch directly against the statevector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          num="03 / 06"
          kicker="WHAT'S NEW"
          title="Beyond the standard library."
          desc="Lindblad isn't a port of an existing simulator. It implements research-grade techniques as first-class APIs - inits, symmetry reductions, and convergence telemetry that aren't in the big-name frameworks."
        />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {FEATURE_CARDS.map((feature) => (
            <div key={feature.n} className="card" style={{ padding: 28 }}>
              <div className="flex justify-between items-baseline">
                <span className="mono text-orange" style={{ fontSize: 12, letterSpacing: '0.1em' }}>FEATURE / {feature.n}</span>
                <span className="mono text-faint" style={{ fontSize: 11 }}>↗</span>
              </div>
              <h3 className="h3 mt-24">{feature.title}</h3>
              <p className="text-dim mt-16" style={{ fontSize: 14, lineHeight: 1.55 }}>{feature.desc}</p>
              <hr className="rule mt-24" />
              <div className="mono mt-16" style={{ fontSize: 12, color: 'var(--blue)' }}>{feature.code}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchSection() {
  return (
    <section id="quickstart">
      <div className="container">
        <SectionHeader
          num="04 / 06"
          kicker="QUICK START"
          title="From clone to circuit in 90 seconds."
          desc="CMake 3.20+, a C++23 compiler, and OpenMP. Eigen, NLopt, GoogleTest, and Google Benchmark are fetched automatically."
        />
        <div className="grid" style={{ gridTemplateColumns: '1.1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 0 }}>
            <div className="flex justify-between items-center" style={{ padding: '12px 18px', borderBottom: '1px solid var(--rule)' }}>
              <span className="tag tag-orange">CMakeLists.txt · FetchContent</span>
              <span className="mono text-faint" style={{ fontSize: 11 }}>RECOMMENDED</span>
            </div>
            <div className="code-block" style={{ border: 0, padding: '20px 22px' }} dangerouslySetInnerHTML={{ __html:
`<span class="fn">FetchContent_Declare</span>(
    lindblad
    <span class="cm"># Local source directory if downloaded from releases:</span>
    <span class="ty">SOURCE_DIR</span>     <span class="st">\${CMAKE_SOURCE_DIR}/external/lindblad</span>

    <span class="cm"># Or fetch from GitHub:</span>
    <span class="cm"># GIT_REPOSITORY git@github.com:verycareful/lindblad.git</span>
    <span class="cm"># GIT_TAG        R.1.4.1</span>
)
<span class="fn">FetchContent_MakeAvailable</span>(lindblad)

<span class="fn">target_link_libraries</span>(my_app <span class="ty">PRIVATE</span> lindblad_core)`
            }} />
            <div className="flex justify-between items-center" style={{ padding: '10px 18px', borderTop: '1px solid var(--rule)', background: 'var(--surface-2)' }}>
              <span className="mono text-faint" style={{ fontSize: 11 }}>LATEST RELEASE · R.1.4.1</span>
              <a href="https://github.com/verycareful/lindblad/releases" target="_blank" rel="noopener" className="mono" style={{ fontSize: 11, color: 'var(--orange)' }}>↗ ALL RELEASES</a>
            </div>
          </div>

          <div className="flex-col gap-16">
            <div className="card">
              <div className="flex gap-12 items-center">
                <span className="mono text-orange">01.</span>
                <div className="label">CLONE &amp; CONFIGURE</div>
              </div>
              <div className="code-block mt-16" style={{ background: 'var(--bg)', padding: 14, fontSize: 12 }} dangerouslySetInnerHTML={{ __html:
`$ git clone https://github.com/verycareful/lindblad.git
$ cd lindblad
$ cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \\
    -DCMAKE_CXX_COMPILER=clang++ \\
    -DCMAKE_CXX_FLAGS="-O3 -march=native"`
              }} />
            </div>
            <div className="card">
              <div className="flex gap-12 items-center">
                <span className="mono text-orange">02.</span>
                <div className="label">BUILD &amp; VERIFY</div>
              </div>
              <div className="code-block mt-16" style={{ background: 'var(--bg)', padding: 14, fontSize: 12 }} dangerouslySetInnerHTML={{ __html:
`$ cmake --build build --config Release -j$(nproc)
   [214/214] Linking liblindblad_core.a

$ ctest --test-dir build --output-on-failure
   100% tests passed · 233/233 across 36 suites`
              }} />
            </div>
          </div>
        </div>

        <div className="flex gap-12 mt-16" style={{ flexWrap: 'wrap' }}>
          <a href="https://github.com/verycareful/lindblad" target="_blank" rel="noopener" className="btn btn-primary">↗ github.com/verycareful/lindblad</a>
          <a href="https://github.com/verycareful/lindblad/releases/tag/R.1.4.1" target="_blank" rel="noopener" className="btn">↗ R.1.4.1 RELEASE NOTES</a>
        </div>
      </div>
    </section>
  );
}

function LicenseSplit() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          num="05 / 06"
          kicker="LICENSING"
          title="Source-available. Two paths."
          desc="The Lindblad Software License v1.0 is free for non-commercial and academic use. Commercial use of any kind requires a separate written license."
        />
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 36 }}>
            <div className="flex justify-between items-baseline">
              <div className="label">PATH A · ACADEMIC</div>
              <span className="tag tag-blue">FREE</span>
            </div>
            <h3 className="h2 mt-16">Research &amp; teaching</h3>
            <ul className="text-dim mt-24" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <li>✓ Free for non-commercial use</li>
              <li>✓ Use in academic publications with citation</li>
              <li>✓ Source available on request</li>
              <li>✓ Cite via <span className="mono text-blue">CITATION.cff</span></li>
            </ul>
            <hr className="rule mt-32" />
            <a href="license.html" className="btn" style={{ marginTop: 24, display: 'inline-flex' }}>READ FULL LICENSE →</a>
          </div>
          <div className="card corners" style={{ padding: 36, background: 'linear-gradient(180deg, var(--orange-faint), transparent 60%)' }}>
            <div className="flex justify-between items-baseline">
              <div className="label" style={{ color: 'var(--orange)' }}>PATH B · COMMERCIAL</div>
              <span className="tag tag-orange">CONTACT</span>
            </div>
            <h3 className="h2 mt-16">Production &amp; products</h3>
            <ul className="text-dim mt-24" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <li>✓ Negotiated written agreement</li>
              <li>✓ Embed in commercial products</li>
              <li>✓ Feature-request prioritization</li>
              <li>✓ Per-seat or per-deployment terms</li>
            </ul>
            <hr className="rule mt-32" />
            <a href="contact.html" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>→ REQUEST LICENSE</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ paddingBottom: 120 }}>
      <div className="container">
        <div className="card corners" style={{ padding: '72px 48px', textAlign: 'center', background: 'var(--surface)' }}>
          <div className="eyebrow">§ 06 / 06 · GET STARTED</div>
          <h2 className="h-display mt-16" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
            Built for <span style={{ color: 'var(--orange)' }}>throughput.</span>
          </h2>
          <p className="lead mt-24" style={{ margin: '24px auto 0', maxWidth: 560 }}>
            If you're benchmarking variational algorithms, modeling realistic noise, or running orbit-symmetric QAOA — Lindblad is built for the work you're doing.
          </p>
          <div className="flex gap-12 mt-48" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="benchmarks.html" className="btn btn-primary">SEE BENCHMARKS →</a>
            <a href="mailto:qpp.support@proton.me" className="btn btn-ghost">qpp.support@proton.me</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <PageFrame active="home">
      <HomeHero />
      <CapabilityMatrix />
      <CodeSample />
      <Differentiators />
      <LaunchSection />
      <LicenseSplit />
      <CTA />
    </PageFrame>
  );
}

const ALGOS = [
  {
    id: 'vqe',
    name: 'VQE',
    full: 'Variational Quantum Eigensolver',
    family: 'Variational',
    desc: 'Find the ground state of a Hamiltonian by minimising ⟨ψ(θ)|H|ψ(θ)⟩ over a parameterized ansatz. LINDBLAD ships hardware-efficient and UCCSD-style ansatze with NLopt-driven optimization.',
    inputs: ['SparsePauliOp Hamiltonian', 'Ansatz generator', 'Initial parameters θ₀'],
    outputs: ['final_cost (eigenvalue estimate)', 'optimal_params θ*', 'convergence trace'],
    sims: ['Statevector', 'Density Matrix', 'MPS'],
    uses: ['Quantum chemistry', 'Molecular ground states', 'Spin systems'],
  },
  {
    id: 'qaoa',
    name: 'QAOA',
    full: 'Quantum Approximate Optimization Algorithm',
    family: 'Variational',
    desc: 'Combinatorial optimization via alternating problem and mixer layers. v2.2.0 brings parameter bounds [-2π, 2π], step-size 0.3, and physics-informed bitstring ranking by computational-basis cost.',
    inputs: ['IsingHamiltonian / SparsePauliOp', 'p (layer count)', 'optimizer config'],
    outputs: ['best_bitstring', 'approximation ratio', 'initial_params for analysis'],
    sims: ['Statevector', 'Density Matrix', 'MPS'],
    uses: ['MaxCut', 'Portfolio optimization', 'Constraint satisfaction'],
  },
  {
    id: 'maqaoa',
    name: 'MA-QAOA',
    full: 'Multi-Angle QAOA · layerwise',
    family: 'Variational',
    desc: 'Per-term parameterization with layerwise optimization. Direct statevector evolution bypasses circuit construction in the inner loop - 3-5× wall-time reduction on N=20. PI-init and Orbit-QAOA reduce variational landscape.',
    inputs: ['SparsePauliOp', 'p_max', 'budget_per_layer', 'mixer_weights'],
    outputs: ['per_layer_costs', 'layer_nfev', 'wall_time_by_layer', 'best_bitstring'],
    sims: ['Statevector', 'MPS'],
    uses: ['Microgrid commitment', 'QUBO at scale', 'Symmetric problems'],
    flagship: true,
  },
  {
    id: 'qpe',
    name: 'QPE',
    full: 'Quantum Phase Estimation',
    family: 'Search & estimation',
    desc: 'Extract the phase φ of an eigenvalue e^{2πiφ} of a unitary U via inverse QFT. LINDBLAD implements exact phase extraction with arbitrary precision qubits.',
    inputs: ['Unitary U', 'Eigenstate |ψ⟩', 'Precision qubits k'],
    outputs: ['phase φ ∈ [0,1)', 'binary representation', 'amplitude distribution'],
    sims: ['Statevector'],
    uses: ['Eigenvalue estimation', "Shor's algorithm subroutine", 'HHL'],
  },
  {
    id: 'grover',
    name: 'Grover',
    full: "Grover's Search",
    family: 'Search & estimation',
    desc: 'Quadratic-speedup unstructured search via amplitude amplification. LINDBLAD provides MCX-based oracles with auto-iteration count from problem size.',
    inputs: ['Oracle (function or SparsePauliOp)', 'Marked state count m', 'Iterations k'],
    outputs: ['best_bitstring', 'success_probability', 'histogram'],
    sims: ['Statevector', 'MPS'],
    uses: ['SAT solving', 'Database search', 'Subroutine in larger algos'],
  },
  {
    id: 'bv',
    name: 'BV',
    full: 'Bernstein–Vazirani family',
    family: 'Oracular',
    desc: 'Recover a hidden bitstring s with one quantum query. LINDBLAD ships standard, recursive, probabilistic, and distributed BV variants - all natively Clifford-simulable.',
    inputs: ['Oracle f(x) = s·x'],
    outputs: ['recovered s', 'single-query certainty'],
    sims: ['Statevector', 'Clifford', 'Density Matrix'],
    uses: ['Pedagogy', 'Noise benchmarking', 'Clifford speedup demos'],
  },
  {
    id: 'dj',
    name: 'DJ',
    full: 'Deutsch–Jozsa',
    family: 'Oracular',
    desc: 'Single-query classification of constant vs. balanced functions. Foundational example of quantum query complexity.',
    inputs: ['Oracle f: {0,1}ⁿ → {0,1}'],
    outputs: ['classification: constant | balanced'],
    sims: ['Statevector', 'Clifford'],
    uses: ['Teaching', 'Clifford benchmarks'],
  },
  {
    id: 'simon',
    name: 'Simon',
    full: "Simon's Algorithm",
    family: 'Oracular',
    desc: 'Find the period s of f(x) = f(x ⊕ s) with O(n) queries. LINDBLAD implements GF(2) elimination on the sampled equations to recover s.',
    inputs: ['Oracle with period s', 'Sample budget'],
    outputs: ['period s', 'GF(2) elimination trace'],
    sims: ['Statevector', 'Clifford'],
    uses: ['Pre-Shor pedagogy', 'Algebraic structure detection'],
  },
] as const;

const FAMILIES = ['All', 'Variational', 'Search & estimation', 'Oracular'] as const;

type Family = (typeof FAMILIES)[number];

type Algo = (typeof ALGOS)[number];

function AlgorithmCard({ algorithm }: { algorithm: Algo }) {
  return (
    <div className={"card" + ((algorithm as { flagship?: boolean }).flagship ? ' corners' : '')} style={{ padding: 32 }}>
      <div className="flex justify-between items-baseline">
        <div>
          <div className="flex gap-8 items-baseline">
            <span className="mono" style={{ fontSize: 32, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{algorithm.name}</span>
            {(algorithm as { flagship?: boolean }).flagship ? <span className="tag tag-orange">FLAGSHIP</span> : null}
          </div>
          <div className="text-dim mt-8" style={{ fontSize: 14 }}>{algorithm.full}</div>
        </div>
        <span className="tag">{algorithm.family.toUpperCase()}</span>
      </div>

      <p className="text-dim mt-24" style={{ fontSize: 14, lineHeight: 1.6 }}>{algorithm.desc}</p>

      <hr className="rule mt-32" />

      <div className="grid mt-24" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, fontSize: 13 }}>
        <div>
          <div className="label" style={{ marginBottom: 8 }}>INPUTS</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {algorithm.inputs.map((input) => <li key={input} className="mono text-dim">→ {input}</li>)}
          </ul>
        </div>
        <div>
          <div className="label" style={{ marginBottom: 8 }}>OUTPUTS</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {algorithm.outputs.map((output) => <li key={output} className="mono" style={{ color: 'var(--orange)' }}>↳ {output}</li>)}
          </ul>
        </div>
      </div>

      <hr className="rule mt-24" />

      <div className="flex justify-between mt-24" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="label" style={{ marginBottom: 8 }}>SIMULATORS</div>
          <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
            {algorithm.sims.map((simulator) => <span key={simulator} className="tag tag-blue">{simulator}</span>)}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="label" style={{ marginBottom: 8 }}>USE CASES</div>
          <div className="text-dim mono" style={{ fontSize: 11, letterSpacing: '0.04em' }}>{algorithm.uses.join(' · ')}</div>
        </div>
      </div>
    </div>
  );
}

function AlgorithmsCatalog() {
  const [filter, setFilter] = useState<Family>('All');
  const filtered = filter === 'All' ? ALGOS : ALGOS.filter((algorithm) => algorithm.family === filter);

  return (
    <section style={{ paddingTop: 32 }}>
      <div className="container">
        <div className="flex justify-between items-baseline" style={{ marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
            {FAMILIES.map((family) => (
              <button
                key={family}
                className={"btn" + (filter === family ? ' btn-primary' : '')}
                style={{ height: 36, padding: '0 14px', fontSize: 12 }}
                onClick={() => setFilter(family)}
                type="button"
              >
                {family.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="mono text-faint" style={{ fontSize: 12 }}>{filtered.length} OF {ALGOS.length} SHOWN</span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map((algorithm) => <AlgorithmCard key={algorithm.id} algorithm={algorithm} />)}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          kicker="STACK"
          title="One pipeline, all algorithms."
          desc="Algorithms compose primitives. Primitives compose simulators. Simulators consume noise models. Every layer is swappable."
        />
        <div className="card" style={{ padding: 0 }}>
          {[
            { l: 'ALGORITHMS', v: 'VQE · QAOA · MA-QAOA · QPE · Grover · BV · DJ · Simon', c: 'var(--orange)' },
            { l: 'PRIMITIVES', v: 'Estimator (with caching · gradient) · Sampler', c: 'var(--blue)' },
            { l: 'TRANSPILER', v: 'ZYZ · KAK · SABRE Layout (3-pass) · SABRE Routing · BasisTranslator', c: 'var(--ink)' },
            { l: 'SIMULATORS', v: 'Statevector · Density Matrix · Clifford · MPS', c: 'var(--ink)' },
            { l: 'NOISE', v: 'Kraus · T1/T2 thermal · Depolarizing · Amplitude/Phase damping · Readout', c: 'var(--ink)' },
            { l: 'CORE', v: 'QuantumCircuit · DAG · SparsePauliOp · IsingHamiltonian', c: 'var(--ink-dim)' },
          ].map((row, index, rows) => (
            <div key={row.l} className="flex" style={{ borderBottom: index === rows.length - 1 ? 0 : '1px solid var(--rule)', padding: '20px 24px', alignItems: 'center', gap: 24 }}>
              <span className="mono" style={{ minWidth: 140, fontSize: 12, letterSpacing: '0.1em', color: row.c }}>{row.l}</span>
              <span className="mono text-dim" style={{ fontSize: 14 }}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AlgorithmsPage() {
  return (
    <PageFrame active="algorithms">
      <section style={{ paddingTop: 64, paddingBottom: 48, borderTop: 0 }}>
        <div className="container">
          <div className="eyebrow">§ ALGORITHM CATALOGUE</div>
          <h1 className="h-display mt-24" style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            Eight families.
            <br />
            <span style={{ color: 'var(--orange)' }}>One coherent stack.</span>
          </h1>
          <p className="lead mt-32">
            Every algorithm is implemented against the same <span className="mono text-orange">Estimator</span> / <span className="mono text-orange">Sampler</span> primitive surface, with the same transpiler cache, gradient infrastructure, and noise model. Drop in, swap simulator, repeat.
          </p>
        </div>
      </section>
      <AlgorithmsCatalog />
      <ArchitectureSection />
    </PageFrame>
  );
}

const LAYER_DATA = [
  { layer: 0, evals: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500], best: [-30.38, -30.38, -30.38, -30.38, -35.01, -98.65, -123.5, -125.89, -125.89, -125.89] },
  { layer: 1, evals: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500], best: [-154.97, -154.97, -154.97, -154.97, -161.78, -171.79, -183.86, -184.23, -184.41, -184.42] },
  { layer: 2, evals: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500], best: [-188.34, -188.34, -188.34, -188.34, -198.96, -204.68, -206.05, -212.77, -216.56, -216.88] },
  { layer: 3, evals: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500], best: [-216.74, -216.74, -216.74, -216.74, -225.17, -233.02, -233.32, -234.26, -236.62, -236.69] },
  { layer: 4, evals: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500], best: [-248.32, -248.32, -248.32, -248.32, -248.32, -250.46, -251.3, -251.77, -252.04, -252.26] },
  { layer: 5, evals: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500], best: [-251.25, -251.25, -251.25, -251.25, -257.37, -257.6, -258.89, -259.12, -259.33, -260.64] },
] as const;

function HeadlineRow() {
  return (
    <section style={{ paddingTop: 32 }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <Stat label="QUBITS" value={<Counter to={20} />} sub="N=20 microgrid" accent="var(--orange)" />
          <Stat label="FREE PARAMETERS" value={<Counter to={1380} />} sub="6 layers × 230 params/layer" />
          <Stat label="HAMILTONIAN TERMS" value={<Counter to={210} />} sub="20 Z + 190 ZZ" accent="var(--blue)" />
          <Stat label="FINAL ENERGY" value={<><span className="mono">−</span><Counter to={260.64} decimals={2} /></>} sub="from initial −30.38 (layer 0)" />
        </div>
      </div>
    </section>
  );
}

function ConvergenceChart() {
  const width = 1216;
  const height = 420;
  const padLeft = 56;
  const padRight = 24;
  const padTop = 32;
  const padBottom = 48;
  const innerWidth = width - padLeft - padRight;
  const innerHeight = height - padTop - padBottom;
  const totalEvals = 6 * 500;
  const yMin = -270;
  const yMax = 0;
  const xToPx = (evalCount: number) => padLeft + (evalCount / totalEvals) * innerWidth;
  const yToPx = (value: number) => padTop + ((yMax - value) / (yMax - yMin)) * innerHeight;
  const [hover, setHover] = useState<{ index: number; point: { layer: number; evalCum: number; best: number } } | null>(null);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2200;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setReveal(1 - Math.pow(1 - t, 3));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const allPoints = LAYER_DATA.flatMap((layerData) =>
    layerData.evals.map((evalCount, index) => ({ layer: layerData.layer, evalCum: layerData.layer * 500 + evalCount, best: layerData.best[index] })),
  );
  const visibleCount = Math.floor(allPoints.length * reveal);
  const visiblePoints = allPoints.slice(0, Math.max(1, visibleCount));
  const pathD = visiblePoints.map((point, index) => `${index === 0 ? 'M' : 'L'}${xToPx(point.evalCum)},${yToPx(point.best)}`).join(' ');

  return (
    <section>
      <div className="container">
        <SectionHeader
          kicker="CONVERGENCE TRACE"
          title="MA-QAOA layerwise · N=20"
          desc="Best Ising energy found at each NLopt evaluation, across 6 layers of 500 evaluations each. Layer transitions are sharp jumps as new (γ, β) parameters enter the variational landscape."
        />
        <div className="card" style={{ padding: 0 }}>
          <div className="flex justify-between" style={{ padding: '14px 22px', borderBottom: '1px solid var(--rule)', flexWrap: 'wrap', gap: 12 }}>
            <div className="flex gap-12 items-center">
              <span className="tag tag-orange"><span className="dot" />NLOPT</span>
              <span className="mono text-dim" style={{ fontSize: 12 }}>algorithm = LN_COBYLA · seed = 42 · budget = 500/layer</span>
            </div>
            <span className="mono text-faint" style={{ fontSize: 12 }}>WALL TIME · 9712.93 s · clang++ -O3 -march=native</span>
          </div>
          <div style={{ padding: 16 }}>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" style={{ display: 'block', maxWidth: '100%' }}>
              {[0, -50, -100, -150, -200, -250].map((tick) => (
                <g key={tick}>
                  <line x1={padLeft} x2={width - padRight} y1={yToPx(tick)} y2={yToPx(tick)} stroke="var(--rule)" strokeWidth="1" strokeDasharray={tick === 0 ? '' : '2 4'} />
                  <text x={padLeft - 12} y={yToPx(tick) + 4} textAnchor="end" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-faint)">{tick}</text>
                </g>
              ))}
              {[0, 500, 1000, 1500, 2000, 2500, 3000].map((value, index) => (
                <g key={value}>
                  <line x1={xToPx(value)} x2={xToPx(value)} y1={padTop} y2={height - padBottom} stroke="var(--rule-strong)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  {index < 6 ? <text x={xToPx(value) + 6} y={padTop + 14} fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-faint)" letterSpacing="0.08em">L{index}</text> : null}
                </g>
              ))}
              <line x1={padLeft} x2={width - padRight} y1={yToPx(-260.64)} y2={yToPx(-260.64)} stroke="var(--orange)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <text x={width - padRight - 8} y={yToPx(-260.64) - 6} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="var(--orange)">FINAL  E = −260.64</text>
              <path d={pathD} fill="none" stroke="var(--orange)" strokeWidth="2" />
              {visiblePoints.map((point, index) => (
                <circle
                  key={index}
                  cx={xToPx(point.evalCum)}
                  cy={yToPx(point.best)}
                  r={hover?.index === index ? 5 : 2.5}
                  fill={hover?.index === index ? 'var(--orange)' : 'var(--bg)'}
                  stroke="var(--orange)"
                  strokeWidth="1.5"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHover({ index, point })}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
              {hover ? (
                <g pointerEvents="none">
                  <line x1={xToPx(hover.point.evalCum)} x2={xToPx(hover.point.evalCum)} y1={padTop} y2={height - padBottom} stroke="var(--orange-dim)" strokeWidth="1" />
                  <rect x={xToPx(hover.point.evalCum) + 10} y={yToPx(hover.point.best) - 36} width="160" height="48" fill="var(--surface)" stroke="var(--orange)" strokeWidth="1" />
                  <text x={xToPx(hover.point.evalCum) + 18} y={yToPx(hover.point.best) - 18} fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink)">layer={hover.point.layer}  eval={hover.point.evalCum % 500 || 500}</text>
                  <text x={xToPx(hover.point.evalCum) + 18} y={yToPx(hover.point.best) - 2} fontFamily="var(--font-mono)" fontSize="11" fill="var(--orange)">best = {hover.point.best.toFixed(2)}</text>
                </g>
              ) : null}
              <text x={width / 2} y={height - 8} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-faint)" letterSpacing="0.08em">CUMULATIVE NLOPT EVALUATIONS · 500/layer × 6 layers = 3000</text>
              <text x={padLeft - 40} y={padTop - 8} fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-faint)" letterSpacing="0.08em">ISING ENERGY ↓</text>
            </svg>
          </div>
          <div className="flex justify-between mono" style={{ padding: '12px 22px', borderTop: '1px solid var(--rule)', background: 'var(--surface-2)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.06em', flexWrap: 'wrap', gap: 12 }}>
            <span>HOVER ANY POINT FOR DETAIL · 60 SAMPLES PLOTTED</span>
            <span>BEST BITSTRING · 01101100000110011011</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PerLayerBars() {
  const layerStarts = [-30.38, -154.97, -188.34, -216.74, -248.32, -251.25];
  const layerEnds = [-125.89, -184.42, -216.88, -236.69, -252.26, -260.64];
  const gains = layerStarts.map((start, index) => start - layerEnds[index]);
  const maxGain = Math.max(...gains);

  return (
    <section>
      <div className="container">
        <SectionHeader
          kicker="ENERGY GAINED · PER LAYER"
          title="Diminishing returns, as expected."
          desc="Layer 0 finds the bulk of the optimization landscape. Subsequent layers refine. This is the signature of a well-conditioned variational ansatz."
        />
        <div className="card" style={{ padding: 28 }}>
          <div className="flex-col gap-16">
            {gains.map((gain, index) => (
              <div key={index} className="flex items-center gap-16">
                <span className="mono" style={{ width: 56, fontSize: 13, color: 'var(--ink-dim)' }}>L{index}</span>
                <div style={{ flex: 1, height: 28, background: 'var(--surface-2)', border: '1px solid var(--rule)', position: 'relative' }}>
                  <div style={{ width: `${(gain / maxGain) * 100}%`, height: '100%', background: index === 0 ? 'var(--orange)' : index < 3 ? 'var(--orange-dim)' : 'var(--blue-dim)', transition: 'width 1.2s cubic-bezier(.2,.7,.2,1)' }} />
                  <span className="mono" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--ink)' }}>Δ {gain.toFixed(2)}</span>
                </div>
                <span className="mono text-faint" style={{ width: 200, fontSize: 12, textAlign: 'right' }}>{layerStarts[index].toFixed(2)} → {layerEnds[index].toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfigSection() {
  const problemRows = [
    ['Test suite', 'MicrogridQAOA20'],
    ['Test case', 'MAQAOA_Layerwise'],
    ['Qubits (N)', '20'],
    ['Demand', '52 MW'],
    ['Penalty (A)', '20'],
    ['Hamiltonian', '210 terms (20 Z + 190 ZZ)'],
    ['Ising offset', '3861.05'],
    ['Target Ising', '−3845.05'],
    ['Exact QUBO opt', '16 (10111100100000000000)'],
  ] as const;

  const solverRows = [
    ['p_max', '6'],
    ['budget/layer', '500'],
    ['seed', '42'],
    ['params/layer', '230 (term-indexed)'],
    ['total params', '1380'],
    ['optimizer', 'NLopt LN_COBYLA'],
    ['param bounds', '[-2π, 2π]'],
    ['init step', '0.30'],
    ['wall time', '9712.93 s'],
  ] as const;

  return (
    <section>
      <div className="container">
        <SectionHeader
          kicker="REPRODUCE"
          title="Run config."
          desc="Every number on this page comes from a single ctest invocation. Reproduce locally with the command below."
        />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          <div className="card" style={{ padding: 28 }}>
            <div className="label">PROBLEM SPECIFICATION</div>
            <div className="mt-16">
              {problemRows.map(([key, value]) => (
                <div key={key} className="flex justify-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--rule)', fontSize: 13 }}>
                  <span className="text-dim">{key}</span>
                  <span className="mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <div className="label">SOLVER CONFIG</div>
            <div className="mt-16">
              {solverRows.map(([key, value]) => (
                <div key={key} className="flex justify-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--rule)', fontSize: 13 }}>
                  <span className="text-dim">{key}</span>
                  <span className="mono text-orange">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="code-block mt-24" dangerouslySetInnerHTML={{ __html:
`<span class="cm"># Reproduce</span>
<span class="kw">$</span> ctest --test-dir build-clang -R MicrogridQAOA20.MAQAOA_Layerwise --output-on-failure
<span class="cm"># Output: outputs/maqaoa_20q_results.txt</span>`
        }} />
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          kicker="HONEST DISCLAIMER"
          title="What these numbers do and don't show."
        />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          <div className="card">
            <div className="label" style={{ color: 'var(--green)' }}>WHAT IT SHOWS</div>
            <ul className="text-dim mt-16" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <li>→ Layerwise convergence behaviour on a real QUBO.</li>
              <li>→ Wall-time scaling at N=20 on commodity hardware.</li>
              <li>→ Effect of NLopt evaluation budget per layer.</li>
              <li>→ Approximate-ratio tradeoffs on a hard problem.</li>
            </ul>
          </div>
          <div className="card">
            <div className="label" style={{ color: 'var(--orange)' }}>WHAT IT DOESN'T</div>
            <ul className="text-dim mt-16" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <li>→ Comparison against other simulators (run your own).</li>
              <li>→ Hardware execution - this is exact statevector.</li>
              <li>→ Optimality - this run did not reach exact minimum.</li>
              <li>→ Generalization beyond microgrid-style QUBOs.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// BenchmarksPageFull is preserved below — uncomment and re-export when benchmarks are ready.
function BenchmarksPageFull() {
  return (
    <PageFrame active="benchmarks">
      <section style={{ paddingTop: 64, paddingBottom: 32, borderTop: 0 }}>
        <div className="container">
          <div className="eyebrow">§ MEASURED PERFORMANCE</div>
          <h1 className="h-display mt-24" style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            The proof is in the
            <br />
            <span style={{ color: 'var(--orange)' }}>nfev counter.</span>
          </h1>
          <p className="lead mt-32">
            Real numbers from <span className="mono text-blue">tests/test_maqaoa_microgrid.cpp</span> - a 20-qubit microgrid commitment problem with 1380 free parameters, optimized layerwise across 6 layers with budget 500 per layer.
          </p>
        </div>
      </section>
      <HeadlineRow />
      <ConvergenceChart />
      <PerLayerBars />
      <ConfigSection />
      <Methodology />
    </PageFrame>
  );
}

export function BenchmarksPage() {
  return (
    <PageFrame active="benchmarks">
      <section style={{ paddingTop: 64, paddingBottom: 48, borderTop: 0 }}>
        <div className="container">
          <div className="eyebrow">§ MEASURED PERFORMANCE</div>
          <h1 className="h-display mt-24" style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            Benchmarks
            <br />
            <span style={{ color: 'var(--orange)' }}>in progress.</span>
          </h1>
          <p className="lead mt-32">
            Performance data is being collected and will be published here once complete.
          </p>
        </div>
      </section>
    </PageFrame>
  );
}

const FAQ_ITEMS = [
  { q: 'Can I evaluate LINDBLAD before committing to a commercial license?', a: 'It depends on your situation. If you are an individual researcher or academic, the non-commercial license covers evaluation at no cost. If you represent a for-profit organization, any use — including evaluation and benchmarking — constitutes Commercial Use under §1.5 of the SLA and requires a commercial license agreement. Contact us to discuss terms before running it in a company context.' },
  { q: 'Is academic access automatic?', a: 'Yes. The source is published on GitHub at github.com/verycareful/lindblad and is available via CMake FetchContent or release tarballs. Academic and non-commercial use is free under the SLA — no request required.' },
  { q: 'Can I publish benchmarks comparing LINDBLAD to other simulators?', a: 'Yes, under the academic license. We ask that you cite the version (R.1.3.2) and report hardware specs alongside any performance numbers.' },
  { q: 'Do you accept community contributions?', a: 'Yes — contributions are welcome from both commercial and non-commercial users, and every PR will be considered. LINDBLAD is maintained by a single author, so reviews may not be quick unless the contribution fixes a major bug. Note that §6.3 of the SLA assigns contribution copyright to the author irrevocably — review before submitting.' },
  { q: 'Can I request new features?', a: 'Yes, requests are considered. Feature requests from commercial consumers are prioritized; community feature requests are evaluated as time permits.' },
] as const;

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex-col gap-8" style={{ display: 'flex' }}>
      <span className="label">{label}{required ? <span className="text-orange"> *</span> : null}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  background: 'var(--bg)',
  border: '1px solid var(--rule)',
  color: 'var(--ink)',
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  padding: '12px 14px',
  outline: 'none',
  transition: 'border-color 120ms',
};

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    org: '',
    email: '',
    intent: 'commercial',
    use: '',
    timeline: '',
    msg: '',
  });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`LINDBLAD ${form.intent} inquiry — ${form.org || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nOrganization: ${form.org}\nEmail: ${form.email}\n` +
      `Inquiry type: ${form.intent}\nUse case: ${form.use}\nTimeline: ${form.timeline}\n\n${form.msg}\n\n— sent via LINDBLAD website`,
    );
    window.location.href = `mailto:qpp.support@proton.me?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="flex-col gap-24">
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <Field label="NAME" required>
          <input style={inputStyle} required value={form.name} onChange={update('name')} placeholder="Jane Doe" />
        </Field>
        <Field label="ORGANIZATION">
          <input style={inputStyle} value={form.org} onChange={update('org')} placeholder="University / Company" />
        </Field>
      </div>
      <Field label="EMAIL" required>
        <input style={inputStyle} type="email" required value={form.email} onChange={update('email')} placeholder="you@domain.com" />
      </Field>
      <Field label="INQUIRY TYPE">
        <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
          {[
            { v: 'commercial', l: 'Commercial license' },
            { v: 'support', l: 'Technical question' },
            { v: 'press', l: 'Press / partnership' },
          ].map((option) => (
            <button
              type="button"
              key={option.v}
              onClick={() => setForm((current) => ({ ...current, intent: option.v }))}
              className={"btn" + (form.intent === option.v ? ' btn-primary' : '')}
              style={{ height: 38, fontSize: 12 }}
            >
              {option.l.toUpperCase()}
            </button>
          ))}
        </div>
      </Field>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <Field label="INTENDED USE">
          <input style={inputStyle} value={form.use} onChange={update('use')} placeholder="QAOA at scale, noise modeling..." />
        </Field>
        <Field label="TIMELINE">
          <input style={inputStyle} value={form.timeline} onChange={update('timeline')} placeholder="Q2 2026, ASAP, exploratory..." />
        </Field>
      </div>
      <Field label="MESSAGE">
        <textarea
          style={{ ...inputStyle, minHeight: 140, fontFamily: 'var(--font-sans)', fontSize: 14, resize: 'vertical' }}
          value={form.msg}
          onChange={update('msg')}
          placeholder="Tell us about your project, scale of deployment, and any specific LINDBLAD features you're interested in."
        />
      </Field>
      <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: 16 }}>
        <span className="mono text-faint" style={{ fontSize: 12 }}>
          {sent ? '→ MAIL CLIENT OPENED' : '↳ FORM SENDS VIA YOUR MAIL CLIENT'}
        </span>
        <button type="submit" className="btn btn-primary">→ SEND INQUIRY</button>
      </div>
    </form>
  );
}

function ContactContent() {
  return (
    <section style={{ paddingTop: 24 }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 1fr)', gap: 32 }}>
          <div className="card" style={{ padding: 40 }}>
            <h2 className="h2">Send an inquiry</h2>
            <p className="text-dim mt-8" style={{ fontSize: 14 }}>Fields marked with an orange asterisk are required.</p>
            <hr className="rule mt-32" />
            <div className="mt-32">
              <ContactForm />
            </div>
          </div>
          <div className="flex-col gap-16">
            <div className="card corners" style={{ padding: 28 }}>
              <div className="label">DIRECT</div>
              <h3 className="h3 mt-16">Email</h3>
              <a className="mono mt-16" style={{ display: 'inline-block', fontSize: 18, color: 'var(--orange)', marginTop: 16 }} href="mailto:qpp.support@proton.me">qpp.support@proton.me</a>
              <p className="text-dim mt-16" style={{ fontSize: 13 }}>Best for licensing, NDAs, and pricing questions.</p>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <div className="label">REPOSITORY</div>
              <h3 className="h3 mt-16">GitHub</h3>
              <a className="mono mt-16" target="_blank" rel="noopener" href="https://github.com/verycareful/lindblad" style={{ display: 'inline-block', fontSize: 14, color: 'var(--blue)', marginTop: 16 }}>github.com/verycareful/lindblad ↗</a>
              <p className="text-dim mt-16" style={{ fontSize: 13 }}>Issues, pull requests, and bug reports. Forks are not licensed under SLA v1.0.</p>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <div className="label">RESPONSE TIME</div>
              <h3 className="h3 mt-16">2 business days</h3>
              <p className="text-dim mt-16" style={{ fontSize: 13 }}>Commercial licensing inquiries are prioritized. All other inquiries are usually answered same-day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section>
      <div className="container">
        <SectionHeader kicker="FAQ" title="Common questions." />
        <div className="card" style={{ padding: 0 }}>
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.q} style={{ borderBottom: index === FAQ_ITEMS.length - 1 ? 0 : '1px solid var(--rule)' }}>
              <summary style={{ padding: '20px 28px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 15, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item.q}</span>
                <span className="text-orange" style={{ fontSize: 18 }}>+</span>
              </summary>
              <div className="text-dim" style={{ padding: '0 28px 24px', fontSize: 14, lineHeight: 1.6, maxWidth: 760 }}>{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <PageFrame active="contact">
      <section style={{ paddingTop: 64, paddingBottom: 32, borderTop: 0 }}>
        <div className="container">
          <div className="eyebrow">§ GET IN TOUCH</div>
          <h1 className="h-display mt-24" style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            Let's talk
            <br />
            <span style={{ color: 'var(--orange)' }}>specifics.</span>
          </h1>
          <p className="lead mt-32">
            Whether you need a commercial license, technical support, or just want to discuss a use case — start a thread. We respond to every inbound within two business days.
          </p>
        </div>
      </section>
      <ContactContent />
      <FAQSection />
    </PageFrame>
  );
}

const KEY_TERMS = [
  { n: '§1', title: 'Scope', body: 'Source-available. The software is provided in source form for review, study, and authorized use. The author retains all copyright.' },
  { n: '§2', title: 'Permitted use', body: 'Non-commercial and academic use is granted at no cost. "Non-commercial" means use that does not produce, sell, or support a commercial product or service.' },
  { n: '§3', title: 'Commercial use', body: 'Any commercial use, including internal R&D supporting commercial products, requires a separate written license. Contact qpp.support@proton.me to begin discussion.' },
  { n: '§4', title: 'Redistribution', body: 'Redistribution in any form - forks, copies, derivative works - is strictly prohibited without explicit written authorization. GitHub forks are technically permitted but not licensed for any use other than PR review.' },
  { n: '§5', title: 'Modifications', body: 'Modifications for personal study are permitted under non-commercial use. Modifications for commercial deployment require explicit license terms.' },
  { n: '§6.3', title: 'Contributions', body: 'By submitting any contribution (PR, code snippet, bug fix), you irrevocably assign full copyright ownership of that contribution to the author.' },
  { n: '§7', title: 'Citations', body: 'Academic users must cite Lindblad in publications that use it. The CITATION.cff file in the repository contains the canonical citation entry.' },
  { n: '§8', title: 'Warranty', body: 'The software is provided AS IS, without warranty of any kind. Suitability for any particular purpose must be evaluated by the licensee.' },
] as const;

function LicensePaths() {
  return (
    <section style={{ paddingTop: 32 }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          <div className="card corners" style={{ padding: 40 }}>
            <span className="tag tag-blue">PATH A · FREE</span>
            <h2 className="h2 mt-16">Academic & non-commercial</h2>
            <ul className="text-dim mt-24" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14, lineHeight: 1.5 }}>
              <li>✓ Use in research, teaching, dissertations</li>
              <li>✓ Use in academic publications with citation</li>
              <li>✓ Modifications for personal study</li>
              <li>✗ No redistribution of source or binaries</li>
              <li>✗ No commercial deployment of any kind</li>
              <li>✗ No derivative works without authorization</li>
            </ul>
            <hr className="rule mt-32" />
            <div className="flex gap-12 mt-24">
              <a href="https://github.com/verycareful/lindblad" className="btn">GITHUB ↗ </a>
            </div>
          </div>
          <div className="card corners" style={{ padding: 40, background: 'linear-gradient(180deg, var(--orange-faint), transparent 70%)' }}>
            <span className="tag tag-orange">PATH B · COMMERCIAL</span>
            <h2 className="h2 mt-16">Production & products</h2>
            <ul className="text-dim mt-24" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14, lineHeight: 1.5 }}>
              <li>✓ Negotiated written license agreement</li>
              <li>✓ Embed in proprietary products</li>
              <li>✓ Internal R&D and prototyping</li>
              <li>✓ Per-seat or per-deployment terms</li>
              <li>✓ Feature-request prioritization</li>
            </ul>
            <hr className="rule mt-32" />
            <div className="flex gap-12 mt-24">
              <a href="contact.html" className="btn btn-primary">→ START LICENSING DISCUSSION</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeyTerms() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          kicker="KEY TERMS · NOT A SUBSTITUTE FOR THE LICENSE"
          title="The eight points that matter."
          desc="A summary for orientation. The binding text is the LICENSE file in the repository."
        />
        <div className="card" style={{ padding: 0 }}>
          {KEY_TERMS.map((term, index) => (
            <div key={term.n} className="flex" style={{ borderBottom: index === KEY_TERMS.length - 1 ? 0 : '1px solid var(--rule)', padding: '24px 28px', gap: 32, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 64 }}>
                <span className="mono text-orange" style={{ fontSize: 14, fontWeight: 500 }}>{term.n}</span>
              </div>
              <div style={{ minWidth: 180, flex: '0 0 200px' }}>
                <span className="mono" style={{ fontSize: 15 }}>{term.title}</span>
              </div>
              <div className="text-dim" style={{ fontSize: 14, lineHeight: 1.6, flex: 1 }}>{term.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CitationSection() {
  return (
    <section>
      <div className="container">
        <SectionHeader kicker="CITATION" title="If you use Lindblad, please cite it." />
        <div className="code-block" dangerouslySetInnerHTML={{ __html:
`<span class="cm">// CITATION.cff (excerpt)</span>
<span class="ty">cff-version</span>: <span class="st">"1.2.0"</span>
<span class="ty">title</span>:        <span class="st">"Lindblad: a high-performance C++23 quantum computing framework"</span>
<span class="ty">authors</span>:
  - <span class="ty">family-names</span>: <span class="st">"Suresh"</span>
    <span class="ty">given-names</span>:  <span class="st">"Sricharan"</span>
<span class="ty">version</span>:      <span class="st">"R.1.3.2"</span>
<span class="ty">date-released</span>: <span class="st">"2026"</span>
<span class="ty">license</span>:      <span class="st">"Lindblad-SLA-1.0"</span>`
        }} />
      </div>
    </section>
  );
}

export function LicensePage() {
  return (
    <PageFrame active="license">
      <section style={{ paddingTop: 64, paddingBottom: 48, borderTop: 0 }}>
        <div className="container">
          <div className="eyebrow">§ LINDBLAD SOFTWARE LICENSE v1.0</div>
          <h1 className="h-display mt-24" style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}>
            Source-available.
            <br />
            <span style={{ color: 'var(--orange)' }}>Two paths.</span>
          </h1>
          <p className="lead mt-32">
            Free for non-commercial and academic use. Commercial use of any kind requires a separate written license agreement. Redistribution in any form is prohibited without explicit written authorization.
          </p>
        </div>
      </section>
      <LicensePaths />
      <KeyTerms />
      <CitationSection />
    </PageFrame>
  );
}
