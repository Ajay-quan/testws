import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

function Monogram() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" style={{ display: 'block' }}>
      <rect x="4" y="4" width="3" height="26" fill="var(--ink)" />
      <rect x="11" y="4" width="3" height="18" fill="var(--ink)" />
      <rect x="20" y="12" width="3" height="18" fill="var(--ink)" />
      <rect x="27" y="4" width="3" height="26" fill="var(--ink)" />
    </svg>
  );
}

const NAV = [
  ['ABOUT', 'about'],
  ['EXPERIENCE', 'experience'],
  ['WORK', 'work'],
  ['WRITING', 'writing'],
  ['CONTACT', 'contact'],
];

function NavLink({ label, target, active, onNavigate, mobile = false }) {
  return (
    <a
      href={`#${target}`}
      data-cursor="hover"
      data-testid={`nav-${target}`}
      className="focus-ring"
      aria-current={active ? 'location' : undefined}
      onClick={() => onNavigate?.()}
      style={{ textDecoration: 'none', color: 'var(--ink)', opacity: active ? 1 : 0.62 }}
    >
      <span className={mobile ? 'font-display' : 'u-label'}>{label}</span>
    </a>
  );
}

export default function Header({ scrollPct }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-34% 0px -58%', threshold: [0, .2, .5] });
    NAV.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pct = String(scrollPct).padStart(3, '0');

  return (
    <header data-testid="site-header" className="surface-accent hairline-b simple-header">
      <a href="#main" className="header-mark hairline-r focus-ring" aria-label="Ajay Varada — back to top"><Monogram /></a>
      <div className="header-status">
        <span className="u-label">{pct}% / PORTFOLIO</span>
        <span className="u-label">AI / ML ENGINEER · ATLANTA</span>
      </div>
      <nav aria-label="Primary" className="simple-nav">
        {NAV.map(([label, id]) => <NavLink key={id} label={label} target={id} active={active === id} />)}
      </nav>
      <button data-testid="mobile-menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((value) => !value)} className="mobile-menu-toggle focus-ring">
        {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
      </button>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="u-label mobile-nav-top"><span>INDEX / 01—05</span><span>{pct}%</span></div>
        <nav aria-label="Mobile primary" className="mobile-nav-links">
          {NAV.map(([label, id]) => <NavLink key={id} label={label} target={id} active={active === id} mobile onNavigate={() => setMenuOpen(false)} />)}
        </nav>
        <div className="mobile-nav-foot u-label">AJAY VARADA · AI / ML ENGINEER</div>
      </div>

      <style>{`
        .simple-header { position:sticky; top:0; z-index:120; height:76px; display:grid; grid-template-columns:76px minmax(230px,1fr) minmax(560px,auto); }
        .header-mark { display:flex; align-items:center; justify-content:center; color:var(--ink); }
        .header-status { padding:0 18px; display:flex; flex-direction:column; justify-content:center; gap:5px; border-right:1px solid var(--ink); }
        .header-status span:last-child { opacity:.5; }
        .simple-nav { display:grid; grid-template-columns:repeat(5,minmax(112px,1fr)); align-items:stretch; }
        .simple-nav a { display:flex; align-items:center; justify-content:center; padding:0 14px; border-right:1px solid var(--ink); transition:background .25s ease,color .25s ease,opacity .25s ease; }
        .simple-nav a:last-child { border-right:0; }
        .simple-nav a:hover,.simple-nav a[aria-current] { background:var(--ink); color:var(--accent)!important; opacity:1!important; }
        .mobile-menu-toggle,.mobile-nav { display:none; }
        @media(max-width:980px){.simple-header{grid-template-columns:76px minmax(170px,1fr) minmax(470px,auto)}.simple-nav{grid-template-columns:repeat(5,minmax(94px,1fr))}.simple-nav a{padding:0 8px}.simple-nav .u-label{font-size:9px}}
        @media(max-width:720px){
          .simple-header { height:72px; grid-template-columns:72px 1fr 64px; }
          .header-status { padding:0 12px; }
          .header-status span:last-child,.simple-nav { display:none; }
          .mobile-menu-toggle { display:flex; align-items:center; justify-content:center; background:transparent; border:0; border-left:1px solid var(--ink); color:var(--ink); }
          .mobile-nav { position:fixed; left:7px; right:7px; top:72px; bottom:7px; z-index:119; background:var(--accent); border:1px solid var(--ink); transform:translateY(-105%); opacity:0; visibility:hidden; transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .2s; padding:18px 14px; display:flex; flex-direction:column; }
          .mobile-nav.is-open { transform:translateY(0); opacity:1; visibility:visible; }
          .mobile-nav-top,.mobile-nav-foot { display:flex; justify-content:space-between; gap:10px; }
          .mobile-nav-links { margin:auto 0; display:flex; flex-direction:column; gap:4px; }
          .mobile-nav-links a { width:100%; border-bottom:1px solid var(--ink); padding:5px 0; }
          .mobile-nav-links .font-display { font-size:clamp(45px,15vw,72px); line-height:.92; }
        }
      `}</style>
    </header>
  );
}
