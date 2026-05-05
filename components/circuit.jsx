/* global React */
// Animated quantum circuit that draws itself.
// Self-contained — uses inline SVG and CSS animations.
// Three variants: 'hero' (large, 5 qubits, complex), 'compact' (3 qubits, banner), 'glyph' (tiny logo)

const { useEffect, useRef, useState } = React;

// Circuit definition — column-by-column, time t=0..1
// Each gate: { col, qubits: [q] | [c, t], type, label, t0 }
const HERO_CIRCUIT = {
  qubits: 5,
  cols: 14,
  gates: [
    // Initial Hadamards
    { col: 0, q: 0, type: "H", label: "H", t0: 0.06 },
    { col: 0, q: 1, type: "H", label: "H", t0: 0.08 },
    { col: 0, q: 2, type: "H", label: "H", t0: 0.10 },
    { col: 0, q: 3, type: "H", label: "H", t0: 0.12 },
    { col: 0, q: 4, type: "H", label: "H", t0: 0.14 },
    // RZ rotations (problem layer)
    { col: 1, q: 0, type: "RZ", label: "RZ", t0: 0.20, accent: "orange" },
    { col: 1, q: 2, type: "RZ", label: "RZ", t0: 0.22, accent: "orange" },
    { col: 1, q: 4, type: "RZ", label: "RZ", t0: 0.24, accent: "orange" },
    // CNOT 0->1
    { col: 2, type: "CX", c: 0, t: 1, t0: 0.30 },
    { col: 2, q: 3, type: "RZ", label: "RZ", t0: 0.32, accent: "orange" },
    // ZZ-style block
    { col: 3, type: "CX", c: 1, t: 2, t0: 0.36 },
    { col: 4, q: 2, type: "RZ", label: "RZ(γ)", t0: 0.40, accent: "orange", wide: true },
    { col: 5, type: "CX", c: 1, t: 2, t0: 0.44 },
    // CNOT 2->3
    { col: 6, type: "CX", c: 2, t: 3, t0: 0.50 },
    { col: 6, q: 0, type: "RX", label: "RX", t0: 0.50, accent: "blue" },
    { col: 6, q: 4, type: "RX", label: "RX", t0: 0.52, accent: "blue" },
    // CNOT 3->4
    { col: 7, type: "CX", c: 3, t: 4, t0: 0.56 },
    { col: 7, q: 1, type: "RX", label: "RX(β)", t0: 0.56, accent: "blue", wide: true },
    // Mixer layer
    { col: 8, q: 0, type: "RX", label: "RX", t0: 0.62, accent: "blue" },
    { col: 8, q: 2, type: "RX", label: "RX", t0: 0.64, accent: "blue" },
    { col: 8, q: 3, type: "RX", label: "RX", t0: 0.66, accent: "blue" },
    { col: 8, q: 4, type: "RX", label: "RX", t0: 0.68, accent: "blue" },
    // Long-range CNOT
    { col: 9, type: "CX", c: 0, t: 4, t0: 0.74 },
    { col: 9, q: 2, type: "H", label: "H", t0: 0.74 },
    // Measurements
    { col: 12, q: 0, type: "M", label: "M", t0: 0.86 },
    { col: 12, q: 1, type: "M", label: "M", t0: 0.88 },
    { col: 12, q: 2, type: "M", label: "M", t0: 0.90 },
    { col: 12, q: 3, type: "M", label: "M", t0: 0.92 },
    { col: 12, q: 4, type: "M", label: "M", t0: 0.94 },
  ],
};

const COMPACT_CIRCUIT = {
  qubits: 3,
  cols: 8,
  gates: [
    { col: 0, q: 0, type: "H", label: "H", t0: 0.05 },
    { col: 0, q: 1, type: "H", label: "H", t0: 0.10 },
    { col: 0, q: 2, type: "H", label: "H", t0: 0.15 },
    { col: 1, type: "CX", c: 0, t: 1, t0: 0.25 },
    { col: 2, q: 1, type: "RZ", label: "RZ", t0: 0.35, accent: "orange" },
    { col: 3, type: "CX", c: 0, t: 1, t0: 0.45 },
    { col: 4, type: "CX", c: 1, t: 2, t0: 0.55 },
    { col: 5, q: 0, type: "RX", label: "RX", t0: 0.65, accent: "blue" },
    { col: 5, q: 1, type: "RX", label: "RX", t0: 0.68, accent: "blue" },
    { col: 5, q: 2, type: "RX", label: "RX", t0: 0.71, accent: "blue" },
    { col: 7, q: 0, type: "M", label: "M", t0: 0.85 },
    { col: 7, q: 1, type: "M", label: "M", t0: 0.88 },
    { col: 7, q: 2, type: "M", label: "M", t0: 0.91 },
  ],
};

function CircuitDiagram({ circuit = HERO_CIRCUIT, height = 360, loop = true, replayKey = 0 }) {
  const { qubits, cols, gates } = circuit;
  const padX = 48;
  const padY = 36;
  const colW = 56;
  const rowH = (height - padY * 2) / Math.max(1, qubits - 1);
  const width = padX * 2 + (cols - 1) * colW;

  const [tick, setTick] = useState(0);

  // Animation cycle: 0..1 over ~6s, then pause, then loop
  useEffect(() => {
    if (!loop) return;
    let raf;
    let start = performance.now();
    const period = 7400; // ms full cycle including pause
    const step = (now) => {
      const t = ((now - start) % period) / period;
      setTick(t);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [loop, replayKey]);

  const drawT = Math.min(1, tick / 0.78); // wire/gate draw progress

  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        style={{ display: "block", maxWidth: "100%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="wire-glow" x1="0" x2="1">
            <stop offset="0" stopColor="var(--orange)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--orange)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
          </linearGradient>
          <pattern id="dotgrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.5" fill="var(--ink-faint)" opacity="0.3" />
          </pattern>
        </defs>

        {/* Qubit wires */}
        {Array.from({ length: qubits }).map((_, q) => {
          const y = padY + q * rowH;
          const dashOffset = (1 - drawT) * (width - padX * 2);
          return (
            <g key={`wire-${q}`}>
              <text
                x={padX - 14}
                y={y + 4}
                textAnchor="end"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="var(--ink-faint)"
                style={{ opacity: drawT > 0.02 ? 1 : 0, transition: "opacity 200ms" }}
              >
                |q{q}⟩
              </text>
              <line
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="var(--rule-strong)"
                strokeWidth="1"
                strokeDasharray={`${width - padX * 2}`}
                strokeDashoffset={dashOffset}
              />
            </g>
          );
        })}

        {/* Pulse traveling along wires */}
        {tick > 0.1 && tick < 0.85 && Array.from({ length: qubits }).map((_, q) => {
          const y = padY + q * rowH;
          const px = padX + (tick - 0.05) * (width - padX * 2);
          return (
            <g key={`pulse-${q}`} style={{ opacity: 0.55 }}>
              <line
                x1={Math.max(padX, px - 60)}
                y1={y}
                x2={Math.min(width - padX, px)}
                y2={y}
                stroke="url(#wire-glow)"
                strokeWidth="1.5"
              />
            </g>
          );
        })}

        {/* Gates */}
        {gates.map((g, i) => {
          const visible = tick > g.t0;
          const apperance = Math.min(1, Math.max(0, (tick - g.t0) / 0.04));
          if (g.type === "CX") {
            const x = padX + g.col * colW;
            const yc = padY + g.c * rowH;
            const yt = padY + g.t * rowH;
            return (
              <g key={i} style={{ opacity: visible ? apperance : 0 }}>
                <line x1={x} y1={yc} x2={x} y2={yt} stroke="var(--ink)" strokeWidth="1" />
                <circle cx={x} cy={yc} r="4" fill="var(--ink)" />
                <circle cx={x} cy={yt} r="10" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1" />
                <line x1={x - 7} y1={yt} x2={x + 7} y2={yt} stroke="var(--ink)" strokeWidth="1" />
                <line x1={x} y1={yt - 7} x2={x} y2={yt + 7} stroke="var(--ink)" strokeWidth="1" />
              </g>
            );
          }
          // Single-qubit boxed gate
          const x = padX + g.col * colW;
          const y = padY + g.q * rowH;
          const w = g.wide ? 38 : 26;
          const h = 22;
          const accent =
            g.accent === "orange" ? "var(--orange)" :
            g.accent === "blue" ? "var(--blue)" :
            "var(--ink)";
          const fill =
            g.type === "M" ? "var(--surface-2)" :
            g.accent === "orange" ? "var(--orange-faint)" :
            g.accent === "blue" ? "var(--blue-faint)" :
            "var(--surface)";
          return (
            <g key={i} style={{ opacity: visible ? apperance : 0, transformOrigin: `${x}px ${y}px`, transform: visible ? "scale(1)" : "scale(0.6)", transition: "transform 200ms" }}>
              <rect x={x - w / 2} y={y - h / 2} width={w} height={h} fill={fill} stroke={accent} strokeWidth="1" />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill={accent}
                fontWeight="500"
              >
                {g.label}
              </text>
            </g>
          );
        })}

        {/* Measurement classical wires */}
        {tick > 0.92 && Array.from({ length: qubits }).map((_, q) => {
          const y = padY + q * rowH;
          const x = padX + 12 * colW;
          return (
            <g key={`cw-${q}`} style={{ opacity: Math.min(1, (tick - 0.92) / 0.05) }}>
              <line x1={x + 14} y1={y - 1.5} x2={width - padX} y2={y - 1.5} stroke="var(--blue-dim)" strokeWidth="1" />
              <line x1={x + 14} y1={y + 1.5} x2={width - padX} y2={y + 1.5} stroke="var(--blue-dim)" strokeWidth="1" />
            </g>
          );
        })}

        {/* Output bitstring readout */}
        {tick > 0.95 && (
          <g style={{ opacity: Math.min(1, (tick - 0.95) / 0.04) }}>
            <text
              x={width - padX + 6}
              y={padY - 12}
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--orange)"
              textAnchor="end"
            >
              ↓ measure
            </text>
            {Array.from({ length: qubits }).map((_, q) => {
              const y = padY + q * rowH;
              const bit = ["1", "0", "1", "1", "0"][q] || "0";
              return (
                <text
                  key={q}
                  x={width - padX + 8}
                  y={y + 4}
                  fontFamily="var(--font-mono)"
                  fontSize="13"
                  fill="var(--orange)"
                  fontWeight="500"
                >
                  {bit}
                </text>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}

// Tiny logo glyph — animated wire crossings
function LindbladGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
      <line x1="2" y1="7" x2="22" y2="7" stroke="var(--ink)" strokeWidth="1" />
      <line x1="2" y1="17" x2="22" y2="17" stroke="var(--ink)" strokeWidth="1" />
      <rect x="6" y="3" width="6" height="8" fill="none" stroke="var(--orange)" strokeWidth="1.2" />
      <line x1="15" y1="7" x2="15" y2="17" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="15" cy="7" r="1.5" fill="var(--ink)" />
      <circle cx="15" cy="17" r="2.5" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.2" />
      <line x1="13" y1="17" x2="17" y2="17" stroke="var(--ink)" strokeWidth="1" />
      <line x1="15" y1="15" x2="15" y2="19" stroke="var(--ink)" strokeWidth="1" />
    </svg>
  );
}

Object.assign(window, { CircuitDiagram, LindbladGlyph, HERO_CIRCUIT, COMPACT_CIRCUIT });
