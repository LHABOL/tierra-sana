import Link from "next/link";
import { clsx } from "clsx";
import { site } from "@/lib/site";

/**
 * Logotipo de marca: brote de tres hojas (como en el sello oficial) + nombre
 * en serif. Vectorial → sin fondo blanco que recortar, se integra sobre
 * cualquier fondo (oscuro en el hero, claro en el resto del sitio).
 */
export function Wordmark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — inicio`}
      className={clsx(
        "inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-70",
        tone === "light" ? "text-ivory" : "text-ink",
        className,
      )}
    >
      <LogoMark className="h-6 w-6" />
      <span className="whitespace-nowrap font-serif text-lg tracking-tight">
        {site.name}
      </span>
    </Link>
  );
}

/** Brote de tres hojas: hoja central alta + dos hojas laterales más cortas. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 34"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 32V13" />
      <path d="M16 13C10.5 13 7 17.5 7 24C13.5 23.3 16 19 16 13Z" />
      <path d="M16 15C21.5 15 25 19 25 24.5C18.5 23.8 16 20 16 15Z" />
      <path d="M16 13C14.5 8 15 3 16 2C17 3 17.5 8 16 13Z" />
    </svg>
  );
}
