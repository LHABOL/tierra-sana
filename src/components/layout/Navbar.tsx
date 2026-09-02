"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { Search, ShoppingBag } from "lucide-react";
import { nav } from "@/lib/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useCart } from "@/components/providers/CartProvider";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(20);
  const { count, openCart, openSearch } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  // Transparente solo en el tope del home (sobre el hero oscuro).
  const overHero = isHome && !scrolled && !menuOpen;
  const tone: "light" | "dark" = overHero ? "light" : "dark";

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-organic",
          overHero
            ? "bg-transparent"
            : "border-b border-olive/10 bg-ivory/80 backdrop-blur-md",
        )}
      >
        <div className="shell flex h-[68px] items-center justify-between">
          <Wordmark tone={tone} />

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "link-underline text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300",
                    tone === "light" ? "text-ivory/90" : "text-ink/80",
                    active && "font-medium",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            className={clsx(
              "flex items-center gap-4",
              tone === "light" ? "text-ivory" : "text-ink",
            )}
          >
            <button
              onClick={openSearch}
              aria-label="Buscar"
              className="p-1 transition-opacity duration-300 hover:opacity-60"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              aria-label={`Carrito (${count})`}
              className="relative p-1 transition-opacity duration-300 hover:opacity-60"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-olive px-1 text-[0.58rem] font-medium text-ivory">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="flex flex-col gap-[5px] p-1 lg:hidden"
            >
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
