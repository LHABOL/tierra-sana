import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/lib/categories";
import { Wordmark } from "@/components/ui/Wordmark";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-ivory">
      <BotanicalBackdrop tone="dark" density="normal" seed={11} />
      <div className="shell relative grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Wordmark tone="light" />
          <p className="mt-5 text-sm leading-relaxed text-ivory/60">
            {site.description}
          </p>
        </div>

        <FooterCol title="Catálogo">
          <FooterLink href="/catalogo">Ver todo</FooterLink>
          {categories.slice(0, 4).map((c) => (
            <FooterLink key={c.slug} href={`/catalogo?categoria=${c.slug}`}>
              {c.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Marca">
          <FooterLink href="/nosotros">Nosotros</FooterLink>
          <FooterLink href="/contacto">Contacto</FooterLink>
          <FooterLink href="/ubicacion">Ubicación</FooterLink>
          {site.social.map((s) => (
            <FooterLink key={s.label} href={s.href} external>
              {s.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Legal">
          <FooterLink href="/politicas">Políticas</FooterLink>
          <FooterLink href="/terminos">Términos</FooterLink>
          <FooterLink href="/privacidad">Privacidad</FooterLink>
        </FooterCol>
      </div>

      <div className="shell relative border-t border-ivory/10 py-8">
        <p className="font-serif text-xl text-ivory/90">{site.tagline}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ivory/40">
          © {year} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[0.65rem] uppercase tracking-[0.28em] text-ivory/40">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="text-ivory/60 transition-colors duration-300 hover:text-ivory"
      >
        {children}
      </Link>
    </li>
  );
}
