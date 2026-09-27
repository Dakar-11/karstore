"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 500);
  const parallax = scrollY * 0.25;

  return (
    <section className="relative h-[100svh] min-h-[560px] sm:min-h-[660px] max-h-[1100px] overflow-hidden bg-[#0F0D0A]">
      {/* ── Background Image with Parallax ── */}
      <div
        className="absolute inset-0 w-full h-[115%]"
        style={{ transform: `translateY(-${parallax}px)` }}
      >
        <Image
          src="/images/fondo_kar.png"
          alt="Artesanía de alpaca premium - KAR"
          fill
          className={`object-cover object-center transition-all duration-[1.8s] ease-out ${
            loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          sizes="100vw"
          priority
          quality={90}
        />
      </div>

      {/* ── Cinematic Gradient Overlays ── */}
      {/* Left gradient for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a150e]/85 via-[#1a150e]/45 to-transparent sm:via-[#1a150e]/35" />
      {/* Bottom gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A]/90 via-[#0F0D0A]/30 to-transparent" />
      {/* Subtle tint */}
      <div className="absolute inset-0 bg-[#0F0D0A]/15" />

      {/* ── Main Content (Responsive for mobile & tablet) ── */}
      <div
        className="relative z-10 h-full flex flex-col justify-end pb-24 sm:pb-32 lg:pb-36"
        style={{ opacity }}
      >
        <div className="w-full max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Origin Tag */}
          <div
            className={`flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5 transition-all duration-1000 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-5 sm:w-8 h-[1px] bg-[#C4A87C]" />
            <span className="text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-[#C4A87C] font-light">
              Andes Peruanos · 4,000m
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`transition-all duration-1000 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="block font-display text-[clamp(2.4rem,7vw,6.5rem)] text-white/95 font-light leading-[0.95] tracking-[-0.02em]">
              Alpaca
            </span>
            <span className="block font-display italic text-[clamp(2.4rem,7vw,6.5rem)] text-[#C4A87C] font-normal leading-[0.95] tracking-[-0.02em] mt-0.5 sm:mt-1">
              Premium
            </span>
          </h1>

          {/* Tagline */}
          <p
            className={`mt-4 sm:mt-6 text-white/70 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-sm sm:max-w-md leading-relaxed transition-all duration-1000 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Piezas únicas tejidas a mano por maestros artesanos.
          </p>

          {/* CTA */}
          <div
            className={`mt-6 sm:mt-8 transition-all duration-1000 delay-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#coleccion"
              className="group inline-flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300"
            >
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium">
                Explorar Colección
              </span>
              <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 group-hover:border-[#C4A87C] group-hover:bg-[#C4A87C]/15 transition-all duration-300">
                <ArrowDownRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 text-[#C4A87C]"
                />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Glass Strip (Responsive 3 columns) ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-1000 delay-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-black/35 backdrop-blur-md border-t border-white/[0.08]">
          <div className="w-full max-w-[1840px] mx-auto px-2 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
              {[
                { value: "100%", label: "Baby Alpaca" },
                { value: "+500", label: "Familias" },
                { value: "4,000m", label: "Andes Perú" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="py-3 sm:py-4 px-2 sm:px-4 text-center"
                >
                  <span className="block text-white/95 text-xs sm:text-sm md:text-base font-display font-medium tracking-wide">
                    {item.value}
                  </span>
                  <span className="block text-white/45 text-[8px] sm:text-[10px] tracking-[0.16em] uppercase font-light mt-0.5 truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator (Hidden on mobile, visible on desktop) ── */}
      <div
        className={`absolute bottom-24 right-6 sm:right-8 lg:right-12 z-20 hidden md:flex flex-col items-center gap-2.5 transition-all duration-1000 delay-900 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ opacity: opacity * 0.6 }}
      >
        <span className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-light [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 w-full h-3 bg-[#C4A87C] animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(300%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
