import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useIsCompact, usePrefersReducedMotion } from './hooks';
import InterfaceIcon from './InterfaceIcon';

export const PROJECTS = [
  {
    id: 'aeg', title: 'STATEFUL.AI', role: 'AI SYSTEMS ENGINEER', year: '2025—26', status: 'OPEN SOURCE · INDEPENDENT', proof: '0.9667 RECALL@5 · 135 TESTS',
    premise: 'A self-improving persistent memory layer for long-running LLM agents.',
    cover: '/projects/stateful-ai.png', media: ['/projects/stateful-ai.png'], side: -1, accent: '#E34351', coverScale: 1.08, coverPosition: '50% 43%', visualLabel: 'MEMORY SYSTEM / PRODUCT INTERFACE',
    overview: 'An open-source memory system that lets agents store, retrieve, revise, and learn from long-lived context through REST and MCP interfaces.',
    challenge: 'Long-running agents need more than chat history: they need durable recall, contradiction handling, privacy controls, and retrieval that improves through use.',
    approach: 'Combined dense semantic search, BM25 and Reciprocal Rank Fusion with versioned memory lifecycle, reranking, PII redaction, and per-tenant continual learning.',
    contribution: 'Designed and implemented the layered API-to-adapter architecture, retrieval pipeline, lifecycle services, SDK, CLI, evaluation harnesses, and AWS deployment path.',
    outcome: 'Delivered a zero-infrastructure default with 135 passing tests and a benchmark reaching 0.9667 Recall@5 and 1.0 MRR.',
    caseStudy: [
      { title: 'THE ENGINEERING PROBLEM', summary: 'Chat history is not durable agent memory. The system had to preserve useful context across long-running sessions without turning every prior interaction into prompt noise.', points: [['State integrity', 'Represented memory as a versioned lifecycle—create, retrieve, revise, supersede, and delete—rather than an append-only transcript.'], ['Safety boundary', 'Added PII redaction and tenant-aware isolation before memories enter retrieval paths.']] },
      { title: 'RETRIEVAL ARCHITECTURE', summary: 'The retrieval path combines complementary signals instead of betting on a single vector score.', points: [['Hybrid search', 'Dense semantic retrieval and BM25 lexical retrieval are fused with Reciprocal Rank Fusion, then reranked for final relevance.'], ['Interoperability', 'REST, MCP, SDK, and CLI surfaces share the same service layer so agent integrations do not duplicate memory logic.']] },
      { title: 'WHAT MADE IT DIFFERENT', summary: 'AegisMem treats memory quality as a system that can improve through use—not a static vector database wrapper.', points: [['Learning loop', 'Per-tenant feedback can refine retrieval behavior while keeping adapter boundaries replaceable.'], ['Zero-infrastructure default', 'A local-first path makes the system immediately testable, while adapters preserve a route to managed vector storage and AWS deployment.']] },
      { title: 'VALIDATION', summary: 'Evaluation was built into the product rather than added after implementation.', points: [['Quality', 'Benchmark results reached 0.9667 Recall@5 and 1.0 MRR on the project evaluation path.'], ['Reliability', '135 passing tests cover retrieval, lifecycle behavior, interfaces, and supporting services.']] },
    ],
    metrics: [['RECALL@5', '0.9667'], ['MRR', '1.0'], ['TESTS', '135']],
    tech: ['Python', 'FastAPI', 'LangChain', 'MCP', 'FAISS', 'Vector DB', 'AWS'],
    externalLink: 'https://github.com/Ajay-quan/AegisMem',
  },
  {
    id: 'cv', title: 'VISION CONSOLE', role: 'COMPUTER VISION ENGINEER', year: '2025', status: 'OPEN SOURCE · ACADEMIC', proof: '7 MODULES · REAL-TIME CV',
    premise: 'A browser-based laboratory for real-time vision experiments and analysis.',
    cover: '/projects/vision-console-stereo.jpg', media: ['/projects/vision-console-stereo.jpg', '/projects/vision-console.png'], side: 1, accent: '#E6B94E', coverScale: 1.08, coverPosition: '50% 50%', visualLabel: 'STEREO VISION / DEPTH LAB',
    overview: 'A seven-module computer-vision control panel combining live camera workflows, classical vision, tracking, segmentation, and visual reports.',
    challenge: 'Bring camera calibration, image restoration, feature extraction, stitching, tracking, stereo measurement, and pose analysis into one coherent browser experience.',
    approach: 'Built a Flask interface around OpenCV pipelines with modular pages, live streams, reusable experiment controls, and recorded demonstrations.',
    contribution: 'Implemented the end-to-end web application, camera workflows, OpenCV modules, dashboard navigation, result views, and real-time demos.',
    outcome: 'Delivered a working visual laboratory with seven interactive modules spanning calibration, restoration, features, tracking, stereo vision, and pose.',
    caseStudy: [
      { title: 'THE ENGINEERING PROBLEM', summary: 'Computer-vision coursework often becomes a collection of disconnected scripts. The goal was one usable browser laboratory that could operate cameras, expose parameters, and communicate results consistently.', points: [['Breadth', 'Unified calibration, restoration, feature extraction, stitching, tracking, stereo measurement, and pose analysis in one navigation model.'], ['Runtime state', 'Separated camera and stream lifecycle from module-specific processing so live workflows could be started, changed, and stopped predictably.']] },
      { title: 'PIPELINE DESIGN', summary: 'Flask coordinates the browser experience while modular Python pipelines own the image-processing work.', points: [['Reusable controls', 'Each module follows a shared input → parameter → processing → result structure instead of inventing a new interaction pattern.'], ['Real-time path', 'OpenCV frames move through selectable tracking modes, including ArUco markers, optical-flow-style markerless tracking, and SAM2 segmentation playback.']] },
      { title: 'WHAT MADE IT DIFFERENT', summary: 'The project combines classical geometry and modern learned vision behind one coherent control panel.', points: [['Mixed methods', 'OpenCV, MediaPipe, and SAM2 coexist without hiding which algorithm is responsible for each result.'], ['Inspectable output', 'Visual reports and recorded demonstrations make intermediate behavior observable—not just the final prediction.']] },
      { title: 'DELIVERY', summary: 'The finished application contains seven working modules with shared navigation, result views, live demonstrations, and project-level visual documentation.', points: [['Coverage', 'The system spans camera calibration through real-time tracking and pose analysis.'], ['Ownership', 'Implemented the web interface, vision pipelines, camera workflows, navigation, and demonstration surfaces end to end.']] },
    ],
    metrics: [['MODULES', '07'], ['MODE', 'REAL-TIME'], ['STACK', 'CV + AI']],
    tech: ['Python', 'Flask', 'OpenCV', 'MediaPipe', 'SAM2', 'NumPy'],
    externalLink: 'https://github.com/Ajay-quan/ComputerVision_Fall2025',
  },
  {
    id: 'rm', title: 'RESEARCHMATCH', role: 'FULL-STACK ENGINEER', year: '2026', status: 'OPEN SOURCE · ACADEMIC', proof: '5-FACTOR MATCHING · 2 ROLES',
    premise: 'A university research-opportunity platform with intelligent applicant matching.',
    cover: '/projects/researchmatch.png', media: ['/projects/researchmatch.png'], side: -1, accent: '#5FB6A8', coverScale: 1.32, coverPosition: '50% 50%', visualLabel: 'MATCHING PLATFORM / ROLE ACCESS',
    overview: 'A full-stack application connecting students with faculty research projects through search, applications, and ranked matching.',
    challenge: 'Students struggle to discover relevant faculty work, while faculty need a consistent way to evaluate applicants across skills and interests.',
    approach: 'Built role-based student and faculty journeys around a five-factor SQL matching procedure, secure authentication, and project workflows.',
    contribution: 'Implemented the React client, Express API, MySQL schema, JWT authentication, matching logic, dashboards, milestones, and assignment management.',
    outcome: 'Produced a complete multi-role workflow from project discovery and application through ranked review and acceptance.',
    caseStudy: [
      { title: 'THE ENGINEERING PROBLEM', summary: 'Research discovery has two different users: students need relevant opportunities, while faculty need structured evidence for reviewing applicants.', points: [['Two-sided workflow', 'Designed separate student and faculty journeys without splitting the product into disconnected applications.'], ['Data consistency', 'Applications, projects, milestones, assignments, and decisions share one relational source of truth.']] },
      { title: 'MATCHING SYSTEM', summary: 'A five-factor SQL procedure converts applicant and project evidence into a ranked review signal.', points: [['Explainable ranking', 'The matching path is based on explicit database factors rather than an opaque recommendation score.'], ['Workflow integration', 'Ranking sits inside the faculty review flow, alongside applicant context and project state.']] },
      { title: 'SYSTEM ARCHITECTURE', summary: 'The React client communicates with an Express API backed by MySQL and protected with JWT authentication.', points: [['Role security', 'Authorization separates student and faculty actions at the API boundary, not only in the interface.'], ['End-to-end state', 'The schema supports discovery, application, review, acceptance, milestones, and assignment management.']] },
      { title: 'DELIVERY', summary: 'The result is a complete multi-role product rather than a standalone matching demo.', points: [['Full-stack ownership', 'Implemented the client, API, authentication, relational schema, matching procedure, dashboards, and management flows.'], ['Product outcome', 'Both users can move from discovery to a recorded decision through one consistent system.']] },
    ],
    metrics: [['MATCHING', '5-FACTOR'], ['ROLES', '02'], ['FLOW', 'END-TO-END']],
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'Tailwind'],
    externalLink: 'https://github.com/Ajay-quan/DBS_Project',
  },
];

function ProjectWindow({ project, scrollYProgress, range, onOpen, reduced, compact, mx, my }) {
  const [revealed, setRevealed] = useState(false);
  const [r0, r1] = range;
  const mid = (r0 + r1) / 2;
  const side = project.side;
  const rot = side * (compact ? 0.2 : 0.55);
  const accent = project.accent;

  const p1 = r0 + (r1 - r0) * .24;
  const p2 = r0 + (r1 - r0) * .7;
  const y = useTransform(scrollYProgress, [r0, p1, p2, r1], [compact ? '30vh' : '38vh', '0vh', '0vh', compact ? '-36vh' : '-46vh']);
  const scale = useTransform(scrollYProgress, [r0, p1, p2, r1], [compact ? 0.84 : 0.7, 1, 1, compact ? 1.04 : 1.08]);
  const opacity = useTransform(scrollYProgress, [r0, r0 + 0.018, r1 - 0.045, r1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [r0, p1, p2, r1], [`${side * (compact ? 1 : 4)}vw`, '0vw', '0vw', `${side * (compact ? -1 : -2)}vw`]);
  const zIndex = useTransform(scale, (s) => Math.round(s * 100));

  // dominance = how close to the viewer this window is (1 near center)
  const dominance = useTransform(scale, (s) => Math.max(0, Math.min(1, (s - 0.7) / 0.4)));
  // cursor-reactive parallax tilt, only meaningful while dominant
  const rotY = useTransform([mx, dominance], ([m, d]) => (m || 0) * (compact ? 1.5 : 5) * d);
  const rotX = useTransform([my, dominance], ([m, d]) => -(m || 0) * (compact ? 1 : 3.5) * d);

  return (
    <motion.article
      data-testid={`project-${project.id}`}
      style={reduced ? { position: 'relative', margin: '0 auto 40px', maxWidth: 760, width: '90%' } : {
        position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%',
        y, x, scale, opacity, rotate: rot, zIndex, rotateX: rotX, rotateY: rotY,
        transformPerspective: 900, width: compact ? '92vw' : 'min(720px, 86vw)', willChange: 'transform',
      }}
    >
      <div
        className="hairline"
        data-cursor="hover"
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        style={{ background: 'var(--inverse-bg)', boxShadow: `12px 12px 0 rgba(0,0,0,0.28)`, position: 'relative', borderColor: 'var(--line)' }}
      >
        <div className="surface-accent hairline-b" style={{ borderColor: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 8, height: 8, background: accent }} />
            <span style={{ width: 8, height: 8, border: '1px solid var(--ink)' }} />
            <span style={{ width: 8, height: 8, border: '1px solid var(--ink)' }} />
          </div>
          <span className="u-label" style={{ opacity: 0.7 }}>{project.status}</span>
        </div>

        <div className="project-visual" style={{ '--project-accent': accent, position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: '#06152d' }}>
          <motion.img
            src={project.cover}
            alt={`${project.title} real project interface`}
            loading="lazy"
            animate={{ scale: revealed ? project.coverScale * 1.025 : project.coverScale }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: project.coverPosition, display: 'block' }}
          />
          <div className="project-visual-tone" aria-hidden="true" />
          <div className="project-visual-meta" aria-hidden="true">
            <span className="u-label">{project.visualLabel}</span>
            <span className="u-label">FIG.0{PROJECTS.findIndex((item) => item.id === project.id) + 1}</span>
          </div>
          <motion.div
            aria-hidden={!revealed}
            initial={false}
            animate={{ clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0, background: 'var(--inverse-bg)', color: 'var(--inverse-fg)', padding: '9% 8%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <p className="font-serif-ed" style={{ fontSize: 'clamp(16px, 2.2vw, 26px)', lineHeight: 1.4, margin: 0, fontWeight: 350 }}>{project.premise}</p>
            <button data-testid={`open-${project.id}`} data-cursor="hover" className="focus-ring icon-link" onClick={() => onOpen(project)}
              style={{ alignSelf: 'flex-start', background: 'transparent', border: `1px solid ${accent}`, color: accent, padding: '10px 16px', fontSize: 11, letterSpacing: '0.14em' }}>
              VIEW CASE STUDY <InterfaceIcon />
            </button>
          </motion.div>
        </div>

        <div className="hairline-t surface-accent" style={{ borderColor: 'var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 5 }}><span className="font-display" style={{ fontSize: 'clamp(18px, 2.6vw, 30px)', letterSpacing: '-0.02em' }}>{project.title}</span><span className="u-label" style={{ opacity: .58 }}>{project.proof}</span></span>
          <button data-testid={`tap-${project.id}`} data-cursor="hover" className="focus-ring icon-link" onClick={() => onOpen(project)} aria-label={`Open ${project.title}`}
            style={{ background: 'transparent', border: '1px solid var(--ink)', color: 'var(--ink)', padding: '6px 10px', fontSize: 10, letterSpacing: '0.1em' }}>
            CASE STUDY <InterfaceIcon />
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
  const op = useTransform(scrollYProgress, [r1, r1 + 0.06], [1, 0]);
  return (
    <motion.div aria-hidden="true" style={{
      position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%',
      width: baseW, height: h, scaleX: sx, opacity: op, border: '1px solid var(--ink)', borderRadius: 200,
    }} />
  );
}

export default function WorkPortal({ onOpen }) {
  const reduced = usePrefersReducedMotion();
  const compact = useIsCompact();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onStageMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const gridOpacity = useTransform(scrollYProgress, [0, 0.12, 0.21], [1, 1, 0]);
  const inkOverlay = useTransform(scrollYProgress, [0.11, 0.22], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.19, 0.28], [0, 0.12]);
  const exploreOpacity = useTransform(scrollYProgress, [0, 0.09, 0.17], [1, 1, 0]);

  const scrollToProjects = () => {
    if (!ref.current) return;
    const sectionTop = window.scrollY + ref.current.getBoundingClientRect().top;
    window.scrollTo({ top: sectionTop + ref.current.offsetHeight * .23, behavior: reduced ? 'auto' : 'smooth' });
  };

  const capScaleX = useTransform(scrollYProgress, [0, 0.035, 0.18], [1, 1, 22]);
  const capH = useTransform(scrollYProgress, [0, 0.18], ['78vh', '108vh']);
  const capRadius = useTransform(scrollYProgress, [0.035, 0.18], [200, 0]);
  const capOpacity = useTransform(scrollYProgress, [0.17, 0.22], [1, 0]);
  const letterCounter = useTransform(capScaleX, (v) => 1 / v);
  const workScale = useTransform(scrollYProgress, [0, 0.035, 0.17], [1, 1.08, 1.55]);
  const workLetterOpacity = useTransform(scrollYProgress, [0.16, 0.21], [1, 0]);
  const echoX = useTransform(scrollYProgress, [0.035, 0.18], [0, 42]);
  const echoXNeg = useTransform(echoX, (v) => -v);
  const echoOpacity = useTransform(scrollYProgress, [0.035, 0.1, 0.18], [0, 0.32, 0]);

  const py0 = useTransform(scrollYProgress, [0.27, 1], [140 * BG[0].depth, -180 * BG[0].depth]);
  const py1 = useTransform(scrollYProgress, [0.27, 1], [140 * BG[1].depth, -180 * BG[1].depth]);
  const py2 = useTransform(scrollYProgress, [0.27, 1], [140 * BG[2].depth, -180 * BG[2].depth]);
  const py3 = useTransform(scrollYProgress, [0.27, 1], [140 * BG[3].depth, -180 * BG[3].depth]);
  const py4 = useTransform(scrollYProgress, [0.27, 1], [140 * BG[4].depth, -180 * BG[4].depth]);
  const py5 = useTransform(scrollYProgress, [0.27, 1], [140 * BG[5].depth, -180 * BG[5].depth]);
  const py = [py0, py1, py2, py3, py4, py5];

  // per-project stage tint (peaks while that project is dominant)
  const ranges = [[0.2, 0.47], [0.4, 0.69], [0.62, 0.92]];
  const tint0 = useTransform(scrollYProgress, [ranges[0][0], (ranges[0][0] + ranges[0][1]) / 2, ranges[0][1]], [0, 0.09, 0]);
  const tint1 = useTransform(scrollYProgress, [ranges[1][0], (ranges[1][0] + ranges[1][1]) / 2, ranges[1][1]], [0, 0.09, 0]);
  const tint2 = useTransform(scrollYProgress, [ranges[2][0], (ranges[2][0] + ranges[2][1]) / 2, ranges[2][1]], [0, 0.09, 0]);
  const tints = [tint0, tint1, tint2];

  return (
    <section id="work" ref={ref} data-testid="work-section" style={{ position: 'relative', height: reduced ? 'auto' : compact ? '310vh' : '350vh', scrollMarginTop: compact ? 72 : 76 }}>
      {reduced ? (
        <div className="surface-ink" style={{ padding: '60px 18px' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(60px,18vw,240px)', color: 'var(--accent)', margin: '0 0 40px', letterSpacing: '-0.05em' }}>WORK</h2>
          {PROJECTS.map((p) => (
            <ProjectWindow key={p.id} project={p} scrollYProgress={scrollYProgress} range={[0, 1]} onOpen={onOpen} reduced compact={compact} mx={mx} my={my} />
          ))}
        </div>
      ) : (
        <div onMouseMove={onStageMove} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--accent)' }}>
          <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--inverse-bg)', opacity: inkOverlay }} />
          {/* per-project signal tints */}
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id} aria-hidden="true" style={{ position: 'absolute', inset: 0, background: p.accent, opacity: tints[i], mixBlendMode: 'screen' }} />
          ))}
          <motion.div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: gridOpacity, backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)', backgroundSize: '6vw 6vw' }} />
          <motion.div aria-hidden="true" className="dot-field" style={{ position: 'absolute', inset: 0, opacity: dotOpacity }} />

          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {BG.map((b, i) => <BgLetter key={i} {...b} y={py[i]} />)}
          </div>

          <DoorOutline scrollYProgress={scrollYProgress} r0={0.035} r1={0.18} baseW={240} h="86vh" />
          <DoorOutline scrollYProgress={scrollYProgress} r0={0.035} r1={0.165} baseW={300} h="92vh" />
          <DoorOutline scrollYProgress={scrollYProgress} r0={0.035} r1={0.15} baseW={360} h="98vh" />

          <motion.div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: 200, height: capH, scaleX: capScaleX, opacity: capOpacity, borderRadius: capRadius, background: 'var(--inverse-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <motion.div style={{ scaleX: letterCounter, position: 'relative' }}>
              <motion.div className="font-display" style={{ position: 'absolute', inset: 0, x: echoX, opacity: echoOpacity, scale: workScale, color: 'var(--inverse-fg)', fontSize: 'min(14vh, 20vw)', lineHeight: 0.84, textAlign: 'center', letterSpacing: '-0.04em' }}>W<br />O<br />R<br />K</motion.div>
              <motion.div className="font-display" style={{ position: 'absolute', inset: 0, x: echoXNeg, opacity: echoOpacity, scale: workScale, color: 'var(--inverse-fg)', fontSize: 'min(14vh, 20vw)', lineHeight: 0.84, textAlign: 'center', letterSpacing: '-0.04em' }}>W<br />O<br />R<br />K</motion.div>
              <motion.div className="font-display" style={{ scale: workScale, opacity: workLetterOpacity, color: 'var(--inverse-fg)', fontSize: 'min(14vh, 20vw)', lineHeight: 0.84, textAlign: 'center', letterSpacing: '-0.04em', position: 'relative' }}>W<br />O<br />R<br />K</motion.div>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className="work-scroll-explore focus-ring icon-link u-label"
            style={{ opacity: exploreOpacity }}
            onClick={scrollToProjects}
            data-cursor="hover"
            aria-label="Scroll to explore selected projects"
          >
            SCROLL TO EXPLORE <InterfaceIcon name="down" />
          </motion.button>

          <ProjectWindow project={PROJECTS[0]} scrollYProgress={scrollYProgress} range={ranges[0]} onOpen={onOpen} compact={compact} mx={mx} my={my} />
          <ProjectWindow project={PROJECTS[1]} scrollYProgress={scrollYProgress} range={ranges[1]} onOpen={onOpen} compact={compact} mx={mx} my={my} />
          <ProjectWindow project={PROJECTS[2]} scrollYProgress={scrollYProgress} range={ranges[2]} onOpen={onOpen} compact={compact} mx={mx} my={my} />

          <div style={{ position: 'absolute', bottom: 14, left: 18 }}><span className="u-label" style={{ color: 'var(--accent)', opacity: 0.6, mixBlendMode: 'difference' }}>03 — SELECTED WORK · 3 PROJECTS</span></div>
          <div style={{ position: 'absolute', bottom: 14, right: 18 }}><span className="u-label icon-link" style={{ color: 'var(--accent)', opacity: 0.6, mixBlendMode: 'difference' }}>SCROLL <InterfaceIcon name="down" /></span></div>
        </div>
      )}
      <style>{`
        .project-visual>img{filter:saturate(.72) contrast(1.14) brightness(.96)}
        .project-visual-tone{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(4,18,42,.04) 35%,rgba(4,18,42,.82) 100%),linear-gradient(125deg,color-mix(in srgb,var(--project-accent) 14%,transparent),transparent 42%);box-shadow:inset 0 0 0 1px rgba(197,217,243,.16)}
        .project-visual-meta{position:absolute;left:12px;right:12px;bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;color:#eef4ff;text-shadow:0 1px 8px rgba(0,0,0,.55)}
        .project-visual-meta span:first-child{color:color-mix(in srgb,var(--project-accent) 72%,#eef4ff)}
        html[data-theme='dark'] .project-visual>img{filter:saturate(.68) contrast(1.18) brightness(.88)}
        .work-scroll-explore{position:absolute;left:50%;bottom:58px;z-index:80;translate:-50% 0;display:flex;align-items:center;justify-content:center;gap:9px;min-height:46px;padding:0 20px;border:1px solid color-mix(in srgb,var(--ink) 22%,transparent)!important;border-radius:999px;color:var(--ink);background:color-mix(in srgb,var(--glass-fill-strong) 42%,transparent)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.62),0 10px 28px rgba(4,18,42,.12)!important;-webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%);white-space:nowrap;cursor:pointer}
        .work-scroll-explore:hover{transform:translateY(-2px)}
        @media(max-width:720px){
          #work { height:270svh!important; }
          #work > div[style*="position: sticky"] { height:100svh!important; }
          #work article { width:calc(100vw - 28px)!important; }
          #work article > div { box-shadow:6px 6px 0 rgba(17,9,8,.45)!important; }
          #work article > div > div:nth-child(2) { aspect-ratio:4 / 3!important; }
          #work article > div > div:last-child { padding:9px 10px!important; gap:8px; }
          #work article > div > div:last-child .font-display { font-size:21px!important; line-height:1; }
          #work article > div > div:last-child .u-label { font-size:7px!important; line-height:1.35; letter-spacing:.07em; }
          #work article > div > div:last-child button { min-height:38px; padding:6px 8px!important; flex:0 0 auto; }
          #work article [aria-hidden] p { font-size:16px!important; line-height:1.28!important; }
          #work article [aria-hidden] button { min-height:44px; }
          .project-visual-meta{left:8px;right:8px;bottom:7px}.project-visual-meta .u-label{font-size:6px!important}
          .work-scroll-explore{bottom:48px;min-height:44px;padding:0 16px;font-size:7px}
          #work > div > div:last-child .u-label { font-size:8px; }
        }
        @media(max-width:360px){
          #work article > div > div:last-child .u-label { display:none; }
        }
      `}</style>
    </section>
  );
}
