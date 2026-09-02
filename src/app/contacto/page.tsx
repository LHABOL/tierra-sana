import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp o correo. Atención de lunes a viernes, 9:00 a 18:00 h.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos."
        intro="Dudas sobre productos, pedidos o colaboraciones. Te respondemos dentro del horario de atención."
      />
      <Contact bare />
    </>
  );
}
