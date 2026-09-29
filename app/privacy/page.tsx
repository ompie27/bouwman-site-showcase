import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/Section";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Privacybeleid van Bouw MAN — hoe wij omgaan met uw gegevens bij offerteaanvragen en contact.",
};

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Privacy"
        titel="Privacybeleid"
        intro="Hoe Bouw MAN omgaat met de gegevens die u met ons deelt."
      />
      <div className="max-w-2xl space-y-4 text-ink-soft">
        <h2 className="pt-4 text-xl font-semibold text-ink">Offerteaanvragen en contact</h2>
        <p>
          Bouw MAN verwerkt de gegevens die u zelf achterlaat bij een
          offerteaanvraag of contactverzoek — zoals uw naam, telefoonnummer,
          e-mailadres en een omschrijving van uw klus. Deze gegevens gebruiken we
          om uw aanvraag te behandelen en contact met u op te nemen.
        </p>
        <p>
          Voor de werking van de website en het versturen van uw aanvraag maken
          we gebruik van hosting- en e-maildiensten van STRATO. Deze diensten
          verwerken de gegevens die daarvoor nodig zijn. We bewaren uw
          aanvraaggegevens niet langer dan nodig voor de behandeling van uw
          aanvraag en eventuele wettelijke verplichtingen.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-ink">Uw gegevens en keuzes</h2>
        <p>
          Wilt u uw persoonsgegevens inzien, corrigeren of laten verwijderen,
          of heeft u een vraag over het gebruik ervan? Neem dan contact op via{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-ink hover:text-accent-dark"
          >
            {site.email}
          </a>
          .
        </p>

        <h2 className="pt-4 text-xl font-semibold text-ink">Cookies</h2>
        <p>
          Onze cookiemelding onderscheidt drie categorieën. U kiest zelf welke u
          toestaat via de cookiemelding of de{" "}
          <span className="font-semibold text-ink">
            Cookie-instellingen
          </span>{" "}
          onderaan elke pagina. Daar kunt u uw toestemming ook weer intrekken.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-ink">Noodzakelijk</span> —
            nodig om de site te laten werken, bijvoorbeeld om uw
            cookievoorkeur te onthouden. Deze staan altijd aan. Uw
            cookievoorkeur wordt 180 dagen bewaard.
          </li>
          <li>
            <span className="font-semibold text-ink">Statistieken</span> —
            helpen ons begrijpen hoe bezoekers de site gebruiken. Worden
            alleen geplaatst met uw toestemming.
          </li>
          <li>
            <span className="font-semibold text-ink">Marketing</span> — voor
            het meten van Google Ads-advertenties en, met uw toestemming,
            gepersonaliseerde advertenties. Advertentiecookies mogen alleen
            worden gebruikt als u toestemming geeft voor marketing.
          </li>
        </ul>
        <h2 className="pt-4 text-xl font-semibold text-ink">Google Ads en Tag Manager</h2>
        <p>
          We gebruiken Google Tag Manager om onze Google-tags te beheren en
          Google Ads om de resultaten van advertenties te meten. Met uw
          marketingtoestemming geeft de website aan Google door wanneer een
          offerteaanvraag succesvol is verstuurd. Dit gebeurt na bevestiging
          door onze server, niet alleen bij het klikken op de verzendknop.
          Dit conversiebericht bevat geen naam, e-mailadres, telefoonnummer
          of tekst uit uw aanvraag.
        </p>
        <p>
          Google Tag Manager wordt bij het openen van de website geladen.
          Via Google Consent Mode geven we uw toestemmingskeuzes door.
          Zonder toestemming staan advertentie- en statistiekopslag standaard
          uit. Afhankelijk van de actieve Google-tags kunnen wel beperkte
          signalen zonder cookies naar Google worden verzonden, bijvoorbeeld
          over uw toestemmingsstatus en paginabezoek. Zonder toestemming is
          er dus niet noodzakelijk helemaal geen gegevensverkeer met Google.
        </p>
        <p>
          Meer informatie over de verwerking door Google vindt u in het{" "}
          <a href="https://policies.google.com/privacy" className="font-semibold text-ink hover:text-accent-dark">
            privacybeleid van Google
          </a>.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-ink">Interactieve kaart</h2>
        <p>
          De interactieve kaart op onze contactpagina wordt geleverd door
          Mapbox. Voor het laden van deze kaart is technisch gegevensverkeer
          met Mapbox nodig. Daarbij ontvangt Mapbox technische gegevens, zoals
          uw IP-adres. Meer informatie vindt u in het{" "}
          <a href="https://www.mapbox.com/legal/privacy" className="font-semibold text-ink hover:text-accent-dark">
            privacybeleid van Mapbox
          </a>.
        </p>
      </div>
    </Section>
  );
}
