import Link from "next/link";
import type { ReactNode } from "react";
import { BsArrowRight } from "react-icons/bs";

/** Tekstlink met pijl die bij hover een stukje meeschuift. */
export default function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-colors duration-200 hover:text-accent-dark ${className}`}
    >
      {children}
      <BsArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </Link>
  );
}
