import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { ContextEngine, SonicField, QuietSignal } from './ProjectPreviews';
import { usePrefersReducedMotion } from './hooks';
import { whoosh } from './tunnelAudio';

export const PROJECTS = [
  {
    id: 'aeg', title: 'STATEFUL.AI', serial: '#AEG1—0001/26', role: 'AI SYSTEMS ENGINEER', year: '2025—26',
    premise: 'A self-improving persistent memory layer for long-running LLM agents.',
    Preview: ContextEngine, side: -1, accent: '#E34351',
    overview: 'An open-source memory system that lets agents store, retrieve, revise, and learn from long-lived context through REST and MCP interfaces.',
    challenge: 'Long-running agents need more than chat history: they need durable recall, contradiction handling, privacy controls, and retrieval that improves through use.',
    approach: 'Combined dense semantic search, BM25 and Reciprocal Rank Fusion with versioned memory lifecycle, reranking, PII redaction, and per-tenant continual learning.',
    contribution: 'Designed and implemented the layered API-to-adapter architecture, retrieval pipeline, lifecycle services, SDK, CLI, evaluation harnesses, and AWS deployment path.',
    outcome: 'Delivered a zero-infrastructure default with 135 passing tests and a benchmark reaching 0.9667 Recall@5 and 1.0 MRR.',
    tech: ['Python', 'FastAPI', 'LangChain', 'MCP', 'FAISS', 'Vector DB', 'AWS'],
    externalLink: 'https://github.com/Ajay-quan/AegisMem',
  },
  {
    id: 'cv', title: 'ISCHEMIC STROKE AI', serial: '#CV96—0002/22', role: 'ML ENGINEER', year: '2022',
    premise: 'A pathology-image classification pipeline for ischemic stroke analysis.',
    Preview: SonicField, side: 1, accent: '#E6B94E',
    overview: 'A reproducible computer-vision pipeline for classifying pathology image tiles associated with ischemic stroke.',
    challenge: 'The project required learning from more than 30,000 high-resolution pathology tiles while improving substantially over the baseline model.',
    approach: 'Built modular ingestion, preprocessing, augmentation, training, evaluation, and visualization stages around a ResNet101V2 architecture.',
    contribution: 'Implemented the end-to-end training pipeline, SQL-backed data workflow, experiments, evaluation, and stakeholder-facing performance visualizations.',
    outcome: 'Achieved 0.96 AUC and 93% accuracy, improving accuracy by 20% over the baseline.',
    tech: ['Python', 'PyTorch', 'ResNet101V2', 'scikit-learn', 'SQL'],
  },
  {
    id: 'rm', title: 'RESEARCHMATCH', serial: '#RM05—0003/26', role: 'FULL-STACK ENGINEER', year: '2026',
    premise: 'A university research-opportunity platform with intelligent applicant matching.',
    Preview: QuietSignal, side: -1, accent: '#5FB6A8',
    overview: 'A full-stack application connecting students with faculty research projects through search, applications, and ranked matching.',
    challenge: 'Students struggle to discover relevant faculty work, while faculty need a consistent way to evaluate applicants across skills and interests.',
    approach: 'Built role-based student and faculty journeys around a five-factor SQL matching procedure, secure authentication, and project workflows.',
    contribution: 'Implemented the React client, Express API, MySQL schema, JWT authentication, matching logic, dashboards, milestones, and assignment management.',
    outcome: 'Produced a complete multi-role workflow from project discovery and application through ranked review and acceptance.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'Tailwind'],
    externalLink: 'https://github.com/Ajay-quan/DBS_Project',
  },
];

function ProjectWindow({ project, scrollYProgress, range, onOpen, reduced, mx, my }) {
  const [revealed, setRevealed] = useState(false);
  const passed = useRef(false);
  const [r0, r1] = range;
  const mid = (r0 + r1) / 2;
  const side = project.side;
  const rot = side * 1.8;
  const accent = project.accent;

  const y = useTransform(scrollYProgress, [r0, r1], ['66vh', '-82vh']);
  const scale = useTransform(scrollYProgress, [r0, mid, r1], [0.46, 1.06, 1.34]);
  const opacity = useTransform(scrollYProgress, [r0, r0 + 0.04, r1 - 0.1, r1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [r0, mid, r1], [`${side * 12}vw`, `${side * 2}vw`, `${side * -6}vw`]);
  const zIndex = useTransform(scale, (s) => Math.round(s * 100));

  // dominance = how close to the viewer this window is (1 near center)
  const dominance = useTransform(scale, (s) => Math.max(0, Math.min(1, (s - 0.7) / 0.4)));
  // cursor-reactive parallax tilt, only meaningful while dominant
  const rotY = useTransform([mx, dominance], ([m, d]) => (m || 0) * 16 * d);
  const rotX = useTransform([my, dominance], ([m, d]) => -(m || 0) * 11 * d);

  // fire a whoosh once as the window passes the viewer
  useMotionValueEvent(scale, 'change', (s) => {
    if (reduced) return;
    if (s >= 1.02 && !passed.current) { passed.current = true; whoosh(0.9 + (side + 1) * 0.15); }
    if (s < 0.85) passed.current = false;
  });

  const Preview = project.Preview;

  return (
    <motion.article
      data-testid={`project-${project.id}`}
      style={reduced ? { position: 'relative', margin: '0 auto 40px', maxWidth: 760, width: '90%' } : {
        position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%',
        y, x, scale, opacity, rotate: rot, zIndex, rotateX: rotX, rotateY: rotY,
        transformPerspective: 900, width: 'min(720px, 86vw)', willChange: 'transform',
      }}
    >
      <div
        className="hairline"
        data-cursor="hover"
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        style={{ background: 'var(--ink)', boxShadow: `12px 12px 0 rgba(17,9,8,0.5)`, position: 'relative', borderColor: 'var(--ink)' }}
      >
        <div className="surface-accent hairline-b" style={{ borderColor: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 8, height: 8, background: accent }} />
            <span style={{ width: 8, height: 8, border: '1px solid var(--ink)' }} />
            <span style={{ width: 8, height: 8, border: '1px solid var(--ink)' }} />
          </div>
          <span className="u-label" style={{ opacity: 0.7 }}>{project.serial}</span>
        </div>

        <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: 'var(--ink)' }}>
          <Preview tint={accent} />
          <motion.div
            aria-hidden={!revealed}
            initial={false}
            animate={{ clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0, background: 'var(--ink)', color: 'var(--accent)', padding: '9% 8%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <p className="font-serif-ed" style={{ fontSize: 'clamp(16px, 2.2vw, 26px)', lineHeight: 1.4, margin: 0, fontWeight: 350 }}>{project.premise}</p>
            <button data-testid={`open-${project.id}`} data-cursor="hover" className="focus-ring" onClick={() => onOpen(project)}
              style={{ alignSelf: 'flex-start', background: 'transparent', border: `1px solid ${accent}`, color: accent, padding: '10px 16px', fontSize: 11, letterSpacing: '0.14em' }}>
              VIEW SIGNAL ↗
            </button>
          </motion.div>
        </div>

        <div className="hairline-t surface-accent" style={{ borderColor: 'var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px' }}>
          <span className="font-display" style={{ fontSize: 'clamp(18px, 2.6vw, 30px)', letterSpacing: '-0.02em' }}>{project.title}</span>
          <button data-testid={`tap-${project.id}`} data-cursor="hover" className="focus-ring" onClick={() => (revealed ? onOpen(project) : setRevealed(true))} aria-label={`Open ${project.title}`}
            style={{ background: 'transparent', border: '1px solid var(--ink)', color: 'var(--ink)', padding: '6px 10px', fontSize: 10, letterSpacing: '0.1em' }}>
            {project.role} / {project.year}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

const BG = [
  { ch: 'W', l: '2%', t: '2%', size: 40, depth: 1.0, op: 0.10 },
  { ch: 'O', l: '68%', t: '-6%', size: 46, depth: 1.5, op: 0.08 },
  { ch: 'R', l: '6%', t: '52%', size: 52, depth: 0.7, op: 0.07 },
  { ch: 'K', l: '74%', t: '48%', size: 44, depth: 1.9, op: 0.09 },
  { ch: 'W', l: '38%', t: '24%', size: 30, depth: 1.2, op: 0.05 },
  { ch: 'K', l: '-6%', t: '30%', size: 38, depth: 2.2, op: 0.06 },
];

function BgLetter({ ch, l, t, size, op, y }) {
  return (
    <motion.span className="font-display" style={{
      position: 'absolute', left: l, top: t, y,
      fontSize: `clamp(140px, ${size}vw, 640px)`, lineHeight: 0.8,
      color: 'transparent', WebkitTextStroke: '1px var(--accent)', opacity: op, textShadow: '6px 6px 0 rgba(17,9,8,0.6)',
    }}>{ch}</motion.span>
  );
}

function DoorOutline({ scrollYProgress, r0, r1, baseW, h }) {
  const sx = useTransform(scrollYProgress, [r0, r1], [1, 20]);
  const op = useTransform(scrollYProgress, [0.34, 0.42], [1, 0]);
  return (
    <motion.div aria-hidden="true" style={{
      position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%',
      width: baseW, height: h, scaleX: sx, opacity: op, border: '1px solid var(--ink)', borderRadius: 200,
    }} />
  );
}

export default function WorkPortal({ onOpen }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onStageMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const gridOpacity = useTransform(scrollYProgress, [0, 0.28, 0.4], [1, 1, 0]);
  const inkOverlay = useTransform(scrollYProgress, [0.3, 0.44], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 0.18]);

  const capScaleX = useTransform(scrollYProgress, [0, 0.08, 0.36], [1, 1, 22]);
  const capH = useTransform(scrollYProgress, [0, 0.36], ['80vh', '112vh']);
  const capRadius = useTransform(scrollYProgress, [0.08, 0.36], [200, 0]);
  const capOpacity = useTransform(scrollYProgress, [0.36, 0.44], [1, 0]);
  const letterCounter = useTransform(capScaleX, (v) => 1 / v);
  const workScale = useTransform(scrollYProgress, [0, 0.08, 0.3], [1, 1.12, 1.7]);
  const workLetterOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
  const echoX = useTransform(scrollYProgress, [0.08, 0.34], [0, 60]);
  const echoXNeg = useTransform(echoX, (v) => -v);
  const echoOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.36], [0, 0.5, 0]);

  const py0 = useTransform(scrollYProgress, [0.4, 1], [140 * BG[0].depth, -180 * BG[0].depth]);
  const py1 = useTransform(scrollYProgress, [0.4, 1], [140 * BG[1].depth, -180 * BG[1].depth]);
  const py2 = useTransform(scrollYProgress, [0.4, 1], [140 * BG[2].depth, -180 * BG[2].depth]);
  const py3 = useTransform(scrollYProgress, [0.4, 1], [140 * BG[3].depth, -180 * BG[3].depth]);
  const py4 = useTransform(scrollYProgress, [0.4, 1], [140 * BG[4].depth, -180 * BG[4].depth]);
  const py5 = useTransform(scrollYProgress, [0.4, 1], [140 * BG[5].depth, -180 * BG[5].depth]);
  const py = [py0, py1, py2, py3, py4, py5];

  // per-project stage tint (peaks while that project is dominant)
  const ranges = [[0.40, 0.66], [0.55, 0.81], [0.70, 0.98]];
  const tint0 = useTransform(scrollYProgress, [ranges[0][0], (ranges[0][0] + ranges[0][1]) / 2, ranges[0][1]], [0, 0.16, 0]);
  const tint1 = useTransform(scrollYProgress, [ranges[1][0], (ranges[1][0] + ranges[1][1]) / 2, ranges[1][1]], [0, 0.16, 0]);
  const tint2 = useTransform(scrollYProgress, [ranges[2][0], (ranges[2][0] + ranges[2][1]) / 2, ranges[2][1]], [0, 0.16, 0]);
  const tints = [tint0, tint1, tint2];

  return (
    <section id="work" ref={ref} data-testid="work-section" style={{ position: 'relative', height: reduced ? 'auto' : '600vh', scrollMarginTop: 92 }}>
      {reduced ? (
        <div className="surface-ink" style={{ padding: '60px 18px' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(60px,18vw,240px)', color: 'var(--accent)', margin: '0 0 40px', letterSpacing: '-0.05em' }}>WORK</h2>
          {PROJECTS.map((p) => (
            <ProjectWindow key={p.id} project={p} scrollYProgress={scrollYProgress} range={[0, 1]} onOpen={onOpen} reduced mx={mx} my={my} />
          ))}
        </div>
      ) : (
        <div onMouseMove={onStageMove} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--accent)' }}>
          <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--ink)', opacity: inkOverlay }} />
          {/* per-project signal tints */}
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id} aria-hidden="true" style={{ position: 'absolute', inset: 0, background: p.accent, opacity: tints[i], mixBlendMode: 'screen' }} />
          ))}
          <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: gridOpacity, backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)', backgroundSize: '6vw 6vw' }} />
          <motion.div aria-hidden="true" className="dot-field" style={{ position: 'absolute', inset: 0, opacity: dotOpacity }} />

          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {BG.map((b, i) => <BgLetter key={i} {...b} y={py[i]} />)}
          </div>

          <DoorOutline scrollYProgress={scrollYProgress} r0={0.08} r1={0.34} baseW={240} h="86vh" />
          <DoorOutline scrollYProgress={scrollYProgress} r0={0.08} r1={0.32} baseW={300} h="92vh" />
          <DoorOutline scrollYProgress={scrollYProgress} r0={0.08} r1={0.30} baseW={360} h="98vh" />

          <motion.div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: 200, height: capH, scaleX: capScaleX, opacity: capOpacity, borderRadius: capRadius, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <motion.div style={{ scaleX: letterCounter, position: 'relative' }}>
              <motion.div className="font-display" style={{ position: 'absolute', inset: 0, x: echoX, opacity: echoOpacity, scale: workScale, color: 'var(--accent)', fontSize: 'min(14vh, 20vw)', lineHeight: 0.84, textAlign: 'center', letterSpacing: '-0.04em' }}>W<br />O<br />R<br />K</motion.div>
              <motion.div className="font-display" style={{ position: 'absolute', inset: 0, x: echoXNeg, opacity: echoOpacity, scale: workScale, color: 'var(--accent)', fontSize: 'min(14vh, 20vw)', lineHeight: 0.84, textAlign: 'center', letterSpacing: '-0.04em' }}>W<br />O<br />R<br />K</motion.div>
              <motion.div className="font-display" style={{ scale: workScale, opacity: workLetterOpacity, color: 'var(--accent)', fontSize: 'min(14vh, 20vw)', lineHeight: 0.84, textAlign: 'center', letterSpacing: '-0.04em', position: 'relative' }}>W<br />O<br />R<br />K</motion.div>
            </motion.div>
          </motion.div>

          <ProjectWindow project={PROJECTS[0]} scrollYProgress={scrollYProgress} range={ranges[0]} onOpen={onOpen} mx={mx} my={my} />
          <ProjectWindow project={PROJECTS[1]} scrollYProgress={scrollYProgress} range={ranges[1]} onOpen={onOpen} mx={mx} my={my} />
          <ProjectWindow project={PROJECTS[2]} scrollYProgress={scrollYProgress} range={ranges[2]} onOpen={onOpen} mx={mx} my={my} />

          <div style={{ position: 'absolute', bottom: 14, left: 18 }}><span className="u-label" style={{ color: 'var(--accent)', opacity: 0.6, mixBlendMode: 'difference' }}>03 — WORK / SIGNAL TUNNEL</span></div>
          <div style={{ position: 'absolute', bottom: 14, right: 18 }}><span className="u-label" style={{ color: 'var(--accent)', opacity: 0.6, mixBlendMode: 'difference' }}>SCROLL ↓</span></div>
        </div>
      )}
    </section>
  );
}
