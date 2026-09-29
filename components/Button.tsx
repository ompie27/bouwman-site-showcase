import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline-light" | "light";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark hover:shadow-lg",
  secondary:
    "border border-line bg-white text-ink hover:border-ink hover:shadow-md",
  "outline-light": "border border-white/50 text-white hover:bg-white/10",
  light: "bg-white text-ink hover:bg-white/85 hover:shadow-lg",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
