"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type SkiperThemeGlyphProps = {
  isDark: boolean;
  className?: string;
};

/** Controlled sun-to-moon transition adapted from the Skiper4 collection. */
export function SkiperThemeGlyph({ isDark, className = "" }: SkiperThemeGlyphProps) {
  const clipId = useId().replace(/:/g, "");
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      animate={{ rotate: isDark ? -18 : 0 }}
      transition={transition}
    >
      <clipPath id={clipId}>
        <motion.path
          animate={{ x: isDark ? -12 : 0, y: isDark ? 10 : 0 }}
          transition={transition}
          d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
        />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <motion.circle
          cx="16"
          cy="16"
          animate={{ r: isDark ? 10 : 7.5 }}
          transition={transition}
        />
        <motion.g
          fill="none"
          strokeWidth="1.65"
          animate={{ rotate: isDark ? -95 : 0, scale: isDark ? 0.45 : 1, opacity: isDark ? 0 : 1 }}
          transition={transition}
          style={{ transformOrigin: "16px 16px" }}
        >
          <path d="M16 5.5v-4" /><path d="M16 30.5v-4" />
          <path d="M1.5 16h4" /><path d="M26.5 16h4" />
          <path d="m23.4 8.6 2.8-2.8" /><path d="m5.7 26.3 2.9-2.9" />
          <path d="m5.8 5.8 2.8 2.8" /><path d="m23.4 23.4 2.9 2.9" />
        </motion.g>
      </g>
    </motion.svg>
  );
}

/**
 * Adapted from the free Skiper 4 registry item and toggles.dev.
 * Original concept: @gurvinder-singh02 / https://gxuri.me
 */
