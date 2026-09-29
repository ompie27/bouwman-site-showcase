import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import QuoteForm from "@/components/QuoteForm";
import WerkgebiedKaart from "@/components/WerkgebiedKaart";
import { Section, SectionHeader } from "@/components/Section";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & gratis offerte",
  description:
    "Neem contact op met tegelbedrijf Bouw MAN voor een gratis offerte. Bel, mail of app ons — werkzaam in Friesland, Groningen en omliggende regio's.",
};

export default function ContactPage() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Contact"
          titel="Neem contact op of vraag direct een offerte aan"
          intro="Reactie binnen 24 uur, opname binnen een week — hoe u ons ook bereikt."
        />
        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Contactgegevens */}
          <FadeIn className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold">Contactgegevens</h2>
                <ul className="mt-4 space-y-3 text-ink-soft">
                  <li>
                    Telefoon:{" "}
                    <a
                      href={site.telefoonLink}
                      className="font-semibold text-ink hover:text-accent-dark"
                    >
                      {site.telefoon}
                    </a>
                  </li>
                  <li>
                    WhatsApp:{" "}
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-ink hover:text-accent-dark"
                    >
                      stuur een bericht
                    </a>
                  </li>
                  <li>
                    E-mail:{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="font-semibold text-ink hover:text-accent-dark"
                    >
                      {site.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Werkgebied</h2>
                <p className="mt-3 text-ink-soft">
                  Kernwerkgebied: {site.werkgebied} — onder andere Sneek,
                  Leeuwarden, Drachten, Heerenveen, Lemmer, Heeg en Groningen.
                  Ook actief in Drenthe en Overijssel, en bij grotere projecten
                  door heel Nederland: er is aantoonbaar gewerkt in 22 plaatsen,
                  van Sneek tot Bloemendaal.
                </p>
                <WerkgebiedKaart />
              </div>
            </div>
          </FadeIn>

          {/* Formulier */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
              <QuoteForm titel="Stuur ons een bericht" />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
