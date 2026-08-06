import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from './hooks';

export default function PositioningTitle() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ['-4vw', '0vw', '4vw']);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.82, 1]);

  const onMove = (e) => {
    if (reduced || !lineRef.current) return;
    const r = lineRef.current.getBoundingClientRect();
    const k = (e.clientX - r.left) / r.width; // 0..1
    lineRef.current.style.transform = `scaleX(${0.97 + k * 0.08})`;
  };

  return (
    <section
      ref={ref}
      data-testid="positioning-title"
      className="surface-accent hairline-b"
      style={{ padding: 'clamp(60px, 14vh, 160px) 0', overflow: 'hidden' }}
      onMouseMove={onMove}
    >
      <div className="u-label" style={{ padding: '0 18px 26px', display: 'flex', justifyContent: 'space-between' }}>
        <span>02 — POSITION</span><span style={{ opacity: 0.6 }}>SIGNAL / STATEMENT</span>
      </div>
      <motion.h1
        ref={lineRef}
        className="font-display"
        style={{
          x: reduced ? 0 : x,
          scaleY: reduced ? 1 : scaleY,
          transformOrigin: 'left center',
          margin: 0,
          padding: '0 12px',
          fontSize: 'clamp(56px, 15.5vw, 340px)',
          lineHeight: 0.82,
          letterSpacing: '-0.055em',
          whiteSpace: 'nowrap',
          transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        AI PRODUCT <span style={{ fontSize: '0.42em', verticalAlign: 'middle', margin: '0 0.12em' }}>✦</span> BUILDER
      </motion.h1>
    </section>
  );
}
