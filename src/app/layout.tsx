import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "KAR | Artesanías de Alpaca Premium del Perú",
  description:
    "Descubre nuestra colección exclusiva de artesanías hechas a mano con la más fina fibra de alpaca peruana. Alfombras, gorros, pantuflas, ponchos y más. Envío internacional.",
  keywords:
    "alpaca, artesanías, Perú, alfombras alpaca, gorros baby alpaca, pantuflas cuero alpaca, poncho, bufanda, manta, hecho a mano",
  openGraph: {
    title: "KAR | Artesanías de Alpaca Premium del Perú",
    description:
      "Colección exclusiva de artesanías de alpaca peruana hechas a mano",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
