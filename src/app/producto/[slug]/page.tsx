import type { Metadata } from "next";
import { EdgeVines } from "@/components/ui/EdgeVines";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products, getByCategory } from "@/lib/products";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${site.name}`,
      description: product.description,
      type: "website",
    },
  };
}

export default function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);
  const fallback = products
    .filter((p) => p.slug !== product.slug && !related.includes(p))
    .slice(0, 3 - related.length);
  const suggestions = [...related, ...fallback];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: product.price,
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site.url}/producto/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />

      {suggestions.length > 0 && (
        <section className="relative isolate overflow-hidden py-24">
          <EdgeVines tone="light" />
          <div className="shell">
          <Reveal>
            <div className="flex items-end justify-between border-t border-olive/10 pt-12">
              <h2 className="font-serif text-2xl">También te puede interesar</h2>
              <Link
                href="/catalogo"
                className="text-[0.7rem] uppercase tracking-[0.2em] text-olive underline underline-offset-4"
              >
                Ver todo
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
          </div>
        </section>
      )}
    </>
  );
}
