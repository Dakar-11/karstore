"use client";

import React from "react";
import Image from "next/image";
import { Leaf, Heart, Mountain, Gem } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "Fibra de alpaca orgánica, sin químicos ni procesos industriales. Respetuoso con el medio ambiente.",
  },
  {
    icon: Heart,
    title: "Hecho a Mano",
    description:
      "Cada pieza es tejida a mano por artesanos que preservan técnicas ancestrales de los Andes peruanos.",
  },
  {
    icon: Mountain,
    title: "Origen Andino",
    description:
      "Nuestras alpacas viven a más de 4,000 metros en los Andes, donde desarrollan la fibra más fina del mundo.",
  },
  {
    icon: Gem,
    title: "Calidad Premium",
    description:
      "Seleccionamos solo fibra Baby Alpaca y Royal Alpaca, las categorías más suaves y exclusivas.",
  },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Story section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/alpaca_poncho.jpg"
                alt="Artesanía de alpaca"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 md:-right-8 glass-card p-6 max-w-[220px] animate-float">
              <p className="text-3xl font-display font-bold text-brand-600 mb-1">
                +500
              </p>
              <p className="text-xs text-earth-600 tracking-wide">
                Familias artesanas en nuestra comunidad
              </p>
            </div>
          </div>

          <div>
            <span className="text-[11px] tracking-[0.4em] uppercase text-brand-600 mb-4 block">
              Nuestra Historia
            </span>
            <h2 className="section-title mb-6">
              Tradición que se
              <br />
              <span className="font-display italic font-normal">
                teje con el alma
              </span>
            </h2>
            <div className="space-y-4 text-earth-600 font-light leading-relaxed">
              <p>
                KAR nace de un profundo respeto por la tradición textil andina.
                Nuestro nombre representa la esencia de la artesanía peruana, y cada pieza que
                creamos refleja el valor incalculable de un arte que se
                transmite de generación en generación.
              </p>
              <p>
                Trabajamos directamente con más de 500 familias artesanas en
                las comunidades altoandinas de Puno, Cusco y Arequipa.
                Garantizamos precios justos, condiciones dignas y la
                preservación de técnicas que tienen más de mil años de historia.
              </p>
              <p>
                Nuestra fibra de alpaca es reconocida mundialmente como &quot;el
                oro de los Andes&quot;: hipoalergénica, termorreguladora, y
                extraordinariamente suave. Más cálida que la lana de oveja y
                más ligera que el cashmere.
              </p>
            </div>
            <a href="#" className="btn-primary mt-8">
              Conoce Más
            </a>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="text-center group p-6 hover:bg-earth-50 rounded-sm transition-all duration-500"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-earth-200 rounded-full group-hover:border-brand-300 group-hover:bg-brand-50 transition-all duration-500">
                <feature.icon
                  size={22}
                  className="text-earth-500 group-hover:text-brand-600 transition-colors duration-500"
                />
              </div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-earth-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-xs text-earth-500 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
