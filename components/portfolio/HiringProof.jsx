const PROOF = [
  ['170+', 'ENGINEERS USED MY NLP PLATFORM'],
  ['PROMOTED', 'INTERN TO SOFTWARE ENGINEER'],
  ['0.9667', 'RECALL@5 · AGENT MEMORY'],
  ['4.0', 'M.S. COMPUTER SCIENCE GPA'],
];

export default function HiringProof() {
  return (
    <section className="hiring-proof surface-accent hairline-b" aria-label="Career highlights" data-testid="hiring-proof">
      {PROOF.map(([value, label], index) => (
        <div key={label} className={index < PROOF.length - 1 ? 'hairline-r' : ''}>
          <strong className="font-display">{value}</strong>
          <span className="u-label">{label}</span>
        </div>
      ))}
      <style>{`
        .hiring-proof { display:grid; grid-template-columns:repeat(4,1fr); }
        .hiring-proof > div { min-height:112px; padding:17px 18px; display:flex; flex-direction:column; justify-content:space-between; gap:14px; }
        .hiring-proof strong { font-size:clamp(27px,3.3vw,48px); line-height:.9; letter-spacing:-.025em; }
        .hiring-proof span { max-width:210px; opacity:.64; line-height:1.45; }
        @media(max-width:720px){
          .hiring-proof { grid-template-columns:1fr 1fr; }
          .hiring-proof > div { min-height:104px; border-bottom:1px solid var(--ink); }
          .hiring-proof > div:nth-child(2) { border-right:0; }
          .hiring-proof > div:nth-last-child(-n+2) { border-bottom:0; }
        }
      `}</style>
    </section>
  );
}
