"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
    <section className="py-16 md:py-24 bg-earth-100/50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-[11px] tracking-[0.4em] uppercase text-brand-600 mb-3 block">
            Colecciones
          </span>
          <h2 className="section-title">Explora por Categoría</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {collections.map((col, idx) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative overflow-hidden aspect-[3/4] block animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-white/70 text-[10px] tracking-[0.3em] uppercase mb-2">
                  {col.subtitle}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-display font-medium">
                  {col.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-xs tracking-[0.2em] uppercase">
                    Ver colección
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
