"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import { useCookieConsent } from "@/components/CookieConsentContext";
import { site, typesKlus } from "@/lib/data";

type Errors = Partial<Record<"naam" | "email" | "telefoon" | "typeKlus", string>>;

/** Offerte-/contactformulier. Verzending via onze eigen API-route
    (app/api/offerte) met eigen SMTP — geen externe formulierdienst. */
export default function QuoteForm({ titel = "Vraag een gratis offerte aan" }: { titel?: string }) {
  const { consent } = useCookieConsent();
  const actueleConsent = useRef(consent);
  actueleConsent.current = consent;
  const aanvraagGestart = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [verzonden, setVerzonden] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [mislukt, setMislukt] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (aanvraagGestart.current) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const nieuw: Errors = {};
    if (!data.naam || data.naam.trim().length < 2) {
      nieuw.naam = "Vul uw naam in.";
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      nieuw.email = "Vul een geldig e-mailadres in.";
    }
    if (data.telefoon && data.telefoon.replace(/\D/g, "").length < 9) {
      nieuw.telefoon = "Vul een geldig telefoonnummer in.";
    }
    if (!data.typeKlus) {
      nieuw.typeKlus = "Kies het type klus.";
    }

    setErrors(nieuw);
    if (Object.keys(nieuw).length > 0) return;

    // Honeypot ingevuld? Dan is het een bot — stilletjes "slagen".
    if (data._honey) {
      setVerzonden(true);
      return;
    }

    aanvraagGestart.current = true;
    setBezig(true);
    setMislukt(false);
    try {
      const res = await fetch("/api/offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: data.naam,
          email: data.email,
          telefoon: data.telefoon,
          typeKlus: data.typeKlus,
          bericht: data.bericht,
          _honey: data._honey,
        }),
      });
      if (!res.ok) throw new Error(`offerte-api: ${res.status}`);
      const resultaat = await res.json();
      if (resultaat.ok !== true) throw new Error("offerte-api: geen bevestiging");
      setVerzonden(true);
      form.reset();

      // Alleen na bevestigde verzending; geen formuliergegevens naar Google.
      // Een trackingfout mag een geslaagde aanvraag niet als mislukt tonen.
      if (actueleConsent.current.marketing) {
        try {
          window.gtag?.("event", "conversion", {
            send_to: "AW-18443378044/PDUhCJ7svPMcEPy6vtpE",
            value: 1.0,
            currency: "EUR",
          });
        } catch {
          // De aanvraag is al succesvol verstuurd.
        }
      }
    } catch {
      aanvraagGestart.current = false;
      setMislukt(true);
    } finally {
      setBezig(false);
    }
  }

  if (verzonden) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/40 bg-accent-soft p-8 text-center"
      >
        <p className="text-xl font-semibold">Bedankt voor uw aanvraag!</p>
        <p className="mt-2 text-ink-soft">
          We nemen binnen één werkdag contact met u op met een vrijblijvende
          offerte.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none";

  return (
    <div className="relative">
      {/* Overlay tijdens verzending: dekt het hele formulier af zodat
          overduidelijk is dat er iets gebeurt (niet alleen de knop). */}
      <AnimatePresence>
        {bezig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/85 backdrop-blur-sm"
          >
            <motion.span
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              className="h-9 w-9 rounded-md bg-accent"
            />
            <p className="text-sm font-medium text-ink-soft">
              Bezig met versturen…
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <h3 className="text-2xl font-semibold">{titel}</h3>
      <p className="text-sm text-ink-soft">
        Vrijblijvend en binnen één werkdag reactie.
      </p>

      <fieldset disabled={bezig} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className="mb-1.5 block text-sm font-medium">
            Naam *
          </label>
          <input
            id="naam"
            name="naam"
            type="text"
            autoComplete="name"
            className={inputCls}
            aria-invalid={!!errors.naam}
            aria-describedby={errors.naam ? "naam-fout" : undefined}
          />
          {errors.naam && (
            <p id="naam-fout" className="mt-1 text-sm text-red-600">
              {errors.naam}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            E-mailadres *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-fout" : undefined}
          />
          {errors.email && (
            <p id="email-fout" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="telefoon" className="mb-1.5 block text-sm font-medium">
            Telefoonnummer
          </label>
          <input
            id="telefoon"
            name="telefoon"
            type="tel"
            autoComplete="tel"
            className={inputCls}
            aria-invalid={!!errors.telefoon}
            aria-describedby={errors.telefoon ? "telefoon-fout" : undefined}
          />
          {errors.telefoon && (
            <p id="telefoon-fout" className="mt-1 text-sm text-red-600">
              {errors.telefoon}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="typeKlus" className="mb-1.5 block text-sm font-medium">
            Type klus *
          </label>
          <select
            id="typeKlus"
            name="typeKlus"
            defaultValue=""
            className={inputCls}
            aria-invalid={!!errors.typeKlus}
            aria-describedby={errors.typeKlus ? "typeklus-fout" : undefined}
          >
            <option value="" disabled>
              Maak een keuze…
            </option>
            {typesKlus.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.typeKlus && (
            <p id="typeklus-fout" className="mt-1 text-sm text-red-600">
              {errors.typeKlus}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="bericht" className="mb-1.5 block text-sm font-medium">
          Uw bericht
        </label>
        <textarea
          id="bericht"
          name="bericht"
          rows={4}
          placeholder="Vertel kort iets over de klus: ruimte, oppervlakte, gewenste tegels…"
          className={inputCls}
        />
      </div>

      {/* Honeypot: onzichtbaar voor mensen, bots vullen hem wel in. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="_honey">Laat dit veld leeg</label>
        <input id="_honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        {bezig ? "Versturen…" : "Verstuur aanvraag"}
      </Button>
      </fieldset>

      {mislukt && (
        <p role="alert" className="text-sm text-red-600">
          Versturen is helaas niet gelukt. Probeer het nog eens, of bel ons
          direct op{" "}
          <a href={site.telefoonLink} className="font-semibold underline">
            {site.telefoon}
          </a>{" "}
          — dan helpen we u meteen.
        </p>
      )}
      </form>
    </div>
  );
}
