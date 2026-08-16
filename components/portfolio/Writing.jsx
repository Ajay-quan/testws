import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from './hooks';
import InterfaceIcon from './InterfaceIcon';

// Add future posts here; the horizontal shelf expands automatically.
export const POSTS = [
  {
    id: 'memory',
    index: '001',
    title: 'AI’s Defining Bottleneck Isn’t Intelligence. It’s Memory.',
    image: '/writing/ai-memory.jpeg',
    href: 'https://substack.com/@ajayvarada/note/p-207923267?r=7lkpa&utm_source=notes-share-action&utm_medium=web',
    status: 'PUBLISHED',
  },
  {
    id: 'multi-agent',
    index: '002',
    title: 'Multi-Agent Systems Work Best When Agents Know Less',
    image: '/writing/multi-agent-systems.jpeg',
    href: 'https://substack.com/@ajayvarada/note/p-210856139?r=7lkpa&utm_source=notes-share-action&utm_medium=web',
    status: 'PUBLISHED',
  },
  {
    id: 'context-deletion',
    index: '003',
    title: 'The Best Context-Engineering Move Is Knowing What to Delete',
    image: '/writing/context-engineering-delete.jpeg',
    status: 'SCHEDULED',
  },
];

function WritingCard({ post, index, visible, reduced }) {
  const published = Boolean(post.href);
  const card = (
    <motion.article
      data-testid={`writing-card-${post.id}`}
      className={`writing-card ${published ? 'is-published' : 'is-scheduled'}`}
      initial={reduced ? false : { opacity: 0, y: 44 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="writing-card-top hairline-b">
        <span className="u-label">NOTE / {post.index}</span>
        <span className="u-label writing-status"><i aria-hidden="true" />{post.status}</span>
      </div>

      <div className="writing-poster">
        <picture>
          <source
            type="image/webp"
            srcSet={`/writing/${post.id}-390.webp 390w, /writing/${post.id}-780.webp 780w`}
            sizes="(max-width: 720px) 78vw, (max-width: 1440px) 27vw, 390px"
          />
          <motion.img
            src={post.image}
            alt={`Article card for “${post.title}” by Ajay Varada`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            width="1080"
            height="1350"
            whileHover={published && !reduced ? { scale: 1.018 } : undefined}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
        </picture>
        <span className="writing-sheen" aria-hidden="true" />
      </div>

      <div className="writing-card-foot hairline-t">
        <h3 className="font-serif-ed">{post.title}</h3>
        <div className="writing-action">
          <span className="u-label">{published ? 'READ' : 'COMING SOON'}</span>
          <span className="font-serif-ed" aria-hidden="true">{published ? <InterfaceIcon /> : '—'}</span>
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
      {card}
    </a>
  ) : (
    <div className="writing-link" aria-label={`“${post.title}” — scheduled, not yet published`}>
      {card}
    </div>
  );
}

export default function Writing() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (nextIndex) => {
    const index = Math.max(0, Math.min(POSTS.length - 1, nextIndex));
    const rail = railRef.current;
    const target = rail?.children[index];
    if (!rail || !target) return;
    rail.scrollTo({ left: target.offsetLeft - rail.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    setActiveIndex(index);
  };

  const syncIndex = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = [...rail.children];
    const next = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - rail.offsetLeft - rail.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity }).index;
    setActiveIndex(next);
  };

  const handleKeys = (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(activeIndex + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(activeIndex - 1); }
  };

  return (
    <section id="writing" ref={sectionRef} data-testid="writing-section" className="writing-section surface-accent hairline-b" style={{ scrollMarginTop: 92 }}>
      <div className="writing-intro hairline-b">
        <div>
          <span className="u-label">04 — FIELD NOTES / INQUIRY</span>
          <h2 className="font-display">LOOKING <em>CLOSER.</em></h2>
        </div>
        <p className="font-serif-ed">Research notes, technical explorations, and observations from an engineer curious about how complex systems really work.</p>
      </div>

      <div className="writing-toolbar hairline-b">
        <div className="writing-count" aria-live="polite">
          <span className="font-display">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="u-label">/ {String(POSTS.length).padStart(2, '0')} NOTES</span>
        </div>
        <div className="writing-controls" aria-label="Field notes carousel controls">
          <button type="button" className="focus-ring" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous article"><InterfaceIcon name="left" size={24} /></button>
          <button type="button" className="focus-ring" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === POSTS.length - 1} aria-label="Next article"><InterfaceIcon name="right" size={24} /></button>
        </div>
      </div>

      <div
        ref={railRef}
        className="writing-rail"
        role="region"
        aria-label="Ajay Varada’s field notes"
        tabIndex={0}
        onScroll={syncIndex}
        onKeyDown={handleKeys}
      >
        {POSTS.map((post, index) => (
          <WritingCard key={post.id} post={post} index={index} visible={inView} reduced={reduced} />
        ))}
      </div>

      <div className="writing-progress" aria-hidden="true">
        <motion.span animate={{ scaleX: (activeIndex + 1) / POSTS.length }} transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }} />
      </div>

      <style>{`
        .writing-section { position:relative; overflow:hidden; }
        .writing-intro { min-height:300px; padding:clamp(36px,5vw,66px) clamp(20px,4vw,60px); display:grid; grid-template-columns:minmax(0,1.65fr) minmax(280px,.7fr); gap:40px; align-items:end; }
        .writing-intro h2 { font-size:clamp(62px,9vw,138px); line-height:.82; letter-spacing:-.05em; margin:44px 0 0; }
        .writing-intro h2 em { font-family:'Fraunces',serif; font-weight:350; }
        .writing-intro p { font-size:clamp(18px,2vw,28px); line-height:1.2; margin:0; max-width:520px; }
        .writing-toolbar { height:72px; display:flex; align-items:stretch; justify-content:space-between; }
        .writing-count { height:100%; display:flex; align-items:center; gap:8px; padding:0 22px; }
        .writing-count .font-display { font-size:36px; line-height:1; }
        .writing-count .u-label { display:flex; align-items:center; line-height:1; }
        .writing-controls { min-width:144px; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); align-items:center; justify-items:center; gap:6px; padding:6px; box-sizing:border-box; overflow:hidden; }
        .writing-controls button { width:60px; height:60px; min-width:0; display:grid; place-items:center; padding:0; box-sizing:border-box; border:0; background:transparent; color:var(--ink); font-size:25px; transition:background .25s ease,color .25s ease,opacity .25s ease,transform .25s ease; }
        .writing-controls button:not(:disabled):hover { background:var(--inverse-surface-bg); color:var(--inverse-fg); }
        .writing-controls button:disabled { opacity:.2; }
        .writing-rail { display:grid; grid-auto-flow:column; grid-auto-columns:clamp(300px,27vw,390px); gap:18px; overflow-x:auto; overscroll-behavior-x:contain; scroll-snap-type:x mandatory; scroll-padding-inline:clamp(18px,5vw,72px); padding:30px clamp(18px,5vw,72px) 34px; scrollbar-width:none; touch-action:pan-x pan-y; }
        .writing-rail::-webkit-scrollbar { display:none; }
        .writing-link { display:block; min-width:0; align-self:start; color:var(--ink); text-decoration:none; background:var(--accent); scroll-snap-align:start; }
        .writing-card { background:var(--accent); border:1px solid var(--ink); min-height:100%; transition:transform .45s cubic-bezier(.16,1,.3,1),box-shadow .45s cubic-bezier(.16,1,.3,1),opacity .35s ease; }
        .writing-card-top { height:42px; display:flex; align-items:center; justify-content:space-between; padding:0 12px; }
        .writing-status { display:flex; align-items:center; gap:7px; }
        .writing-status i { width:6px; height:6px; display:inline-block; background:var(--red); border-radius:50%; box-shadow:0 0 0 3px rgba(227,67,81,.13); }
        .is-scheduled .writing-status i { background:transparent; border:1px solid var(--ink); box-shadow:none; }
        .writing-poster { position:relative; aspect-ratio:4/5; overflow:hidden; background:var(--ink); }
        .writing-poster picture { display:block; width:100%; height:100%; }
        .writing-poster img { width:100%; height:100%; object-fit:cover; display:block; }
        .is-scheduled .writing-poster img { filter:saturate(.75) contrast(.94); }
        .writing-sheen { position:absolute; inset:0; pointer-events:none; background:linear-gradient(110deg,transparent 42%,rgba(242,236,227,.22) 50%,transparent 58%); transform:translateX(-120%); }
        .is-published:hover .writing-sheen { animation:writing-scan .95s cubic-bezier(.16,1,.3,1); }
        @keyframes writing-scan { to { transform:translateX(120%); } }
        .writing-card-foot { min-height:118px; padding:14px; display:grid; grid-template-columns:1fr auto; gap:12px; align-items:end; }
        .writing-card-foot h3 { font-size:clamp(17px,1.55vw,22px); font-weight:400; line-height:1.08; letter-spacing:-.025em; margin:0; }
        .writing-action { display:flex; flex-direction:column; align-items:flex-end; gap:8px; }
        .writing-action span:last-child { font-size:22px; line-height:1; }
        .is-scheduled { opacity:.72; }
        .is-published:hover { transform:translateY(-7px); box-shadow:8px 8px 0 var(--inverse-bg); }
        .writing-link:focus-visible { outline:3px solid var(--red); outline-offset:4px; }
        .writing-rail:focus-visible { outline:2px solid var(--red); outline-offset:-4px; }
        .writing-progress { height:3px; background:var(--grid-line); }
        .writing-progress span { display:block; width:100%; height:100%; background:var(--ink); transform-origin:left; }
        @media(max-width:720px){
          .writing-intro { min-height:auto; grid-template-columns:1fr; gap:18px; padding:30px 16px 28px; }
          .writing-intro h2 { font-size:clamp(52px,16vw,68px); margin-top:32px; }
          .writing-intro p { font-size:16px; line-height:1.3; }
          .writing-toolbar { height:62px; }
          .writing-count { padding:0 16px; }
          .writing-count .font-display { font-size:30px; }
          .writing-controls { min-width:124px; grid-template-columns:repeat(2,minmax(0,1fr)); gap:4px; padding:5px; }
          .writing-controls button { width:50px; height:50px; }
          .writing-rail { grid-auto-columns:min(78vw,300px); gap:12px; padding:16px 14px 22px; scroll-padding-inline:14px; }
          .writing-card-foot { min-height:110px; }
          .writing-card-foot h3 { font-size:18px; }
          .is-published:hover { transform:none; box-shadow:none; }
        }
        @media(prefers-reduced-motion:reduce){.writing-sheen{display:none}.writing-card{transition:none}.writing-poster img{transform:none!important}}
      `}</style>
    </section>
  );
}
