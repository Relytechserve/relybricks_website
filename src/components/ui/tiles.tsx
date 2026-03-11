"use client";

import React from "react";
import { motion } from "framer-motion";

interface TilesProps {
  className?: string;
  rows?: number;
  cols?: number;
  tileSize?: "sm" | "md" | "lg";
}

const tileSizes: Record<NonNullable<TilesProps["tileSize"]>, string> = {
  sm: "w-8 h-8",
  md: "w-9 h-9 md:w-12 md:h-12",
  lg: "w-12 h-12 md:w-16 md:h-16",
};

export function Tiles({
  className = "",
  rows = 30,
  cols = 8,
  tileSize = "md",
}: TilesProps) {
  const rowsArray = new Array(rows).fill(1);
  const colsArray = new Array(cols).fill(1);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-0 flex w-full h-full justify-center overflow-hidden pointer-events-none bg-gradient-to-b from-amber-50/60 via-transparent to-stone-50/60 ${className}`}
    >
      {rowsArray.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className={`${tileSizes[tileSize]} border-l border-neutral-300/60 relative`}
        >
          {colsArray.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              whileHover={{
                backgroundColor: "rgba(255, 200, 120, 0.2)",
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              className={`${tileSizes[tileSize]} border-r border-t border-neutral-300/60 relative`}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

