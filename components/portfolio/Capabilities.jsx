import { useState } from 'react';

const CAPS = [
  { id: '01', title: 'PRODUCT DIRECTION', note: 'Set the trajectory from ambiguous problem to shipped intelligence.', shape: 'square' },
  { id: '02', title: 'AI EXPERIENCE DESIGN', note: 'Make model behaviour legible, controllable and trustworthy.', shape: 'circle' },
  { id: '03', title: 'AGENTIC SYSTEMS', note: 'Design autonomous flows that stay accountable to the human.', shape: 'triangle' },
  { id: '04', title: 'RAPID PROTOTYPING', note: 'Turn a hypothesis into a testable artifact within days.', shape: 'cross' },
  { id: '05', title: 'CREATIVE TECHNOLOGY', note: 'Bend code, canvas and motion into expressive interfaces.', shape: 'ring' },
  { id: '06', title: 'INTERACTION SYSTEMS', note: 'Build motion languages that scale across an entire product.', shape: 'bars' },
];

function Glyph({ shape, active }) {
  const s = { transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', transform: active ? 'rotate(90deg) scale(1.15)' : 'none' };
  const stroke = 'currentColor';
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true" style={s}>
      {shape === 'square' && <rect x="12" y="12" width="48" height="48" fill="none" stroke={stroke} strokeWidth="2" />}
      {shape === 'circle' && <circle cx="36" cy="36" r="24" fill="none" stroke={stroke} strokeWidth="2" />}
      {shape === 'triangle' && <polygon points="36,10 62,60 10,60" fill="none" stroke={stroke} strokeWidth="2" />}
      {shape === 'cross' && <><line x1="36" y1="8" x2="36" y2="64" stroke={stroke} strokeWidth="2" /><line x1="8" y1="36" x2="64" y2="36" stroke={stroke} strokeWidth="2" /></>}
      {shape === 'ring' && <><circle cx="36" cy="36" r="24" fill="none" stroke={stroke} strokeWidth="2" /><circle cx="36" cy="36" r="10" fill="none" stroke={stroke} strokeWidth="2" /></>}
      {shape === 'bars' && <><rect x="14" y="16" width="44" height="6" fill={stroke} /><rect x="14" y="33" width="30" height="6" fill={stroke} /><rect x="14" y="50" width="44" height="6" fill={stroke} /></>}
    </svg>
  );
}

function Cell({ cap, borderR, borderB }) {
  const [active, setActive] = useState(false);
  return (
    <div
      data-testid={`cap-${cap.id}`}
      data-cursor="hover"
      tabIndex={0}
      className={`focus-ring ${borderR ? 'hairline-r' : ''} ${borderB ? 'hairline-b' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((a) => !a)}
      style={{
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--ink)',
        padding: 'clamp(22px, 3vw, 40px)',
        minHeight: 260,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        transition: 'background 0.45s cubic-bezier(0.16,1,0.3,1), color 0.45s cubic-bezier(0.16,1,0.3,1)',
        outline: 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="u-label" style={{ fontSize: 12, opacity: 0.7 }}>{cap.id}</span>
        <Glyph shape={cap.shape} active={active} />
      </div>
      <div>
        <h3 className="font-display" style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 42px)', lineHeight: 0.92, letterSpacing: '-0.03em', transform: active ? 'translateX(6px)' : 'none', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
          {cap.title}
        </h3>
        <p className="font-mono-u" style={{ fontSize: 11, lineHeight: 1.7, margin: '12px 0 0', maxWidth: 320, overflow: 'hidden', maxHeight: active ? 60 : 0, opacity: active ? 0.9 : 0, transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s' }}>
          {cap.note}
        </p>
      </div>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section data-testid="capabilities-section" className="surface-accent hairline-b">
      <div className="hairline-b" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: 'clamp(30px,5vw,64px) 18px 20px' }}>
        <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(48px, 13vw, 220px)', lineHeight: 0.8, letterSpacing: '-0.05em' }}>CAPABILITIES</h2>
        <span className="u-label" style={{ opacity: 0.6, whiteSpace: 'nowrap' }}>02—03</span>
      </div>
      <div className="cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {CAPS.map((c, i) => (
          <Cell key={c.id} cap={c} borderR={(i % 3) !== 2} borderB={i < 3} />
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) { .cap-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .cap-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
