import Image from "next/image";
import { clsx } from "clsx";

interface ImagePlaceholderProps {
  src?: string | null;
  alt: string;
  /** Proporción CSS, p. ej. "4 / 5" */
  ratio?: string;
  label?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Contenedor de imagen de producto.
 * - Si `src` existe, renderiza <Image> optimizada.
 * - Si no, muestra un placeholder premium con la etiqueta discreta.
 *
 * Para publicar fotos reales basta con poblar `image` en lib/products.ts.
 */
export function ImagePlaceholder({
  src,
  alt,
  ratio = "4 / 5",
  label = "Imagen del producto",
  tone = "light",
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: ImagePlaceholderProps) {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden",
        tone === "dark"
          ? "bg-olive-deep text-ivory/70"
          : "bg-sage/50 text-olive/60",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <svg
            viewBox="0 0 64 64"
            className="h-10 w-10 opacity-50"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
          >
            <path d="M32 8C18 20 17 42 32 56C47 42 46 20 32 8Z" />
            <path d="M32 14V52" />
            <path d="M32 28C26 31 22 35 20 41" />
            <path d="M32 38C38 41 42 45 44 51" />
          </svg>
          <span className="text-[0.6rem] uppercase tracking-[0.32em]">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
