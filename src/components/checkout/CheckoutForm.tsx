"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { Field } from "@/components/ui/Field";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { clsx } from "clsx";

type ShippingMethod = "estandar" | "express" | "recoleccion";

const methods: {
  id: ShippingMethod;
  label: string;
  detail: string;
  price: number;
}[] = [
  { id: "estandar", label: "Estándar", detail: "3 a 5 días hábiles", price: site.shipping.flatRate },
  { id: "express", label: "Express", detail: "1 a 2 días hábiles", price: 249 },
  { id: "recoleccion", label: "Recolección en tienda", detail: site.location.city, price: 0 },
];

export function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const [method, setMethod] = useState<ShippingMethod>("estandar");
  const [placed, setPlaced] = useState(false);

  const shippingCost =
    subtotal >= site.shipping.freeThreshold && method !== "express"
      ? 0
      : (methods.find((m) => m.id === method)?.price ?? 0);
  const total = subtotal + shippingCost;

  if (placed) {
    return (
      <div className="relative isolate shell py-32 text-center">
        <BotanicalBackdrop tone="light" density="normal" seed={71} />
        <p className="eyebrow">Pedido recibido</p>
        <h1 className="display mt-4">Gracias por tu compra.</h1>
        <p className="mx-auto mt-6 max-w-md text-base text-stone">
          Hemos registrado tu pedido. Te enviaremos un correo con la
          confirmación y el seguimiento del envío. El cobro se procesará al
          integrar la pasarela de pagos.
        </p>
        <Link
          href="/catalogo"
          className="mt-10 inline-flex bg-olive px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition-all duration-500 ease-organic hover:bg-olive-deep hover:tracking-[0.28em]"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="relative isolate shell py-32 text-center">
        <BotanicalBackdrop tone="light" density="normal" seed={73} />
        <p className="eyebrow">Checkout</p>
        <h1 className="display mt-4">No hay nada que pagar.</h1>
        <p className="mx-auto mt-6 max-w-md text-base text-stone">
          Agrega productos a tu carrito para continuar con la compra.
        </p>
        <Link
          href="/catalogo"
          className="mt-10 inline-flex bg-olive px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition-all duration-500 ease-organic hover:bg-olive-deep"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="relative isolate shell py-24 md:py-32">
      <BotanicalBackdrop tone="light" density="normal" seed={79} />
      <p className="eyebrow">Checkout</p>
      <h1 className="display mt-4">Finalizar compra.</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
        }}
        className="mt-14 grid gap-16 lg:grid-cols-[1.3fr_1fr]"
      >
        <div className="space-y-14">
          <fieldset>
            <legend className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
              Contacto
            </legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Nombre completo" name="nombre" autoComplete="name" required />
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" required />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
              Dirección de envío
            </legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Calle y número" name="direccion" autoComplete="street-address" required />
              </div>
              <Field label="Código postal" name="cp" autoComplete="postal-code" required />
              <Field label="Ciudad" name="ciudad" autoComplete="address-level2" required />
              <Field label="Estado" name="estado" autoComplete="address-level1" required />
              <Field label="Referencias (opcional)" name="referencias" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
              Método de envío
            </legend>
            <div className="mt-6 space-y-3">
              {methods.map((m) => (
                <label
                  key={m.id}
                  className={clsx(
                    "flex cursor-pointer items-center justify-between border px-5 py-4 transition-colors duration-300",
                    method === m.id
                      ? "border-olive bg-sage/30"
                      : "border-olive/15 hover:border-olive/40",
                  )}
                >
                  <span className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="envio"
                      value={m.id}
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                      className="accent-olive"
                    />
                    <span>
                      <span className="block text-sm">{m.label}</span>
                      <span className="block text-xs text-stone">
                        {m.detail}
                      </span>
                    </span>
                  </span>
                  <span className="text-sm tabular-nums">
                    {m.price === 0 ? "Sin costo" : formatPrice(m.price)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
              Pago
            </legend>
            <div className="mt-6 border border-dashed border-olive/25 bg-sage/15 p-6">
              <p className="text-sm leading-relaxed text-stone">
                La pasarela de pagos se integrará en este punto
                (<strong>Mercado Pago</strong> o <strong>Stripe</strong>). La
                estructura del pedido ya está preparada para enviarse al
                proveedor.
              </p>
              <p className="mt-3 text-xs text-stone">
                No se almacena información sensible de tarjetas en este sitio.
              </p>
            </div>
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-olive/15 bg-sage/20 p-8">
            <h2 className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
              Resumen del pedido
            </h2>
            <ul className="mt-6 space-y-4">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4">
                  <div className="w-14 shrink-0">
                    <ImagePlaceholder
                      src={item.image}
                      alt={item.name}
                      ratio="4 / 5"
                      label=""
                    />
                  </div>
                  <div className="flex flex-1 justify-between gap-2 text-sm">
                    <span>
                      <span className="block font-serif">{item.name}</span>
                      <span className="text-xs text-stone">
                        {item.presentation} · ×{item.quantity}
                      </span>
                    </span>
                    <span className="tabular-nums">
                      {formatPrice(item.lineTotal)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-olive/15 pt-4 text-sm">
              <div className="flex justify-between text-stone">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-stone">
                <dt>Envío</dt>
                <dd className="tabular-nums">
                  {shippingCost === 0 ? "Sin costo" : formatPrice(shippingCost)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-olive/15 pt-2 font-serif text-xl">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-6 w-full bg-olive px-7 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition-all duration-500 ease-organic hover:bg-olive-deep hover:tracking-[0.28em]"
            >
              Confirmar pedido
            </button>
            <Link
              href="/carrito"
              className="mt-3 block text-center text-[0.7rem] uppercase tracking-[0.2em] text-stone underline underline-offset-4"
            >
              Volver al carrito
            </Link>
          </div>
        </aside>
      </form>
    </div>
  );
}
