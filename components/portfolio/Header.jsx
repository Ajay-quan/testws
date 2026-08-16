import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import InterfaceIcon from './InterfaceIcon';

const NAV = [
  ['HOME', '/', 'home'],
  ['WORK', '/work', 'work'],
  ['FIELD NOTES', '/writing', 'writing'],
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

export default function Header({ scrollPct, currentPage = 'home', onPageChange, theme = 'light', onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pct = String(scrollPct).padStart(3, '0');

  return (
    <header data-testid="site-header" className={`surface-accent hairline-b simple-header ${scrollPct > 0 ? 'is-scrolled' : ''}`}>
      <div className="header-status">
        <span className="u-label">{pct}% / PORTFOLIO</span>
        <span className="u-label">FORMER MICRON SWE · ATLANTA</span>
      </div>
      <nav aria-label="Primary" className="simple-nav">
        {NAV.map(([label, href, id]) => <NavLink key={id} label={label} href={href} target={id} active={currentPage === id} onNavigate={onPageChange} />)}
        <a href="/AjayVarada_Resume.pdf" target="_blank" rel="noreferrer" data-testid="header-resume" data-cursor="hover" className="header-resume focus-ring"><span className="u-label icon-link">RÉSUMÉ <InterfaceIcon /></span></a>
      </nav>
      <button data-testid="theme-toggle" className="theme-toggle focus-ring" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
      </button>
      <button data-testid="mobile-menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((value) => !value)} className="mobile-menu-toggle focus-ring">
        {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
      </button>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="u-label mobile-nav-top"><span>INDEX / 01—06</span><span>{pct}%</span></div>
        <nav aria-label="Mobile primary" className="mobile-nav-links">
          {NAV.map(([label, href, id]) => <NavLink key={id} label={label} href={href} target={id} active={currentPage === id} mobile onNavigate={(target, href, event) => { setMenuOpen(false); onPageChange?.(target, href, event); }} />)}
          <a href="/AjayVarada_Resume.pdf" target="_blank" rel="noreferrer" data-cursor="hover" className="focus-ring mobile-resume-link"><span className="font-display icon-link">RÉSUMÉ <InterfaceIcon size={22} /></span></a>
        </nav>
        <div className="mobile-nav-foot u-label">AJAY VARADA · AI / ML ENGINEER</div>
      </div>

      <style>{`
        .simple-header {
          position:sticky; top:12px; z-index:120; height:76px; margin:12px 14px 0; width:calc(100% - 28px);
          display:grid; grid-template-columns:minmax(230px,1fr) minmax(552px,auto) 56px; gap:6px; padding:6px;
          box-sizing:border-box; border:0!important; border-radius:999px;
          background:
            radial-gradient(120% 170% at 8% -55%,rgba(255,255,255,.98),transparent 48%),
            radial-gradient(65% 150% at 82% 135%,rgba(220,183,113,.18),transparent 58%),
            linear-gradient(120deg,rgba(255,255,255,.62),rgba(241,238,234,.42))!important;
          box-shadow:0 18px 48px rgba(83,67,48,.13),inset 0 0 0 1px rgba(255,255,255,.88),inset 2px 3px 0 -2px rgba(255,255,255,.92),inset -2px -2px 0 -2px rgba(255,255,255,.54),inset 0 -7px 3px -6px rgba(80,58,34,.12);
          -webkit-backdrop-filter:blur(28px) saturate(175%) brightness(1.08);backdrop-filter:blur(28px) saturate(175%) brightness(1.08);
        }
        html[data-theme='dark'] .simple-header {
          background:radial-gradient(100% 160% at 8% -50%,rgba(255,255,255,.1),transparent 50%),linear-gradient(120deg,rgba(42,45,49,.8),rgba(25,27,30,.7))!important;
          box-shadow:0 20px 54px rgba(0,0,0,.4),inset 0 0 0 1px rgba(224,226,229,.25),inset 2px 3px 0 -2px rgba(255,255,255,.24),inset -2px -2px 0 -2px rgba(170,174,180,.11),inset 0 -7px 3px -6px rgba(0,0,0,.42);
        }
        .simple-header.is-scrolled { box-shadow:0 22px 58px rgba(83,67,48,.16),inset 0 0 0 1px rgba(255,255,255,.88),inset 2px 3px 0 -2px rgba(255,255,255,.92),inset -2px -2px 0 -2px rgba(255,255,255,.54),inset 0 -7px 3px -6px rgba(80,58,34,.12); }
        html[data-theme='dark'] .simple-header.is-scrolled { box-shadow:0 24px 64px rgba(0,0,0,.5),inset 0 0 0 1px rgba(224,226,229,.25),inset 2px 3px 0 -2px rgba(255,255,255,.24),inset -2px -2px 0 -2px rgba(170,174,180,.11),inset 0 -7px 3px -6px rgba(0,0,0,.42); }
        .simple-header::before { content:''; position:absolute; inset:1px 10% auto; height:1px; border-radius:999px; background:linear-gradient(90deg,transparent,rgba(255,255,255,.96),transparent); pointer-events:none; }
        .header-status { padding:0 14px; display:flex; flex-direction:column; justify-content:center; gap:5px; border:0; border-radius:0; background:transparent; box-shadow:none; }
        .header-status span:last-child { opacity:.5; }
        .simple-nav { display:grid; grid-template-columns:repeat(6,minmax(92px,1fr)); align-items:stretch; gap:4px; padding:0; }
        .simple-nav a { display:flex; align-items:center; justify-content:center; padding:0 14px; border:0!important; border-radius:999px!important; margin:0!important; overflow:hidden; background:rgba(255,255,255,.035); box-shadow:inset 0 1px 0 rgba(255,255,255,.12); transition:transform .3s cubic-bezier(.16,1,.3,1),background .3s ease,color .25s ease,opacity .25s ease,box-shadow .3s ease; }
        .simple-nav a:hover,.simple-nav a[aria-current] {
          background:linear-gradient(155deg,rgba(255,255,255,.32),rgba(255,255,255,.08)); color:var(--ink)!important; opacity:1!important;
          box-shadow:0 7px 18px rgba(68,53,36,.055),inset 0 0 0 1px rgba(255,255,255,.48),inset 0 1.5px 0 rgba(255,255,255,.96),inset 0 -1px 0 rgba(93,68,37,.075),inset 10px 0 22px rgba(255,255,255,.1)!important; transform:translateY(-1px);
          -webkit-backdrop-filter:blur(18px) saturate(170%) brightness(1.06);backdrop-filter:blur(18px) saturate(170%) brightness(1.06);
        }
        .simple-nav a[aria-current] { background:linear-gradient(155deg,rgba(255,255,255,.38),rgba(222,191,137,.12)); }
        .simple-nav a:hover::before,.simple-nav a[aria-current]::before { content:'';position:absolute;inset:2px 12% auto;height:36%;border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.38),transparent);filter:blur(4px);pointer-events:none; }
        html[data-theme='dark'] .simple-nav a:hover,html[data-theme='dark'] .simple-nav a[aria-current] { background:linear-gradient(155deg,rgba(255,255,255,.12),rgba(212,168,94,.045));color:var(--ink)!important;box-shadow:0 8px 20px rgba(0,0,0,.2),inset 0 0 0 1px rgba(224,226,229,.22),inset 0 1.5px 0 rgba(255,255,255,.26),inset 0 -1px 0 rgba(0,0,0,.36),inset 8px 0 20px rgba(212,168,94,.035); }
        .simple-nav a.focus-ring:focus-visible { box-shadow:0 7px 18px rgba(68,53,36,.07),inset 0 0 0 2px rgba(132,166,203,.48),inset 0 1.5px 0 rgba(255,255,255,.92); }
        html[data-theme='dark'] .simple-nav a.focus-ring:focus-visible { box-shadow:0 7px 18px rgba(0,0,0,.2),inset 0 0 0 2px rgba(212,168,94,.62),inset 0 1.5px 0 rgba(255,255,255,.26); }
        .simple-nav .header-resume { background:linear-gradient(150deg,rgba(255,255,255,.28),rgba(221,188,127,.12)); color:var(--ink)!important; opacity:1; text-decoration:none; box-shadow:inset 0 0 0 1px rgba(255,255,255,.46),inset 0 1.5px 0 rgba(255,255,255,.94),0 7px 18px rgba(102,73,30,.055)!important; }
        .simple-nav .header-resume:hover { background:linear-gradient(150deg,rgba(255,255,255,.38),rgba(221,188,127,.18));color:var(--ink)!important; }
        html[data-theme='dark'] .simple-nav .header-resume { background:linear-gradient(155deg,rgba(255,255,255,.12),rgba(212,168,94,.055));color:var(--ink)!important;box-shadow:inset 0 0 0 1px rgba(224,226,229,.22),inset 0 1.5px 0 rgba(255,255,255,.24),inset 0 -1px 0 rgba(0,0,0,.3),0 7px 18px rgba(0,0,0,.18)!important; }
        html[data-theme='dark'] .simple-nav .header-resume:hover { background:linear-gradient(155deg,rgba(255,255,255,.17),rgba(212,168,94,.09));color:var(--ink)!important; }
        .theme-toggle { display:grid;place-items:center;align-self:center;justify-self:center;width:52px;height:52px;min-width:52px;aspect-ratio:1;padding:0;border:0!important;border-radius:50%!important;margin:0!important;color:var(--ink);background:color-mix(in srgb,var(--glass-fill) 24%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--glass-edge) 58%,transparent),inset 2px 3px 0 -2px rgba(255,255,255,.82),inset -2px -2px 0 -2px rgba(255,255,255,.5),inset -1px 2px 3px -1px rgba(10,15,25,.16),inset 0 -5px 2px -4px rgba(10,15,25,.1),0 5px 14px rgba(10,15,25,.08);-webkit-backdrop-filter:blur(10px) saturate(160%);backdrop-filter:blur(10px) saturate(160%);transition:transform 220ms cubic-bezier(.5,0,0,1),background-color 300ms ease,box-shadow 300ms ease; }
        .theme-toggle:hover { transform:scale(1.06);background:color-mix(in srgb,var(--glass-fill-strong) 34%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--glass-edge) 68%,transparent),inset 2px 3px 0 -2px rgba(255,255,255,.9),inset -2px -2px 0 -2px rgba(255,255,255,.58),inset -1px 2px 3px -1px rgba(10,15,25,.18),0 6px 16px rgba(10,15,25,.1)!important; }
        .mobile-menu-toggle,.mobile-nav { display:none; }
        @media(max-width:980px){.simple-header{grid-template-columns:minmax(170px,1fr) minmax(468px,auto) 48px}.simple-nav{grid-template-columns:repeat(6,minmax(78px,1fr))}.simple-nav a{padding:0 7px}.simple-nav .u-label{font-size:8px}.theme-toggle{width:44px;height:44px;min-width:44px}}
        @media(max-width:900px){
          .simple-header { top:8px;height:60px;margin:8px 8px 0;width:calc(100% - 16px);grid-template-columns:1fr 48px 48px;padding:5px;gap:4px;border-radius:999px;-webkit-backdrop-filter:none!important;backdrop-filter:none!important; }
          .header-status { padding:0 12px; }
          .header-status span:last-child,.simple-nav { display:none; }
          .theme-toggle { grid-column:2; }
          .mobile-menu-toggle { grid-column:3; align-self:center;justify-self:center;width:44px;height:44px;min-width:44px;aspect-ratio:1;display:flex; align-items:center; justify-content:center; padding:0;background:linear-gradient(150deg,rgba(255,255,255,.27),rgba(255,255,255,.07)); border:0; border-radius:50%; color:var(--ink);box-shadow:inset 0 0 0 1px rgba(255,255,255,.44),inset 0 1.5px 0 rgba(255,255,255,.92); }
          html[data-theme='dark'] .mobile-menu-toggle { background:linear-gradient(150deg,rgba(255,255,255,.11),rgba(212,168,94,.03));box-shadow:inset 0 0 0 1px rgba(224,226,229,.22),inset 0 1.5px 0 rgba(255,255,255,.23); }
          #mobile-nav { position:fixed; left:8px; right:8px; top:76px; bottom:8px; z-index:119; overflow-y:auto; overscroll-behavior:contain; background:#f2eee7!important; border:1px solid rgba(75,59,43,.2); box-shadow:0 26px 80px rgba(53,42,31,.26),inset 0 1px 0 rgba(255,255,255,.96); -webkit-backdrop-filter:blur(24px) saturate(120%);backdrop-filter:blur(24px) saturate(120%); transform:translateY(-105%); opacity:0; visibility:hidden; transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .2s; padding:20px 16px max(20px,env(safe-area-inset-bottom)); display:flex; flex-direction:column; isolation:isolate; }
          html[data-theme='dark'] #mobile-nav { background:#191b1e!important;border-color:rgba(224,226,229,.22);box-shadow:0 26px 80px rgba(0,0,0,.56),inset 0 1px 0 rgba(255,255,255,.14); }
          #mobile-nav.is-open { transform:translateY(0); opacity:1; visibility:visible; }
          .mobile-nav-top,.mobile-nav-foot { display:flex; justify-content:space-between; gap:10px; }
          .mobile-nav-links { margin:auto 0; padding:18px 0; display:flex; flex-direction:column; gap:3px; }
          .mobile-nav-links a { width:100%; border-bottom:1px solid color-mix(in srgb,var(--line) 42%,transparent); padding:7px 12px; border-radius:16px; }
          .mobile-nav-links a[aria-current]{background:color-mix(in srgb,var(--ink) 8%,transparent);opacity:1!important}
          .mobile-nav-links .font-display { font-size:clamp(34px,min(11vw,7.2vh),56px); line-height:.92; }
          .mobile-nav-links .mobile-resume-link { color:var(--ink); text-decoration:none; }
        }
      `}</style>
    </header>
  );
}
