"use client";

import { useEffect, useState, useCallback } from 'react';
import './portfolio.css';

import Loader from '@/components/portfolio/Loader';
import Pointer from '@/components/portfolio/Pointer';
import Header from '@/components/portfolio/Header';
import HeroField from '@/components/portfolio/HeroField';
import About from '@/components/portfolio/About';
import Experience from '@/components/portfolio/Experience';
import Capabilities from '@/components/portfolio/Capabilities';
import WorkPortal from '@/components/portfolio/WorkPortal';
import Writing from '@/components/portfolio/Writing';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import ProjectOverlay from '@/components/portfolio/ProjectOverlay';

function App() {
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

  return (
    <div className="App" style={{ background: 'var(--accent)' }}>
      <a href="#main" className="skip-link">SKIP TO CONTENT</a>
      {!loaded && <Loader onDone={handleLoaded} />}
      <Pointer />

      <Header scrollPct={scrollPct} />

      <main id="main">
        <HeroField />
        <About />
        <Experience />
        <Capabilities />
        <WorkPortal onOpen={setOpenProject} />
        <Writing />
        <Contact />
      </main>

      <Footer />

      {/* framed page border overlay */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 7, border: '1px solid var(--ink)', pointerEvents: 'none', zIndex: 130, mixBlendMode: 'normal' }} />

      <ProjectOverlay project={openProject} onClose={closeProject} />
    </div>
  );
}

export default App;
