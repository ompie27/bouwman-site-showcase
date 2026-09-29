import CountUp from "@/components/CountUp";
import FadeIn from "@/components/FadeIn";
import { cijfers, werkspot } from "@/lib/data";

/** Cijferband ("US IN NUMBERS") — donker, monochroom, drie grote cijfers. */
export default function NumbersBand() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <p className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
          Bouw MAN in cijfers
        </p>
        <dl className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {cijfers.map((c, i) => (
            <FadeIn key={c.label} delay={i * 0.1}>
              <div className="text-center">
                <dt className="text-5xl font-semibold tracking-tight tabular-nums md:text-6xl">
                  <CountUp value={c.getal} />
                </dt>
                <dd className="mt-3 text-sm uppercase tracking-[0.15em] text-white/60">
                  {c.label}
                </dd>
              </div>
            </FadeIn>
          ))}
        </dl>
        <p className="mt-12 text-center text-xs text-white/40">
          Gemiddeld {werkspot.score} uit {werkspot.maxScore} — bron:{" "}
          <a
            href={werkspot.profielUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/70"
          >
            Werkspot
          </a>
          , {werkspot.aantal} beoordelingen, {werkspot.periode}
        </p>
      </div>
    </section>
  );
}
