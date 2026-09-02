import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Location } from "@/components/sections/Location";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ubicación",
  description: `Visítanos en ${site.location.city}. ${site.location.hours}.`,
  alternates: { canonical: "/ubicacion" },
};

export default function UbicacionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ubicación"
        title="Encuéntranos."
        intro="Puedes pasar por nuestro punto de venta o coordinar una recolección dentro del horario de atención."
      />
      <Location bare />
    </>
  );
}
