import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERIENCE = [
  { period: 'JUL 2024 — JUL 2025', company: 'MICRON TECHNOLOGY', role: 'SOFTWARE ENGINEER I', detail: 'Promoted from intern. Built an LLM-powered NLP analytics platform adopted by 170+ engineers, reducing task overhead by 40%. Improved CI/CD reliability by 30% and helped shorten release cycles by 35% across 4+ services.' },
  { period: 'JAN 2024 — JUL 2024', company: 'MICRON TECHNOLOGY', role: 'SOFTWARE ENGINEERING INTERN', detail: 'Built 100+ Python and SQL automation scripts for enterprise network and security validation. Named Best Intern of the Year and converted to a full-time engineering role.' },
  { period: 'AUG 2023 — DEC 2023', company: 'DIGICLINICS RESEARCH', role: 'AI / ML ENGINEER INTERN', detail: 'Developed an end-to-end PyTorch and scikit-learn medical-imaging pipeline with approximately 90% segmentation accuracy, deployed across 2 hospitals and 10+ institutions.' },
];

const EDUCATION = [
  ['GEORGIA STATE UNIVERSITY', 'M.S. COMPUTER SCIENCE · 4.0 / 4.0 · 2025 — PRESENT'],
  ['KESHAV MEMORIAL INSTITUTE OF TECHNOLOGY', 'B.TECH COMPUTER SCIENCE (DATA SCIENCE) · 3.8 / 4.0 · 2020 — 2024'],
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  return (
    <section id="experience" ref={ref} className="surface-accent hairline-b" style={{ scrollMarginTop: 92 }}>
      <div className="hairline-b" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: 'clamp(30px,5vw,64px) 18px 20px' }}>
        <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(48px, 12vw, 200px)', lineHeight: 0.8, letterSpacing: '-0.05em' }}>EXPERIENCE</h2>
        <span className="u-label" style={{ opacity: 0.6 }}>CAREER / EDUCATION</span>
      </div>
      <div>
        {EXPERIENCE.map((item, i) => <motion.article key={`${item.company}-${item.period}`} className="hairline-b experience-row" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="hairline-r u-label" style={{ padding: '24px 18px', opacity: 0.65 }}>{item.period}</div>
          <div className="hairline-r" style={{ padding: '24px 18px' }}><div className="font-display" style={{ fontSize: 'clamp(24px,3vw,42px)', lineHeight: 0.9 }}>{item.company}</div><div className="u-label" style={{ marginTop: 12 }}>{item.role}</div></div>
          <p className="font-mono-u" style={{ padding: '24px 18px', margin: 0, fontSize: 12, lineHeight: 1.75, maxWidth: 760 }}>{item.detail}</p>
        </motion.article>)}
      </div>
      <div className="education-grid">
        {EDUCATION.map(([school, detail], i) => <div key={school} className={i === 0 ? 'hairline-r' : ''} style={{ padding: '24px 18px', minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}><span className="u-label" style={{ opacity: 0.55 }}>EDUCATION / 0{i + 1}</span><div><div className="font-display" style={{ fontSize: 'clamp(22px,3vw,38px)', lineHeight: 0.92 }}>{school}</div><div className="u-label" style={{ marginTop: 12 }}>{detail}</div></div></div>)}
      </div>
      <style>{`
        .experience-row,.education-grid { display:grid; grid-template-columns:180px minmax(220px,.75fr) 1fr; }
        .education-grid > div:first-child { grid-column:span 2; }
        @media(max-width:760px){
          #experience>div:first-child{padding:34px 14px 16px!important;align-items:flex-start!important;gap:12px;overflow:hidden}
          #experience>div:first-child h2{font-size:clamp(47px,17vw,70px)!important;line-height:.86!important;max-width:100%}
          #experience>div:first-child>span{display:none}
          .experience-row,.education-grid{grid-template-columns:1fr!important}
          .experience-row{padding:0 14px}
          .experience-row>*{border-right:none!important;border-bottom:none!important;padding-left:0!important;padding-right:0!important}
          .experience-row>div:first-child{padding-top:18px!important;padding-bottom:9px!important}
          .experience-row>div:nth-child(2){padding-top:0!important;padding-bottom:10px!important}
          .experience-row>div:nth-child(2) .font-display{font-size:clamp(28px,9vw,38px)!important;line-height:.94!important}
          .experience-row>p{padding-top:0!important;padding-bottom:20px!important;font-size:11px!important;line-height:1.65!important}
          .education-grid>div{min-height:132px!important;padding:20px 14px!important}
          .education-grid>div:first-child{grid-column:auto;border-right:none!important;border-bottom:1px solid var(--ink)}
          .education-grid .font-display{font-size:clamp(24px,8vw,34px)!important;line-height:.96!important;overflow-wrap:anywhere}
          .education-grid .u-label{line-height:1.5}
        }
      `}</style>
    </section>
  );
}
