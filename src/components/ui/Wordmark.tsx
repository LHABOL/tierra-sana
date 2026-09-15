import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { site } from "@/lib/site";

/**
 * Logotipo oficial: el sello real de la marca (recortado de
 * `/public/imagenes/logo-tierra-sana.webp`), sin el subtítulo y con el
 * blanco de alrededor eliminado (fondo transparente) — solo queda el sello
 * verde con el brote de tres hojas y "TIERRA SANA". El sello mantiene su
 * propio verde fijo (no cambia con `tone`); por eso se deja más alto que la
 * barra de navegación para que el texto siga siendo legible.
 */
export function Wordmark({
  className,
}: {
  /** Se acepta por compatibilidad con los llamados existentes; el sello
   * real tiene su propio verde fijo y no cambia de color. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — inicio`}
      className={clsx(
        "inline-flex items-center self-start pt-1.5 transition-opacity duration-300 hover:opacity-80",
        className,
      )}
    >
      <Image
        src="/imagenes/logo-tierra-sana.webp"
        alt={site.name}
        width={700}
        height={569}
        priority
        className="h-[92px] w-auto object-contain"
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
