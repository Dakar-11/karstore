import type { Metadata } from "next";
import CollectionTemplate, { CollectionConfig } from "@/components/CollectionTemplate";

export const metadata: Metadata = {
  title: "Pieles Curtidas de Alpaca | KAR Artesanías",
  description: "Pieles de alpaca curtidas artesanalmente de origen ético y ecológico. Alfombras y cojines de pelo largo para decoración de interiores de lujo.",
};

const pielesConfig: CollectionConfig = {
  slug: "pieles-curtidas",
  name: "Pieles Curtidas",
  pretitle: "ALTA DECORACIÓN · PIEZAS EXCLUSIVAS",
  title: "Piel de Alpaca de Origen Ético & Curtido Natural",
  subtitle: "Pieles & Cojines",
  description:
    "Pieles seleccionadas de alpaca curtidas mediante procesos artesanales y ecológicos. Suavidad inigualable y pelo lustroso procedente exclusivamente de mortalidad natural.",
  highlights: [
    "100% Origen Ético: procedente de mortalidad natural en invierno andino",
    "Curtido ecológico sin cromo ni químicos agresivos",
    "Pelo largo, sedoso y brillante de tacto celestial",
  ],
  craftStory: {
    title: "Curtiduría Artesanal y Respeto por el Animal",
    subtitle: "ÉTICA Y SOSTENIBILIDAD EN LAS ALTURAS",
    text: "En KAR jamás se sacrifica un animal por su piel. Nuestras pieles provienen de crías y alpacas que sucumben naturalmente a las heladas extremas del invierno altiplánico a más de 4,000 metros. Los curtidores tradicionales las tratan con alumbre y taninos vegetales para conservar su suavidad natural intacta.",
    artisanOrigin: "Macusani & Puno",
    stat: "100%",
    statLabel: "Mortalidad natural certificada",
  },
};

export default function PielesCurtidasPage() {
  return <CollectionTemplate config={pielesConfig} />;
}
