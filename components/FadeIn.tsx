"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Gedeelde easing: snel op gang, heel zacht uitlopend ("expo out"). */
export const soepel = [0.16, 1, 0.3, 1] as const;

/** Subtiele fade-in bij scrollen. Eenmalig, premium — geen overdaad. */
export default function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: soepel }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
