/* global React */
const { useState, useEffect } = React;

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.getAttribute("data-theme") || "dark";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("lb-theme", theme); } catch {}
  }, [theme]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lb-theme");
      if (saved) setTheme(saved);
    } catch {}
  }, []);
  return (
    <button
      className="btn btn-ghost"
      style={{ height: 32, padding: "0 10px", fontSize: 12 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
    >
      {theme === "dark" ? "◐ DARK" : "◑ LIGHT"}
    </button>
  );
}

function Nav({ active = "home" }) {
  return (
    <div className="nav">
      <div className="nav-inner">
        <a href="index.html" className="wordmark">
          <LindbladGlyph size={22} />
          <span>lindblad</span>
          <span className="tag" style={{ marginLeft: 8 }}>R.1.0.0</span>
        </a>
        <div className="nav-links">
          <a href="index.html"      className={"nav-link" + (active === "home" ? " active" : "")}>OVERVIEW</a>
          <a href="algorithms.html" className={"nav-link" + (active === "algos" ? " active" : "")}>ALGORITHMS</a>
          <a href="benchmarks.html" className={"nav-link" + (active === "bench" ? " active" : "")}>BENCHMARKS</a>
          <a href="license.html"    className={"nav-link" + (active === "license" ? " active" : "")}>LICENSE</a>
          <a href="contact.html"    className={"nav-link" + (active === "contact" ? " active" : "")}>CONTACT</a>
          <a href="https://github.com/verycareful/lindblad" target="_blank" rel="noopener" className="nav-link" title="Source on GitHub">↗ GITHUB</a>
          <span style={{ width: 12 }}></span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="flex justify-between" style={{ flexWrap: "wrap", gap: 32 }}>
          <div style={{ maxWidth: 360 }}>
            <div className="wordmark">
              <LindbladGlyph size={22} />
              <span>lindblad</span>
            </div>
            <div className="lead mt-16" style={{ fontSize: 13 }}>
              High-performance C++23 quantum computing framework. Source-available, free for academic use.
            </div>
            <div className="label mt-24">
              dρ/dt = −i[H,ρ] + Σₖ ( Lₖ ρ Lₖ† − ½&#123;Lₖ†Lₖ, ρ&#125; )
            </div>
          </div>
          <div className="flex gap-48" style={{ flexWrap: "wrap" }}>
            <div className="flex-col gap-8">
              <div className="label">PRODUCT</div>
              <a className="text-dim" href="algorithms.html">Algorithms</a>
              <a className="text-dim" href="benchmarks.html">Benchmarks</a>
              <a className="text-dim" href="#docs">Documentation</a>
            </div>
            <div className="flex-col gap-8">
              <div className="label">PROJECT</div>
              <a className="text-dim" href="https://github.com/verycareful/lindblad" target="_blank" rel="noopener">GitHub ↗</a>
              <a className="text-dim" href="https://github.com/verycareful/lindblad/releases" target="_blank" rel="noopener">Releases ↗</a>
              <a className="text-dim" href="license.html">License</a>
              <a className="text-dim" href="contact.html">Contact</a>
            </div>
            <div className="flex-col gap-8">
              <div className="label">CONTACT</div>
              <a className="text-dim mono" href="mailto:qpp.support@proton.me">qpp.support@proton.me</a>
              <span className="text-faint mono" style={{ fontSize: 12 }}>© 2026 Sricharan Suresh</span>
              <span className="text-faint mono" style={{ fontSize: 12 }}>Lindblad SLA v1.0</span>
            </div>
          </div>
        </div>
        <hr className="rule mt-48" />
        <div className="flex justify-between mt-24" style={{ flexWrap: "wrap", gap: 16 }}>
          <span className="mono text-faint" style={{ fontSize: 12 }}>BUILD R.1.0.0 · 94 TESTS · 16 SUITES · ALL PASSING</span>
          <span className="mono text-faint" style={{ fontSize: 12 }}>C++23 · OpenMP · Eigen · NLopt</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer, ThemeToggle });
