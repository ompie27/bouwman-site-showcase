import Image from "next/image";
import type { Dienst } from "@/lib/data";

export default function ServiceCard({
  dienst,
  uitgebreid = false,
  prioriteit = false,
}: {
  dienst: Dienst;
  uitgebreid?: boolean;
  /** Zet aan voor kaarten boven de vouw (LCP): laadt de foto direct. */
  prioriteit?: boolean;
}) {
  return (
    <article
      id={dienst.slug}
      className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="relative aspect-3/2 overflow-hidden">
        <Image
          src={dienst.image}
          alt={`${dienst.titel} door tegelbedrijf Bouw MAN`}
          fill
          priority={prioriteit}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{dienst.titel}</h3>
        <p className="mt-2 text-sm text-ink-soft">
          {uitgebreid ? dienst.lang : dienst.kort}
        </p>
      </div>
    </article>
  );
}
