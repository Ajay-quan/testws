"use client";

import { useEffect, useState, useCallback } from 'react';
import './portfolio.css';

import Loader from '@/components/portfolio/Loader';
import Header from '@/components/portfolio/Header';
import HeroField from '@/components/portfolio/HeroField';
import HiringProof from '@/components/portfolio/HiringProof';
import About from '@/components/portfolio/About';
import Experience from '@/components/portfolio/Experience';
import Capabilities from '@/components/portfolio/Capabilities';
import WorkPortal from '@/components/portfolio/WorkPortal';
import Writing from '@/components/portfolio/Writing';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import ProjectOverlay from '@/components/portfolio/ProjectOverlay';

const VIEWS = {
  home: ['hero', 'proof', 'about'],
  work: ['work'],
  writing: ['writing'],
  profile: ['profileIntro', 'experience', 'capabilities'],
  contact: ['contactIntro', 'contact'],
};

function PageIntro({ eyebrow, title, italic, description }) {
  return (
    <section className="surface-accent hairline-b route-intro">
      <span className="u-label">{eyebrow}</span>
      <div>
        <h1 className="font-display">{title} {italic && <em>{italic}</em>}</h1>
        <p className="font-serif-ed">{description}</p>
      </div>
      <style>{`
        .route-intro{min-height:340px;padding:clamp(38px,6vw,78px) clamp(18px,4vw,58px);display:flex;flex-direction:column;justify-content:space-between}
        .route-intro>div{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(260px,.55fr);gap:40px;align-items:end}
        .route-intro h1{font-size:clamp(68px,12vw,188px);line-height:.8;letter-spacing:-.05em;margin:52px 0 0}
        .route-intro h1 em{font-family:'Fraunces',serif;font-weight:350}
        .route-intro p{font-size:clamp(18px,2vw,28px);line-height:1.25;margin:0}
        @media(max-width:720px){.route-intro{min-height:280px;padding:30px 16px}.route-intro>div{grid-template-columns:1fr;gap:20px}.route-intro h1{font-size:clamp(56px,18vw,78px);margin-top:38px}.route-intro p{font-size:16px}}
      `}</style>
    </section>
  );
}

function App({ view = 'home' }) {
  const [loaded, setLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    let raf;
    const tick = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? Math.min(100, Math.round((window.scrollY / h) * 100)) : 0;
      setScrollPct(pct);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const closeProject = useCallback((fromPop) => {
    setOpenProject(null);
    if (!fromPop && window.history.state && window.history.state.overlay) window.history.back();
  }, []);

  const visible = VIEWS[view] || VIEWS.home;

  return (
    <div className="App" style={{ background: 'var(--accent)' }}>
      <a href="#main" className="skip-link">SKIP TO CONTENT</a>
      {!loaded && view === 'home' && <Loader onDone={handleLoaded} />}
      <Header scrollPct={scrollPct} currentPage={view} />

      <main id="main">
        {visible.includes('hero') && <HeroField />}
        {visible.includes('proof') && <HiringProof />}
        {visible.includes('about') && <About />}
        {visible.includes('profileIntro') && <PageIntro eyebrow="PROFILE / EXPERIENCE" title="BUILDING" italic="USEFUL SYSTEMS." description="Production software engineering, applied machine learning, and the experience behind the work." />}
        {visible.includes('experience') && <Experience />}
        {visible.includes('capabilities') && <Capabilities />}
        {visible.includes('work') && <WorkPortal onOpen={setOpenProject} />}
        {visible.includes('writing') && <Writing />}
        {visible.includes('contactIntro') && <PageIntro eyebrow="CONTACT / OPPORTUNITIES" title="LET’S" italic="BUILD." description="Open to AI/ML and software engineering roles where ambitious ideas become reliable products." />}
        {visible.includes('contact') && <Contact />}
      </main>

      <Footer />

      {/* framed page border overlay */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 7, border: '1px solid var(--ink)', pointerEvents: 'none', zIndex: 110, mixBlendMode: 'normal' }} />

      <ProjectOverlay project={openProject} onClose={closeProject} />
    </div>
  );
}

export default App;
