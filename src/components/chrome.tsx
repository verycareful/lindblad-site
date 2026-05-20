import { useEffect, useState } from 'react';
import type { PageName, ThemeName } from '../types';
import { LindbladGlyph } from './circuit';

function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof document === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem('lb-theme') as ThemeName | null;
      if (saved === 'dark' || saved === 'light') return saved;
    } catch { }
    return (document.documentElement.getAttribute('data-theme') as ThemeName | null) || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('lb-theme', theme);
    } catch { }
  }, [theme]);

  return (
    <button
      className="btn btn-ghost"
      style={{ height: 32, padding: '0 10px', fontSize: 12 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title="Toggle theme"
      type="button"
    >
      {theme === 'dark' ? '◐ DARK' : '◑ LIGHT'}
    </button>
  );
}

export function Nav({ active = 'home' }: { active?: PageName }) {
  return (
    <div className="nav">
      <div className="nav-inner">
        <a href="index.html" className="wordmark">
          <LindbladGlyph size={22} />
          <span>lindblad</span>
          <span className="tag" style={{ marginLeft: 8 }}>R.1.9.0</span>
        </a>
        <div className="nav-links">
          <a href="index.html" className={"nav-link" + (active === 'home' ? ' active' : '')}>OVERVIEW</a>
          <a href="algorithms.html" className={"nav-link" + (active === 'algorithms' ? ' active' : '')}>ALGORITHMS</a>
          <a href="benchmarks.html" className={"nav-link" + (active === 'benchmarks' ? ' active' : '')}>BENCHMARKS</a>
          <a href="license.html" className={"nav-link" + (active === 'license' ? ' active' : '')}>LICENSE</a>
          <a href="contact.html" className={"nav-link" + (active === 'contact' ? ' active' : '')}>CONTACT</a>
          <a href="https://github.com/verycareful/lindblad" target="_blank" rel="noopener" className="nav-link" title="Source on GitHub">↗ GITHUB</a>
          <span style={{ width: 12 }} />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="flex justify-between" style={{ flexWrap: 'wrap', gap: 32 }}>
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
          <div className="flex gap-48" style={{ flexWrap: 'wrap' }}>
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
              <span className="text-faint mono" style={{ fontSize: 12 }}>Lindblad SLA v2.1</span>
            </div>
          </div>
        </div>
        <hr className="rule mt-48" />
        <div className="flex justify-between mt-24" style={{ flexWrap: 'wrap', gap: 16 }}>
          <span className="mono text-faint" style={{ fontSize: 12 }}>BUILD R.1.9.0 · 632/632 · 72 SUITES</span>
          <span className="mono text-faint" style={{ fontSize: 12 }}>C++23 · OpenMP · Eigen · NLopt</span>
        </div>
      </div>
    </footer>
  );
}
