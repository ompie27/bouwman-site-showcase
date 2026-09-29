/* Cookie-toestemming: types en pure helpers (geen "use client" — dit
   bestand wordt ook server-side gelezen in app/layout.tsx via
   next/headers, zodat de banner nooit hoeft te "flitsen" bij het
   laden van de pagina). */

export type ConsentStatus = {
  noodzakelijk: true; // altijd aan, geen keuze mogelijk
  statistieken: boolean;
  marketing: boolean;
};

export const cookieConsentNaam = "bouwman_cookie_consent";

/* Ophogen zodra de categorieën wijzigen — dwingt een nieuwe vraag af
   bij bestaande bezoekers, ook als hun oude cookie nog geldig is. */
export const cookieConsentVersie = 1;

export const standaardConsent: ConsentStatus = {
  noodzakelijk: true,
  statistieken: false,
  marketing: false,
};

type OpgeslagenConsent = {
  statistieken: boolean;
  marketing: boolean;
  versie: number;
};

export function parseConsentCookie(
  ruw: string | undefined | null,
): ConsentStatus | null {
  if (!ruw) return null;
  try {
    const data = JSON.parse(ruw) as OpgeslagenConsent;
    if (data.versie !== cookieConsentVersie) return null;
    return {
      noodzakelijk: true,
      statistieken: !!data.statistieken,
      marketing: !!data.marketing,
    };
  } catch {
    return null;
  }
}

export function serialiseerConsent(consent: ConsentStatus): string {
  const data: OpgeslagenConsent = {
    statistieken: consent.statistieken,
    marketing: consent.marketing,
    versie: cookieConsentVersie,
  };
  return JSON.stringify(data);
}
