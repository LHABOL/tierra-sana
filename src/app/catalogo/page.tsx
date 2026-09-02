import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCatalog } from "@/components/sections/ProductCatalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Productos de limpieza naturales para cocina, baño, hogar, multiusos, aromas y cuidado de superficies.",
  alternates: { canonical: "/catalogo" },
};

export default function CatalogoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Nuestra selección"
        intro="Cada producto está pensado para una tarea concreta. Filtra por espacio para encontrar el tuyo."
      />
      <Suspense fallback={<div className="shell py-24" />}>
        <ProductCatalog filterable eyebrow="" title="" />
      </Suspense>
    </>
  );
}
