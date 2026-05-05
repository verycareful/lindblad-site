/* global React */
// Shared section components used across pages

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// Animated counter that ticks up to target
function Counter({ to, suffix = "", prefix = "", decimals = 0, duration = 1400 }) {
  const [v, setV] = useStateS(0);
  const ref = useRefS(null);
  useEffectS(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const ease = 1 - Math.pow(1 - t, 3);
            setV(to * ease);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  const formatted = decimals > 0
    ? v.toFixed(decimals)
    : Math.round(v).toLocaleString();
  return <span ref={ref} className="mono">{prefix}{formatted}{suffix}</span>;
}

function Stat({ value, label, sub, accent }) {
  return (
    <div className="card corners" style={{ padding: "28px 24px" }}>
      <div className="label">{label}</div>
      <div className="mono mt-16" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em", color: accent || "var(--ink)" }}>
        {value}
      </div>
      {sub && <div className="text-dim mt-8" style={{ fontSize: 13 }}>{sub}</div>}
    </div>
  );
}

// Section header with eyebrow + title + description
function SectionHeader({ kicker, title, desc, num }) {
  return (
    <div className="flex justify-between items-baseline" style={{ flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
      <div style={{ flex: "1 1 480px", maxWidth: 720 }}>
        {kicker && <div className="eyebrow">{kicker}</div>}
        <h2 className="h1 mt-16">{title}</h2>
        {desc && <p className="lead mt-24">{desc}</p>}
      </div>
      {num && <div className="mono text-faint" style={{ fontSize: 13, letterSpacing: "0.1em" }}>§ {num}</div>}
    </div>
  );
}

// Simple Bloch sphere SVG (rotating)
function BlochSphere({ size = 180 }) {
  const [t, setT] = useStateS(0);
  useEffectS(() => {
    let raf, start = performance.now();
    const loop = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const cx = size / 2, cy = size / 2, r = size / 2 - 6;
  // Vector tip
  const theta = 0.7 + Math.sin(t * 0.4) * 0.6;
  const phi = t * 0.7;
  const tipX = cx + r * 0.85 * Math.sin(theta) * Math.cos(phi);
  const tipY = cy - r * 0.85 * Math.cos(theta);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.28} fill="none" stroke="var(--rule)" strokeWidth="1" />
      <ellipse cx={cx} cy={cy} rx={r * 0.28} ry={r} fill="none" stroke="var(--rule)" strokeWidth="1" />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 3" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 3" />
      <text x={cx} y={cy - r - 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-faint)">|0⟩</text>
      <text x={cx} y={cy + r + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink-faint)">|1⟩</text>
      <line x1={cx} y1={cy} x2={tipX} y2={tipY} stroke="var(--orange)" strokeWidth="1.5" />
      <circle cx={tipX} cy={tipY} r="3" fill="var(--orange)" />
      <circle cx={cx} cy={cy} r="2" fill="var(--ink)" />
    </svg>
  );
}

Object.assign(window, { Counter, Stat, SectionHeader, BlochSphere });
