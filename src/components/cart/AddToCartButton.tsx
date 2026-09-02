"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { useCart } from "@/components/providers/CartProvider";

export function AddToCartButton({
  slug,
  quantity = 1,
  available = true,
  variant = "solid",
  full = false,
}: {
  slug: string;
  quantity?: number;
  available?: boolean;
  variant?: "solid" | "outline";
  full?: boolean;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  if (!available) {
    return (
      <span
        className={clsx(
          "inline-flex items-center justify-center border border-olive/15 px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-stone",
          full && "w-full",
        )}
      >
        Agotado temporalmente
      </span>
    );
  }

  return (
    <button
      onClick={() => {
        add(slug, quantity);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] transition-all duration-500 ease-organic",
        variant === "solid"
          ? "bg-olive text-ivory hover:bg-olive-deep hover:tracking-[0.28em]"
          : "border border-olive/30 text-olive hover:border-olive hover:bg-olive hover:text-ivory",
        full && "w-full",
      )}
    >
      {done ? (
        <>
          <Check className="h-3.5 w-3.5" /> Agregado
        </>
      ) : (
        "Agregar al carrito"
      )}
    </button>
  );
}
