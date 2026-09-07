"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Reveal } from "@/components/ui/Reveal";
import { categoryName } from "@/lib/categories";
import { formatPrice } from "@/lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  return (
    <article className="relative isolate shell pt-32">
      <nav className="text-[0.68rem] uppercase tracking-[0.2em] text-stone">
        <Link href="/catalogo" className="hover:text-olive">
          Catálogo
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/catalogo?categoria=${product.category}`}
          className="hover:text-olive"
        >
          {categoryName(product.category)}
        </Link>
      </nav>

      <div className="mt-8 grid gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <ImagePlaceholder
            src={product.image}
            alt={product.name}
            ratio="4 / 5"
            label="Fotografía del producto"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="eyebrow">{categoryName(product.category)}</p>
            <h1 className="mt-3 font-serif text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02] tracking-[-0.02em]">
              {product.name}
            </h1>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="text-xl tabular-nums">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-stone">
                {product.presentation}
              </span>
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
              {product.description}
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantitySelector value={qty} onChange={setQty} />
            <AddToCartButton
              slug={product.slug}
              quantity={qty}
              available={product.available}
            />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-stone">
            {product.available
              ? "Disponible · Envío en 3 a 5 días hábiles"
              : "Agotado temporalmente"}
          </p>

          <div className="mt-12 divide-y divide-olive/10 border-t border-olive/10">
            <Detail title="Ingredientes">
              <ul className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-stone">
                {product.ingredients.map((ing, i) => (
                  <li key={ing}>
                    {ing}
                    {i < product.ingredients.length - 1 && (
                      <span className="ml-2 text-olive/30">·</span>
                    )}
                  </li>
                ))}
              </ul>
            </Detail>
            <Detail title="Modo de uso">
              <p className="text-sm leading-relaxed text-stone">
                {product.usage}
              </p>
            </Detail>
            <Detail title="Beneficios">
              <ul className="space-y-1.5 text-sm text-stone">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-olive">—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Detail>
            <Detail title="Presentación">
              <p className="text-sm text-stone">{product.presentation}</p>
            </Detail>
          </div>
        </div>
      </div>

      <Reveal className="mt-24 max-w-2xl border-t border-olive/10 pt-12">
        <h2 className="font-serif text-2xl">Más sobre este producto</h2>
        <p className="mt-4 text-base leading-relaxed text-stone">
          {product.more}
        </p>
      </Reveal>
    </article>
  );
}

function Detail({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[140px_1fr]">
      <h3 className="text-[0.62rem] uppercase tracking-[0.24em] text-olive-mid">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
