import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './hooks';

export default function HeroField() {
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
      <div ref={wrapRef} style={{ position: 'relative', height: 'clamp(360px, 62vh, 640px)', width: '100%' }}>
        <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', left: 16, bottom: 12, display: 'flex', gap: 20 }}>
          <span className="u-label">12.9716° N</span>
          <span className="u-label">77.5946° E</span>
          <span className="u-label" style={{ opacity: 0.6 }}>MOVE / TOUCH</span>
        </div>
        <div style={{ position: 'absolute', right: 16, top: 12 }}>
          <span className="u-label" style={{ opacity: 0.6 }}>FIELD / 001</span>
        </div>
      </div>
    </section>
  );
}
