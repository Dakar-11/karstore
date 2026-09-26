import type { Metadata } from "next";
import CollectionTemplate, { CollectionConfig } from "@/components/CollectionTemplate";

export const metadata: Metadata = {
  title: "Colección Hombre | KAR Artesanías de Alpaca",
  description: "Sweaters de punto trenzado, cardigans, ponchos y bufandas de alpaca para hombre. Abrigo noble y elegancia sobria hecha en Perú.",
};

const hombreConfig: CollectionConfig = {
  slug: "hombre",
  name: "Hombre",
  pretitle: "LÍNEA MASCULINA · ARTE ATEMPORAL",
  title: "Estructura, Carácter & Abrigo",
  subtitle: "Línea Masculina",
  description:
    "Prendas tejidas con alpaca seleccionada de alta densidad. Diseños sobrios, puntos trenzados y acabados clásicos pensados para el abrigo diario con estilo inconfundible.",
  highlights: [
    "Alpaca de alta torsión y máxima resistencia",
    "Aislamiento térmico natural hasta 7x superior a la lana",
    "Cortes rectos y botones artesanales de madera",
  ],
  craftStory: {
    title: "Tejido Robusto en Telar de Pedal",
    subtitle: "RESISTENCIA Y ELEGANCIA ANDINA",
    text: "Los artesanos tejedores de las faldas del nevado Ausangate emplean telares manuales de cuatro pedales para generar tramas compactas y duraderas. El resultado son prendas con presencia escultórica que no pierden su forma ni generan motas con los años.",
    artisanOrigin: "Cusco & Arequipa",
    stat: "100%",
    statLabel: "Fibra natural biodegradable",
  },
};

export default function HombrePage() {
  return <CollectionTemplate config={hombreConfig} />;
}
