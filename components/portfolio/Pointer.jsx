import { useEffect, useRef } from 'react';
import { useIsFinePointer } from './hooks';

const INTERACTIVE = 'a,button,[data-cursor="hover"],input,textarea,select,[role="button"]';

// A single precise Codex-inspired pointer.
export default function Pointer() {
  const fine = useIsFinePointer();
  const arrow = useRef(null);

  useEffect(() => {
    if (!fine) return undefined;

    const target = { x: -48, y: -48 };
    let hovering = false;
    let pressed = false;
    let visible = false;

    const syncState = () => {
      if (!arrow.current) return;
      arrow.current.dataset.visible = String(visible);
      arrow.current.dataset.hover = String(hovering);
      arrow.current.dataset.pressed = String(pressed);
    };

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      visible = true;
      hovering = Boolean(event.target.closest?.(INTERACTIVE));
      syncState();

      // Keep the arrow's tip exactly under the native pointer position.
      if (arrow.current) {
        arrow.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
    };

    const onOver = (event) => {
      hovering = Boolean(event.target.closest?.(INTERACTIVE));
      syncState();
    };
    const onDown = () => { pressed = true; syncState(); };
    const onUp = () => { pressed = false; syncState(); };
    const onLeave = () => { visible = false; syncState(); };
    const onEnter = () => { visible = true; syncState(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div className="codex-cursor" aria-hidden="true">
      <div ref={arrow} className="codex-cursor__arrow">
        <svg width="24" height="28" viewBox="0 0 24 28" focusable="false">
          <path
            d="M3.1 2.4v18.35l4.8-4.08 3.6 8.04 3.55-1.59-3.57-7.96h6.35L3.1 2.4Z"
            fill="#f5f2ea"
            stroke="#11100e"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <style>{`
        .codex-cursor { position: fixed; inset: 0; z-index: 9999; pointer-events: none; }
        .codex-cursor__arrow { position: fixed; left: -2px; top: -2px; opacity: 0; transform-origin: 3px 3px; will-change: transform; transition: opacity 120ms ease; }
        .codex-cursor__arrow[data-visible="true"] { opacity: 1; }
        .codex-cursor__arrow svg { display: block; filter: drop-shadow(0 1px 1px rgba(0,0,0,.2)); transition: transform 180ms cubic-bezier(.16,1,.3,1); }
        .codex-cursor__arrow[data-hover="true"] svg { transform: translate(1px,1px) scale(.88); }
        .codex-cursor__arrow[data-pressed="true"] svg { transform: translate(1px,1px) scale(.76); }
      `}</style>
    </div>
  );
}
