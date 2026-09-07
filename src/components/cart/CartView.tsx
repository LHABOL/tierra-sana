"use client";

import Link from "next/link";
import { EdgeVines } from "@/components/ui/EdgeVines";
import { X } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function CartView() {
  const {
    items,
    subtotal,
    shipping,
    total,
    freeShippingRemaining,
    setQty,
    remove,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="relative isolate shell py-32 text-center">
        <EdgeVines tone="light" />
        <p className="eyebrow">Carrito</p>
        <h1 className="display mt-4">Tu carrito está vacío.</h1>
        <p className="mx-auto mt-6 max-w-md text-base text-stone">
          Explora la selección y encuentra el producto que acompañe tu rutina de
          limpieza.
        </p>
        <Link
          href="/catalogo"
          className="mt-10 inline-flex bg-olive px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition-all duration-500 ease-organic hover:bg-olive-deep hover:tracking-[0.28em]"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="relative isolate shell py-24 md:py-32">
      <EdgeVines tone="light" />
      <p className="eyebrow">Carrito</p>
      <h1 className="display mt-4">Tu selección.</h1>

      <div className="mt-14 grid gap-16 lg:grid-cols-[1.5fr_1fr]">
        <ul className="divide-y divide-olive/10 border-y border-olive/10">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-6 py-8">
              <Link
                href={`/producto/${item.slug}`}
                className="w-28 shrink-0 sm:w-32"
              >
                <ImagePlaceholder
                  src={item.image}
                  alt={item.name}
                  ratio="4 / 5"
                  label="Imagen"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      href={`/producto/${item.slug}`}
                      className="font-serif text-xl leading-tight link-underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone">
                      {item.presentation}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(item.slug)}
                    aria-label={`Eliminar ${item.name}`}
                    className="h-fit text-stone transition-colors hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-end justify-between pt-6">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(n) => setQty(item.slug, n)}
                  />
                  <span className="text-base tabular-nums">
                    {formatPrice(item.lineTotal)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-olive/15 bg-sage/20 p-8">
            <h2 className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
              Resumen
            </h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-stone">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-stone">
                <dt>Envío</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? "Sin costo" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-olive/15 pt-3 font-serif text-xl">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>

            {freeShippingRemaining > 0 && (
              <p className="mt-4 text-xs leading-relaxed text-olive">
                Te faltan {formatPrice(freeShippingRemaining)} para envío sin
                costo.
              </p>
            )}

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center bg-olive px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition-all duration-500 ease-organic hover:bg-olive-deep hover:tracking-[0.28em]"
            >
              Finalizar compra
            </Link>
            <Link
              href="/catalogo"
              className="mt-3 block text-center text-[0.7rem] uppercase tracking-[0.2em] text-stone underline underline-offset-4"
            >
              Seguir explorando
            </Link>
            <p className="mt-5 text-[0.68rem] leading-relaxed text-stone">
              Envíos a todo México en {site.shipping.estimate}. Los precios
              incluyen impuestos.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
