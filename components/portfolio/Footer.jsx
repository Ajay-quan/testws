import InterfaceIcon from './InterfaceIcon';

export default function Footer() {
  return (
    <footer className="surface-accent" data-testid="site-footer">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }} className="hairline-t footer-grid">
        <div className="hairline-r footer-identity" style={{ gridColumn: 'span 6', padding: '28px 20px' }}>
          <div className="font-display" style={{ fontSize: 'clamp(40px, 8vw, 96px)', lineHeight: 0.86, letterSpacing: '-0.03em' }}>
            AJAY<br />VARADA
          </div>
          <div className="u-label" style={{ marginTop: 14, opacity: 0.7 }}>
            AI / ML ENGINEER · SOFTWARE ENGINEER · M.S. COMPUTER SCIENCE
          </div>
          <img
            className="footer-signature"
            src="/ajay-signature.png"
            alt="Ajay Varada’s signature"
            width="915"
            height="272"
          />
        </div>

        <div className="footer-links" style={{ gridColumn: 'span 6', display: 'grid', gridTemplateRows: 'repeat(4, 1fr)' }}>
          <a data-testid="footer-linkedin" data-cursor="hover" className="hairline-b focus-ring" href="https://www.linkedin.com/in/ajay-varada" target="_blank" rel="noreferrer"
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', textDecoration: 'none', color: 'var(--ink)' }}>
            <span className="u-label">LINKEDIN</span><InterfaceIcon />
          </a>
          <a data-testid="footer-github" data-cursor="hover" className="hairline-b focus-ring" href="https://github.com/Ajay-quan" target="_blank" rel="noreferrer"
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', textDecoration: 'none', color: 'var(--ink)' }}>
            <span className="u-label">GITHUB</span><InterfaceIcon />
          </a>
          <a data-testid="footer-resume" data-cursor="hover" className="hairline-b focus-ring" href="/AjayVarada_Resume.pdf" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', textDecoration: 'none', color: 'var(--ink)' }}>
            <span className="u-label">RÉSUMÉ</span><InterfaceIcon />
          </a>
          <button data-testid="back-to-top" data-cursor="hover" className="focus-ring" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'transparent', border: 'none', color: 'var(--ink)', textAlign: 'left', width: '100%' }}>
            <span className="u-label">BACK TO TOP</span><InterfaceIcon name="up" />
          </button>
        </div>
      </div>
      <div className="hairline-t" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
        <span className="u-label" style={{ opacity: 0.6 }}>© 2026 — AJAY VARADA</span>
        <span className="u-label" style={{ opacity: 0.6 }}>ATLANTA · OPEN TO AI / ML + SOFTWARE ROLES</span>
      </div>
      <style>{`
        .footer-signature{display:block;width:clamp(190px,28vw,340px);height:auto;margin:24px 0 0;opacity:.68;filter:contrast(1.24);mix-blend-mode:multiply;transition:opacity .35s ease,transform .5s cubic-bezier(.16,1,.3,1)}
        .footer-identity:hover .footer-signature{opacity:.92;transform:translateX(4px)}
        html[data-theme='dark'] .footer-signature{filter:invert(1) brightness(1.5) contrast(.9);mix-blend-mode:screen;opacity:.64}
        @media(max-width:640px){.footer-grid{grid-template-columns:1fr!important}.footer-identity,.footer-links{grid-column:1!important}.footer-identity{border-right:none!important;border-bottom:1px solid var(--ink)}.footer-signature{width:min(72vw,300px);margin-top:20px}footer>div:last-of-type{gap:14px;flex-wrap:wrap}}
        @media(prefers-reduced-motion:reduce){.footer-signature{transition:none}.footer-identity:hover .footer-signature{transform:none}}
      `}</style>
    </footer>
  );
}
