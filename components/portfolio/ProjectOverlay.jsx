import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InterfaceIcon from './InterfaceIcon';

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
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(17,9,8,0.6)', display: 'flex', justifyContent: 'flex-end' }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            ref={ref}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="surface-ink"
            style={{ width: 'min(640px, 100%)', height: '100%', overflowY: 'auto', borderLeft: '1px solid var(--line)' }}
          >
            <div className="hairline-b" style={{ borderColor: 'var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', position: 'sticky', top: 0, background: 'var(--inverse-bg)', zIndex: 2 }}>
              <span className="u-label" style={{ color: project.accent }}>{project.status}</span>
              <button ref={closeRef} data-testid="overlay-close" data-cursor="hover" onClick={() => onClose()} aria-label="Close project" className="focus-ring"
                style={{ background: 'transparent', border: `1px solid ${project.accent}`, color: project.accent, width: 34, height: 34 }}>✕</button>
            </div>

            {project.media && project.media.length > 0 && (
              <div style={{ padding: '20px 20px 0' }}>
                <figure style={{ margin: 0, position: 'relative', border: `1px solid ${project.accent}`, aspectRatio: '3 / 2', overflow: 'hidden', background: '#000' }}>
                  <img src={project.media[0]} alt={`${project.title} interface study`} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <figcaption className="u-label" style={{ position: 'absolute', bottom: 8, left: 8, color: project.accent, background: 'rgba(17,9,8,0.72)', padding: '4px 8px' }}>FIG.01 / INTERFACE STUDY</figcaption>
                </figure>
              </div>
            )}

            <div style={{ padding: '28px 20px 60px', color: 'var(--inverse-fg)' }}>
              <h2 id="ov-title" className="font-display" style={{ margin: 0, fontSize: 'clamp(40px, 8vw, 84px)', lineHeight: 0.86, letterSpacing: '-0.03em' }}>{project.title}</h2>
              <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
                <span className="u-label" style={{ opacity: 0.7 }}>ROLE / {project.role}</span>
                <span className="u-label" style={{ opacity: 0.7 }}>YEAR / {project.year}</span>
                <span className="u-label" style={{ opacity: 0.7 }}>STATUS / {project.status}</span>
              </div>

              {project.metrics && (
                <div className="project-metrics" style={{ display: 'grid', gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`, marginTop: 26, borderTop: `1px solid ${project.accent}`, borderBottom: `1px solid ${project.accent}` }}>
                  {project.metrics.map(([label, value], index) => (
                    <div key={label} style={{ padding: '14px 10px', borderRight: index < project.metrics.length - 1 ? `1px solid ${project.accent}` : 'none' }}>
                      <div className="u-label" style={{ opacity: .55, marginBottom: 7 }}>{label}</div>
                      <div className="font-display" style={{ color: project.accent, fontSize: 'clamp(22px,4vw,38px)', lineHeight: .95 }}>{value}</div>
                    </div>
                  ))}
                </div>
              )}

              {[
                ['OVERVIEW', project.overview],
                ['CHALLENGE', project.challenge],
                ['APPROACH', project.approach],
                ['WHAT I OWNED', project.contribution],
                ['OUTCOME', project.outcome],
              ].map(([k, v]) => (
                <div key={k} style={{ marginTop: 30 }}>
                  <div className="u-label" style={{ color: project.accent, opacity: 0.85, marginBottom: 8 }}>{k}</div>
                  <p className="font-serif-ed" style={{ margin: 0, fontSize: 17, lineHeight: 1.6, fontWeight: 350 }}>{v}</p>
                </div>
              ))}

              <div style={{ marginTop: 30 }}>
                <div className="u-label" style={{ opacity: 0.55, marginBottom: 10 }}>TECHNOLOGY</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tech.map((t) => (
                    <span key={t} className="u-label" style={{ border: `1px solid ${project.accent}`, color: project.accent, padding: '6px 10px' }}>{t}</span>
                  ))}
                </div>
              </div>
              {project.externalLink && <a href={project.externalLink} target="_blank" rel="noreferrer" data-cursor="hover" className="focus-ring u-label icon-link" style={{ marginTop: 34, border: `1px solid ${project.accent}`, color: project.accent, padding: '12px 16px', textDecoration: 'none' }}>VIEW REPOSITORY / GITHUB <InterfaceIcon /></a>}
            </div>
            <style>{`
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
