import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterfaceIcon from './InterfaceIcon';

const CASE_ACCENT = '#B8D6FF';

export default function ProjectOverlay({ project, onClose }) {
  const ref = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const prevFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    // browser back support
    window.history.pushState({ overlay: project.id }, '');
    const onPop = () => onClose(true);
    window.addEventListener('popstate', onPop);

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const els = ref.current.querySelectorAll('a[href],button,[tabindex]:not([tabindex="-1"])');
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPop);
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog" aria-modal="true" aria-labelledby="ov-title"
          data-testid="project-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(2,8,23,0.74)', display: 'flex', justifyContent: 'flex-end' }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            ref={ref}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="case-study-panel"
            style={{ width: 'min(680px, 100%)', height: '100%', overflowY: 'auto', borderLeft: '1px solid rgba(184,214,255,.28)', background: '#06152d', color: '#f3f7ff' }}
          >
            <div className="case-study-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', position: 'sticky', top: 0, background: 'rgba(6,21,45,.9)', zIndex: 2 }}>
              <span className="u-label" style={{ color: CASE_ACCENT }}>{project.status}</span>
              <button ref={closeRef} data-testid="overlay-close" data-cursor="hover" onClick={() => onClose()} aria-label="Close project" className="focus-ring"
                style={{ background: 'transparent', border: `1px solid ${CASE_ACCENT}`, color: CASE_ACCENT, width: 38, height: 38 }}>✕</button>
            </div>

            {project.media && project.media.length > 0 && (
              <div style={{ padding: '20px 20px 0' }}>
                <figure className="case-study-figure" style={{ '--project-accent': CASE_ACCENT, margin: 0, position: 'relative', border: `1px solid rgba(184,214,255,.34)`, aspectRatio: '3 / 2', overflow: 'hidden', background: '#06152d' }}>
                  <img src={project.media[0]} alt={`${project.title} interface study`} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: project.coverPosition, transform: `scale(${1 + ((project.coverScale || 1) - 1) * .55})`, display: 'block' }} />
                  <span className="case-study-tone" aria-hidden="true" />
                  <figcaption className="u-label"><span>{project.visualLabel}</span><span>FIG.01 / INTERFACE STUDY</span></figcaption>
                </figure>
              </div>
            )}

            <div className="case-study-content" style={{ padding: '30px 20px 64px', color: '#f3f7ff' }}>
              <h2 id="ov-title" className="font-display" style={{ margin: 0, fontSize: 'clamp(40px, 8vw, 84px)', lineHeight: 0.86, letterSpacing: '-0.03em' }}>{project.title}</h2>
              <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
                <span className="u-label" style={{ opacity: 0.7 }}>ROLE / {project.role}</span>
                <span className="u-label" style={{ opacity: 0.7 }}>YEAR / {project.year}</span>
                <span className="u-label" style={{ opacity: 0.7 }}>STATUS / {project.status}</span>
              </div>

              {project.metrics && (
                <div className="project-metrics" style={{ display: 'grid', gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`, marginTop: 28, borderTop: `1px solid ${CASE_ACCENT}`, borderBottom: `1px solid ${CASE_ACCENT}` }}>
                  {project.metrics.map(([label, value], index) => (
                    <div key={label} style={{ padding: '15px 10px', borderRight: index < project.metrics.length - 1 ? `1px solid ${CASE_ACCENT}` : 'none' }}>
                      <div className="u-label" style={{ color: '#dbe9ff', opacity: .72, marginBottom: 7 }}>{label}</div>
                      <div className="font-display" style={{ color: CASE_ACCENT, fontSize: 'clamp(22px,4vw,38px)', lineHeight: .95 }}>{value}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="case-study-overview">
                <div className="u-label">PROJECT OVERVIEW</div>
                <p className="font-serif-ed">{project.overview}</p>
              </div>

              <div className="case-study-sections">
                {project.caseStudy?.map((section, sectionIndex) => (
                  <section key={section.title}>
                    <div className="case-study-section-number u-label">0{sectionIndex + 1}</div>
                    <div>
                      <h3 className="font-display">{section.title}</h3>
                      <p className="case-study-summary">{section.summary}</p>
                      <ul>
                        {section.points.map(([label, detail]) => (
                          <li key={label}><strong>{label}.</strong> {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                ))}
              </div>

              <div style={{ marginTop: 30 }}>
                <div className="u-label" style={{ color: CASE_ACCENT, marginBottom: 10 }}>TECHNOLOGY</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tech.map((t) => (
                    <span key={t} className="u-label case-study-tech">{t}</span>
                  ))}
                </div>
              </div>
              {project.externalLink && <a href={project.externalLink} target="_blank" rel="noreferrer" data-cursor="hover" className="focus-ring u-label icon-link case-study-repo">VIEW REPOSITORY / GITHUB <InterfaceIcon /></a>}
            </div>
            <style>{`
              .case-study-header{border-bottom:1px solid rgba(184,214,255,.24);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
              .case-study-content>h2{color:#fff}.case-study-content>div:nth-of-type(1){color:#dbe9ff}
              .case-study-figure>img{filter:saturate(.72) contrast(1.14) brightness(.94)}
              .case-study-tone{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(4,18,42,.03) 42%,rgba(4,18,42,.82) 100%),linear-gradient(125deg,color-mix(in srgb,var(--project-accent) 14%,transparent),transparent 45%)}
              .case-study-figure figcaption{position:absolute;left:10px;right:10px;bottom:9px;display:flex;justify-content:space-between;gap:10px;color:#eef4ff;text-shadow:0 1px 8px rgba(0,0,0,.58)}
              .case-study-figure figcaption span:first-child{color:color-mix(in srgb,var(--project-accent) 72%,#eef4ff)}
              .case-study-overview{margin-top:34px;padding:22px;background:rgba(184,214,255,.07);border:1px solid rgba(184,214,255,.2);border-radius:18px}
              .case-study-overview .u-label{color:${CASE_ACCENT};margin-bottom:10px}.case-study-overview p{margin:0;color:#f3f7ff;font-size:19px;line-height:1.48;font-weight:420}
              .case-study-sections{margin-top:34px;border-top:1px solid rgba(184,214,255,.24)}
              .case-study-sections section{display:grid;grid-template-columns:38px minmax(0,1fr);gap:14px;padding:28px 0;border-bottom:1px solid rgba(184,214,255,.2)}
              .case-study-section-number{color:${CASE_ACCENT};padding-top:4px}.case-study-sections h3{margin:0;color:#fff;font-size:clamp(26px,5vw,38px);line-height:.96;letter-spacing:-.02em}
              .case-study-summary{margin:13px 0 0;color:#e7effc;font-size:16px;line-height:1.55;font-weight:520}
              .case-study-sections ul{display:grid;gap:10px;margin:18px 0 0;padding:0;list-style:none}.case-study-sections li{position:relative;padding-left:16px;color:#cbd9ec;font-size:14px;line-height:1.55}.case-study-sections li::before{content:'';position:absolute;left:0;top:.68em;width:5px;height:5px;border-radius:50%;background:${CASE_ACCENT}}.case-study-sections strong{color:#fff;font-weight:700}
              .case-study-tech{border:1px solid rgba(184,214,255,.36);color:#dbe9ff;padding:7px 11px;border-radius:999px;background:rgba(184,214,255,.06)}
              .case-study-repo{display:inline-flex;margin-top:36px;border:1px solid ${CASE_ACCENT};color:${CASE_ACCENT};padding:13px 17px;border-radius:999px;text-decoration:none;background:rgba(184,214,255,.07)}
              @media(max-width:520px){
                [data-testid="project-overlay"]>div{border-left:0!important}
                [data-testid="project-overlay"]>div>div:first-child{padding:12px 14px!important}
                [data-testid="project-overlay"] figure{aspect-ratio:16 / 10!important}
                [data-testid="project-overlay"] figure+*{min-width:0}
                [data-testid="project-overlay"] h2{font-size:clamp(42px,15vw,64px)!important;overflow-wrap:anywhere}
                .project-metrics{grid-template-columns:repeat(3,minmax(0,1fr))!important}
                .project-metrics>div{padding:12px 7px!important}
                .project-metrics .font-display{font-size:22px!important;overflow-wrap:anywhere}
                .project-metrics .u-label{font-size:7px!important;letter-spacing:.06em}
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
