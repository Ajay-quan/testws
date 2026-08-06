import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FACTS = [
  ['FOCUS', 'AI × PRODUCT'],
  ['MODE', 'STRATEGY → CODE'],
  ['BASE', 'BENGALURU / GLOBAL'],
  ['STATUS', 'OPEN TO SIGNAL'],
];

const LINES = [
  'I build intelligent products',
  'that turn complex systems',
  'into clear, memorable',
  'human experiences.',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section id="about" ref={ref} data-testid="about-section" className="surface-accent hairline-b" style={{ scrollMarginTop: 92 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr' }} className="about-grid">
        {/* rail */}
        <div className="hairline-r" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '18px 0', alignItems: 'center' }}>
          <motion.span
            className="font-mono-u"
            initial={{ y: -40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ writingMode: 'vertical-rl', letterSpacing: '0.4em', fontSize: 14 }}
          >
            ABOUT
          </motion.span>
          <span className="u-label" style={{ writingMode: 'vertical-rl', opacity: 0.6 }}>01—03</span>
        </div>

        <div style={{ padding: 'clamp(36px, 6vw, 84px) clamp(20px, 4vw, 60px)' }}>
          <h2 className="font-serif-ed" style={{ margin: 0, fontWeight: 350, fontSize: 'clamp(30px, 5.4vw, 78px)', lineHeight: 1.02, letterSpacing: '-0.01em', maxWidth: 1100 }}>
            {LINES.map((l, i) => (
              <span key={i} className="clip-line">
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.includes('intelligent products')
                    ? <>that turn <span style={{ borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>complex systems</span></>
                    : l}
                </motion.span>
              </span>
            ))}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(20px, 4vw, 60px)', marginTop: 'clamp(36px, 6vw, 72px)', maxWidth: 900 }}>
            <p className="font-mono-u" style={{ fontSize: 13, lineHeight: 1.8, margin: 0, opacity: 0.85 }}>
              Ajay works at the intersection of AI research, product strategy, interaction design and rapid prototyping — translating raw model capability into tools people actually trust.
            </p>
            <p className="font-mono-u" style={{ fontSize: 13, lineHeight: 1.8, margin: 0, opacity: 0.85 }}>
              The method is direct: interrogate the system, find the human signal inside the noise, then ship interfaces that make intelligence feel obvious.
            </p>
          </div>
        </div>
      </div>

      {/* fact cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="hairline-t fact-grid">
        {FACTS.map(([k, v], i) => (
          <motion.div
            key={k}
            className={i < 3 ? 'hairline-r' : ''}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: '20px 18px', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <span className="u-label" style={{ opacity: 0.55 }}>{k}</span>
            <span className="font-display" style={{ fontSize: 'clamp(18px, 2.4vw, 30px)', letterSpacing: '-0.02em' }}>{v}</span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .fact-grid { grid-template-columns: 1fr 1fr !important; }
          .fact-grid > div:nth-child(2) { border-right: none !important; }
          .fact-grid > div:nth-child(1), .fact-grid > div:nth-child(2) { border-bottom: 1px solid var(--ink); }
        }
      `}</style>
    </section>
  );
}
