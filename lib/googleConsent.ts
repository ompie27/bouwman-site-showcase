import { standaardConsent, type ConsentStatus } from "./cookieConsent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    bouwmanConsentInitialized?: boolean;
  }
}

function googleConsent(consent: ConsentStatus) {
  return {
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    analytics_storage: consent.statistieken ? "granted" : "denied",
  };
}

// Alleen een lokale wachtrij: dit laadt geen Google-script.
// De standaardtoestemming staat vóór GTM in de head; de provider werkt keuzes bij.
export function updateGoogleConsent(consent: ConsentStatus) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (..._args: unknown[]) {
    window.dataLayer.push(arguments);
  };

  if (!window.bouwmanConsentInitialized) {
    window.gtag("consent", "default", googleConsent(standaardConsent));
    window.bouwmanConsentInitialized = true;
  }

  window.gtag("consent", "update", googleConsent(consent));
}
