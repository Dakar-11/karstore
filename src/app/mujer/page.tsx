import type { Metadata } from "next";
import CollectionTemplate, { CollectionConfig } from "@/components/CollectionTemplate";

export const metadata: Metadata = {
  title: "Colección Mujer | KAR Artesanías de Alpaca",
  description: "Descubre ponchos, chalinas, ruanas y sweaters de alpaca diseñados exclusivamente para mujer. Lujo andino y suavidad sin igual.",
};

const mujerConfig: CollectionConfig = {
  slug: "mujer",
  name: "Mujer",
  pretitle: "ATELIER FEMENINO · COLECCIÓN 2027",
  title: "Elegancia Natural & Caída Fluida",
  subtitle: "Línea Femenina",
  description:
    "Prendas y ruanas envolventes tejidas en fibra pura Baby Alpaca. Siluetas contemporáneas con la suavidad milenaria de los Andes peruanos.",
  highlights: [
    "100% Baby Alpaca y mezclas con seda natural",
    "Termorregulación y suavidad hipoalergénica",
    "Tintes ecológicos en tonos tierra y minerales",
  ],
  craftStory: {
    title: "El Arte del Hilado Femenino en el Altiplano",
    subtitle: "HERENCIA TRANSMITIDA DE MADRES A HIJAS",
    text: "En las comunidades de Puno y Cusco, las maestras tejedoras seleccionan manualmente los vellones de la primera esquila de la cría de alpaca. La fibra resultante, de menos de 22 micras, se hila a mano para lograr prendas livianas pero incomparablemente abrigadas.",
    artisanOrigin: "Puno & Valle Sagrado",
    stat: "19.5µ",
    statLabel: "Grosor medio de fibra Baby Alpaca",
  },
};

export default function MujerPage() {
  return <CollectionTemplate config={mujerConfig} />;
}
