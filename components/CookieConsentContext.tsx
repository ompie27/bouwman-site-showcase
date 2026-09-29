"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { updateGoogleConsent } from "@/lib/googleConsent";
import {
  cookieConsentNaam,
  parseConsentCookie,
  serialiseerConsent,
  standaardConsent,
  type ConsentStatus,
} from "@/lib/cookieConsent";

type ContextType = {
  consent: ConsentStatus;
  /** true zodra de bezoeker ooit een keuze heeft gemaakt (ook "alleen noodzakelijk"). */
  heeftGekozen: boolean;
  toonInstellingen: boolean;
  accepteerAlles: () => void;
  accepteerAlleenNoodzakelijk: () => void;
  bewaarVoorkeuren: (consent: ConsentStatus) => void;
  openInstellingen: () => void;
  sluitInstellingen: () => void;
};

const CookieConsentContext = createContext<ContextType | null>(null);

function leesConsentCookie(): ConsentStatus | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${cookieConsentNaam}=([^;]*)`),
  );
  try {
    const ruw = match ? decodeURIComponent(match[1]) : null;
    return parseConsentCookie(ruw);
  } catch {
    return null;
  }
}

function schrijfConsentCookie(consent: ConsentStatus) {
  const waarde = serialiseerConsent(consent);
  const verloopt = new Date(
    Date.now() + 180 * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${cookieConsentNaam}=${encodeURIComponent(waarde)}; expires=${verloopt}; path=/; SameSite=Lax`;
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<ConsentStatus>(standaardConsent);
  // Start op 'true' (banner verborgen) zodat terugkerende bezoekers nooit
  // een flits zien; de useEffect hieronder corrigeert dit meteen na mount
  // als er nog geen keuze blijkt te zijn (dan verschijnt de banner alsnog,
  // met zijn eigen intro-animatie — geen zichtbaar verschil voor hen).
  const [heeftGekozen, setHeeftGekozen] = useState(true);
  const [toonInstellingen, setToonInstellingen] = useState(false);

  useEffect(() => {
    const opgeslagen = leesConsentCookie();
    updateGoogleConsent(opgeslagen ?? standaardConsent);
    if (opgeslagen) {
      setConsent(opgeslagen);
    } else {
      setHeeftGekozen(false);
    }
  }, []);

  function opslaanEnSluiten(nieuw: ConsentStatus) {
    // Direct doorgeven, ook bij intrekken, vóór een eventuele navigatie.
    updateGoogleConsent(nieuw);
    setConsent(nieuw);
    schrijfConsentCookie(nieuw);
    setHeeftGekozen(true);
    setToonInstellingen(false);
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        heeftGekozen,
        toonInstellingen,
        accepteerAlles: () =>
          opslaanEnSluiten({
            noodzakelijk: true,
            statistieken: true,
            marketing: true,
          }),
        accepteerAlleenNoodzakelijk: () =>
          opslaanEnSluiten({
            noodzakelijk: true,
            statistieken: false,
            marketing: false,
          }),
        bewaarVoorkeuren: opslaanEnSluiten,
        openInstellingen: () => setToonInstellingen(true),
        sluitInstellingen: () => setToonInstellingen(false),
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent moet binnen een CookieConsentProvider gebruikt worden",
    );
  }
  return ctx;
}
