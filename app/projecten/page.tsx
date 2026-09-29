import type { Metadata } from "next";
import Button from "@/components/Button";
import ProjectGallery from "@/components/ProjectGallery";
import { Section, SectionHeader } from "@/components/Section";

export const metadata: Metadata = {
  title: "Projecten — Portfolio tegelwerk",
  description:
    "Bekijk het tegelwerk van Bouw MAN: badkamers, toiletten, keukens, vloeren, buitenprojecten en grootformaat tegels in Friesland en Groningen. Met voor/na-foto's.",
};

export default function ProjectenPage() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Projecten"
          titel="Ons werk in beeld"
          intro="Filter op categorie en schuif over de voor/na-foto's. Elk project is uitgevoerd met dezelfde standaard: strak, vlak en tot in detail afgewerkt."
        />
        <ProjectGallery />
      </Section>

      <Section alt>
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Ziet u hier iets wat u ook wilt?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Stuur een foto van uw ruimte via WhatsApp of vraag direct een
            gratis offerte aan — we denken graag met u mee.
          </p>
          <div className="mt-8">
            <Button href="/contact">Vraag gratis offerte aan</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
