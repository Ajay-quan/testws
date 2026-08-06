import { useEffect, useRef } from 'react';

function useCanvas(drawFactory, deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let raf, running = false, W = 0, H = 0;
    const pointer = { x: 0.5, y: 0.5, active: false };
    const clicks = [];
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const state = { t: 0 };
    const drawer = drawFactory(ctx, () => ({ W, H }), pointer, clicks, state);
    const loop = () => { state.t += 0.016; drawer(); raf = requestAnimationFrame(loop); };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      pointer.x = cx / r.width; pointer.y = cy / r.height; pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const onClick = () => clicks.push({ x: pointer.x, y: pointer.y, r: 0, life: 1 });
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('mousedown', onClick);
    canvas.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    const io = new IntersectionObserver((e) => { e[0].isIntersecting ? start() : stop(); }, { threshold: 0 });
    io.observe(canvas);
    return () => {
      stop(); io.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('mousedown', onClick);
      canvas.removeEventListener('touchmove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, deps); // eslint-disable-line
  return ref;
}

const ink = () => getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#110908';
const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#f2ece3';

export function ContextEngine() {
  const ref = useCanvas((ctx, size, p, clicks, s) => () => {
    const { W, H } = size();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ink(); ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    ctx.strokeStyle = accent(); ctx.globalAlpha = 0.5;
    for (let r = 1; r <= 5; r++) { ctx.beginPath(); ctx.arc(cx, cy, r * (Math.min(W, H) / 12), 0, Math.PI * 2); ctx.lineWidth = 1; ctx.stroke(); }
    ctx.globalAlpha = 1;
    const nodes = 9;
    for (let i = 0; i < nodes; i++) {
      const ang = (i / nodes) * Math.PI * 2 + s.t * 0.2;
      const rad = Math.min(W, H) * (0.18 + 0.12 * Math.sin(s.t + i));
      const pull = p.active ? (p.x - 0.5) * 40 : 0;
      const x = cx + Math.cos(ang) * rad + pull;
      const y = cy + Math.sin(ang) * rad;
      ctx.strokeStyle = accent(); ctx.lineWidth = 1; ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
      ctx.globalAlpha = 1; ctx.fillStyle = i % 3 === 0 ? '#E34351' : accent();
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = '#E34351'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
    for (let i = clicks.length - 1; i >= 0; i--) {
      const c = clicks[i]; c.r += 3; c.life -= 0.02;
      ctx.strokeStyle = accent(); ctx.globalAlpha = Math.max(c.life, 0);
      ctx.beginPath(); ctx.arc(c.x * W, c.y * H, c.r, 0, Math.PI * 2); ctx.stroke();
      if (c.life <= 0) clicks.splice(i, 1);
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export function SonicField() {
  const ref = useCanvas((ctx, size, p, clicks, s) => () => {
    const { W, H } = size();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ink(); ctx.fillRect(0, 0, W, H);
    const rhythm = p.active ? 2.4 : 1;
    const bands = 22;
    for (let i = 0; i < bands; i++) {
      const off = (i / bands) * H * 2 + (s.t * 40 * rhythm) % (H * 2);
      ctx.strokeStyle = i % 4 === 0 ? '#E34351' : accent();
      ctx.globalAlpha = 0.55; ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) {
        const y = ((x - off) % (H * 2));
        const wy = (x * 0.6 - off + i * 18) % (H + 60) - 30;
        if (x === 0) ctx.moveTo(x, wy); else ctx.lineTo(x, wy);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const cx = W / 2, cy = H / 2;
    const scale = p.active ? 1 + Math.abs(p.y - 0.5) : 1;
    ctx.strokeStyle = accent(); ctx.lineWidth = 2;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(s.t * 0.4);
    ctx.strokeRect(-24 * scale, -24 * scale, 48 * scale, 48 * scale);
    ctx.restore();
    ctx.fillStyle = '#E34351'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
  });
  return <canvas ref={ref} aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export function QuietSignal() {
  const ref = useCanvas((ctx, size, p, clicks, s) => {
    let speed = 0.02;
    return () => {
      const { W, H } = size();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ink(); ctx.fillRect(0, 0, W, H);
      const target = p.active ? 0.02 : 0.004;
      speed += (target - speed) * 0.05;
      const cx = W / 2, cy = H / 2;
      const rmax = Math.min(W, H) * 0.42;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(s.t);
      for (let i = 0; i < 40; i++) {
        const a = (i / 40) * Math.PI * 2;
        const r1 = rmax * (0.5 + 0.5 * Math.sin(i + s.t));
        ctx.strokeStyle = i % 5 === 0 ? '#E34351' : accent();
        ctx.globalAlpha = 0.5; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(Math.cos(a) * (rmax * 0.3), Math.sin(a) * (rmax * 0.3));
        ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); ctx.stroke();
      }
      ctx.restore(); ctx.globalAlpha = 1;
      ctx.strokeStyle = accent(); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, rmax * 0.3, 0, Math.PI * 2); ctx.stroke();
      for (let i = clicks.length - 1; i >= 0; i--) {
        const c = clicks[i]; c.r += 4; c.life -= 0.03;
        ctx.strokeStyle = '#E34351'; ctx.globalAlpha = Math.max(c.life, 0);
        ctx.beginPath(); ctx.arc(cx, cy, c.r, 0, Math.PI * 2); ctx.stroke();
        if (c.life <= 0) clicks.splice(i, 1);
      }
      ctx.globalAlpha = 1;
    };
  });
  return <canvas ref={ref} aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export const PREVIEWS = { ContextEngine, SonicField, QuietSignal };
