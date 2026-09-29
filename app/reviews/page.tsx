import type { Metadata } from "next";
import { BsStarFill } from "react-icons/bs";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeader } from "@/components/Section";
import { sterktes, werkspot } from "@/lib/data";

export const metadata: Metadata = {
  title: "Beoordelingen — 4,4 uit 5 op Werkspot",
  description:
    "Bouw MAN (voorheen MAN Tegelwerken) is 30 keer onafhankelijk beoordeeld op Werkspot: gemiddeld 4,4 uit 5. Lees wat klanten consequent noemen.",
};

/* Reviewteksten van Werkspot mogen niet zomaar worden overgenomen
   (auteursrecht). De cijfers wél, mét bronvermelding — en de thema's
   die klanten consequent noemen, staan hieronder samengevat. */
export default function ReviewsPage() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Beoordelingen"
          titel="Dertig keer onafhankelijk beoordeeld"
          intro={`Tussen ${werkspot.periode} beoordeelden dertig klanten het werk via Werkspot — van een toiletmuurtje van 3 m² tot 90 m² woonkamervloer.`}
        />

        {/* Aggregaat — verifieerbaar, met bron */}
        <div className="grid gap-6 sm:grid-cols-3">
          <FadeIn>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-ink p-8 text-center text-white">
              <div className="flex items-center gap-2">
                <BsStarFill className="h-6 w-6" aria-hidden="true" />
                <span className="text-5xl font-semibold tracking-tight">
                  {werkspot.score}
                </span>
                <span className="text-xl text-white/60">
                  / {werkspot.maxScore}
                </span>
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-white/60">
                Gemiddelde score
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-white p-8 text-center">
              <span className="text-5xl font-semibold tracking-tight">
                {werkspot.aantal}
              </span>
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-ink-soft">
                Beoordeelde projecten
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-white p-8 text-center">
              <span className="text-5xl font-semibold tracking-tight">
                {werkspot.vierOfVijfSterren}
              </span>
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-ink-soft">
                Gaf 4 of 5 sterren
              </p>
            </div>
          </FadeIn>
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Bron:{" "}
          <a
            href={werkspot.profielUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline underline-offset-4 hover:text-accent-dark"
          >
            Werkspot-profiel van MAN Tegelwerken
          </a>
          , {werkspot.aantal} beoordelingen, {werkspot.periode} — lees ze daar
          zelf na.
        </p>

        {/* De eerlijke kern */}
        <FadeIn>
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border-l-4 border-ink bg-mist p-8">
            <p className="text-lg font-semibold">
              Geen enkele kritische beoordeling gaat over de kwaliteit van het
              tegelwerk.
            </p>
            <p className="mt-3 text-ink-soft">
              In vier jaar tijd klaagde geen enkele klant over recht,
              waterpas, hechting, voeg of afwerking. De kritiek die er was,
              ging over communicatie en verwachtingen — en precies daar zijn{" "}
              <a
                href="/over-ons"
                className="font-semibold text-ink underline underline-offset-4 hover:text-accent-dark"
              >
                de vier beloften van Bouw MAN
              </a>{" "}
              uit voortgekomen.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Wat klanten consequent noemen */}
      <Section alt>
        <SectionHeader
          eyebrow="Terugkerende thema's"
          titel="Wat klanten steeds opnieuw noemen"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sterktes.map((s, i) => (
            <FadeIn key={s.titel} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <h3 className="text-lg font-semibold">{s.titel}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.tekst}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Zelf ervaren waarom klanten ons aanbevelen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Vraag vrijblijvend een offerte aan en ontdek hoe wij werken:
            helder, op tijd en tot in detail afgewerkt.
          </p>
          <div className="mt-8">
            <Button href="/contact">Vraag gratis offerte aan</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
