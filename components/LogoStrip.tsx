import { partners } from "@/lib/data";

/* Tekst-wordmarks tot er echte logobestanden zijn — geen nagemaakte
   logo's van echte bedrijven. */
function PartnerRij({ verborgen = false }: { verborgen?: boolean }) {
  return (
    <ul
      aria-hidden={verborgen || undefined}
      className="flex shrink-0 animate-marquee items-center gap-20 pr-20
                 group-hover:[animation-play-state:paused]"
    >
      {partners.map((p) => (
        <li key={p.naam} className="shrink-0 text-center">
          <p className="text-lg font-semibold tracking-tight text-ink-soft transition-colors duration-200 hover:text-ink">
            {p.naam}
          </p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-soft/60">
            {p.rol}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Partnerstrip — doorlopende marquee, pauzeert bij hover.
    Beide rijen zijn identiek; de tweede is decor. */
export default function LogoStrip() {
  return (
    <div className="group relative flex overflow-hidden">
      <PartnerRij />
      <PartnerRij verborgen />
      {/* Zachte randen links en rechts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-mist to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-mist to-transparent"
      />
    </div>
  );
}
