"use client";

import { useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type SkiperStackOptions = {
  index: number;
  count: number;
  compact?: boolean;
};

/** Skiper16-inspired sticky-card choreography adapted to the project tunnel. */
export function useSkiper16Stack(
  progress: MotionValue<number>,
  { index, count, compact = false }: SkiperStackOptions,
) {
  const starts = [0.2, 0.4, 0.62];
  const start = starts[index] ?? 0.2 + index * 0.2;
  const settle = start + (compact ? 0.075 : 0.085);
  const next = starts[index + 1] ?? 0.88;
  const afterNext = starts[index + 2] ?? 0.94;
  const depth = Math.max(0, count - index - 1);
  const finalScale = Math.max(compact ? 0.86 : 0.8, 1 - depth * (compact ? 0.055 : 0.075));
  const shelfY = -depth * (compact ? 24 : 34);

  const y = useTransform(
    progress,
    [start, settle, next, afterNext, 1],
    [compact ? "30vh" : "38vh", "0vh", `${shelfY * 0.45}px`, `${shelfY}px`, compact ? "-34vh" : "-44vh"],
  );
  const scale = useTransform(
    progress,
    [start, settle, next, afterNext, 1],
    [compact ? 0.84 : 0.7, 1, Math.max(finalScale, 0.9), finalScale, finalScale * 1.025],
  );
  const opacity = useTransform(
    progress,
    [start, start + 0.018, Math.max(afterNext, 0.94), 1],
    [0, 1, 1, index === count - 1 ? 0 : 0.18],
  );
  const blur = useTransform(
    progress,
    [settle, next, afterNext],
    [0, 0, index === count - 1 ? 0 : compact ? 0.6 : 1.2],
  );
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return { y, scale, opacity, filter };
}

/**
 * Adapted from the free Skiper 16 registry item.
 * Original concept: @gurvinder-singh02 / https://gxuri.me
 */
