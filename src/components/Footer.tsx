"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";

const footerLinks = {
  tienda: [
    { label: "Nueva Colección", href: "/#coleccion" },
    { label: "Mujer", href: "/mujer" },
    { label: "Hombre", href: "/hombre" },
    { label: "Alfombras", href: "/alfombras" },
    { label: "Accesorios", href: "/accesorios" },
    { label: "Pieles Curtidas", href: "/pieles-curtidas" },
  ],
  ayuda: [
    { label: "Preguntas Frecuentes", href: "#" },
    { label: "Guía de Tallas", href: "#" },
    { label: "Envíos y Entregas", href: "#" },
    { label: "Devoluciones", href: "#" },
    { label: "Cuidado del Producto", href: "#" },
    { label: "Contacto / Mayoristas", href: "#contacto" },
  ],
  empresa: [
    { label: "Nuestra Historia", href: "#nosotros" },
    { label: "Artesanos Andinos", href: "#nosotros" },
    { label: "Sostenibilidad", href: "#nosotros" },
    { label: "Ventas Mayoristas & B2B", href: "mailto:ventas@kar.pe?subject=Consulta%20Mayoristas" },
    { label: "Trabaja con Nosotros", href: "#" },
  ],
};

const benefits = [
  { icon: Truck, label: "Envío gratis", sub: "Compras desde S/ 299" },
  { icon: RotateCcw, label: "Devolución 30 días", sub: "Garantía de satisfacción" },
  { icon: Shield, label: "Pago 100% seguro", sub: "Cifrado SSL certificado" },
  { icon: CreditCard, label: "Hasta 12 cuotas", sub: "Todas las tarjetas" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#12100E] text-white">
      {/* Benefits bar (Responsive grid: 2 cols on mobile, 4 cols on desktop) */}
      <div className="border-b border-white/10">
        <div className="w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon size={18} className="text-[#C4A87C]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium tracking-wide text-white">
                    {benefit.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-stone-400 font-light truncate">
                    {benefit.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand info (spans 2 cols on desktop) */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2 pr-0 lg:pr-8">
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-white block mb-3">
              KAR
            </span>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-6 max-w-sm">
              Artesanías y moda textil de lujo hechas a mano con la más fina fibra de alpaca peruana. Conectando la tradición milenaria de los Andes con el mundo.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                  aria-label="Red social"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              Colecciones
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white text-xs sm:text-[13px] font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              Atención
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white text-xs sm:text-[13px] font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3: Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-stone-400 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#C4A87C] flex-shrink-0 mt-0.5" />
                <span>Cusco & Lima, Perú</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C4A87C] flex-shrink-0" />
                <span>+51 984 000 000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#C4A87C] flex-shrink-0" />
                <span>contacto@kar.pe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 py-5">
        <div className="w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px] font-light">
          <p>© {new Date().getFullYear()} KAR Artesanías del Perú. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-stone-300 transition-colors">
              Términos
            </a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Privacidad
            </a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Libro de Reclamaciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
