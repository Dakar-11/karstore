import type { Metadata } from "next";
import CollectionTemplate, { CollectionConfig } from "@/components/CollectionTemplate";

export const metadata: Metadata = {
  title: "Accesorios de Alpaca | KAR Artesanías",
  description: "Bufandas herringbone, guantes tejidos, gorros con pompón y pantuflas de cuero y alpaca. Pequeños lujos hechos a mano en Perú.",
};

const accesoriosConfig: CollectionConfig = {
  slug: "accesorios",
  name: "Accesorios",
  pretitle: "DETALLES ARTESANALES · COMPLEMENTOS DE LUJO",
  title: "Pequeñas Obras de Arte & Calidez",
  subtitle: "Bufandas, Guantes & Calzado",
  description:
    "Bufandas con patrón herringbone, guantes térmicos, chullos y pantuflas de cuero de badana con forro de alpaca. La calidez perfecta para llevar o regalar.",
  highlights: [
    "Patrones geométricos y herringbone clásicos",
    "Pantuflas de cuero genuino y forro de vellón",
    "Presentación en packaging artesanal para regalo",
  ],
  craftStory: {
    title: "El Cuidado en los Pequeños Detalles",
    subtitle: "PUNTADAS FINAS A CINCO PALILLOS",
    text: "Los gorros, guantes y bufandas demandan una precisión milimétrica. Las maestras artesanas de las comunidades de Chinchero tejen con palillos de espina o metal fino, logrando acabados elásticos, envolventes y duraderos que se sienten como una caricia en la piel.",
    artisanOrigin: "Chinchero & Cusco",
    stat: "+1,200",
    statLabel: "Prendas elaboradas anualmente",
  },
};

export default function AccesoriosPage() {
  return <CollectionTemplate config={accesoriosConfig} />;
}
