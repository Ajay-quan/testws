import { useEffect, useRef } from 'react';
import { useIsFinePointer } from './hooks';

// Custom rounded-arrow pointer for fine-pointer devices.
export default function Pointer() {
  const fine = useIsFinePointer();
  const wrap = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const eased = useRef({ x: -100, y: -100 });
  const state = useRef('idle');

  useEffect(() => {
    if (!fine) return;
    let raf;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const t = e.target;
      const interactive = t.closest('a,button,[data-cursor="hover"],input,textarea,[role="button"]');
      if (state.current !== 'down') state.current = interactive ? 'hover' : 'idle';
    };
    const onDown = () => {
      state.current = 'down';
      spawnPulse(pos.current.x, pos.current.y);
    };
    const onUp = (e) => {
      const t = document.elementFromPoint(pos.current.x, pos.current.y);
      const interactive = t && t.closest('a,button,[data-cursor="hover"],input,textarea,[role="button"]');
      state.current = interactive ? 'hover' : 'idle';
    };

    const spawnPulse = (x, y) => {
      const p = document.createElement('div');
      p.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:6px;height:6px;border:1px solid var(--accent);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:9998;mix-blend-mode:difference;`;
      document.body.appendChild(p);
      const start = performance.now();
      const anim = (now) => {
        const k = Math.min((now - start) / 480, 1);
        const s = 6 + k * 70;
        p.style.width = s + 'px'; p.style.height = s + 'px'; p.style.opacity = String(1 - k);
        if (k < 1) requestAnimationFrame(anim); else p.remove();
      };
      requestAnimationFrame(anim);
    };

    const loop = () => {
      eased.current.x += (pos.current.x - eased.current.x) * 0.28;
      eased.current.y += (pos.current.y - eased.current.y) * 0.28;
      if (wrap.current) {
        const s = state.current === 'hover' ? 1.55 : state.current === 'down' ? 0.82 : 1;
        wrap.current.style.transform = `translate(${eased.current.x}px, ${eased.current.y}px) rotate(-12deg) scale(${s})`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', mixBlendMode: 'difference' }}>
      <div ref={wrap} style={{ position: 'fixed', left: 0, top: 0, willChange: 'transform', transformOrigin: '4px 3px', transition: 'none' }}>
        {/* rounded arrow */}
        <svg width="30" height="30" viewBox="0 0 30 30" style={{ display: 'block' }}>
          <path
            d="M4 3 L4 22 L10 16.4 L13.6 24 L17.2 22.3 L13.6 14.8 L21 14.8 Z"
            fill="#f2ece3"
            stroke="#f2ece3"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
