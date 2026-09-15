import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { site } from "@/lib/site";

/**
 * Logotipo oficial: recorte real del brote de tres hojas + "TIERRA SANA"
 * (del sello que entregó el cliente), sin el óvalo verde ni el subtítulo —
 * solo las hojas y el nombre, con la hoja por encima del nombre, sobre fondo
 * transparente. Como ya no hay un óvalo de color de fondo, se generaron dos
 * variantes de color (mismo recorte, mismo alfa) para que siga siendo
 * visible sobre cualquier fondo del sitio: crema para fondos oscuros
 * (`tone="light"` de texto, sobre el hero) y oliva para fondos claros.
 */
export function Wordmark({
  tone = "dark",
  className,
}: {
  /** "dark" = fondo claro alrededor (texto/ícono oscuro). "light" = fondo
   * oscuro alrededor, como el hero (texto/ícono claro). */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — inicio`}
      className={clsx(
        "inline-flex items-center transition-opacity duration-300 hover:opacity-80",
        className,
      )}
    >
      <Image
        src={
          tone === "light"
            ? "/imagenes/logo-tierra-sana-cream.webp"
            : "/imagenes/logo-tierra-sana-olive.webp"
        }
        alt={site.name}
        width={620}
        height={414}
        priority
        className="h-11 w-auto object-contain"
      />
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
