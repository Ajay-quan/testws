import { useEffect, useState } from 'react';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';

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

function NavLink({ label, target, active, onNavigate, mobile = false }) {
  return (
    <a
      href={`#${target}`}
      data-cursor="hover"
      data-testid={`nav-${target}`}
      className="focus-ring"
      aria-current={active ? 'page' : undefined}
      onClick={(e) => { e.preventDefault(); onNavigate?.(); document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }); }}
      style={{ position: 'relative', textDecoration: 'none', color: 'var(--ink)', overflow: 'hidden', display: 'inline-block', opacity: active ? 1 : 0.64 }}
    >
      <span className={mobile ? 'font-display' : 'u-label nav-sweep'} style={mobile ? { fontSize: 'clamp(56px,18vw,88px)', lineHeight: .92 } : { fontSize: 12 }}>{label}</span>
    </a>
  );
}

export default function Header({ scrollPct, mode, onToggleMode, soundOn, onToggleSound }) {
  const [now, setNow] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setNow(d.toISOString().slice(11, 19));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ids = ['about', 'experience', 'work', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-35% 0px -55%', threshold: [0, .2, .5] });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pct = String(scrollPct).padStart(3, '0');

  return (
    <header
      data-testid="site-header"
      className="surface-accent hairline-b"
      style={{ position: 'sticky', top: 0, zIndex: 120 }}
    >
      <div className="header-grid" style={{ display: 'grid', gridTemplateColumns: '96px 1fr auto', alignItems: 'stretch', height: 92 }}>
        <div className="hairline-r" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Monogram />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, padding: '0 18px' }} className="hairline-r">
          <div className="u-label" style={{ fontSize: 11 }}>{pct}% / SIGNAL</div>
          <div className="u-label header-meta" style={{ opacity: 0.65 }}>AI / ML ENGINEER · ATLANTA — 2026 · {now}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '0 24px' }} className="hairline-r nav-desk">
            <NavLink label="ABOUT" target="about" active={active === 'about'} />
            <NavLink label="EXPERIENCE" target="experience" active={active === 'experience'} />
            <NavLink label="WORK" target="work" active={active === 'work'} />
            <NavLink label="CONTACT" target="contact" active={active === 'contact'} />
          </nav>

          <button
            data-testid="sound-toggle"
            data-cursor="hover"
            onClick={onToggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Mute tunnel sound' : 'Enable tunnel sound'}
            className="hairline-r focus-ring"
            style={{ width: 56, background: soundOn ? 'var(--ink)' : 'transparent', color: soundOn ? 'var(--accent)' : 'var(--ink)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {soundOn ? <Volume2 size={16} strokeWidth={1.6} /> : <VolumeX size={16} strokeWidth={1.6} />}
          </button>

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

          <button data-testid="mobile-menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((v) => !v)} className="mobile-menu-toggle focus-ring" style={{ background:'transparent', border:0, color:'var(--ink)', width:64, alignItems:'center', justifyContent:'center' }}>
            {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="u-label mobile-nav-top"><span>INDEX / 01—04</span><span>{pct}% / SIGNAL</span></div>
        <nav aria-label="Mobile primary" className="mobile-nav-links">
          <NavLink label="ABOUT" target="about" active={active === 'about'} mobile onNavigate={() => setMenuOpen(false)} />
          <NavLink label="EXPERIENCE" target="experience" active={active === 'experience'} mobile onNavigate={() => setMenuOpen(false)} />
          <NavLink label="WORK" target="work" active={active === 'work'} mobile onNavigate={() => setMenuOpen(false)} />
          <NavLink label="CONTACT" target="contact" active={active === 'contact'} mobile onNavigate={() => setMenuOpen(false)} />
        </nav>
        <div className="mobile-nav-foot u-label">AJAY VARADA · AI / ML ENGINEER · ATLANTA</div>
      </div>

      <style>{`
        .nav-sweep::after { content:''; position:absolute; left:0; bottom:-3px; width:100%; height:1px; background:var(--ink); transform:scaleX(0); transform-origin:left; transition:transform .38s cubic-bezier(0.16,1,0.3,1); }
        a:hover .nav-sweep::after { transform:scaleX(1); }
        .mobile-menu-toggle { display:none; }
        .mobile-nav { display:none; }
        @media (max-width: 720px) {
          .header-grid { height:72px!important; grid-template-columns:72px 1fr auto!important; }
          .header-grid > div:first-child svg { transform:scale(.82); }
          .header-grid > div:nth-child(2) { padding:0 12px!important; }
          .header-meta { display:none; }
          .qr-cell, .nav-desk, [data-testid="sound-toggle"], [data-testid="contrast-toggle"] { display:none!important; }
          .mobile-menu-toggle { display:flex; }
          .mobile-nav { position:fixed; left:7px; right:7px; top:72px; bottom:7px; z-index:119; background:var(--accent); color:var(--ink); border:1px solid var(--ink); transform:translateY(-105%); opacity:0; visibility:hidden; transition:transform .55s cubic-bezier(.16,1,.3,1), opacity .25s; padding:18px 14px; display:flex; flex-direction:column; }
          .mobile-nav.is-open { transform:translateY(0); opacity:1; visibility:visible; }
          .mobile-nav-top, .mobile-nav-foot { display:flex; justify-content:space-between; gap:10px; }
          .mobile-nav-links { margin:auto 0; display:flex; flex-direction:column; align-items:flex-start; gap:8px; }
          .mobile-nav-links a { width:100%; border-bottom:1px solid var(--ink); padding:5px 0; }
        }
      `}</style>
    </header>
  );
}
