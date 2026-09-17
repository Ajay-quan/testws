"use client";

import { motion, useReducedMotion } from "framer-motion";

const STAGGER = 0.026;

type TextRollProps = {
  children: string;
  className?: string;
  center?: boolean;
};

/** Rolling-letter treatment adapted from the Skiper58 registry component. */
export function TextRoll({ children, className = "", center = false }: TextRollProps) {
  const reducedMotion = useReducedMotion();
  const letters = children.split("");

  const layer = (offset: "top" | "bottom") => (
    <span aria-hidden="true" className={offset === "bottom" ? "skiper58-layer skiper58-layer-copy" : "skiper58-layer"}>
      {letters.map((letter, index) => {
        const delay = center
          ? STAGGER * Math.abs(index - (letters.length - 1) / 2)
          : STAGGER * index;
        return (
          <motion.span
            className="skiper58-letter"
            key={`${offset}-${index}`}
            variants={reducedMotion ? undefined : {
              initial: { y: offset === "top" ? "0%" : "115%" },
              hovered: { y: offset === "top" ? "-115%" : "0%" },
            }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay }}
          >
            {letter === " " ? "\u00a0" : letter}
          </motion.span>
        );
      })}
    </span>
  );

  return (
    <span className={`skiper58-roll ${className}`.trim()}>
      {layer("top")}
      {layer("bottom")}
    </span>
  );
}

/**
 * Adapted from the free Skiper 58 registry item.
 * Original concept: @gurvinder-singh02 / https://gxuri.me
 */
