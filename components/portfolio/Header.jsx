import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV = [
  ['HOME', '/', 'home'],
  ['WORK', '/work', 'work'],
  ['WRITING', '/writing', 'writing'],
  ['PROFILE', '/profile', 'profile'],
  ['CONTACT', '/contact', 'contact'],
];

function NavLink({ label, href, target, active, onNavigate, mobile = false }) {
  return (
    <a
      href={href}
      data-cursor="hover"
      data-testid={`nav-${target}`}
      className="focus-ring"
      aria-current={active ? 'location' : undefined}
      onClick={(event) => onNavigate?.(target, href, event)}
      style={{ textDecoration: 'none', color: 'var(--ink)', opacity: active ? 1 : 0.62 }}
    >
      <span className={mobile ? 'font-display' : 'u-label'}>{label}</span>
    </a>
  );
}

export default function Header({ scrollPct, currentPage = 'home', onPageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pct = String(scrollPct).padStart(3, '0');

  return (
    <header data-testid="site-header" className="surface-accent hairline-b simple-header">
      <div className="header-status">
        <span className="u-label">{pct}% / PORTFOLIO</span>
        <span className="u-label">FORMER MICRON SWE · ATLANTA</span>
      </div>
      <nav aria-label="Primary" className="simple-nav">
        {NAV.map(([label, href, id]) => <NavLink key={id} label={label} href={href} target={id} active={currentPage === id} onNavigate={onPageChange} />)}
        <a href="/AjayVarada_Resume.pdf" target="_blank" rel="noreferrer" data-testid="header-resume" data-cursor="hover" className="header-resume focus-ring"><span className="u-label">RÉSUMÉ ↗</span></a>
      </nav>
      <button data-testid="mobile-menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((value) => !value)} className="mobile-menu-toggle focus-ring">
        {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
      </button>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="u-label mobile-nav-top"><span>INDEX / 01—06</span><span>{pct}%</span></div>
        <nav aria-label="Mobile primary" className="mobile-nav-links">
          {NAV.map(([label, href, id]) => <NavLink key={id} label={label} href={href} target={id} active={currentPage === id} mobile onNavigate={(target, href, event) => { setMenuOpen(false); onPageChange?.(target, href, event); }} />)}
          <a href="/AjayVarada_Resume.pdf" target="_blank" rel="noreferrer" data-cursor="hover" className="focus-ring mobile-resume-link"><span className="font-display">RÉSUMÉ ↗</span></a>
        </nav>
        <div className="mobile-nav-foot u-label">AJAY VARADA · AI / ML ENGINEER</div>
      </div>

      <style>{`
        .simple-header { position:sticky; top:0; z-index:120; height:76px; display:grid; grid-template-columns:minmax(230px,1fr) minmax(552px,auto); }
        .header-status { padding:0 18px; display:flex; flex-direction:column; justify-content:center; gap:5px; border-right:1px solid var(--ink); }
        .header-status span:last-child { opacity:.5; }
        .simple-nav { display:grid; grid-template-columns:repeat(6,minmax(92px,1fr)); align-items:stretch; }
        .simple-nav a { display:flex; align-items:center; justify-content:center; padding:0 14px; border-right:1px solid var(--ink); transition:background .25s ease,color .25s ease,opacity .25s ease; }
        .simple-nav a:last-child { border-right:0; }
        .simple-nav a:hover,.simple-nav a[aria-current] { background:var(--ink); color:var(--accent)!important; opacity:1!important; }
        .simple-nav .header-resume { background:var(--ink); color:var(--accent); opacity:1; text-decoration:none; }
        .simple-nav .header-resume:hover { background:var(--red); color:var(--accent)!important; }
        .mobile-menu-toggle,.mobile-nav { display:none; }
        @media(max-width:980px){.simple-header{grid-template-columns:minmax(170px,1fr) minmax(468px,auto)}.simple-nav{grid-template-columns:repeat(6,minmax(78px,1fr))}.simple-nav a{padding:0 7px}.simple-nav .u-label{font-size:8px}}
        @media(max-width:720px){
          .simple-header { height:64px; grid-template-columns:1fr 60px; }
          .header-status { padding:0 12px; }
          .header-status span:last-child,.simple-nav { display:none; }
          .mobile-menu-toggle { display:flex; align-items:center; justify-content:center; background:transparent; border:0; border-left:1px solid var(--ink); color:var(--ink); }
          .mobile-nav { position:fixed; left:7px; right:7px; top:64px; bottom:7px; z-index:119; background:var(--accent); border:1px solid var(--ink); transform:translateY(-105%); opacity:0; visibility:hidden; transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .2s; padding:18px 14px; display:flex; flex-direction:column; }
          .mobile-nav.is-open { transform:translateY(0); opacity:1; visibility:visible; }
          .mobile-nav-top,.mobile-nav-foot { display:flex; justify-content:space-between; gap:10px; }
          .mobile-nav-links { margin:auto 0; display:flex; flex-direction:column; gap:4px; }
          .mobile-nav-links a { width:100%; border-bottom:1px solid var(--ink); padding:5px 0; }
          .mobile-nav-links .font-display { font-size:clamp(38px,13.5vw,58px); line-height:.94; }
          .mobile-nav-links .mobile-resume-link { color:var(--ink); text-decoration:none; }
        }
      `}</style>
    </header>
  );
}
