# AV Signal Laboratory — Ajay Varada Portfolio

## Original Problem
Cinematic, experimental single-page portfolio for AI product builder Ajay Varada — an "AI Signal Laboratory": editorial grid that destabilises on scroll (elastic line hero, binary perspective, WORK doorway → project tunnel, contact composition). Strict two-color palette (warm paper #F2ECE3 / signal red #E34351 + near-black #110908), condensed display + editorial serif + mono type. Reference craft level: wodniack.dev. Frontend-only + a working contact form.

## Architecture
- Frontend: React 19 + framer-motion + lenis (smooth scroll) + custom canvas.
- Backend: FastAPI + MongoDB — `/api/contact` (POST/GET) stores submissions.
- Palette/mode via `data-mode` attr (paper default, signal-red toggle).

## Implemented (2026)
- Loading sequence (AV monogram, jitter system text, clip-wipe exit; interval-driven so it never traps; reduced-motion skips it).
- Modular header (monogram, live scroll %, status, nav, contrast toggle, QR mark).
- Interactive hero line-field (canvas, elastic eased pointer bulge w/ gaussian falloff + two-sine ambient, click shockwaves, IntersectionObserver + tab-hidden pause, DPR cap).
- Data tickers, oversized positioning title (scroll-velocity + width response), binary perspective transition.
- About (clip-mask serif reveal, vertical index, fact cells), Capability matrix (invert-on-hover/focus/tap, rotating glyphs).
- Work portal: pinned 600vh doorway → dark tunnel, echo outlines, extruded WORK letters, parallax outlined background letters, 3 project windows travelling toward viewer with procedural canvas previews.
- Project overlay dialog (focus trap, Esc, backdrop, browser-back, focus restore).
- Contact (invert LET'S TALK + working form → /api/contact), moving email ribbon, modular footer.
- Rounded-arrow custom cursor (fine-pointer only), skip link, aria-hidden decoratives, reduced-motion fallbacks.
- Dev flags: `?fast` skip loader, `?nolenis` disable smooth scroll (testing only).

## Backlog / Next
- P1: Real project detail imagery/case-study depth.
- P2: Sound design toggle; contact form admin view.
- P2: Per-project accent theming inside tunnel.
