import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './hooks';

const MSGS = ['LOADING IDEAS', 'BREAKING PATTERNS', 'MAKING SIGNALS'];

export default function Loader({ onDone }) {
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [line, setLine] = useState(MSGS[0]);
  const [exit, setExit] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('fast')) {
      onDone();
      return;
    }
    if (reduced) {
      onDone();
      return;
    }
    let p = 0;
    const returning = window.sessionStorage.getItem('av-signal-seen') === '1';
    const total = returning ? 360 : 1250;
    const start = performance.now();
    const timer = setInterval(() => {
      p = Math.min(((performance.now() - start) / total) * 100, 100);
      setPct(Math.floor(p));
      const base = MSGS[Math.min(MSGS.length - 1, Math.floor((p / 100) * MSGS.length))];
      const arr = base.split('');
      for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * arr.length);
        if (arr[idx] !== ' ') arr[idx] = Math.random() > 0.5 ? '/' : arr[idx];
      }
      setLine(arr.join(''));
      if (p >= 100) {
        clearInterval(timer);
        window.sessionStorage.setItem('av-signal-seen', '1');
        setExit(true);
        setTimeout(onDone, returning ? 180 : 380);
      }
    }, 60);
    return () => { clearInterval(timer); };
  }, [reduced, onDone]);

  if (reduced) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 300, background: 'var(--inverse-bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        clipPath: exit ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)',
        transition: 'clip-path 0.38s cubic-bezier(0.77,0,0.18,1)',
      }}
    >
      <div
        className="font-display"
        style={{
          color: 'var(--inverse-fg)', fontSize: 'min(34vw, 40vh)', lineHeight: 0.8,
          letterSpacing: '-0.06em',
          transform: `scaleX(${0.5 + (pct / 100) * 0.5})`,
          transformOrigin: 'center',
          transition: 'transform 0.1s linear',
        }}
      >
        AV
      </div>
      <div className="font-mono-u" style={{ color: 'var(--inverse-fg)', fontSize: 11, letterSpacing: '0.24em', marginTop: 28, height: 14 }}>
        {line}
      </div>
      <div style={{ width: 'min(320px, 60vw)', height: 1, background: 'rgba(242,236,227,0.25)', marginTop: 22, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: 'var(--inverse-fg)' }} />
      </div>
      <div className="font-mono-u" style={{ color: 'var(--inverse-fg)', fontSize: 10, letterSpacing: '0.2em', marginTop: 12, opacity: 0.7 }}>
        {String(pct).padStart(3, '0')}% / LOADED
      </div>
    </div>
  );
}
