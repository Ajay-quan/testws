import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from './hooks';

const POSTS = [
  {
    id: 'memory',
    index: '001',
    title: 'AI’s Defining Bottleneck Isn’t Intelligence. It’s Memory.',
    summary: 'Why the next leap in agent capability depends less on larger models and more on durable, evolving context.',
    image: '/writing/ai-memory.jpeg',
    href: 'https://substack.com/@ajayvarada/note/p-207923267?r=7lkpa&utm_source=notes-share-action&utm_medium=web',
    status: 'PUBLISHED',
  },
  {
    id: 'multi-agent',
    index: '002',
    title: 'Multi-Agent Systems Work Best When Agents Know Less',
    summary: 'A perspective on specialization, bounded context, and why capable agent teams should not all know everything.',
    image: '/writing/multi-agent-systems.jpeg',
    status: 'SCHEDULED',
  },
];

function WritingCard({ post, index, visible, reduced }) {
  const published = Boolean(post.href);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]), { stiffness: 160, damping: 22 });

  const handleMove = (event) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => { mx.set(0); my.set(0); };
  const content = (
    <motion.article
      data-testid={`writing-card-${post.id}`}
      className={`writing-card ${published ? 'is-published' : 'is-scheduled'}`}
      initial={reduced ? false : { opacity: 0, y: 72, clipPath: 'inset(0 0 18% 0)' }}
      animate={visible ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } : {}}
      transition={{ duration: 0.9, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
    >
      <div className="writing-card-top hairline-b">
        <span className="u-label">NOTE / {post.index}</span>
        <span className="u-label writing-status"><i aria-hidden="true" />{post.status}</span>
      </div>

      <div className="writing-image-wrap">
        <motion.img
          src={post.image}
          alt={`Preview artwork for “${post.title}”`}
          loading="lazy"
          width="1080"
          height="1350"
          whileHover={published && !reduced ? { scale: 1.025 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="writing-image-scan" aria-hidden="true" />
        <span className="writing-card-index font-display" aria-hidden="true">{post.index}</span>
      </div>

      <div className="writing-copy">
        <div>
          <span className="u-label writing-kicker">ESSAY · AI SYSTEMS</span>
          <h3 className="font-serif-ed">{post.title}</h3>
          <p>{post.summary}</p>
        </div>
        <div className="writing-action hairline-t">
          <span className="u-label">{published ? 'READ ON SUBSTACK' : 'PUBLICATION PENDING'}</span>
          <span className="font-serif-ed" aria-hidden="true">{published ? '↗' : '—'}</span>
        </div>
      </div>
    </motion.article>
  );

  return published ? (
    <a
      className="writing-link focus-ring"
      href={post.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      aria-label={`Read “${post.title}” on Substack`}
    >
      {content}
    </a>
  ) : (
    <div className="writing-link" aria-label={`“${post.title}” — scheduled, not yet published`}>
      {content}
    </div>
  );
}

export default function Writing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const reduced = usePrefersReducedMotion();

  return (
    <section id="writing" ref={ref} data-testid="writing-section" className="writing-section surface-accent hairline-b" style={{ scrollMarginTop: 92 }}>
      <div className="writing-heading hairline-b">
        <div className="writing-rail hairline-r">
          <span className="font-mono-u">WRITING</span>
          <span className="u-label">04—05</span>
        </div>
        <div className="writing-heading-copy">
          <span className="u-label">FIELD NOTES / AI SYSTEMS / IDEAS IN PROGRESS</span>
          <motion.h2
            className="font-display"
            initial={reduced ? false : { y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            THINKING<br /><em>IN PUBLIC.</em>
          </motion.h2>
          <p className="font-serif-ed">Notes on memory, multi-agent systems, and the engineering decisions behind useful AI.</p>
        </div>
      </div>

      <div className="writing-grid">
        {POSTS.map((post, index) => (
          <WritingCard key={post.id} post={post} index={index} visible={inView} reduced={reduced} />
        ))}
      </div>

      <style>{`
        .writing-section { position:relative; overflow:hidden; }
        .writing-heading { display:grid; grid-template-columns:64px 1fr; min-height:560px; }
        .writing-rail { display:flex; flex-direction:column; justify-content:space-between; align-items:center; padding:22px 0; }
        .writing-rail > span:first-child { writing-mode:vertical-rl; letter-spacing:.35em; font-size:14px; }
        .writing-rail > span:last-child { writing-mode:vertical-rl; opacity:.58; }
        .writing-heading-copy { padding:clamp(42px,6vw,86px) clamp(22px,5vw,76px); display:flex; flex-direction:column; justify-content:space-between; }
        .writing-heading h2 { overflow:hidden; font-size:clamp(82px,15vw,220px); line-height:.78; letter-spacing:-.055em; margin:48px 0 38px; }
        .writing-heading h2 em { font-family:'Fraunces',serif; font-weight:350; letter-spacing:-.06em; }
        .writing-heading-copy > p { max-width:660px; font-size:clamp(20px,2.3vw,34px); line-height:1.2; margin:0 0 0 auto; }
        .writing-grid { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--ink); }
        .writing-link { display:block; min-width:0; color:var(--ink); text-decoration:none; background:var(--accent); }
        .writing-card { min-height:100%; background:var(--accent); border:0; transform-style:preserve-3d; will-change:transform; }
        .writing-card-top { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; }
        .writing-status { display:flex; align-items:center; gap:8px; }
        .writing-status i { width:7px; height:7px; display:inline-block; background:var(--red); border-radius:50%; box-shadow:0 0 0 4px rgba(227,67,81,.13); }
        .is-scheduled .writing-status i { background:transparent; border:1px solid var(--ink); box-shadow:none; }
        .writing-image-wrap { position:relative; aspect-ratio:4/5; overflow:hidden; background:var(--ink); }
        .writing-image-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition:filter .5s ease; }
        .is-scheduled .writing-image-wrap img { filter:saturate(.72) contrast(.92); }
        .writing-image-scan { position:absolute; inset:0; pointer-events:none; background:linear-gradient(105deg,transparent 42%,rgba(242,236,227,.28) 50%,transparent 58%); transform:translateX(-120%); }
        .is-published:hover .writing-image-scan { animation:writing-scan 1.05s cubic-bezier(.16,1,.3,1); }
        @keyframes writing-scan { to { transform:translateX(120%); } }
        .writing-card-index { position:absolute; right:12px; bottom:-12px; color:var(--accent); font-size:clamp(70px,11vw,160px); line-height:.8; mix-blend-mode:difference; opacity:.88; }
        .writing-copy { display:flex; flex-direction:column; justify-content:space-between; min-height:330px; padding:28px 26px 0; }
        .writing-kicker { opacity:.58; }
        .writing-copy h3 { font-size:clamp(30px,3.4vw,54px); font-weight:350; line-height:1.02; letter-spacing:-.035em; margin:24px 0 18px; max-width:680px; }
        .writing-copy p { font-size:12px; line-height:1.75; max-width:570px; opacity:.7; margin:0 0 34px; }
        .writing-action { margin:0 -26px; padding:17px 20px; display:flex; align-items:center; justify-content:space-between; transition:background .38s ease,color .38s ease; }
        .writing-action span:last-child { font-size:26px; line-height:1; }
        .is-published:hover .writing-action { background:var(--ink); color:var(--accent); }
        .is-scheduled { opacity:.78; }
        .writing-link:focus-visible { outline:3px solid var(--red); outline-offset:-5px; }
        @media(max-width:720px){
          .writing-heading { grid-template-columns:40px 1fr; min-height:500px; }
          .writing-heading-copy { padding:38px 18px; }
          .writing-heading h2 { font-size:clamp(62px,21vw,90px); margin:68px 0 36px; }
          .writing-heading-copy > p { font-size:20px; margin-left:0; }
          .writing-grid { grid-template-columns:1fr; }
          .writing-copy { min-height:300px; padding:24px 20px 0; }
          .writing-copy h3 { font-size:34px; }
          .writing-copy p { font-size:13px; }
          .writing-action { margin:0 -20px; }
          .writing-card { transform:none!important; }
        }
        @media(prefers-reduced-motion:reduce){.writing-image-scan{display:none}.writing-card{transform:none!important}.writing-image-wrap img{transform:none!important}}
      `}</style>
    </section>
  );
}
