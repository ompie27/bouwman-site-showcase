"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Laat alle Framer Motion-animaties de systeeminstelling
    "verminder beweging" van de bezoeker respecteren. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
