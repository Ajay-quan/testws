// Procedural mechanical "whoosh" for the project tunnel. No external assets.
let ctx = null;
let noiseBuf = null;
let enabled = false;

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    const len = Math.floor(ctx.sampleRate * 1);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
}

export function setEnabled(v) {
  enabled = v;
  if (v) ensure();
}

export function isEnabled() {
  return enabled;
}

// intensity 0..1.4, tint hue optional (unused sonically, kept for signature parity)
export function whoosh(intensity = 1) {
  if (!enabled || !ctx || !noiseBuf) return;
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 0.85;
  bp.frequency.setValueAtTime(170, now);
  bp.frequency.linearRampToValueAtTime(1300 * intensity + 300, now + 0.26);
  bp.frequency.linearRampToValueAtTime(230, now + 0.6);

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2400;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.15 * intensity, now + 0.11);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

  src.connect(bp); bp.connect(lp); lp.connect(g); g.connect(ctx.destination);
  src.start(now);
  src.stop(now + 0.62);
}
