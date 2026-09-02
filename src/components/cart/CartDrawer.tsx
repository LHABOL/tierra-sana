"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    items,
    subtotal,
    shipping,
    total,
    count,
    freeShippingRemaining,
    setQty,
    remove,
  } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button
            aria-label="Cerrar carrito"
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col bg-ivory"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Carrito de compra"
          >
            <header className="flex items-center justify-between border-b border-olive/10 px-6 py-5">
              <h2 className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
                Carrito · {count} {count === 1 ? "artículo" : "artículos"}
              </h2>
              <button onClick={closeCart} aria-label="Cerrar">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-serif text-2xl">Tu carrito está vacío</p>
                <p className="max-w-xs text-sm text-stone">
                  Explora la selección y encuentra el producto que acompañe tu
                  rutina.
                </p>
                <Link
                  href="/catalogo"
                  onClick={closeCart}
                  className="mt-2 text-[0.72rem] uppercase tracking-[0.22em] text-olive underline underline-offset-4"
                >
                  Ir al catálogo
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  {freeShippingRemaining > 0 ? (
                    <p className="mb-5 bg-sage/40 px-4 py-3 text-xs leading-relaxed text-olive">
                      Te faltan{" "}
                      <strong>{formatPrice(freeShippingRemaining)}</strong> para
                      envío sin costo.
                    </p>
                  ) : (
                    <p className="mb-5 bg-sage/40 px-4 py-3 text-xs text-olive">
                      Tu pedido tiene envío sin costo.
                    </p>
                  )}

                  <ul className="divide-y divide-olive/10">
                    {items.map((item) => (
                      <li key={item.slug} className="flex gap-4 py-5">
                        <Link
                          href={`/producto/${item.slug}`}
                          onClick={closeCart}
                          className="w-20 shrink-0"
                        >
                          <ImagePlaceholder
                            src={item.image}
                            alt={item.name}
                            ratio="4 / 5"
                            label="Imagen"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link
                              href={`/producto/${item.slug}`}
                              onClick={closeCart}
                              className="font-serif text-base leading-snug"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => remove(item.slug)}
                              aria-label={`Eliminar ${item.name}`}
                              className="text-stone transition-colors hover:text-ink"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="mt-0.5 text-xs text-stone">
                            {item.presentation}
                          </span>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(n) => setQty(item.slug, n)}
                              size="sm"
                            />
                            <span className="text-sm tabular-nums">
                              {formatPrice(item.lineTotal)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="border-t border-olive/10 px-6 py-5">
                  <dl className="space-y-1.5 text-sm">
                    <Row label="Subtotal" value={formatPrice(subtotal)} />
                    <Row
                      label="Envío"
                      value={
                        shipping === 0 ? "Sin costo" : formatPrice(shipping)
                      }
                    />
                    <Row
                      label="Total"
                      value={formatPrice(total)}
                      emphasis
                    />
                  </dl>
                  <p className="mt-2 text-[0.68rem] text-stone">
                    Envíos en {site.shipping.estimate}. Impuestos incluidos.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex w-full items-center justify-center bg-olive px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition-all duration-500 ease-organic hover:bg-olive-deep hover:tracking-[0.28em]"
                  >
                    Finalizar compra
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-[0.7rem] uppercase tracking-[0.2em] text-stone underline underline-offset-4"
                  >
                    Seguir explorando
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={
        emphasis
          ? "flex justify-between border-t border-olive/10 pt-2 font-serif text-lg"
          : "flex justify-between text-stone"
      }
    >
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
