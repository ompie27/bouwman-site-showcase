import type { Metadata } from "next";
import Image from "next/image";
import ArrowLink from "@/components/ArrowLink";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import FeaturedScroller from "@/components/FeaturedScroller";
import LogoStrip from "@/components/LogoStrip";
import NumbersBand from "@/components/NumbersBand";
import { Section, SectionHeader } from "@/components/Section";
import { diensten, jarenVakmanschap, site, werkspot } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tegelzetter in Friesland & Groningen — Bouw MAN",
  description:
    "Op zoek naar een tegelzetter in Friesland of Groningen? Bouw MAN (voorheen MAN Tegelwerken) verzorgt badkamers, vloeren en wandtegels. Tegelwerk sinds 1998 — 30 beoordeelde projecten, 4,4/5 op Werkspot.",
};

// Drie kerndiensten voor de servicekolommen op de homepage.
const kerndiensten = ["badkamers", "vloertegels", "grootformaat-tegels"].map(
  (slug) => diensten.find((d) => d.slug === slug)!,
);

export default function HomePage() {
  return (
    <>
      {/* ============ 1. Hero ============ */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
        {/* Langzame uitzoom op de foto (Ken Burns) */}
        <div className="absolute inset-0 -z-10 animate-hero-zoom">
          <Image
            src="/images/hero-keuken-visgraat.jpg"
            alt="Blauwgroene visgraat-keukenachterwand, betegeld door Bouw MAN"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink/85 via-ink/60 to-ink/25" />

        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          {/* Elementen komen na elkaar binnen */}
          <FadeIn>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Tegelzetter voor Friesland &amp; Groningen
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Ruimtes transformeren met strak tegelwerk
            </h1>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Tegelwerk sinds {site.vakSinds} — in Nederland sinds{" "}
              {site.nlSinds}.
            </p>
          </FadeIn>
          <FadeIn delay={0.36}>
            <div className="mt-10">
              <Button href="/contact" className="px-8 py-4 text-base">
                Offerte aanvragen
              </Button>
            </div>
            <p className="mt-10 text-sm text-white/60">
              {jarenVakmanschap} jaar vakmanschap · {werkspot.aantal}{" "}
              beoordeelde projecten · {werkspot.score}/5 op Werkspot
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ 2. Over ons ============ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-dark">
              Over ons bedrijf
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Tegelwerk sinds 1998, in Nederland sinds 2017
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Tegelzetter sinds 1998, sinds 2017 met een eigen bedrijf in
              Friesland. Dertig beoordeelde projecten, gemiddeld{" "}
              {werkspot.score} uit 5 op Werkspot. En nog nooit een klacht over
              het werk zelf.
            </p>
            <p className="mt-4 text-lg text-ink-soft">
              Particulier, aannemer, projectontwikkelaar, bedrijf of VvE — u
              krijgt elke afspraak zwart op wit, een vaste prijs vooraf en een
              oplevering die we samen aftekenen.
            </p>
            <div className="mt-8">
              <ArrowLink href="/over-ons">Lees meer</ArrowLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/over-ons-decortegels.jpg"
                alt="Inloopdouche met kleurrijke decortegels en mat-zwarte regendouche — tegelwerk door Bouw MAN"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ============ 3. Cijferband ============ */}
      <NumbersBand />

      {/* ============ 4. Uitgelicht werk ============ */}
      <Section alt>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-dark">
              Uitgelicht werk
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Recente tegelprojecten
            </h2>
          </div>
          <ArrowLink href="/projecten">Alle projecten</ArrowLink>
        </div>
        <FeaturedScroller />
      </Section>

      {/* ============ 5. Diensten ============ */}
      <Section>
        <SectionHeader
          eyebrow="Onze diensten"
          titel="Waar we goed in zijn"
          intro="Van complete badkamers tot grootformaat vloeren — voor particulier en zakelijk."
        />
        <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {kerndiensten.map((d, i) => (
            <FadeIn key={d.slug} delay={i * 0.06}>
              <div>
                <p className="text-sm font-semibold text-accent-dark">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{d.titel}</h3>
                <p className="mt-3 text-ink-soft">{d.kort}</p>
                <ArrowLink href={`/diensten#${d.slug}`} className="mt-5">
                  Meer
                </ArrowLink>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button href="/diensten" variant="secondary">
            Alle diensten bekijken
          </Button>
        </div>
      </Section>

      {/* ============ 6. Partners & leveranciers ============ */}
      <Section alt>
        <SectionHeader
          center
          eyebrow="Partners &amp; leveranciers"
          titel="Met wie wij werken in Friesland en Groningen"
          intro="Vaste samenwerkingen met vakmensen en leveranciers uit de regio — van bouwmaterialen tot tegels en sanitair."
        />
        <LogoStrip />
      </Section>
    </>
  );
}
