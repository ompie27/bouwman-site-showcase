import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { CookieConsentProvider } from "@/components/CookieConsentContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarketingScripts from "@/components/MarketingScripts";
import MotionProvider from "@/components/MotionProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site, werkspot } from "@/lib/data";

/* Houdt de browserbalk/statusbalk licht (o.a. iOS Safari). */
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bouw MAN — Tegelzetter in Friesland & Groningen",
    template: "%s | Bouw MAN",
  },
  description:
    "Bouw MAN (voorheen MAN Tegelwerken) is uw tegelbedrijf voor Friesland en Groningen. Tegelwerk sinds 1998, in Nederland sinds 2017 — 30 beoordeelde projecten, gemiddeld 4,4/5 op Werkspot.",
  keywords: [
    "Tegelzetter Friesland",
    "Tegelzetter Groningen",
    "Tegelzetter Sneek",
    "Badkamer betegelen",
    "Vloertegels leggen",
    "Wandtegels plaatsen",
    "Grootformaat tegels",
    "Tegelbedrijf Friesland",
    "Tegelbedrijf Groningen",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.naam,
    title: "Bouw MAN — Tegelzetter in Friesland & Groningen",
    description:
      "Tegelwerk sinds 1998, in Nederland sinds 2017. Badkamers, vloeren, wandtegels en bijzonder tegelwerk — 4,4/5 op Werkspot.",
    images: [
      {
        url: "/images/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Bouw MAN — tegelwerk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bouw MAN — Tegelzetter in Friesland & Groningen",
    description:
      "Tegelwerk sinds 1998. Badkamers, vloeren, wandtegels en bijzonder tegelwerk — 4,4/5 op Werkspot.",
    images: ["/images/og-logo.png"],
  },
};

/* Structured data voor Google: lokaal bouwbedrijf, met de verifieerbare
   kerngegevens (KvK, voormalige naam, werkgebied, Werkspot-profiel). */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.naam,
  alternateName: site.voorheen,
  description:
    "Tegelbedrijf voor Friesland en Groningen. Tegelwerk sinds 1998, in Nederland sinds 2017.",
  url: site.url,
  telephone: "+31630327483",
  email: site.email,
  foundingDate: "2017-07-15",
  founder: { "@type": "Person", name: site.eigenaar },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.plaats,
    addressRegion: "Friesland",
    addressCountry: "NL",
  },
  areaServed: ["Friesland", "Groningen"],
  identifier: {
    "@type": "PropertyValue",
    name: "KvK-nummer",
    value: site.kvk,
  },
  sameAs: [werkspot.profielUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" data-scroll-behavior="smooth">
      <head>
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
window.bouwmanConsentInitialized = true;
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PB3L32LN');`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ink">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PB3L32LN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Wit vlak bóven de paginarand: bij het omlaag trekken
            (bounce) zie je wit i.p.v. de donkere canvas-kleur. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[-120vh] h-[120vh] bg-white"
        />
        <CookieConsentProvider>
          <MotionProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </MotionProvider>
          <CookieConsentBanner />
          <MarketingScripts />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
