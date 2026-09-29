import type { ReactNode } from "react";

/** Sectie met consistente max-breedte, padding en optionele lichte achtergrond. */
export function Section({
  id,
  alt = false,
  className = "",
  children,
}: {
  id?: string;
  alt?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${alt ? "bg-mist" : "bg-white"} py-16 md:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

/** Consistente sectiekop: eyebrow, titel en intro. */
export function SectionHeader({
  eyebrow,
  titel,
  intro,
  center = false,
}: {
  eyebrow: string;
  titel: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-dark">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold md:text-4xl">{titel}</h2>
      {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
    </div>
  );
}
