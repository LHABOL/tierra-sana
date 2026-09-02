"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { products as allProducts } from "@/lib/products";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

interface Props {
  /** Lista base; por defecto todo el catálogo */
  items?: Product[];
  filterable?: boolean;
  eyebrow?: string;
  title?: string;
  intro?: string;
}

export function ProductCatalog({
  items = allProducts,
  filterable = false,
  eyebrow = "Catálogo",
  title = "Nuestra selección",
  intro,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = searchParams.get("categoria") ?? "all";
  const [active, setActive] = useState(initial);

  const onChange = useCallback(
    (slug: string) => {
      setActive(slug);
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (slug === "all") params.delete("categoria");
      else params.set("categoria", slug);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const visible = useMemo(
    () =>
      active === "all"
        ? items
        : items.filter((p) => p.category === active),
    [items, active],
  );

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <BotanicalBackdrop tone="light" density="normal" seed={23} opacity={0.7} />
      <div className="shell">
        {(eyebrow || title || intro) && (
          <Reveal className="max-w-2xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="display mt-4">{title}</h2>}
            {intro && (
              <p className="mt-6 text-base leading-relaxed text-stone">
                {intro}
              </p>
            )}
          </Reveal>
        )}

        {filterable && (
          <Reveal delay={0.1}>
            <CategoryFilter active={active} onChange={onChange} />
          </Reveal>
        )}

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-14 text-sm text-stone">
            No hay productos en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  );
}
