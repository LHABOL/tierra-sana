"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap text-[0.72rem] font-sans uppercase tracking-[0.22em] transition-all duration-500 ease-organic disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid:
    "bg-olive text-ivory px-7 py-4 hover:bg-olive-deep hover:tracking-[0.28em]",
  outline:
    "border border-olive/30 text-olive px-7 py-4 hover:border-olive hover:bg-olive hover:text-ivory",
  ghost: "text-olive px-2 py-1 hover:text-olive-deep",
};

interface CommonProps {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "solid",
  withArrow = true,
  children,
  className,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  withArrow = true,
  children,
  className,
  href,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={clsx(base, variants[variant], className)}
      {...rest}
    >
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

function Arrow() {
  return (
    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-500 ease-organic group-hover:translate-x-0 group-hover:opacity-100" />
  );
}
