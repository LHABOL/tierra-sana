"use client";

import { Minus, Plus } from "lucide-react";
import { clsx } from "clsx";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  return (
    <div className="inline-flex items-center border border-olive/20">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={clsx(
          dim,
          "flex items-center justify-center transition-colors hover:bg-sage/40 disabled:opacity-30",
        )}
        disabled={value <= min}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className={clsx(
          "min-w-9 text-center text-sm tabular-nums",
          size === "sm" && "min-w-7",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => onChange(Math.min(max, value + 1))}
        className={clsx(
          dim,
          "flex items-center justify-center transition-colors hover:bg-sage/40 disabled:opacity-30",
        )}
        disabled={value >= max}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
