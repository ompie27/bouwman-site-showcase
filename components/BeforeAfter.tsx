"use client";

import Image from "next/image";
import { useState } from "react";

/** Interactieve voor/na-vergelijking met sleepbare schuif. */
export default function BeforeAfter({
  voor,
  na,
  alt,
}: {
  voor: string;
  na: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-t-2xl select-none">
      {/* Voor (onderlaag) */}
      <Image src={voor} alt={`${alt} — voor`} fill className="object-cover" />
      {/* Na (bovenlaag, afgeknipt op schuifpositie) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={na} alt={`${alt} — na`} fill className="object-cover" />
      </div>

      {/* Schuiflijn */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-md">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
            <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
          </svg>
        </span>
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
        Voor
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
        Na
      </span>

      {/* Toegankelijke bediening */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Schuif tussen voor en na: ${alt}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
