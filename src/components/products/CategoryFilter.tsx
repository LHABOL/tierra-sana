"use client";

import { clsx } from "clsx";
import { categories } from "@/lib/categories";

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  const options = [{ slug: "all", name: "Todo" }, ...categories];

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {options.map((opt) => (
        <button
          key={opt.slug}
          onClick={() => onChange(opt.slug)}
          className={clsx(
            "link-underline pb-1 text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-300",
            active === opt.slug
              ? "text-olive [background-size:100%_1px]"
              : "text-stone hover:text-olive",
          )}
        >
          {opt.name}
        </button>
      ))}
    </div>
  );
}
