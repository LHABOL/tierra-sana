"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CartItem, CartLine } from "@/lib/types";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const STORAGE_KEY = "tierra-sana:cart";

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; slug: string; quantity: number }
  | { type: "setQty"; slug: string; quantity: number }
  | { type: "remove"; slug: string }
  | { type: "clear" };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const existing = state.find((l) => l.slug === action.slug);
      if (existing) {
        return state.map((l) =>
          l.slug === action.slug
            ? { ...l, quantity: l.quantity + action.quantity }
            : l,
        );
      }
      return [...state, { slug: action.slug, quantity: action.quantity }];
    }
    case "setQty":
      return state
        .map((l) =>
          l.slug === action.slug ? { ...l, quantity: action.quantity } : l,
        )
        .filter((l) => l.quantity > 0);
    case "remove":
      return state.filter((l) => l.slug !== action.slug);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
  add: (slug: string, quantity?: number) => void;
  setQty: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  // UI
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", lines: parsed });
      }
    } catch {
      /* almacenamiento no disponible */
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [lines, hydrated]);

  const items = useMemo<CartItem[]>(() => {
    return lines
      .map((line) => {
        const product = products.find((p) => p.slug === line.slug);
        if (!product) return null;
        return {
          ...product,
          quantity: line.quantity,
          lineTotal: product.price * line.quantity,
        };
      })
      .filter((x): x is CartItem => x !== null);
  }, [lines]);

  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping =
    subtotal === 0 || subtotal >= site.shipping.freeThreshold
      ? 0
      : site.shipping.flatRate;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(
    0,
    site.shipping.freeThreshold - subtotal,
  );

  const openCart = useCallback(() => {
    setSearchOpen(false);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openSearch = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const add = useCallback(
    (slug: string, quantity = 1) => {
      dispatch({ type: "add", slug, quantity });
      openCart();
    },
    [openCart],
  );
  const setQty = useCallback(
    (slug: string, quantity: number) =>
      dispatch({ type: "setQty", slug, quantity }),
    [],
  );
  const remove = useCallback(
    (slug: string) => dispatch({ type: "remove", slug }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  // Lock scroll when an overlay is open
  useEffect(() => {
    const open = cartOpen || searchOpen;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen]);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    shipping,
    total,
    freeShippingRemaining,
    add,
    setQty,
    remove,
    clear,
    cartOpen,
    openCart,
    closeCart,
    searchOpen,
    openSearch,
    closeSearch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
