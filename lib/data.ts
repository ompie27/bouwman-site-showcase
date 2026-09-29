/* ============================================
   Bouw MAN — Centrale content
   Alle teksten, diensten, projecten en reviews
   staan hier. Content aanpassen = alleen dit
   bestand wijzigen.
   ============================================ */

/* Feiten uit het Merkfundament (docs/Bouw_MAN_Merkfundament.pdf).
   Elke claim hieronder is verifieerbaar — zie dat document voor de bronnen. */
export const site = {
  naam: "Bouw MAN",
  voorheen: "MAN Tegelwerken",
  eigenaar: "Moammar Abu Nabbout",
  kvk: "93077289",
  slogan: "Specialist in professioneel tegelwerk",
  url: "https://bouwmantegelwerk.nl",
  vakSinds: 1998, // tegelzetter sinds 1998 (buitenland)
  nlSinds: 2017, // KvK-inschrijving Sneek: 15 juli 2017
  telefoon: "+31 6 30327483",
  telefoonLink: "tel:+31630327483",
  email: "info@bouwmantegelwerk.nl",
  whatsapp: "https://wa.me/31630327483",
  werkgebied: "Friesland en Groningen",
  plaats: "Sneek",
};

/* Ontvangers van het offerte-/contactformulier. Verzending loopt via
   onze eigen API-route (app/api/offerte) met eigen SMTP — geen externe
   formulierdienst. SMTP-instellingen staan in .env.local. */
export const formulier = {
  ontvangers: [
    "info@bouwmantegelwerk.nl",
  ],
};

/* Onafhankelijk geverifieerde beoordelingen. De cijfers zijn vrij te
   noemen mits de bron erbij staat (zie Merkfundament, slotkader). */
export const werkspot = {
  score: "4,4",
  maxScore: 5,
  aantal: 30,
  periode: "2019–2023",
  vierOfVijfSterren: "87%", // 26 van de 30 beoordelingen
  profielUrl: "https://www.werkspot.nl/profiel/man-tegelwerken/reviews",
};

/* Tijdloos: het aantal jaren vakmanschap wordt berekend, nooit
   hardgecodeerd — zo veroudert de tekst niet. (Bij een statische
   build wordt dit per build vastgelegd.) */
export const jarenVakmanschap = new Date().getFullYear() - site.vakSinds;

/* Cijferband — alle drie verifieerbaar (Merkfundament, hoofdstuk 1).
   Jaren vakmanschap wordt berekend, zodat het cijfer nooit veroudert. */
export const cijfers = [
  { getal: `${jarenVakmanschap}`, label: "Jaar vakmanschap" },
  { getal: "30", label: "Beoordeelde projecten" },
  { getal: "22", label: "Plaatsen aantoonbaar gewerkt" },
] as const;

/* Partners & leveranciers — bedrijven waar daadwerkelijk mee wordt
   samengewerkt en waar materialen vandaan komen.
   TODO: exacte bedrijfsnamen controleren + echte logo's aanleveren
   (dan tonen we die in plaats van de tekst-wordmarks). */
export const partners = [
  { naam: "BMN Bouwmaterialen", rol: "Bouwmaterialen" },
  { naam: "Julius van der Werf", rol: "Tegels & sanitair" },
  { naam: "Tegelzetbedrijf Van Veen", rol: "Samenwerkingspartner" },
  { naam: "Stukadoors Vrouwen", rol: "Stukadoorswerk" },
] as const;

/* Zes bewezen sterktes — rechtstreeks uit 30 Werkspot-beoordelingen
   (Merkfundament, hoofdstuk 2). Geen brainstorm, maar wat klanten
   uit eigen beweging opschreven. */
export const sterktes = [
  {
    titel: "Precisie in de afwerking",
    tekst:
      "Het verschil tussen goed en vakwerk zit in de hoeken, de naden en de aansluitingen. Daar kijken wij het langst naar — het meest herhaalde compliment in de beoordelingen.",
  },
  {
    titel: "Afspraak is afspraak",
    tekst:
      "Wij komen op de afgesproken dag, op de afgesproken tijd. Vaak eerder. Punctualiteit wordt in meer dan tien van de dertig beoordelingen apart genoemd.",
  },
  {
    titel: "Rust op de bouwplaats",
    tekst:
      "Geen haast, geen chaos, geen rommel. De werkplek is aan het eind van de dag schoner dan aan het begin — 'rustig' en 'netjes' keren als vaste combinatie terug.",
  },
  {
    titel: "Werk dat anderen laten liggen",
    tekst:
      "Estrik-vloertegels die niet iedere tegelzetter wil of kan leggen, en XXL-formaten gesneden op een eigen tegelsnijder van 130 cm.",
  },
  {
    titel: "Snel beschikbaar",
    tekst:
      "Snelle opname, snelle prijs, snelle start. Klanten beschrijven dat er binnen twee dagen na de prijsopgave kon worden gestart.",
  },
  {
    titel: "Een eerlijke prijs",
    tekst:
      "Een reële, vaste prijs voor vakwerk — vooraf duidelijk. Niet de goedkoopste, wel de scherpste voor deze kwaliteit.",
  },
] as const;

/* Vier beloften — het concrete antwoord op de vier kritische
   beoordelingen (Merkfundament, hoofdstuk 3). */
export const beloften = [
  {
    titel: "Alles zwart op wit",
    tekst:
      "Elke afspraak staat op papier voordat er één tegel de deur uit gaat. U hoeft nooit terug te vallen op wat er aan de keukentafel is gezegd — u heeft het in uw mailbox staan.",
  },
  {
    titel: "U weet vooraf precies wat u krijgt",
    tekst:
      "Elke offerte heeft twee kolommen: dit zit erbij, en dit zit er niet bij. Geen verrassingen op de dag zelf.",
  },
  {
    titel: "Wij leveren compleet op",
    tekst:
      "Bouw MAN gaat pas weg als de klus af is. Niet als de tegels zitten — als de klus af is. De oplevering lopen we samen na en tekenen we samen af.",
  },
  {
    titel: "U betaalt voor het resultaat, niet voor de uren",
    tekst:
      "Wij rekenen per vierkante meter of per project, met een vaste prijs vooraf. Snel werken is ons vak — daar wordt u niet voor gestraft.",
  },
] as const;

/* Alles is bespreekbaar — de scope bepalen we per klus, samen met de
   klant. Wat er afgesproken wordt, staat vervolgens zwart op wit in
   de offerte (Merkfundament, belofte 3.2). */
export const kanInbegrepen = [
  "Ontwerp en advies — van tegelkeuze tot legpatroon",
  "Sloopwerk en afvoer van puin",
  "Egaliseren van vloeren en wanden",
  "Voorstrijk, lijm, voegwerk en kitranden",
  "Hoekprofielen en afwerking",
  "Sanitair plaatsen, aansluiten en kitten",
  "Levering van tegels en materialen",
] as const;

export type Dienst = {
  slug: string;
  titel: string;
  kort: string;
  lang: string;
  image: string;
};

export const diensten: Dienst[] = [
  {
    slug: "wandtegels",
    titel: "Wandtegels plaatsen",
    kort: "Strak wandtegelwerk in badkamer, keuken of toilet — perfect uitgelijnd.",
    lang: "Van klassiek wit tot grootformaat keramiek: wij plaatsen wandtegels perfect vlak en uitgelijnd, met zuiver voegwerk en nette aansluitingen op kozijnen en sanitair.",
    image: "/images/diensten/wandtegels-decor.jpg",
  },
  {
    slug: "vloertegels",
    titel: "Vloertegels leggen",
    kort: "Vloertegels vlak en duurzaam gelegd, ook op vloerverwarming.",
    lang: "Wij leggen vloertegels in elke ruimte, ook boven vloerverwarming. Altijd op een perfect voorbereide ondergrond — het grootste beoordeelde project telt 90 m² woonkamervloer.",
    image: "/images/diensten/vloertegels.jpg",
  },
  {
    slug: "badkamers",
    titel: "Badkamers betegelen",
    kort: "Complete badkamerrenovaties — van ontwerp tot en met de laatste tegel.",
    lang: "De badkamer is ons specialisme: complete renovaties van ontwerp en tegelkeuze tot oplevering. Waterdichting (kimband), wanden, vloeren, nissen en inloopdouches — en het plaatsen, aansluiten en kitten van het sanitair.",
    image: "/images/projecten/badkamer-visgraat-wit.jpg",
  },
  {
    slug: "toiletten",
    titel: "Toiletten betegelen",
    kort: "Compacte ruimtes, maximaal resultaat — strak betegelde toiletten.",
    lang: "Juist in een kleine ruimte telt elk detail. Wij betegelen toiletruimtes strak en onderhoudsvriendelijk, inclusief nette afwerking rond het sanitair.",
    image: "/images/projecten/toilet-nis-zwart.jpg",
  },
  {
    slug: "keukens",
    titel: "Keukens betegelen",
    kort: "Keukenwanden en -vloeren, hittebestendig en makkelijk schoon.",
    lang: "Een keukenachterwand of -vloer moet tegen een stootje kunnen. Wij plaatsen tegelwerk dat mooi is én praktisch: hittebestendig, vetbestendig en eenvoudig schoon te houden.",
    image: "/images/projecten/keuken-hexagon-roze.jpg",
  },
  {
    slug: "grootformaat-tegels",
    titel: "Grootformaat tegels",
    kort: "Grootformaat en XXL-tegels — minimale voegen, maximale rust.",
    lang: "Grootformaat tegels vragen om specialistische kennis: een perfect vlakke ondergrond, dubbele verlijming en millimeterwerk. XXL-formaten snijden we op onze eigen tegelsnijder van 130 cm.",
    image: "/images/projecten/grootformaat-nis.jpg",
  },
  {
    slug: "bijzonder-tegelwerk",
    titel: "Bijzonder tegelwerk",
    kort: "Estrik, XXL-formaten en tegels waar anderen nee tegen zeggen.",
    lang: "Wij hebben het materieel en de ervaring voor tegelwerk dat andere bedrijven laten liggen: onregelmatige estrik-vloertegels, XXL-formaten tot 114 × 20 cm en bijzondere patronen — gesneden op een eigen tegelsnijder van 130 cm.",
    image: "/images/projecten/toilet-hexagon.jpg",
  },
  {
    slug: "mozaiek",
    titel: "Mozaïek",
    kort: "Fijn mozaïekwerk als eyecatcher in douche, nis of achterwand.",
    lang: "Mozaïek geeft karakter aan douchevloeren, nissen en achterwanden. Precisiewerk waar wij graag de tijd voor nemen — strak gelegd en perfect gevoegd.",
    image: "/images/diensten/mozaiek.jpg",
  },
  {
    slug: "tegelreparaties",
    titel: "Tegelreparaties",
    kort: "Gebarsten tegel of loszittend voegwerk? Wij herstellen het onzichtbaar.",
    lang: "Een kapotte tegel of beschadigd voegwerk hoeft geen complete renovatie te betekenen. Wij vervangen losse tegels en herstellen voegen — vrijwel onzichtbaar.",
    image: "/images/diensten/reparaties-tegel.jpg",
  },
  {
    slug: "egaliseren",
    titel: "Egaliseren",
    kort: "Een perfect vlakke ondergrond — de basis van elk goed tegelwerk.",
    lang: "Goed tegelwerk begint met een vlakke ondergrond. Wij egaliseren vloeren en wanden vakkundig, zodat tegels — juist ook grootformaat — perfect gelegd kunnen worden.",
    image: "/images/diensten/egaliseren.jpg",
  },
  {
    slug: "buitentegels",
    titel: "Buitentegels",
    kort: "Terrassen en balkons met vorstbestendige keramische tegels.",
    lang: "Keramische buitentegels zijn kleurvast, vorstbestendig en onderhoudsarm. Wij leggen terrassen en balkons op de juiste opbouw, met goede afwatering.",
    image: "/images/diensten/buitentegels.jpg",
  },
];

export type Categorie =
  | "Badkamers"
  | "Toiletten"
  | "Keukens"
  | "Vloeren"
  | "Buitenprojecten"
  | "Grootformaat";

/* Alleen categorieën met foto's tonen we als filter.
   Buitenprojecten weer toevoegen zodra er foto's van zijn. */
export const categorieen: Categorie[] = [
  "Badkamers",
  "Toiletten",
  "Keukens",
  "Vloeren",
  "Grootformaat",
];

export type Project = {
  id: string;
  titel: string;
  categorie: Categorie;
  plaats: string;
  beschrijving: string;
  image: string;
  voorNa?: { voor: string; na: string };
};

// Echte projectfoto's. TODO: plaatsnamen controleren/aanpassen per project.
export const projecten: Project[] = [
  {
    id: "badkamer-visgraat-wit",
    titel: "Douche met witte visgraat",
    categorie: "Badkamers",
    plaats: "Sneek",
    beschrijving:
      "Handvorm wandtegels in visgraat gelegd, gecombineerd met stenen-look en een mat-zwart regendouchesysteem.",
    image: "/images/projecten/badkamer-visgraat-wit.jpg",
  },
  {
    id: "badkamer-zolder",
    titel: "Zolderbadkamer betonlook",
    categorie: "Badkamers",
    plaats: "Leeuwarden",
    beschrijving:
      "Badkamer onder schuine kap, volledig betegeld met betonlook — inclusief opgemetselde en betegelde traptreden.",
    image: "/images/projecten/badkamer-zolder.jpg",
  },
  {
    id: "badkamer-terracotta",
    titel: "Terracotta douchewanden",
    categorie: "Badkamers",
    plaats: "Groningen",
    beschrijving:
      "Terracotta strips in visgraatpatroon over twee wanden, gecombineerd met een antracieten vloer op afschot.",
    image: "/images/projecten/badkamer-terracotta.jpg",
  },
  {
    id: "badkamer-bloemen",
    titel: "Inloopdouche met bloemendecor",
    categorie: "Badkamers",
    plaats: "Drachten",
    beschrijving:
      "Decorwand met bloemmotief als eyecatcher in de inloopdouche, met verlichte nis en mat-zwarte regendouche.",
    image: "/images/projecten/badkamer-bloemendecor.jpg",
  },
  {
    id: "badkamer-contrast",
    titel: "Douche in zwart-wit contrast",
    categorie: "Badkamers",
    plaats: "Heeg",
    beschrijving:
      "Antraciete natuursteenlook vloer- en wandtegels tegenover glanzend wit — tijdloos contrast met chromen doucheset.",
    image: "/images/projecten/badkamer-contrast.jpg",
  },
  {
    id: "toilet-hexagon",
    titel: "Toilet met hexagon accentwand",
    categorie: "Toiletten",
    plaats: "Groningen",
    beschrijving:
      "Petrolblauwe hexagontegels als accentwand naast marmerlook wanden en vloer — hier vlak voor de afmontage van het sanitair.",
    image: "/images/projecten/toilet-hexagon.jpg",
  },
  {
    id: "vloer-houtlook",
    titel: "Keramisch parket woonverdieping",
    categorie: "Vloeren",
    plaats: "Heerenveen",
    beschrijving:
      "Houtlook tegelplanken doorgelegd over de hele woonverdieping — de warmte van hout, het gemak van keramiek.",
    image: "/images/projecten/vloer-houtlook.jpg",
  },
  {
    id: "toilet-nis-zwart",
    titel: "Toilet met verlichte nis",
    categorie: "Toiletten",
    plaats: "Sneek",
    beschrijving:
      "Stenen-look wandtegels met een mat-zwarte inbouwnis met verlichting boven het zwevend toilet.",
    image: "/images/projecten/toilet-nis-zwart.jpg",
  },
  {
    id: "toilet-beige",
    titel: "Warm beige gastentoilet",
    categorie: "Toiletten",
    plaats: "Heerenveen",
    beschrijving:
      "Compact toilet in warme beigetinten met zwevend toilet, hoekfontein en zwarte accenten.",
    image: "/images/projecten/toilet-beige.jpg",
  },
  {
    id: "keuken-hexagon-roze",
    titel: "Keukenachterwand hexagon",
    categorie: "Keukens",
    plaats: "Lemmer",
    beschrijving:
      "Roze hexagontegels als volledige keukenachterwand — speels patroon, strak rond de afzuigkap gewerkt.",
    image: "/images/projecten/keuken-hexagon-roze.jpg",
  },
  {
    id: "keuken-visgraat-blauw",
    titel: "Keukenachterwand visgraat blauw",
    categorie: "Keukens",
    plaats: "Garyp",
    beschrijving:
      "Blauwgroene handvormtegels in visgraat als achterwand — levendig kleurenspel, netjes om alle aansluitingen heen.",
    image: "/images/projecten/keuken-visgraat.jpg",
  },
  {
    id: "grootformaat-marmerlook",
    titel: "Marmerlook met gouden nis",
    categorie: "Grootformaat",
    plaats: "Sneek",
    beschrijving:
      "Donkere marmerlook tegels 60×120 met een verlichte nis in goudkleurige visgraat — een luxe eyecatcher.",
    image: "/images/projecten/grootformaat-nis.jpg",
  },
];

export const werkwijze = [
  {
    stap: "01",
    titel: "Kennismaking & opname",
    tekst:
      "Reactie binnen 24 uur, opname binnen een week. Direct bij de eerste afspraak liggen een reële prijs en een startdatum op tafel.",
  },
  {
    stap: "02",
    titel: "Offerte zwart op wit",
    tekst:
      "U ontvangt de offerte per e-mail vóór aanvang — met twee kolommen: wat er wél bij zit en wat niet. Vaste projectprijs, geen uurtje-factuurtje.",
  },
  {
    stap: "03",
    titel: "Uitvoering",
    tekst:
      "We werken rustig en netjes, dekken alles af en laten de werkplek elke dag opgeruimd achter. Strak tegelwerk, zonder verrassingen.",
  },
  {
    stap: "04",
    titel: "Complete oplevering",
    tekst:
      "We lopen de opleveringschecklist samen door en tekenen hem samen af: voegwerk schoon, kitranden gezet, hoekafwerking compleet, werkplek opgeruimd.",
  },
] as const;

export const typesKlus = [
  "Badkamer betegelen",
  "Vloertegels leggen",
  "Wandtegels plaatsen",
  "Toilet betegelen",
  "Keuken betegelen",
  "Grootformaat tegels",
  "Buitentegels / terras",
  "Tegelreparatie",
  "Egaliseren",
  "Anders",
] as const;
