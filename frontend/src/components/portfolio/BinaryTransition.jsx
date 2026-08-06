import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion, randBits } from './hooks';

const ROWS = Array.from({ length: 18 }, (_, i) => {
  const a = randBits(2), b = randBits(4), c = randBits(1);
  const d = randBits(5), e = randBits(2);
  const dir = i % 2 === 0 ? '\\' : '/';
  return `${a} / ${b} / ${c}     ${dir}     ${d} / ${e}`;
});

export default function BinaryTransition() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const z = useTransform(scrollYProgress, [0, 1], [-400, 480]);
  const washOpacity = useTransform(scrollYProgress, [0.15, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="binary-transition"
      className="surface-ink"
      style={{ height: '120vh', position: 'relative', overflow: 'hidden' }}
      aria-hidden="true"
    >
      {/* accent wash that recedes as we descend into the dark */}
      <motion.div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', opacity: washOpacity }} />
      <div style={{ position: 'absolute', top: 14, left: 18, zIndex: 2 }}>
        <span className="u-label" style={{ color: 'var(--accent)', mixBlendMode: 'difference' }}>SCROLL TO DECODE</span>
      </div>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 700, zIndex: 1 }}>
        <motion.div style={{ z: reduced ? 0 : z, transformStyle: 'preserve-3d', width: '100%', textAlign: 'center', color: 'var(--accent)', mixBlendMode: 'difference' }}>
          {ROWS.map((r, i) => {
            const dist = Math.abs(i - ROWS.length / 2);
            const rot = -46 + dist * 0.5;
            const scale = 1 + (ROWS.length / 2 - dist) * 0.06;
            return (
              <div
                key={i}
                className="font-mono-u"
                style={{
                  transform: reduced ? 'none' : `rotateX(${rot}deg) scale(${Math.max(scale, 0.6)})`,
                  fontSize: 'clamp(11px, 1.8vw, 26px)',
                  letterSpacing: '0.28em',
                  lineHeight: 1.9,
                  opacity: reduced ? 0.5 : 0.4 + (ROWS.length / 2 - dist) * 0.05,
                  whiteSpace: 'nowrap',
                }}
              >
                {r}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
