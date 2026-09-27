"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
  const { totalItems, toggleCart } = useCart();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // On home page: transparent over hero when not scrolled, solid white when scrolled
  const isTransparent = isHome && !scrolled;

  const headerBg = isTransparent
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-xl shadow-xs";

  const textColor = isTransparent ? "text-white/90" : "text-stone-700";
  const logoColor = isTransparent ? "text-white" : "text-stone-950";
  const hoverColor = isTransparent ? "hover:text-[#C4A87C]" : "hover:text-stone-950";
  const activeColor = isTransparent ? "text-white font-semibold" : "text-[#1C1917] font-semibold";
  const navAfterBg = isTransparent ? "after:bg-[#C4A87C]" : "after:bg-[#1C1917]";

  return (
    <>
      {/* Main header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBg}`}
      >
        <div className="w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Left: Mobile hamburger menu */}
            <div className="flex items-center flex-1 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`w-10 h-10 -ml-2 flex items-center justify-center rounded-md ${
                  isTransparent ? "text-white hover:text-[#C4A87C]" : "text-stone-800 hover:text-black"
                } transition-colors`}
                aria-label="Abrir menú"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Left area spacer for desktop balance */}
            <div className="hidden lg:flex flex-1" />

            {/* Center: Brand Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center justify-center py-2 group"
            >
              <span
                className={`font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase ${logoColor} transition-colors duration-300 group-hover:opacity-80`}
              >
                KAR
              </span>
            </Link>

            {/* Right: Cart Button & Spacer */}
            <div className="flex items-center justify-end flex-1 gap-2 sm:gap-3">
              <button
                onClick={toggleCart}
                className={`relative w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                  isTransparent
                    ? "text-white hover:text-[#C4A87C]"
                    : "text-stone-800 hover:text-black"
                }`}
                aria-label="Abrir bolsa de compras"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#1C1917] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 pb-3.5 -mt-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/#coleccion" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] py-1 transition-all duration-300 tracking-[0.2em] uppercase relative
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full
                    ${
                      isActive
                        ? `${activeColor} after:w-full ${navAfterBg}`
                        : `${textColor} ${hoverColor} font-medium ${navAfterBg}`
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Drawer (Accessible, touch-friendly on phones & tablets) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer content */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white flex flex-col justify-between shadow-2xl transition-transform duration-400 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Top */}
          <div className="p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-stone-200">
              <span className="font-display text-xl font-bold tracking-[0.2em] text-[#1C1917]">
                KAR
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-stone-500 hover:text-black rounded-md"
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links list */}
            <nav className="mt-6 space-y-4">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/#coleccion" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block py-2 text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors ${
                      isActive
                        ? "text-[#1C1917] font-bold border-l-2 border-[#1C1917] pl-3"
                        : "text-stone-600 hover:text-[#1C1917] pl-1"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 bg-stone-50 border-t border-stone-200">
            <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-light mb-2">
              Fibra de Alpaca Premium
            </p>
            <p className="text-xs text-stone-600 font-light mb-4">
              Hecho a mano en los Andes peruanos. Envíos nacionales e internacionales.
            </p>
            <a
              href="https://wa.me/51999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 px-4 bg-[#1C1917] text-white text-center text-xs tracking-widest uppercase font-medium hover:bg-black transition-colors"
            >
              Atención por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
