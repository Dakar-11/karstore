"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "NUEVA COLECCIÓN", href: "/#coleccion" },
  { label: "MUJER", href: "/mujer" },
  { label: "HOMBRE", href: "/hombre" },
  { label: "ALFOMBRAS", href: "/alfombras" },
  { label: "ACCESORIOS", href: "/accesorios" },
  { label: "PIELES CURTIDAS", href: "/pieles-curtidas" },
  { label: "CONTACTO / MAYORISTAS", href: "/#contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xs"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left area (Mobile menu toggle) */}
            <div className="flex items-center gap-4 md:gap-6 flex-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-earth-800 hover:text-brand-600 transition-colors"
                aria-label="Menú"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-1"
            >
              <span className="font-display text-2xl md:text-3xl font-bold tracking-[0.15em] text-earth-950">
                KAR
              </span>
            </Link>

            {/* Right area spacer for centered balance */}
            <div className="flex-1 flex justify-end" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 pb-3 -mt-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/#coleccion" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`nav-link text-[11px] py-1 transition-all ${
                    isActive ? "text-[#1C1917] font-semibold after:w-full after:bg-[#1C1917]" : "text-earth-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-80 bg-white shadow-2xl transition-transform duration-500 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mb-8 text-earth-600"
            >
              <X size={22} />
            </button>
            <nav className="space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/#coleccion" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block text-sm tracking-[0.2em] transition-colors ${
                      isActive ? "text-[#1C1917] font-bold" : "text-earth-800 hover:text-brand-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
