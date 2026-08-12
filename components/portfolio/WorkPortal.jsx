import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from './hooks';

export const PROJECTS = [
  {
    id: 'aeg', title: 'STATEFUL.AI', serial: '#AEG1—0001/26', role: 'AI SYSTEMS ENGINEER', year: '2025—26',
    premise: 'Persistent memory infrastructure for long-running AI agents.',
    cover: '/projects/stateful-ai.png', media: ['/projects/stateful-ai.png'], accent: '#E34351',
    overview: 'An open-source memory system that lets agents store, retrieve, revise, and learn from long-lived context through REST and MCP interfaces.',
    challenge: 'Long-running agents need more than chat history: they need durable recall, contradiction handling, privacy controls, and retrieval that improves through use.',
    approach: 'Combined dense semantic search, BM25 and Reciprocal Rank Fusion with versioned memory lifecycle, reranking, PII redaction, and per-tenant continual learning.',
    contribution: 'Designed and implemented the layered API-to-adapter architecture, retrieval pipeline, lifecycle services, SDK, CLI, evaluation harnesses, and AWS deployment path.',
    outcome: 'Delivered a zero-infrastructure default with 135 passing tests and a benchmark reaching 0.9667 Recall@5 and 1.0 MRR.',
    metrics: [['RECALL@5', '0.9667'], ['MRR', '1.0'], ['TESTS', '135']],
    tech: ['Python', 'FastAPI', 'LangChain', 'MCP', 'FAISS', 'Vector DB', 'AWS'],
    externalLink: 'https://github.com/Ajay-quan/AegisMem',
  },
  {
    id: 'cv', title: 'VISION CONSOLE', serial: '#CV07—0002/25', role: 'COMPUTER VISION ENGINEER', year: '2025',
    premise: 'A browser-based laboratory for real-time computer vision experiments.',
    cover: '/projects/vision-console.png', media: ['/projects/vision-console.png'], accent: '#E6B94E',
    overview: 'A seven-module computer-vision control panel combining live camera workflows, classical vision, tracking, segmentation, and visual reports.',
    challenge: 'Bring camera calibration, image restoration, feature extraction, stitching, tracking, stereo measurement, and pose analysis into one coherent browser experience.',
    approach: 'Built a Flask interface around OpenCV pipelines with modular pages, live streams, reusable experiment controls, and recorded demonstrations.',
    contribution: 'Implemented the end-to-end web application, camera workflows, OpenCV modules, dashboard navigation, result views, and real-time demos.',
    outcome: 'Delivered a working visual laboratory with seven interactive modules spanning calibration, restoration, features, tracking, stereo vision, and pose.',
    metrics: [['MODULES', '07'], ['MODE', 'REAL-TIME'], ['STACK', 'CV + AI']],
    tech: ['Python', 'Flask', 'OpenCV', 'MediaPipe', 'SAM2', 'NumPy'],
    externalLink: 'https://github.com/Ajay-quan/ComputerVision_Fall2025',
  },
  {
    id: 'rm', title: 'RESEARCHMATCH', serial: '#RM05—0003/26', role: 'FULL-STACK ENGINEER', year: '2026',
    premise: 'An AI-assisted research opportunity and applicant-matching platform.',
    cover: '/projects/researchmatch.png', media: ['/projects/researchmatch.png'], accent: '#5FB6A8',
    overview: 'A full-stack application connecting students with faculty research projects through search, applications, and ranked matching.',
    challenge: 'Students struggle to discover relevant faculty work, while faculty need a consistent way to evaluate applicants across skills and interests.',
    approach: 'Built role-based student and faculty journeys around a five-factor SQL matching procedure, secure authentication, and project workflows.',
    contribution: 'Implemented the React client, Express API, MySQL schema, JWT authentication, matching logic, dashboards, milestones, and assignment management.',
    outcome: 'Produced a complete multi-role workflow from project discovery and application through ranked review and acceptance.',
    metrics: [['MATCHING', '5-FACTOR'], ['ROLES', '02'], ['FLOW', 'END-TO-END']],
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'Tailwind'],
    externalLink: 'https://github.com/Ajay-quan/DBS_Project',
  },
];

export default function WorkPortal({ onOpen }) {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="work" data-testid="work-section" className="surface-ink simple-work" style={{ scrollMarginTop: 76 }}>
      <div className="simple-work-heading hairline-b">
        <div>
          <span className="u-label">03 — SELECTED WORK</span>
          <h2 className="font-display">PROJECTS</h2>
        </div>
        <p className="font-serif-ed">Three systems spanning agent memory, computer vision, and full-stack product engineering.</p>
      </div>
      <div className="simple-work-grid">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.id}
            data-testid={`project-${project.id}`}
            className="simple-project"
            initial={reduced ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: .65, delay: index * .08, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" onClick={() => onOpen(project)} className="simple-project-button focus-ring" data-cursor="hover" aria-label={`Open ${project.title} case study`}>
              <div className="simple-project-meta hairline-b">
                <span className="u-label">{project.serial}</span><span className="u-label">{project.year}</span>
              </div>
              <div className="simple-project-image"><img src={project.cover} alt={`${project.title} interface`} loading="lazy" /></div>
              <div className="simple-project-copy hairline-t">
                <h3 className="font-display">{project.title}</h3>
                <p>{project.premise}</p>
                <span className="u-label">VIEW CASE STUDY ↗</span>
              </div>
            </button>
          </motion.article>
        ))}
      </div>
      <style>{`
        .simple-work { color:var(--accent); }
        .simple-work-heading { padding:clamp(38px,5vw,68px) clamp(20px,4vw,58px); border-color:var(--accent); display:grid; grid-template-columns:1.4fr minmax(280px,.6fr); gap:36px; align-items:end; }
        .simple-work-heading h2 { font-size:clamp(72px,13vw,190px); line-height:.78; letter-spacing:-.05em; margin:42px 0 0; }
        .simple-work-heading p { font-size:clamp(18px,2vw,28px); line-height:1.22; margin:0; }
        .simple-work-grid { display:grid; grid-template-columns:repeat(3,1fr); }
        .simple-project { min-width:0; border-right:1px solid var(--accent); }
        .simple-project:last-child { border-right:0; }
        .simple-project-button { width:100%; height:100%; padding:0; border:0; background:var(--ink); color:var(--accent); text-align:left; transition:background .32s ease,color .32s ease; }
        .simple-project-button:hover { background:var(--accent); color:var(--ink); }
        .simple-project-meta { height:42px; border-color:currentColor; padding:0 12px; display:flex; justify-content:space-between; align-items:center; }
        .simple-project-image { aspect-ratio:16/10; overflow:hidden; background:#1c1816; }
        .simple-project-image img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s cubic-bezier(.16,1,.3,1); }
        .simple-project-button:hover img { transform:scale(1.025); }
        .simple-project-copy { min-height:225px; border-color:currentColor; padding:20px; display:flex; flex-direction:column; }
        .simple-project-copy h3 { font-size:clamp(26px,3vw,44px); line-height:.9; margin:0 0 18px; }
        .simple-project-copy p { font-size:12px; line-height:1.6; margin:0 0 28px; max-width:360px; }
        .simple-project-copy .u-label { margin-top:auto; }
        @media(max-width:900px){.simple-work-grid{grid-template-columns:1fr}.simple-project{border-right:0;border-bottom:1px solid var(--accent)}.simple-project:last-child{border-bottom:0}.simple-project-button{display:grid;grid-template-columns:minmax(260px,.8fr) 1fr}.simple-project-meta{grid-column:1/-1}.simple-project-copy{border-top:0!important;border-left:1px solid currentColor}.simple-project-image{height:100%}}
        @media(max-width:640px){.simple-work-heading{grid-template-columns:1fr}.simple-work-heading h2{font-size:74px}.simple-project-button{display:block}.simple-project-copy{border-left:0;border-top:1px solid currentColor!important;min-height:190px}.simple-project-image{height:auto}}
      `}</style>
    </section>
  );
}
