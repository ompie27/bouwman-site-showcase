"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { soepel } from "@/components/FadeIn";

/** Telt een getal op zodra het in beeld komt. Accepteert waarden als
    "480+" — het cijferdeel telt, het achtervoegsel blijft staan.
    Server-side staat de eindwaarde al in de HTML (SEO / zonder JS). */
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const doel = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const minderBeweging = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || minderBeweging || !match) return;
    if (!inView) {
      el.textContent = "0";
      return;
    }
    const controls = animate(0, doel, {
      duration: 1.8,
      ease: [...soepel],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, doel, minderBeweging, match]);

  return (
    <>
      <span ref={ref}>{doel}</span>
      {suffix}
    </>
  );
}
