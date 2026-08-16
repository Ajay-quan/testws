import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks';
import InterfaceIcon from './InterfaceIcon';

export default function HeroField({ onOpenWork }) {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = null;
    let visible = true, running = false;

    // raw + smoothed pointer (elastic follow)
    const raw = { x: -9999, y: -9999, active: false };
    const smooth = { x: -9999, y: -9999 };
    let vel = 0, lastx = -9999, lasty = -9999;

    const pulses = [];
    let cols = 0, spacing = 12;
    let colPull = new Float32Array(0); // eased horizontal pull per column
    let t = 0;

    const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = W < 640 ? 20 : W < 1024 ? 15 : 12;
      cols = Math.floor(W / spacing) + 2;
      colPull = new Float32Array(cols);
    };

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, W, H);
      const ink = cssVar('--ink') || '#110908';

      // elastic pointer follow
      if (raw.active) {
        smooth.x += (raw.x - smooth.x) * 0.14;
        smooth.y += (raw.y - smooth.y) * 0.14;
      }
      vel *= 0.88;

      const sigmaX = W < 640 ? 120 : 170;         // horizontal reach of the bulge
      const sigmaY = W < 640 ? 150 : 210;         // vertical reach of the bulge
      const amp = (W < 640 ? 0.55 : 0.7) * (1 + Math.min(vel / 40, 0.8));
      const twoSigX2 = 2 * sigmaX * sigmaX;
      const twoSigY2 = 2 * sigmaY * sigmaY;
      const segs = W < 640 ? 20 : 30;
      const active = raw.active && smooth.x > -1000;

      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;

      for (let c = 0; c < cols; c++) {
        const baseX = c * spacing;
        // horizontal gaussian closeness to pointer
        let target = 0;
        if (active) {
          const dxh = baseX - smooth.x;
          const hg = Math.exp(-(dxh * dxh) / twoSigX2);
          target = (smooth.x - baseX) * hg * amp; // pull toward pointer, peaks at a soft radius
        }
        // ease each column toward its target -> smooth + elastic settle
        colPull[c] += (target - colPull[c]) * 0.12;
        const pull = colPull[c];

        ctx.beginPath();
        let px = 0, py = 0;
        for (let s = 0; s <= segs; s++) {
          const y = (s / segs) * H;
          // two low-frequency sine waves for organic ambient motion
          const ambient =
            Math.sin(y * 0.010 + t * 1.8 + c * 0.10) * 4 +
            Math.sin(y * 0.026 - t * 1.1 + c * 0.05) * 2.2;

          let dx = ambient;
          if (active) {
            const dyv = y - smooth.y;
            const vg = Math.exp(-(dyv * dyv) / twoSigY2);
            dx += pull * vg;
          }
          for (let i = 0; i < pulses.length; i++) {
            const p = pulses[i];
            const pdx = baseX - p.x, pdy = y - p.y;
            const pd = Math.sqrt(pdx * pdx + pdy * pdy);
            const ring = Math.abs(pd - p.r);
            if (ring < 46) {
              const k = 1 - ring / 46;
              dx += (pdx / (pd || 1)) * k * p.strength;
            }
          }
          const x = baseX + dx;
          if (s === 0) { ctx.moveTo(x, y); px = x; py = y; }
          else {
            // smooth curve through midpoints
            const mx = (px + x) / 2, my = (py + y) / 2;
            ctx.quadraticCurveTo(px, py, mx, my);
            px = x; py = y;
          }
        }
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].r += 8;
        pulses[i].strength *= 0.95;
        if (pulses[i].r > Math.max(W, H) * 1.2) pulses.splice(i, 1);
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => { if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(draw); } };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = null; };

    const setPointer = (clientX, clientY) => {
      const r = wrap.getBoundingClientRect();
      const x = clientX - r.left, y = clientY - r.top;
      if (smooth.x < -1000) { smooth.x = x; smooth.y = y; }
      if (lastx > -1000) vel = Math.min(Math.hypot(x - lastx, y - lasty), 60);
      lastx = x; lasty = y;
      raw.x = x; raw.y = y; raw.active = true;
    };
    const onMove = (e) => setPointer(e.clientX, e.clientY);
    const onTouch = (e) => { const tt = e.touches[0]; if (tt) setPointer(tt.clientX, tt.clientY); };
    const onLeave = () => { raw.active = false; };
    const onDown = (e) => {
      const r = wrap.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      pulses.push({ x: cx, y: cy, r: 0, strength: 60 });
    };

    resize();
    window.addEventListener('resize', resize);
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('mousedown', onDown);
    wrap.addEventListener('touchmove', onTouch, { passive: true });
    wrap.addEventListener('touchstart', onDown, { passive: true });

    const io = new IntersectionObserver((ents) => {
      visible = ents[0].isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0 });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    if (reduced) { draw(); stop(); } else start();

    return () => {
      stop(); io.disconnect();
      window.removeEventListener('resize', resize);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('mousedown', onDown);
      wrap.removeEventListener('touchmove', onTouch);
      wrap.removeEventListener('touchstart', onDown);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  return (
    <section aria-label="Interactive signal field" data-testid="hero-field" className="surface-accent hairline-b" style={{ position: 'relative' }}>
      <div ref={wrapRef} className="hero-field-wrap" style={{ position: 'relative', height: 'clamp(500px, 72vh, 760px)', width: '100%' }}>
        <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%' }} />
        <div className="hero-identity">
          <div className="u-label hero-kicker"><span className="signal-dot" />OPEN TO AI / ML + SOFTWARE ENGINEERING ROLES · 2026</div>
          <h1 className="font-display hero-name"><span>AJAY</span><span>VARADA</span></h1>
          <div className="hero-bottom-line">
            <p className="font-serif-ed">Former Micron engineer building agent memory, retrieval systems, and production ML.</p>
            <div className="hero-actions">
              <a href="/work" data-cursor="hover" className="hero-action focus-ring icon-link" onClick={(event) => onOpenWork?.('work', '/work', event)}>SELECTED WORK <InterfaceIcon /></a>
              <a href="/AjayVarada_Resume.pdf" target="_blank" rel="noreferrer" data-cursor="hover" className="hero-action focus-ring icon-link">RÉSUMÉ <InterfaceIcon /></a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero-identity { position:absolute; inset:0; z-index:2; display:flex; flex-direction:column; justify-content:space-between; padding:clamp(28px,4vw,52px) clamp(18px,3vw,42px) 52px; pointer-events:none; }
        .hero-kicker { align-self:flex-start; display:flex; align-items:center; gap:9px; background:var(--accent); border:1px solid var(--ink); padding:8px 10px; }
        .signal-dot { width:7px; height:7px; border-radius:50%; background:var(--red); box-shadow:0 0 0 4px rgba(227,67,81,.14); }
        .hero-name { margin:auto 0 0; font-size:clamp(88px,17vw,300px); line-height:.74; letter-spacing:-.065em; display:flex; justify-content:space-between; align-items:flex-end; text-shadow:3px 3px 0 var(--accent); }
        .hero-name span:last-child { text-align:right; }
        .hero-bottom-line { display:flex; align-items:flex-end; justify-content:space-between; gap:28px; margin-top:30px; }
        .hero-bottom-line p { margin:0; max-width:560px; font-size:clamp(18px,2vw,30px); line-height:1.1; font-weight:420; background:var(--accent); padding:5px 7px; }
        .hero-actions { display:flex; gap:8px; pointer-events:auto; flex-shrink:0; }
        .hero-action { color:var(--ink); background:var(--accent); border:1px solid var(--ink); padding:12px 14px; text-decoration:none; font-size:10px; letter-spacing:.13em; transition:background .3s,color .3s; }
        .hero-action:hover { background:var(--inverse-surface-bg); color:var(--inverse-fg); }
        @media(max-width:720px){
          .hero-field-wrap { height:calc(100svh - 64px)!important; min-height:570px; max-height:760px; }
          .hero-identity { padding:20px 14px 28px; }
          .hero-kicker { font-size:8px; max-width:250px; }
          .hero-name { display:block; font-size:clamp(76px,26.5vw,112px); line-height:.78; margin-top:auto; }
          .hero-name span { display:block; }
          .hero-name span:last-child { text-align:left; }
          .hero-bottom-line { display:block; margin-top:26px; }
          .hero-bottom-line p { font-size:16px; line-height:1.15; max-width:330px; }
          .hero-actions { margin-top:18px; }
          .hero-action { flex:1; text-align:center; padding:13px 8px; min-height:44px; }
        }
      `}</style>
    </section>
  );
}
