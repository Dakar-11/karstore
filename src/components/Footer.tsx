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
  Lock,
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
    { label: "Artesanos", href: "#nosotros" },
    { label: "Sostenibilidad", href: "#nosotros" },
    { label: "Ventas Mayoristas & B2B", href: "mailto:ventas@kar.pe?subject=Consulta%20Mayoristas" },
    { label: "Trabaja con Nosotros", href: "#" },
  ],
};

const benefits = [
  { icon: Truck, label: "Envío gratis +S/299" },
  { icon: RotateCcw, label: "Devolución 30 días" },
  { icon: Shield, label: "Pago seguro" },
  { icon: CreditCard, label: "Hasta 12 cuotas" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-earth-950 text-white">
      {/* Benefits bar */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="flex items-center gap-3 justify-center"
              >
                <benefit.icon
                  size={18}
                  className="text-brand-400 flex-shrink-0"
                />
                <span className="text-[11px] tracking-wider uppercase text-earth-300 font-light">
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-bold tracking-[0.15em]">
                KAR
              </span>
            </Link>
            <p className="text-sm text-earth-400 font-light leading-relaxed max-w-sm mb-6">
              Artesanías de alpaca premium hechas a mano en los Andes
              peruanos. Tradición, calidad y belleza en cada pieza.
            </p>
            <div className="space-y-3 mb-8">
              <a
                href="#"
                className="flex items-center gap-3 text-xs text-earth-400 hover:text-brand-400 transition-colors"
              >
                <MapPin size={14} />
                Av. Larco 1036, Miraflores, Lima, Perú
              </a>
              <a
                href="tel:+5114567890"
                className="flex items-center gap-3 text-xs text-earth-400 hover:text-brand-400 transition-colors"
              >
                <Phone size={14} />
                +51 1 456 7890
              </a>
              <a
                href="mailto:hola@kar.pe"
                className="flex items-center gap-3 text-xs text-earth-400 hover:text-brand-400 transition-colors"
              >
                <Mail size={14} />
                hola@kar.pe
              </a>
            </div>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-white/15 text-earth-400 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 text-white">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-earth-400 hover:text-brand-400 transition-colors font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-earth-500 tracking-wider">
              © 2027 KAR. Todos los derechos reservados. Hecho con ❤️ en
              Perú.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-[10px] text-earth-500 hover:text-earth-300 tracking-wider"
              >
                Términos y Condiciones
              </a>
              <a
                href="#"
                className="text-[10px] text-earth-500 hover:text-earth-300 tracking-wider"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-[10px] text-earth-500 hover:text-earth-300 tracking-wider"
              >
                Cookies
              </a>
              <Link
                href="/admin"
                className="text-[10px] text-earth-600 hover:text-earth-400 tracking-wider flex items-center gap-1 transition-colors"
                title="Acceso restringido para administración"
              >
                <Lock size={10} />
                <span>Portal Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
