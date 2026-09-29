import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeader } from "@/components/Section";
import { beloften, sterktes, site, werkspot, werkwijze } from "@/lib/data";

export const metadata: Metadata = {
  title: "Over Bouw MAN — Tegelwerk sinds 1998",
  description:
    "Van MAN Tegelwerken naar Bouw MAN: tegelzetter sinds 1998, in Nederland sinds 2017. Dertig beoordeelde projecten, gemiddeld 4,4 uit 5 op Werkspot.",
};

export default function OverOnsPage() {
  return (
    <>
      {/* Het merkverhaal (Merkfundament, hoofdstuk 5 — lange versie) */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-dark">
              Over Bouw MAN
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl">
              Tegelwerk sinds 1998, in Nederland sinds 2017
            </h1>
            <div className="mt-6 space-y-4 text-lg text-ink-soft">
              <p>
                In 1998 zette {site.eigenaar} zijn eerste tegel. Twintig jaar
                later had hij er duizenden gezet — in nieuwbouw en in
                renovatie, onder omstandigheden waarin je leert improviseren
                zonder ooit in te leveren op recht en waterpas.
              </p>
              <p>
                In 2014 kwam hij naar Nederland. Negen maanden werkte hij bij
                tegelzetbedrijf Van Veen: niet omdat hij het vak nog moest
                leren, maar omdat elk land zijn eigen materialen, normen en
                gewoontes heeft. Op 15 juli 2017 schreef hij{" "}
                {site.voorheen} in bij de Kamer van Koophandel in{" "}
                {site.plaats}.
              </p>
              <p>
                Wat volgde, staat online. Dertig klanten beoordeelden het werk
                — van een toiletmuurtje van drie vierkante meter in Sneek tot
                negentig vierkante meter woonkamervloer in Garyp. Gemiddeld{" "}
                {werkspot.score} uit 5. Ze schreven over hoeken en naden die
                kloppen. Over een man die er al staat voordat de afspraak
                begint. Over een werkplek die aan het eind van de dag schoner
                is dan aan het begin. Over estrik-tegels die andere
                tegelzetters weigerden te leggen.
              </p>
              <p>
                En over iets wat we niet wegpoetsen: dat het Nederlands niet
                altijd meekwam met het vakmanschap, en dat niet elke afspraak
                duidelijk genoeg op papier stond.
              </p>
              <p>Daar is Bouw MAN uit voortgekomen.</p>
              <p>
                De naam is nieuw. De handen zijn dezelfde. Wat verandert, is
                alles eromheen: elke offerte zwart op wit, met precies erin wat
                er wel en niet bij zit. Een vaste prijs vooraf, geen
                verrassingen achteraf. Een oplevering die we samen aftekenen.
              </p>
              <p className="font-semibold text-ink">
                Vakmanschap sinds 1998, opnieuw opgebouwd rond één belofte:
                u weet vooraf wat u krijgt, en u krijgt het.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:sticky lg:top-24">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/images/over-ons-decortegels.jpg"
                alt="Inloopdouche met kleurrijke decortegels en mat-zwarte regendouche — tegelwerk door Bouw MAN"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Zes bewezen sterktes */}
      <Section alt>
        <SectionHeader
          eyebrow="Bewezen sterktes"
          titel="Wat dertig klanten uit eigen beweging opschreven"
          intro={`Deze zes eigenschappen komen niet uit een brainstorm, maar uit ${werkspot.aantal} onafhankelijke beoordelingen op Werkspot (${werkspot.periode}).`}
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

      {/* Vier beloften */}
      <Section>
        <SectionHeader
          eyebrow="Vier beloften"
          titel="Wat Bouw MAN anders doet"
          intro="Niet elke beoordeling was lovend — de kritiek ging nooit over het tegelwerk, wél over communicatie en verwachtingen. Dit is ons antwoord."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {beloften.map((b, i) => (
            <FadeIn key={b.titel} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <p className="text-sm font-semibold text-accent-dark">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{b.titel}</h3>
                <p className="mt-2 text-sm text-ink-soft">{b.tekst}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Werkwijze */}
      <Section alt>
        <SectionHeader
          eyebrow="Werkwijze"
          titel="Zo werken wij — van offerte tot oplevering"
          intro="Vier duidelijke stappen, zodat u altijd weet waar u aan toe bent."
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {werkwijze.map((w, i) => (
            <FadeIn key={w.stap} delay={i * 0.07}>
              <li className="h-full rounded-2xl border border-line bg-white p-7">
                <span className="text-3xl font-bold text-accent">{w.stap}</span>
                <h3 className="mt-3 font-semibold">{w.titel}</h3>
                <p className="mt-2 text-sm text-ink-soft">{w.tekst}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Kennismaken? Dat kan vrijblijvend.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Vraag een gratis offerte aan of stuur ons een appje — reactie
            binnen 24 uur, opname binnen een week.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Vraag gratis offerte aan</Button>
            <Button href={site.whatsapp} variant="secondary">
              Stuur een WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
