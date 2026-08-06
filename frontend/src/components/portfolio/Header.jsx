import { useEffect, useState } from 'react';

function Monogram() {
  // Four vertical geometric strokes = abstract AV mark
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" style={{ display: 'block' }}>
      <rect x="4" y="4" width="3" height="26" fill="var(--ink)" />
      <rect x="11" y="4" width="3" height="18" fill="var(--ink)" />
      <rect x="20" y="12" width="3" height="18" fill="var(--ink)" />
      <rect x="27" y="4" width="3" height="26" fill="var(--ink)" />
    </svg>
  );
}

function QR() {
  const cells = [];
  const seed = [1,0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1,1];
  for (let i = 0; i < 25; i++) {
    cells.push(<rect key={i} x={(i % 5) * 6} y={Math.floor(i / 5) * 6} width="5" height="5" fill={seed[i] ? 'var(--ink)' : 'transparent'} />);
  }
  return <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">{cells}</svg>;
}

function NavLink({ label, target }) {
  return (
    <a
      href={`#${target}`}
      data-cursor="hover"
      data-testid={`nav-${target}`}
      className="focus-ring"
      onClick={(e) => { e.preventDefault(); document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }); }}
      style={{ position: 'relative', textDecoration: 'none', color: 'var(--ink)', overflow: 'hidden', display: 'inline-block' }}
    >
      <span className="u-label nav-sweep" style={{ fontSize: 12 }}>{label}</span>
    </a>
  );
}

export default function Header({ scrollPct, mode, onToggleMode }) {
  const [now, setNow] = useState('');
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setNow(d.toISOString().slice(11, 19));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pct = String(scrollPct).padStart(3, '0');

  return (
    <header
      data-testid="site-header"
      className="surface-accent hairline-b"
      style={{ position: 'sticky', top: 0, zIndex: 120 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', alignItems: 'stretch', height: 92 }}>
        <div className="hairline-r" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Monogram />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, padding: '0 18px' }} className="hairline-r">
          <div className="u-label" style={{ fontSize: 11 }}>{pct}% / SIGNAL</div>
          <div className="u-label" style={{ opacity: 0.65 }}>BUILDING INTELLIGENT SYSTEMS · BENGALURU — 2026 · {now}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '0 24px' }} className="hairline-r nav-desk">
            <NavLink label="ABOUT" target="about" />
            <NavLink label="WORK" target="work" />
            <NavLink label="CONTACT" target="contact" />
          </nav>

          <button
            data-testid="contrast-toggle"
            data-cursor="hover"
            onClick={onToggleMode}
            aria-label={`Switch to ${mode === 'signal' ? 'paper' : 'signal red'} mode`}
            className="hairline-r focus-ring"
            style={{ width: 64, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}
          >
            <span style={{ width: 18, height: 18, border: '1px solid var(--ink)', background: mode === 'signal' ? 'var(--ink)' : 'transparent', display: 'inline-block' }} />
          </button>

          <div style={{ width: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="qr-cell">
            <QR />
          </div>
        </div>
      </div>

      <style>{`
        .nav-sweep::after { content:''; position:absolute; left:0; bottom:-3px; width:100%; height:1px; background:var(--ink); transform:scaleX(0); transform-origin:left; transition:transform .38s cubic-bezier(0.16,1,0.3,1); }
        a:hover .nav-sweep::after { transform:scaleX(1); }
        @media (max-width: 720px) {
          .qr-cell { display:none !important; }
          .nav-desk { gap:14px !important; padding:0 12px !important; }
        }
      `}</style>
    </header>
  );
}
