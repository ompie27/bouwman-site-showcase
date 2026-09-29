"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useCookieConsent } from "@/components/CookieConsentContext";
import { soepel } from "@/components/FadeIn";
import type { ConsentStatus } from "@/lib/cookieConsent";

function Toggle({
  label,
  beschrijving,
  checked,
  onChange,
  vergrendeld = false,
}: {
  label: string;
  beschrijving: string;
  checked: boolean;
  onChange: (waarde: boolean) => void;
  vergrendeld?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-4 last:border-0">
      <div>
        <p className="font-semibold text-ink">{label}</p>
        <p className="mt-1 text-sm text-ink-soft">{beschrijving}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={vergrendeld}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-ink" : "bg-line"
        } ${vergrendeld ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

/** Cookiemelding bij eerste bezoek + instellingenpaneel (ook later
    opnieuw te openen via de footer-link "Cookie-instellingen"). */
export default function CookieConsentBanner() {
  const {
    consent,
    heeftGekozen,
    toonInstellingen,
    accepteerAlles,
    accepteerAlleenNoodzakelijk,
    bewaarVoorkeuren,
    sluitInstellingen,
    openInstellingen,
  } = useCookieConsent();

  const [voorkeur, setVoorkeur] = useState<ConsentStatus>(consent);

  // Zet lokale voorkeur terug op de huidige stand elke keer dat het paneel opent.
  useEffect(() => {
    if (toonInstellingen) setVoorkeur(consent);
  }, [toonInstellingen, consent]);

  return (
    <>
      {/* Onderste banner — alleen zolang er nog geen keuze is gemaakt. */}
      <AnimatePresence>
        {!heeftGekozen && !toonInstellingen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: soepel }}
            role="dialog"
            aria-label="Cookiemelding"
            className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl rounded-2xl border border-line bg-white p-6 shadow-lg sm:p-7"
          >
            <p className="font-semibold text-ink">
              Deze website gebruikt cookies
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              We gebruiken noodzakelijke cookies om de site goed te laten
              werken. Met uw toestemming gebruiken we ook cookies voor
              statistieken en, in de toekomst, gerichte advertenties.{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:text-ink"
              >
                Lees ons privacybeleid
              </a>
              .
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button onClick={accepteerAlles}>Alles accepteren</Button>
              <Button onClick={accepteerAlleenNoodzakelijk} variant="secondary">
                Alleen noodzakelijk
              </Button>
              <button
                type="button"
                onClick={openInstellingen}
                className="cursor-pointer text-sm font-semibold text-ink-soft underline underline-offset-2 hover:text-ink sm:ml-auto"
              >
                Voorkeuren aanpassen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instellingenpaneel — bij eerste bezoek via 'Voorkeuren aanpassen',
          of later via de 'Cookie-instellingen'-link in de footer. */}
      <AnimatePresence>
        {toonInstellingen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 p-4 sm:items-center"
            onClick={(e) => {
              if (e.target === e.currentTarget && heeftGekozen) {
                sluitInstellingen();
              }
            }}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: soepel }}
              role="dialog"
              aria-label="Cookie-instellingen"
              className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-xl"
            >
              <p className="text-lg font-semibold text-ink">
                Cookie-instellingen
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Kies welke cookies u toestaat. U past deze voorkeuren later
                altijd weer aan via de link onderaan de site.
              </p>

              <div className="mt-4">
                <Toggle
                  label="Noodzakelijk"
                  beschrijving="Nodig om de site te laten werken. Kan niet worden uitgezet."
                  checked
                  onChange={() => {}}
                  vergrendeld
                />
                <Toggle
                  label="Statistieken"
                  beschrijving="Helpen ons begrijpen hoe bezoekers de site gebruiken, zodat we hem kunnen verbeteren."
                  checked={voorkeur.statistieken}
                  onChange={(v) =>
                    setVoorkeur((p) => ({ ...p, statistieken: v }))
                  }
                />
                <Toggle
                  label="Marketing"
                  beschrijving="Voor het meten van Google Ads-advertenties en succesvolle offerteaanvragen, en voor gepersonaliseerde advertenties."
                  checked={voorkeur.marketing}
                  onChange={(v) =>
                    setVoorkeur((p) => ({ ...p, marketing: v }))
                  }
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => bewaarVoorkeuren(voorkeur)}>
                  Voorkeuren opslaan
                </Button>
                {heeftGekozen && (
                  <Button onClick={sluitInstellingen} variant="secondary">
                    Annuleren
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
