"use client";

import Link from "next/link";
import { useCookieConsent } from "@/components/CookieConsentContext";
import { site } from "@/lib/data";

const navLinks = [
  { href: "/diensten", label: "Diensten" },
  { href: "/projecten", label: "Projecten" },
  { href: "/over-ons", label: "Over ons" },
];

export default function Footer() {
  const { openInstellingen } = useCookieConsent();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Merk + CTA */}
        <div>
          <p className="text-xl font-bold tracking-tight">
            Bouw MAN<span className="text-white/40">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Tegelwerk sinds {site.vakSinds}, in Nederland sinds {site.nlSinds}.
            Voor particulieren, aannemers, projectontwikkelaars, bedrijven en
            VvE&apos;s in Friesland en Groningen.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white/85"
          >
            Offerte aanvragen
          </Link>
        </div>

        {/* Navigatie */}
        <nav aria-label="Footer-navigatie">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            Navigatie
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/75 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-white/75 hover:text-white">
                Contact &amp; offerte
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hoofdvestiging */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            Werkgebied
          </p>
          <p className="mt-4 text-sm text-white/75">{site.werkgebied}</p>
          <p className="mt-2 text-sm text-white/60">
            Grotere projecten door heel Nederland in overleg.
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <a href={site.telefoonLink} className="hover:text-white">
                {site.telefoon}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.naam} (voorheen {site.voorheen})
            · KvK {site.kvk} · Tegelzetter Friesland &amp; Groningen
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacybeleid
            </Link>
            <Link href="/toegankelijkheid" className="hover:text-white">
              Toegankelijkheid
            </Link>
            <button
              type="button"
              onClick={openInstellingen}
              className="cursor-pointer hover:text-white"
            >
              Cookie-instellingen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
