import { BsWhatsapp } from "react-icons/bs";
import { site } from "@/lib/data";

/** Zwevende WhatsApp-knop, zichtbaar op elke pagina. */
export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur Bouw MAN een WhatsApp-bericht"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl focus-visible:scale-110 active:scale-100"
    >
      <BsWhatsapp className="h-7 w-7" aria-hidden="true" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
