import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from 'lucide-react';

const ICONS = {
  down: ArrowDown,
  external: ArrowUpRight,
  left: ArrowLeft,
  right: ArrowRight,
  up: ArrowUp,
};

export default function InterfaceIcon({ name = 'external', size = 15, className = '' }) {
  const Icon = ICONS[name] || ArrowUpRight;
  return <Icon aria-hidden="true" focusable="false" className={`interface-icon ${className}`} size={size} strokeWidth={1.65} />;
}
