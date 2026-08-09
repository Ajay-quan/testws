import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function useIsFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return fine;
}

export function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return compact;
}

export function randBits(n) {
  let s = '';
  for (let i = 0; i < n; i++) s += Math.random() > 0.5 ? '1' : '0';
  return s;
}
