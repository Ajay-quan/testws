import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './hooks';

export default function Loader({ onDone }) {
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('fast')) {
      onDone();
      return;
    }
    if (reduced) {
      onDone();
      return;
    }
    if (window.sessionStorage.getItem('av-signal-seen') === '1') {
      onDone();
      return;
    }
    let p = 0;
    const total = 1450;
    const start = performance.now();
    const timer = setInterval(() => {
      p = Math.min(((performance.now() - start) / total) * 100, 100);
      setPct(Math.floor(p));
      if (p >= 100) {
        clearInterval(timer);
        window.sessionStorage.setItem('av-signal-seen', '1');
        setExit(true);
        setTimeout(onDone, 520);
      }
    }, 24);
    return () => { clearInterval(timer); };
  }, [reduced, onDone]);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`signature-loader ${exit ? 'is-exiting' : ''}`}
    >
      <div className="signature-loader-mark">
        <img className="signature-loader-ghost" src="/ajay-signature.png" alt="" width="915" height="272" />
        <div className="signature-loader-reveal" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
          <img src="/ajay-signature.png" alt="" width="915" height="272" />
        </div>
      </div>
      <div className="signature-loader-meta">
        <span className="u-label">AJAY VARADA / PORTFOLIO</span>
        <span className="u-label">{String(pct).padStart(3, '0')}</span>
      </div>
      <style>{`
        .signature-loader{position:fixed;inset:0;z-index:300;display:grid;place-content:center;background:var(--accent);color:var(--ink);clip-path:inset(0);transition:clip-path .52s cubic-bezier(.77,0,.18,1)}
        .signature-loader.is-exiting{clip-path:inset(0 0 100% 0)}
        .signature-loader-mark{position:relative;width:min(68vw,720px);aspect-ratio:915/272}
        .signature-loader-mark img{display:block;width:100%;height:100%;object-fit:contain;filter:contrast(1.25)}
        .signature-loader-ghost{opacity:.1}
        .signature-loader-reveal{position:absolute;inset:0;overflow:hidden;transition:clip-path .08s linear}
        .signature-loader-meta{width:min(68vw,720px);display:flex;align-items:center;justify-content:space-between;margin-top:22px;padding-top:12px;border-top:1px solid var(--line);opacity:.58}
        html[data-theme='dark'] .signature-loader-mark img{filter:invert(1) brightness(1.45) contrast(.9)}
        @media(max-width:720px){.signature-loader-mark,.signature-loader-meta{width:min(84vw,560px)}.signature-loader-meta{margin-top:14px}.signature-loader-meta .u-label{font-size:7px}}
      `}</style>
    </div>
  );
}
