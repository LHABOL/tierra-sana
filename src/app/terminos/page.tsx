import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos",
  description: "Términos y condiciones de uso del sitio de Tierra Sana.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Términos y condiciones"
      intro="Condiciones que rigen el uso de este sitio y la compra de productos."
      updated="Septiembre 2026"
      sections={[
        {
          heading: "Aceptación",
          body: [
            `Al navegar y realizar compras en ${site.url} aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo, te pedimos no utilizar el sitio.`,
          ],
        },
        {
          heading: "Productos y precios",
          body: [
            "Procuramos que la información de productos, presentaciones y precios sea exacta y esté actualizada. Los precios se expresan en pesos mexicanos (MXN) e incluyen impuestos, salvo que se indique lo contrario.",
            "Nos reservamos el derecho de modificar precios y disponibilidad sin previo aviso.",
          ],
        },
        {
          heading: "Uso de los productos",
          body: [
            "Los productos deben usarse conforme a las indicaciones de cada etiqueta y de la sección “Modo de uso”. Mantener fuera del alcance de niñas y niños.",
          ],
        },
        {
          heading: "Propiedad intelectual",
          body: [
            "Los contenidos del sitio (textos, identidad visual, fotografías) son propiedad de la marca y no pueden reproducirse sin autorización.",
          ],
        },
      ]}
    />
  );
}
