"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import type { Product } from "@/lib/types";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { categoryName } from "@/lib/categories";
import { formatPrice } from "@/lib/format";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { ref, show } = useReveal(0.15);
  return (
    <motion.article
      ref={ref as never}
      initial={{ opacity: 0, y: 18 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col"
    >
      <Link href={`/producto/${product.slug}`} className="block overflow-hidden">
        <div className="transition-transform duration-700 ease-organic group-hover:scale-[1.03]">
          <ImagePlaceholder
            src={product.image}
            alt={product.name}
            ratio="4 / 5"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="text-[0.62rem] uppercase tracking-[0.24em] text-olive-mid">
            {categoryName(product.category)}
          </span>
          {!product.available && (
            <span className="text-[0.62rem] uppercase tracking-[0.2em] text-stone">
              Agotado
            </span>
          )}
        </div>

        <h3 className="mt-2 font-serif text-xl leading-tight">
          <Link
            href={`/producto/${product.slug}`}
            className="link-underline"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-stone">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-baseline gap-3 text-sm">
          <span className="tabular-nums text-ink">
            {formatPrice(product.price)}
          </span>
          <span className="text-stone">·</span>
          <span className="text-stone">{product.presentation}</span>
        </div>

        <div className="mt-5">
          <AddToCartButton
            slug={product.slug}
            available={product.available}
            variant="outline"
            full
          />
        </div>
      </div>
    </motion.article>
  );
}
