import { usePrefersReducedMotion } from './hooks';

// Continuous monospaced data band. dir: 'l' | 'r'
export default function Ticker({ items, dir = 'l', invert = false, speed = 42 }) {
  const reduced = usePrefersReducedMotion();
  const text = items.join('   //////   ');
  const content = `${text}   //////   `;
  return (
    <div
      className={invert ? 'surface-ink hairline-t hairline-b' : 'surface-accent hairline-t hairline-b'}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '9px 0' }}
      aria-hidden="true"
      data-testid="data-ticker"
    >
      <div
        style={{
          display: 'inline-block', whiteSpace: 'nowrap',
          animation: reduced ? 'none' : `${dir === 'l' ? 'marq-l' : 'marq-r'} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span className="font-mono-u" style={{ fontSize: 12, letterSpacing: '0.18em', paddingRight: 0 }}>{content}</span>
        <span className="font-mono-u" style={{ fontSize: 12, letterSpacing: '0.18em' }}>{content}</span>
      </div>
    </div>
  );
}
