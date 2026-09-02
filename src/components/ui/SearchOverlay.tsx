"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { searchProducts } from "@/lib/products";
import { categoryName } from "@/lib/categories";
import { formatPrice } from "@/lib/format";

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-ivory/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="shell pt-24">
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-olive-mid">
                Buscar
              </span>
              <button onClick={closeSearch} aria-label="Cerrar búsqueda">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 border-b border-olive/20 pb-4">
              <Search className="h-5 w-5 text-olive-mid" strokeWidth={1.5} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué necesitas limpiar?"
                className="w-full bg-transparent font-serif text-2xl outline-none placeholder:text-stone/50 md:text-4xl"
              />
            </div>

            <div className="mt-8 max-h-[50vh] overflow-y-auto">
              {query && results.length === 0 && (
                <p className="text-sm text-stone">
                  Sin resultados para “{query}”.
                </p>
              )}
              <ul className="divide-y divide-olive/10">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/producto/${p.slug}`}
                      onClick={closeSearch}
                      className="flex items-baseline justify-between gap-4 py-4 transition-opacity hover:opacity-60"
                    >
                      <span>
                        <span className="font-serif text-lg">{p.name}</span>
                        <span className="ml-3 text-xs uppercase tracking-[0.18em] text-stone">
                          {categoryName(p.category)}
                        </span>
                      </span>
                      <span className="text-sm tabular-nums text-stone">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
