import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Políticas",
  description: "Políticas de envío, cambios y devoluciones de Tierra Sana.",
  alternates: { canonical: "/politicas" },
};

export default function PoliticasPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Políticas"
      intro="Condiciones de envío, cambios y devoluciones."
      updated="Septiembre 2026"
      sections={[
        {
          heading: "Envíos",
          body: [
            "Realizamos envíos a todo México. El tiempo estimado de entrega es de 3 a 5 días hábiles para envío estándar y de 1 a 2 días hábiles para envío express, contados a partir de la confirmación del pedido.",
            "El envío es sin costo en compras que superen el umbral indicado en el carrito.",
          ],
        },
        {
          heading: "Cambios y devoluciones",
          body: [
            "Aceptamos cambios y devoluciones de productos sin abrir dentro de los 15 días naturales posteriores a la recepción del pedido, conservando el empaque original.",
            "Por tratarse de productos de higiene, no se aceptan devoluciones de artículos abiertos o utilizados, salvo defecto de fábrica.",
          ],
        },
        {
          heading: "Producto defectuoso",
          body: [
            "Si tu producto llega dañado o presenta un defecto, escríbenos dentro de los 5 días posteriores a la entrega con fotografías del artículo y del empaque para gestionar la reposición.",
          ],
        },
      ]}
    />
  );
}
