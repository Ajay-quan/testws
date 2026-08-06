import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL = 'hello@ajayvarada.com';

export default function Contact() {
  const [hover, setHover] = useState(false);
  const bigRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const onMove = (e) => {
    if (!bigRef.current) return;
    const r = bigRef.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    bigRef.current.style.transform = `translate(${dx * 14}px, ${dy * 10}px)`;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Fill in every field, please.');
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success('Signal received. Ajay will reply soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Transmission failed. Try email instead.');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink)', padding: '12px 2px', color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, outline: 'none' };

  return (
    <section id="contact" data-testid="contact-section" className="surface-accent hairline-b" style={{ scrollMarginTop: 92 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr' }} className="contact-grid">
        <div className="hairline-r" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '18px 0', alignItems: 'center' }}>
          <span className="font-mono-u" style={{ writingMode: 'vertical-rl', letterSpacing: '0.4em', fontSize: 14 }}>CONTACT</span>
          <span className="u-label" style={{ writingMode: 'vertical-rl', opacity: 0.6 }}>03—03</span>
        </div>

        <div>
          <div style={{ padding: 'clamp(30px,5vw,64px) clamp(20px,4vw,56px)' }} className="hairline-b">
            <p className="font-serif-ed" style={{ fontWeight: 350, fontSize: 'clamp(26px, 4.4vw, 62px)', lineHeight: 1.06, margin: 0, maxWidth: 900 }}>
              Have a strange problem, a bold product, or an impossible deadline?
            </p>
          </div>

          {/* invert action panel */}
          <button
            data-testid="lets-talk"
            data-cursor="hover"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => { setHover(false); if (bigRef.current) bigRef.current.style.transform = 'none'; }}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            onMouseMove={onMove}
            onClick={() => { window.location.href = `mailto:${EMAIL}`; }}
            className="hairline-b focus-ring"
            style={{ position: 'relative', width: '100%', textAlign: 'left', border: 'none', borderBottom: '1px solid var(--ink)', padding: 'clamp(30px,6vw,80px) clamp(20px,4vw,56px)', background: hover ? 'var(--ink)' : 'transparent', color: hover ? 'var(--accent)' : 'var(--ink)', transition: 'background 0.5s cubic-bezier(0.16,1,0.3,1), color 0.5s cubic-bezier(0.16,1,0.3,1)', overflow: 'hidden' }}
          >
            <span className="u-label" style={{ position: 'absolute', top: 16, left: 20, opacity: 0.7 }}>START A PROJECT</span>
            <span ref={bigRef} className="font-display" style={{ display: 'inline-block', fontSize: 'clamp(64px, 18vw, 320px)', lineHeight: 0.8, letterSpacing: '-0.05em', transition: 'transform 0.2s ease-out' }}>
              LET’S<br />TALK <span style={{ display: 'inline-block', transform: hover ? 'translate(18px,-18px)' : 'none', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}>↗</span>
            </span>
          </button>

          {/* working form */}
          <form onSubmit={submit} data-testid="contact-form" style={{ padding: 'clamp(30px,5vw,56px) clamp(20px,4vw,56px)', display: 'grid', gap: 22, maxWidth: 760 }}>
            <div className="u-label" style={{ opacity: 0.6 }}>OR TRANSMIT DIRECTLY —</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }} className="form-row">
              <input data-testid="contact-name" className="focus-ring" style={inputStyle} placeholder="NAME" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input data-testid="contact-email" className="focus-ring" type="email" style={inputStyle} placeholder="EMAIL" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <textarea data-testid="contact-message" className="focus-ring" style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} placeholder="MESSAGE" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button data-testid="contact-submit" data-cursor="hover" type="submit" disabled={sending} className="focus-ring"
              style={{ justifySelf: 'start', background: 'var(--ink)', color: 'var(--accent)', border: 'none', padding: '14px 28px', fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.14em', opacity: sending ? 0.6 : 1 }}>
              {sending ? 'TRANSMITTING…' : 'SEND SIGNAL ↗'}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
