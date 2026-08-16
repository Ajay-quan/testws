"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const appRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [activeView, setActiveView] = useState(view);
  const [theme, setTheme] = useState('light');
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

  useEffect(() => {
    const root = appRef.current;
    const precisePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || !precisePointer || reducedMotion) return undefined;

    let frame;
    const moveLight = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--glass-x', `${event.clientX}px`);
        root.style.setProperty('--glass-y', `${event.clientY}px`);
      });
    };
    window.addEventListener('pointermove', moveLight, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', moveLight);
    };
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const next = saved === 'dark' || saved === 'light' ? saved : preferred;
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem('portfolio-theme', next);
      return next;
    });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'home';
      setActiveView(VIEWS[path] ? path : 'home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const closeProject = useCallback((fromPop) => {
    setOpenProject(null);
    if (!fromPop && window.history.state && window.history.state.overlay) window.history.back();
  }, []);

  const visible = VIEWS[activeView] || VIEWS.home;
  const changePage = useCallback((target, href, event) => {
    if (!VIEWS[target]) return;
    event?.preventDefault();
    if (target === activeView) return;
    window.history.pushState({ portfolioView: target }, '', href);
    setOpenProject(null);
    setActiveView(target);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  return (
    <div ref={appRef} className="App" style={{ background: 'var(--accent)' }}>
      <a href="#main" className="skip-link">SKIP TO CONTENT</a>
      {!loaded && activeView === 'home' && <Loader onDone={handleLoaded} />}
      <Header scrollPct={scrollPct} currentPage={activeView} onPageChange={changePage} theme={theme} onThemeToggle={toggleTheme} />

      <div className="portfolio-browser-bar surface-accent hairline-b" aria-hidden="true">
        <span className="browser-controls"><i /><i /><i /></span>
        <span className="u-label">AJAY.PORTFOLIO / {activeView.toUpperCase()}</span>
        <span className="u-label">ACTIVE TAB</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.main id="main" key={activeView} className="portfolio-panel"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: .34, ease: [0.16, 1, 0.3, 1] }}>
          {visible.includes('hero') && <HeroField onOpenWork={changePage} />}
          {visible.includes('proof') && <HiringProof />}
          {visible.includes('about') && <About />}
          {visible.includes('profileIntro') && <PageIntro eyebrow="PROFILE / EXPERIENCE" title="BUILDING" italic="USEFUL SYSTEMS." description="Production software engineering, applied machine learning, and the experience behind the work." />}
          {visible.includes('experience') && <Experience />}
          {visible.includes('capabilities') && <Capabilities />}
          {visible.includes('work') && <WorkPortal onOpen={setOpenProject} />}
          {visible.includes('writing') && <Writing />}
          {visible.includes('contactIntro') && <PageIntro eyebrow="CONTACT / OPPORTUNITIES" title="LET’S" italic="BUILD." description="Open to AI/ML and software engineering roles where ambitious ideas become reliable products." />}
          {visible.includes('contact') && <Contact />}
        </motion.main>
      </AnimatePresence>

      <style>{`
        .portfolio-browser-bar{height:34px;display:grid;grid-template-columns:110px 1fr auto;align-items:center;padding:0 18px;gap:16px;position:relative;z-index:2}
        .portfolio-browser-bar>span:nth-child(2){text-align:center;opacity:.62}
        .portfolio-browser-bar>span:last-child{opacity:.4}
        .browser-controls{display:flex;gap:6px}.browser-controls i{width:7px;height:7px;border:1px solid var(--line);border-radius:50%}.browser-controls i:first-child{background:var(--red);border-color:var(--red)}
        .portfolio-panel{min-height:calc(100svh - 110px)}
        @media(max-width:720px){.portfolio-browser-bar{height:30px;grid-template-columns:auto 1fr;padding:0 12px}.portfolio-browser-bar>span:nth-child(2){text-align:right;font-size:7px}.portfolio-browser-bar>span:last-child{display:none}.browser-controls i{width:6px;height:6px}.portfolio-panel{min-height:calc(100svh - 94px)}}
        @media(prefers-reduced-motion:reduce){.portfolio-panel{transform:none!important}}
      `}</style>

      <Footer />

      {/* framed page border overlay */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 7, border: '1px solid var(--line)', pointerEvents: 'none', zIndex: 110, mixBlendMode: 'normal' }} />

      <ProjectOverlay project={openProject} onClose={closeProject} />
    </div>
  );
}

export default App;
