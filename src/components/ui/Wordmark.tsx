import Link from "next/link";
import { clsx } from "clsx";
import { site } from "@/lib/site";

/**
 * Logotipo tipográfico. Marca de hoja sutil + nombre en serif.
 * Sustituible por un SVG de marca sin tocar el resto del layout.
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
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 3C7 8 6.5 15 12 21C17.5 15 17 8 12 3Z" />
        <path d="M12 6V19" />
      </svg>
      <span className="whitespace-nowrap font-serif text-lg tracking-tight">
        {site.name}
      </span>
    </Link>
  );
}
