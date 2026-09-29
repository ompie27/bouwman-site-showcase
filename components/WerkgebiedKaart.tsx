"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { site } from "@/lib/data";

/* Publieke Mapbox-token (pk.…) — hoort in .env.local:
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxxxx */
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/* Sneek — vestigingsplaats van Bouw MAN. */
const SNEEK: [number, number] = [5.658, 53.033];

/** Werkgebied-kaart op de contactpagina. Zonder token valt hij terug
    op het statische werkgebied-blok, zodat de pagina nooit breekt. */
export default function WerkgebiedKaart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token || !container.current) return;

    // Dev/StrictMode mount de component dubbel; een lege container
    // voorkomt de Mapbox-waarschuwing over resterende inhoud.
    container.current.replaceChildren();

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/light-v11", // licht & monochroom, past bij het design
      center: [5.95, 53.12], // tussen Sneek en Groningen: heel het werkgebied in beeld
      zoom: 7,
      cooperativeGestures: true, // niet per ongeluk zoomen bij scrollen
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    const marker = new mapboxgl.Marker({ color: "#1a1a1a" })
      .setLngLat(SNEEK)
      .setPopup(
        new mapboxgl.Popup({ offset: 28 }).setText(
          `${site.naam} — ${site.plaats}`,
        ),
      )
      .addTo(map);

    return () => {
      marker.remove();
      map.remove();
    };
  }, []);

  /* Fallback zolang er geen token is ingesteld. */
  if (!token) {
    return (
      <div
        className="mt-5 flex aspect-4/3 items-center justify-center rounded-2xl border border-line bg-mist"
        role="img"
        aria-label="Kaart van het werkgebied: Friesland en Groningen"
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Werkgebied
          </p>
          <p className="mt-1 text-2xl font-semibold">
            Friesland &amp; Groningen
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={container}
      aria-label="Kaart van het werkgebied: Friesland en Groningen"
      className="mt-5 aspect-4/3 overflow-hidden rounded-2xl border border-line"
    />
  );
}
