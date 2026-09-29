"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { soepel } from "@/components/FadeIn";
import { projecten } from "@/lib/data";

/** Horizontaal schuivende rij projectfoto's ("Featured Remodels").
    Mobiel: swipen. Desktop: swipen én pijlknoppen. */
export default function FeaturedScroller() {
  const rij = useRef<HTMLDivElement>(null);

  const schuif = (richting: 1 | -1) => {
    const el = rij.current;
    if (!el) return;
    el.scrollBy({ left: richting * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={rij}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="Uitgelicht tegelwerk"
      >
        {projecten.map((p, i) => (
          <motion.div
            key={p.id}
            role="listitem"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: soepel }}
            className="w-64 shrink-0 snap-start sm:w-72"
          >
            <Link
              href="/projecten"
              className="group relative block aspect-3/4 overflow-hidden rounded-2xl"
            >
              <Image
                src={p.image}
                alt={`${p.titel} — tegelwerk door Bouw MAN in ${p.plaats}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 640px) 18rem, 16rem"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/70">
                  {p.categorie} · {p.plaats}
                </p>
                <h3 className="mt-1 text-base font-semibold leading-snug">
                  {p.titel}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pijlknoppen — swipen blijft overal werken */}
      <div className="mt-6 hidden justify-end gap-3 lg:flex">
        <button
          type="button"
          onClick={() => schuif(-1)}
          aria-label="Vorige projecten"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
        >
          <BsArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => schuif(1)}
          aria-label="Volgende projecten"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
        >
          <BsArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
