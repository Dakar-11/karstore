"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Colección Mujer",
    subtitle: "Ponchos, ruanas y prendas fluidas",
    image: "/images/alpaca_poncho.jpg",
    href: "/mujer",
  },
  {
    title: "Alfombras & Hogar",
    subtitle: "Geometría andina tejida en telar",
    image: "/images/alpaca_rug.jpg",
    href: "/alfombras",
  },
  {
    title: "Accesorios de Lujo",
    subtitle: "Bufandas herringbone, guantes y más",
    image: "/images/alpaca_scarf.jpg",
    href: "/accesorios",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#FBF9F6] border-y border-[#EAE5DC]">
      <div className="w-full max-w-[1840px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#8C7A6B] mb-2 block font-light">
            Colecciones Destacadas
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1917] tracking-tight">
            Explora por Categoría
          </h2>
        </div>

        {/* Responsive Grid: 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {collections.map((col, idx) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative overflow-hidden aspect-[4/3] sm:aspect-[4/5] md:aspect-[3/4] block bg-[#F6F4EE]"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                <p className="text-white/70 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mb-1.5 font-light">
                  {col.subtitle}
                </p>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-display font-medium mb-3">
                  {col.title}
                </h3>
                <div className="inline-flex items-center gap-2 text-white/90 group-hover:text-white transition-colors text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium">
                  <span>Ver colección</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
