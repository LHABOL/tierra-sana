"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-olive text-ivory lg:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="shell flex h-[68px] items-center justify-between">
            <Wordmark tone="light" />
            <button onClick={onClose} aria-label="Cerrar menú" className="p-1">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="shell flex flex-1 flex-col justify-center gap-2">
            {nav.map((item, i) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block border-b border-ivory/15 py-5 font-serif text-3xl"
                  >
                    <span className={active ? "italic" : undefined}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="shell pb-10 text-xs uppercase tracking-[0.22em] text-ivory/60">
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <br />
            <span>{site.contact.phone}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
