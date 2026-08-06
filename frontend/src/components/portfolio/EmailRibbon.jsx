import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks';

const EMAIL = 'hello@ajayvarada.com';

export default function EmailRibbon() {
  const reduced = usePrefersReducedMotion();
  const track = useRef(null);
  const offset = useRef(0);
  const speed = useRef(1);

  useEffect(() => {
    if (reduced) return;
    let raf;
    let width = 0;
    const measure = () => { width = track.current ? track.current.scrollWidth / 2 : 1000; };
    measure();
    window.addEventListener('resize', measure);
    const loop = () => {
      offset.current -= speed.current;
      if (offset.current <= -width) offset.current += width;
      if (offset.current > 0) offset.current -= width;
      if (track.current) track.current.style.transform = `translate3d(${offset.current}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
  }, [reduced]);

  const unit = `${EMAIL} \u2014 `;
  const many = new Array(8).fill(unit).join('');

  return (
    <a
      href={`mailto:${EMAIL}`}
      data-testid="email-ribbon"
      data-cursor="hover"
      className="surface-ink hairline-t hairline-b focus-ring"
      aria-label={`Email ${EMAIL}`}
      onMouseEnter={() => (speed.current = 3.2)}
      onMouseLeave={() => (speed.current = 1)}
      style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', padding: '18px 0', textDecoration: 'none' }}
    >
      <div ref={track} style={{ display: 'inline-block', whiteSpace: 'nowrap', willChange: 'transform' }}>
        <span className="font-display" style={{ fontSize: 'clamp(48px, 11vw, 150px)', color: 'var(--accent)', letterSpacing: '-0.03em' }}>{many}</span>
        <span className="font-display" style={{ fontSize: 'clamp(48px, 11vw, 150px)', color: 'var(--accent)', letterSpacing: '-0.03em' }}>{many}</span>
      </div>
    </a>
  );
}
