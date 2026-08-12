"use client";

import { useEffect, useState, useCallback } from 'react';
import './portfolio.css';
import Lenis from 'lenis';
import { Toaster } from 'sonner';

import Loader from '@/components/portfolio/Loader';
import Pointer from '@/components/portfolio/Pointer';
import Header from '@/components/portfolio/Header';
import HeroField from '@/components/portfolio/HeroField';
import Ticker from '@/components/portfolio/Ticker';
import PositioningTitle from '@/components/portfolio/PositioningTitle';
import BinaryTransition from '@/components/portfolio/BinaryTransition';
import About from '@/components/portfolio/About';
import Experience from '@/components/portfolio/Experience';
import Capabilities from '@/components/portfolio/Capabilities';
import WorkPortal from '@/components/portfolio/WorkPortal';
import Writing from '@/components/portfolio/Writing';
import Contact from '@/components/portfolio/Contact';
import EmailRibbon from '@/components/portfolio/EmailRibbon';
import Footer from '@/components/portfolio/Footer';
import ProjectOverlay from '@/components/portfolio/ProjectOverlay';
import { usePrefersReducedMotion } from '@/components/portfolio/hooks';
import { setEnabled as setAudioEnabled } from '@/components/portfolio/tunnelAudio';

function App() {
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState('paper'); // 'paper' | 'signal'
  const [scrollPct, setScrollPct] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);
  const toggleSound = useCallback(() => setSoundOn((s) => { const n = !s; setAudioEnabled(n); return n; }), []);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  useEffect(() => {
    if (reduced || new URLSearchParams(window.location.search).has('nolenis')) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [reduced]);

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
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#110908', color: '#f2ece3', border: '1px solid #f2ece3', borderRadius: 0, fontFamily: 'JetBrains Mono', fontSize: 12 } }} />

      <Header scrollPct={scrollPct} mode={mode} onToggleMode={() => setMode((m) => (m === 'paper' ? 'signal' : 'paper'))} soundOn={soundOn} onToggleSound={toggleSound} />

      <main id="main">
        <HeroField />
        <Ticker items={['010110100101', 'LLM SYSTEMS', 'COMPUTER VISION', 'ATL-2026', 'SIG//001']} dir="l" />
        <PositioningTitle />
        <BinaryTransition />
        <About />
        <Experience />
        <Ticker items={['CAPABILITY MATRIX', '02—03', 'AI × SOFTWARE', '110100', 'RESEARCH→PRODUCTION']} dir="r" invert />
        <Capabilities />
        <WorkPortal onOpen={setOpenProject} />
        <Writing />
        <Contact />
        <EmailRibbon />
      </main>

      <Footer />

      {/* framed page border overlay */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 7, border: '1px solid var(--ink)', pointerEvents: 'none', zIndex: 130, mixBlendMode: 'normal' }} />

      <ProjectOverlay project={openProject} onClose={closeProject} />
    </div>
  );
}

export default App;
