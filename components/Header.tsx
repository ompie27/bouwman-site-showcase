"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import Button from "@/components/Button";
import { soepel } from "@/components/FadeIn";

/* Renovyte-stijl: kort hoofdmenu (3 links) + één opvallende CTA. */
const links = [
  { href: "/diensten", label: "Diensten" },
  { href: "/projecten", label: "Projecten" },
  { href: "/over-ons", label: "Over ons" },
];

function Brand({ licht = false }: { licht?: boolean }) {
  return (
    <Link
      href="/"
      className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
        licht ? "text-white" : "text-ink"
      }`}
      aria-label="Bouw MAN — naar homepage"
    >
      Bouw MAN
      <span className={licht ? "text-white/50" : "text-accent-dark"}>.</span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  /* Scrollgedrag: bovenaan = transparant; ver naar beneden scrollen
     verbergt de balk, omhoog scrollen haalt hem terug. */
  const { scrollY } = useScroll();
  const [bovenaan, setBovenaan] = useState(true);
  const [verborgen, setVerborgen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const vorige = scrollY.getPrevious() ?? 0;
    setBovenaan(y < 16);
    if (y > 320 && y > vorige) {
      setVerborgen(true);
    } else if (y < vorige - 2 || y <= 320) {
      setVerborgen(false);
    }
  });

  // Overlay sluiten bij paginawissel en scrollen vergrendelen als hij open is.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Bovenaan de homepage zweeft de balk transparant over de herofoto. */
  const overHero = isHome && bovenaan;

  return (
    <>
      <motion.header
        animate={{ y: verborgen && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: soepel }}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          bovenaan
            ? isHome
              ? "border-transparent bg-transparent"
              : "border-transparent bg-white"
            : "border-line bg-white/90 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Brand licht={overHero} />

          {/* Desktop-navigatie */}
          <nav
            aria-label="Hoofdnavigatie"
            className="hidden items-center gap-10 lg:flex"
          >
            {links.map((link) => {
              const actief = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    overHero
                      ? actief
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : actief
                        ? "text-ink"
                        : "text-ink-soft hover:text-ink"
                  }`}
                  aria-current={actief ? "page" : undefined}
                >
                  {link.label}
                  {/* Onderstreping die van links naar rechts inschuift */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-300 ease-out ${
                      actief ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <Button
              href="/contact"
              variant={overHero ? "light" : "primary"}
              className="px-6 py-2.5"
            >
              Offerte aanvragen
            </Button>
          </nav>

          {/* Mobiele menuknop */}
          <button
            type="button"
            className={`flex cursor-pointer items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-300 lg:hidden ${
              overHero ? "text-white" : "text-ink"
            }`}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            onClick={() => setOpen(true)}
          >
            Menu
            <BsList className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      {/* Vaste balk staat buiten de flow; op pagina's zonder hero
          duwt deze spacer de inhoud onder de balk vandaan. */}
      {!isHome && <div aria-hidden="true" className="h-18" />}

      {/* Volledig schermoverlay (mobiel) — bewust búiten de header:
          blur/transform op de balk zou 'fixed' hier anders breken. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobiel-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex h-dvh flex-col bg-white lg:hidden"
          >
            <div className="flex h-18 shrink-0 items-center justify-between border-b border-line px-4 py-4 sm:px-6">
              <Brand />
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-ink"
                aria-label="Menu sluiten"
                onClick={() => setOpen(false)}
              >
                Sluiten
                <BsX className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobiele navigatie"
              className="flex flex-1 flex-col justify-center gap-2 px-6"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.07, ease: soepel }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line py-4 text-2xl font-semibold tracking-tight ${
                      pathname.startsWith(link.href)
                        ? "text-accent-dark"
                        : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: soepel }}
              className="shrink-0 px-6 pb-10"
            >
              <Button
                href="/contact"
                className="w-full py-4 text-base"
                onClick={() => setOpen(false)}
              >
                Offerte aanvragen
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
