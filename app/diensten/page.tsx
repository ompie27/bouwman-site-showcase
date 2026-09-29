import type { Metadata } from "next";
import { BsCheckLg } from "react-icons/bs";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import ServiceCard from "@/components/ServiceCard";
import { Section, SectionHeader } from "@/components/Section";
import { diensten, kanInbegrepen } from "@/lib/data";

export const metadata: Metadata = {
  title: "Diensten — Wandtegels, vloertegels & badkamers",
  description:
    "Alle diensten van tegelbedrijf Bouw MAN: wandtegels plaatsen, vloertegels leggen, badkamers betegelen, grootformaat tegels, mozaïek, reparaties en egaliseren in Friesland en Groningen.",
};

export default function DienstenPage() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Diensten"
          titel="Alles op het gebied van tegelwerk"
          intro="Van wandtegels plaatsen tot complete badkamers betegelen: één specialist voor het hele traject, in Friesland en Groningen."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {diensten.map((d, i) => (
            <FadeIn key={d.slug} delay={(i % 3) * 0.05}>
              <ServiceCard dienst={d} uitgebreid prioriteit={i < 3} />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Alles bespreekbaar — scope per klus, zwart op wit in de offerte */}
      <Section alt>
        <SectionHeader
          eyebrow="Alles is bespreekbaar"
          titel="Van losse klus tot complete renovatie"
          intro="Wat inbegrepen is, bepalen we samen — per klus. Een complete badkamerrenovatie van ontwerp tot en met de laatste tegel? Kan. Alleen het tegelwerk terwijl u zelf sloopt? Kan ook."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-2xl border border-line bg-white p-8">
              <h3 className="text-lg font-semibold">
                Alles kan inbegrepen zijn
              </h3>
              <ul className="mt-4 space-y-3">
                {kanInbegrepen.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft">
                    <BsCheckLg
                      className="mt-1 h-4 w-4 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-ink p-8 text-white">
              <div>
                <h3 className="text-lg font-semibold">
                  En zo blijft het helder
                </h3>
                <p className="mt-4 leading-relaxed text-white/75">
                  Welke scope u ook kiest: in de offerte staat het zwart op
                  wit, in twee kolommen — dit zit erbij, en dit zit er niet
                  bij. Zo weet u vooraf precies wat u krijgt, zonder
                  verrassingen op de dag zelf.
                </p>
                <p className="mt-4 leading-relaxed text-white/75">
                  Vertel ons wat u voor ogen heeft, dan denken we mee over de
                  slimste aanpak — en wat u eventueel zelf kunt doen om kosten
                  te besparen.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="light">
                  Bespreek uw klus
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Staat uw klus er niet tussen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Vertel ons wat u voor ogen heeft — grote kans dat we u kunnen
            helpen. U ontvangt binnen één werkdag een vrijblijvende offerte.
          </p>
          <div className="mt-8">
            <Button href="/contact">Vraag gratis offerte aan</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
