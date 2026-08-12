const EMAIL = 'ajayvrda@gmail.com';

export default function Contact() {
  return (
    <section id="contact" data-testid="contact-section" className="surface-accent hairline-b simple-contact" style={{ scrollMarginTop: 76 }}>
      <div className="simple-contact-main">
        <span className="u-label">05 — CONTACT</span>
        <h2 className="font-serif-ed">Have a thoughtful AI problem or a product worth building?</h2>
        <a data-testid="contact-email" className="contact-email focus-ring font-display" data-cursor="hover" href={`mailto:${EMAIL}`}>
          {EMAIL}<span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="simple-contact-links hairline-t">
        <p>Open to applied AI, machine-learning engineering, and software roles where research quality meets production discipline.</p>
        <nav aria-label="Contact links">
          <a className="focus-ring u-label" href="https://www.linkedin.com/in/ajay-varada" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a className="focus-ring u-label" href="https://github.com/Ajay-quan" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a className="focus-ring u-label" href="/AjayVarada_Resume.pdf" target="_blank" rel="noreferrer">RÉSUMÉ ↗</a>
        </nav>
      </div>
      <style>{`
        .simple-contact-main { min-height:500px; padding:clamp(42px,6vw,80px) clamp(20px,4vw,58px); display:flex; flex-direction:column; }
        .simple-contact-main h2 { font-size:clamp(34px,5vw,70px); line-height:1.04; font-weight:350; max-width:980px; margin:50px 0 80px; }
        .contact-email { margin-top:auto; color:var(--ink); text-decoration:none; font-size:clamp(42px,8.5vw,132px); line-height:.9; letter-spacing:-.045em; display:flex; align-items:flex-start; justify-content:space-between; gap:24px; border-bottom:3px solid var(--ink); padding-bottom:14px; transition:padding-left .35s cubic-bezier(.16,1,.3,1); }
        .contact-email:hover { padding-left:14px; }
        .contact-email span { font-family:'Fraunces',serif; font-size:.55em; }
        .simple-contact-links { display:grid; grid-template-columns:1fr auto; gap:40px; padding:24px clamp(20px,4vw,58px); align-items:center; }
        .simple-contact-links p { font-size:12px; line-height:1.65; opacity:.66; max-width:680px; margin:0; }
        .simple-contact-links nav { display:flex; gap:24px; }
        .simple-contact-links a { color:var(--ink); text-decoration:none; }
        .simple-contact-links a:hover { text-decoration:underline; text-underline-offset:5px; }
        @media(max-width:720px){.simple-contact-main{min-height:420px}.simple-contact-main h2{margin:42px 0 64px}.contact-email{font-size:clamp(34px,11vw,54px);word-break:break-word}.simple-contact-links{grid-template-columns:1fr}.simple-contact-links nav{flex-wrap:wrap;gap:20px}}
      `}</style>
    </section>
  );
}
