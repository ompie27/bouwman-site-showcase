import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/Section";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Toegankelijkheid",
  description:
    "Toegankelijkheidsverklaring van Bouw MAN — wij streven naar een website die voor iedereen goed te gebruiken is.",
};

export default function ToegankelijkheidPage() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Toegankelijkheid"
        titel="Toegankelijkheidsverklaring"
        intro="Wij willen dat iedereen onze website goed kan gebruiken."
      />
      <div className="max-w-2xl space-y-4 text-ink-soft">
        {/* TODO: vervang deze placeholder door de definitieve verklaring. */}
        <p>
          Bouw MAN streeft ernaar dat deze website toegankelijk is voor iedereen,
          ook voor mensen die gebruikmaken van een schermlezer, toetsenbord­
          navigatie of vergroting. We letten op voldoende kleurcontrast, duidelijke
          koppen en bruikbare tekstalternatieven bij afbeeldingen.
        </p>
        <p>
          Loopt u tegen een probleem aan of heeft u een suggestie? Laat het ons
          weten via{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-ink hover:text-accent-dark"
          >
            {site.email}
          </a>
          , dan lossen we het zo snel mogelijk op.
        </p>
      </div>
    </Section>
  );
}
