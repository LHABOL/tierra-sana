import Link from "next/link";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-olive text-ivory">
      <BotanicalBackdrop tone="dark" density="normal" seed={3} />
      <div className="shell relative text-center">
        <p className="eyebrow !text-ivory/60">Error 404</p>
        <h1 className="display mt-4">Esta página se fue a lo esencial.</h1>
        <p className="mx-auto mt-6 max-w-md text-ivory/70">
          La dirección que buscas no existe o cambió de lugar.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex bg-ivory px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-olive transition-all duration-500 ease-organic hover:bg-sage"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
