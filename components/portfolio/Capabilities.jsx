const CAPS = [
  ['01', 'LLM & AGENT SYSTEMS', 'Persistent memory, hybrid retrieval, LangChain, MCP, RAG and LLM APIs.'],
  ['02', 'MACHINE LEARNING', 'Production ML pipelines with PyTorch, TensorFlow and scikit-learn.'],
  ['03', 'COMPUTER VISION', 'Classification, segmentation, object detection and real-time vision.'],
  ['04', 'BACKEND & CLOUD', 'Python services, REST APIs, AWS, SQL, NoSQL and distributed systems.'],
  ['05', 'DATA SYSTEMS', 'ETL pipelines, vector databases, relational design and query optimization.'],
  ['06', 'DEVOPS & RELIABILITY', 'CI/CD automation, testing, debugging and performance engineering.'],
];

export default function Capabilities() {
  return (
    <section data-testid="capabilities-section" className="surface-accent hairline-b compact-capabilities">
      <div className="compact-cap-heading hairline-b">
        <h2 className="font-display">CAPABILITIES</h2><span className="u-label">WHAT I BUILD WITH</span>
      </div>
      <div className="compact-cap-grid">
        {CAPS.map(([id, title, note]) => (
          <article key={id} className="compact-cap-cell">
            <span className="u-label">{id}</span>
            <h3 className="font-display">{title}</h3>
            <p>{note}</p>
          </article>
        ))}
      </div>
      <style>{`
        .compact-cap-heading { padding:34px 20px 18px; display:flex; align-items:end; justify-content:space-between; gap:20px; }
        .compact-cap-heading h2 { font-size:clamp(52px,10vw,150px); line-height:.8; letter-spacing:-.05em; margin:0; }
        .compact-cap-grid { display:grid; grid-template-columns:repeat(3,1fr); }
        .compact-cap-cell { min-height:190px; padding:22px 20px; border-right:1px solid var(--ink); border-bottom:1px solid var(--ink); display:flex; flex-direction:column; }
        .compact-cap-cell:nth-child(3n) { border-right:0; }
        .compact-cap-cell:nth-last-child(-n+3) { border-bottom:0; }
        .compact-cap-cell h3 { font-size:clamp(22px,2.4vw,34px); line-height:.94; margin:auto 0 12px; }
        .compact-cap-cell p { font-size:11px; line-height:1.55; opacity:.68; margin:0; max-width:340px; }
        @media(max-width:760px){.compact-cap-grid{grid-template-columns:1fr 1fr}.compact-cap-cell:nth-child(3n){border-right:1px solid var(--ink)}.compact-cap-cell:nth-child(2n){border-right:0}.compact-cap-cell:nth-last-child(-n+3){border-bottom:1px solid var(--ink)}.compact-cap-cell:nth-last-child(-n+2){border-bottom:0}.compact-cap-cell{min-height:175px}}
        @media(max-width:480px){.compact-cap-heading{align-items:flex-start;flex-direction:column}.compact-cap-grid{grid-template-columns:1fr}.compact-cap-cell{border-right:0!important;border-bottom:1px solid var(--ink)!important;min-height:155px}.compact-cap-cell:last-child{border-bottom:0!important}.compact-cap-cell p{font-size:12px}}
      `}</style>
    </section>
  );
}
