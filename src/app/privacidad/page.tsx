import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Aviso de privacidad de Tierra Sana.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Aviso de privacidad"
      intro="Cómo tratamos los datos personales que nos compartes."
      updated="Septiembre 2026"
      sections={[
        {
          heading: "Responsable",
          body: [
            `${site.name}, con domicilio en ${site.location.street}, ${site.location.city}, es responsable del tratamiento de tus datos personales.`,
          ],
        },
        {
          heading: "Datos que recabamos",
          body: [
            "Nombre, correo electrónico, teléfono y dirección de envío, con la finalidad de procesar y entregar tus pedidos y darte seguimiento como cliente.",
            "No recabamos ni almacenamos datos de tarjetas. El pago se procesará a través de una pasarela externa (Mercado Pago o Stripe) sujeta a sus propias políticas.",
          ],
        },
        {
          heading: "Uso de la información",
          body: [
            "Usamos tus datos únicamente para la gestión de pedidos, atención a clientes y, si lo autorizas expresamente, para enviarte comunicaciones sobre productos y novedades.",
          ],
        },
        {
          heading: "Tus derechos",
          body: [
            `Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (ARCO) escribiendo a ${site.contact.email}.`,
          ],
        },
        {
          heading: "Cookies",
          body: [
            "El sitio utiliza almacenamiento local del navegador para recordar el contenido de tu carrito. No se emplea para identificarte ni se comparte con terceros.",
          ],
        },
      ]}
    />
  );
}
