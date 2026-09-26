"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-[#F6F4EE] text-[#1C1917] overflow-hidden border-b border-[#E8E3D8]">
      {/* Main Content Area */}
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Column (7 cols): Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Subtle Origin Indicator */}
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A6B]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#78716C] font-light">
                Artesanía Textil de los Andes Peruanos
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#1C1917] font-light leading-[1.0] tracking-tight mb-6 sm:mb-8">
              La Nobleza
              <span className="block font-display italic font-normal text-[#57534E] mt-2">
                de la Alpaca
              </span>
            </h1>

            {/* Story Paragraph */}
            <p className="text-[#57534E] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              Piezas exclusivas tejidas a mano por maestros artesanos en las alturas
              de los Andes peruanos. Una tradición milenaria que transforma la fibra
              más suave, cálida y sostenible del mundo en lujo atemporal.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 sm:mb-12">
              <a
                href="#coleccion"
                className="px-9 py-4 bg-[#1C1917] text-white hover:bg-[#2F2925] text-xs tracking-[0.24em] uppercase font-medium transition-all duration-300 text-center shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Explorar Colección</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#nosotros"
                className="px-9 py-4 border border-[#1C1917]/30 bg-white/60 hover:bg-white text-[#1C1917] hover:border-[#1C1917] text-xs tracking-[0.24em] uppercase font-medium transition-all duration-300 text-center shadow-xs"
              >
                Nuestra Historia
              </a>
            </div>

            {/* Micro Provenance Highlights */}
            <div className="pt-6 border-t border-[#E8E3D8] flex flex-wrap items-center gap-x-6 gap-y-2 text-[#78716C] text-xs tracking-[0.2em] uppercase font-light">
              <span>Puno & Cusco (+4,000m)</span>
              <span className="text-[#C7BFB0]">·</span>
              <span>+500 Familias Artesanas</span>
              <span className="text-[#C7BFB0]">·</span>
              <span>Comercio Justo Certificado</span>
            </div>
          </div>

          {/* Right Column (5 cols): Star Product Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-none">
              {/* Product Frame Card */}
              <div className="relative bg-white border border-[#E2DBD0] p-4 sm:p-5 shadow-lg shadow-[#1C1917]/5 transition-all duration-500 hover:shadow-xl hover:shadow-[#1C1917]/10 group">
                {/* Floating Artisan Badge */}
                <div className="absolute top-7 left-7 z-10 bg-[#1C1917]/90 backdrop-blur-md text-white px-3 py-1 text-[10px] tracking-[0.25em] uppercase font-light">
                  Pieza Destacada
                </div>

                {/* Star Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F6F4EE]">
                  <Image
                    src="/images/alpaca_poncho.jpg"
                    alt="Poncho artesanal de alpaca premium hecho a mano"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>

                {/* Caption Details */}
                <div className="mt-4 pt-3 border-t border-[#F0ECE3] flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base text-[#1C1917] font-medium tracking-tight">
                      Poncho Andino Ceremonial
                    </h3>
                    <p className="text-xs text-[#78716C] font-light tracking-wide mt-0.5">
                      100% Baby Alpaca · Telar Tradicional
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-[#1C1917] block">
                      S/ 489.00
                    </span>
                    <a
                      href="#coleccion"
                      className="text-[11px] tracking-wider text-[#78716C] underline underline-offset-4 hover:text-[#1C1917] transition-colors"
                    >
                      Ver pieza
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: 4 Architectural Columns Across Full Width */}
      <div className="w-full border-t border-[#E8E3D8] bg-[#F1EFE8]/70">
        <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Pillar 01 */}
            <div className="border-l border-[#DDD6C8] pl-5 sm:pl-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E] block mb-1.5 font-mono">
                01 / PUREZA
              </span>
              <h4 className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#1C1917] mb-1">
                100% Baby Alpaca
              </h4>
              <p className="text-xs text-[#6B655E] font-light leading-relaxed">
                7 veces más cálida que la lana tradicional, hipoalergénica y sedosa.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="border-l border-[#DDD6C8] pl-5 sm:pl-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E] block mb-1.5 font-mono">
                02 / MAESTRÍA
              </span>
              <h4 className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#1C1917] mb-1">
                Tejido Ancestral
              </h4>
              <p className="text-xs text-[#6B655E] font-light leading-relaxed">
                Elaborado en telar de pedal y técnicas heredadas por generaciones.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="border-l border-[#DDD6C8] pl-5 sm:pl-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E] block mb-1.5 font-mono">
                03 / COMUNIDAD
              </span>
              <h4 className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#1C1917] mb-1">
                Comercio Justo
              </h4>
              <p className="text-xs text-[#6B655E] font-light leading-relaxed">
                Relación directa y pago digno a más de 500 familias altoandinas.
              </p>
            </div>

            {/* Pillar 04 */}
            <div className="border-l border-[#DDD6C8] pl-5 sm:pl-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E] block mb-1.5 font-mono">
                04 / ORIGEN
              </span>
              <h4 className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#1C1917] mb-1">
                Andes Peruanos
              </h4>
              <p className="text-xs text-[#6B655E] font-light leading-relaxed">
                Criadas en libertad a +4,000m. Fibra sostenible y de bajo impacto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
