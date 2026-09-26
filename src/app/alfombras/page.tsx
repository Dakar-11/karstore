import type { Metadata } from "next";
import CollectionTemplate, { CollectionConfig } from "@/components/CollectionTemplate";

export const metadata: Metadata = {
  title: "Alfombras & Tapices de Alpaca | KAR Artesanías",
  description: "Alfombras artesanales andinas y mantas tejidas a mano en telar tradicional con fibra de alpaca premium del Perú. Alta decoración de interiores.",
};

const alfombrasConfig: CollectionConfig = {
  slug: "alfombras",
  name: "Alfombras",
  pretitle: "ARTE TEXTIL PARA EL HOGAR · EDICIÓN MAESTRÍA",
  title: "Geometría Andina & Tradición de Piso",
  subtitle: "Alfombras & Mantas",
  description:
    "Alfombras y tapices de piso tejidos a mano con fibra de alpaca de alta densidad. Diseños inspirados en la iconografía milenaria de los Andes peruanos.",
  highlights: [
    "Tejido en telar tradicional de madera",
    "Tintes 100% naturales de plantas y minerales",
    "Aislante térmico natural para dormitorios y salas",
  ],
  craftStory: {
    title: "La Iconografía de la Chakana y los Apus",
    subtitle: "SÍMBOLOS MILENARIOS EN CADA NUDO",
    text: "Cada alfombra es un mapa cosmológico andino. Los artesanos de Ayacucho y Puno demoran entre 3 y 6 semanas en armar la urdimbre y tramar cada nudo con lana densa de alpaca, creando piezas de alta resistencia que embellecen los suelos más exigentes.",
    artisanOrigin: "Ayacucho & Puno",
    stat: "4-6 Sem.",
    statLabel: "De tejido manual por cada alfombra",
  },
};

export default function AlfombrasPage() {
  return <CollectionTemplate config={alfombrasConfig} />;
}
