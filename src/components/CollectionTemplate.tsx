"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { Product } from "@/context/CartContext";
import { ChevronDown, Grid3X3, LayoutGrid, ArrowRight, Check } from "lucide-react";

export interface CollectionConfig {
  slug: "mujer" | "hombre" | "alfombras" | "accesorios" | "pieles-curtidas";
  name: string;
  pretitle: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  craftStory: {
    title: string;
    subtitle: string;
    text: string;
    artisanOrigin: string;
    stat: string;
    statLabel: string;
  };
}

function matchesCollection(product: Product, slug: string): boolean {
  if (product.branch?.toLowerCase() === slug.toLowerCase()) {
    return true;
  }
  switch (slug) {
    case "mujer": {
      const isBranch = product.branch === "mujer";
      const isGender = product.gender === "mujer" || product.gender === "unisex";
      const hasTag = product.tags?.includes("mujer");
      const isCat = ["ponchos", "bufandas", "sweaters", "gorros"].includes(product.category.toLowerCase()) && product.gender !== "hombre";
      return Boolean(isBranch || isGender || hasTag || isCat);
    }
    case "hombre": {
      const isBranch = product.branch === "hombre";
      const isGender = product.gender === "hombre" || product.gender === "unisex";
      const hasTag = product.tags?.includes("hombre");
      const isCat = ["sweaters", "ponchos", "bufandas", "accesorios"].includes(product.category.toLowerCase()) && product.gender !== "mujer";
      return Boolean(isBranch || isGender || hasTag || isCat);
    }
    case "alfombras": {
      const isBranch = product.branch === "alfombras";
      const isCat = ["alfombras", "mantas"].includes(product.category.toLowerCase());
      const hasTag = product.tags?.some((t) => ["alfombras", "mantas", "hogar"].includes(t.toLowerCase()));
      return Boolean(isBranch || isCat || hasTag);
    }
    case "accesorios": {
      const isBranch = product.branch === "accesorios";
      const isCat = ["accesorios", "bufandas", "gorros", "calzado", "guantes"].includes(product.category.toLowerCase());
      const hasTag = product.tags?.some((t) => ["accesorios", "bufandas", "gorros", "calzado", "guantes"].includes(t.toLowerCase()));
      return Boolean(isBranch || isCat || hasTag);
    }
    case "pieles-curtidas": {
      const isBranch = product.branch === "pieles-curtidas" || product.branch === "pieles curtidas";
      const isCat = product.category.toLowerCase().includes("piel");
      const hasTag = product.tags?.some((t) => t.toLowerCase().includes("piel"));
      return Boolean(isBranch || isCat || hasTag);
    }
    default:
      return true;
  }
}

export default function CollectionTemplate({ config }: { config: CollectionConfig }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubFilter, setActiveSubFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (data?.products && Array.isArray(data.products)) {
          setProducts(data.products.filter((p: Product) => matchesCollection(p, config.slug)));
        }
      } catch (err) {
        console.warn("Failed to load products for collection:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [config.slug]);

  // Subcategories derived from this collection's products
  const subCategories = ["todos", ...Array.from(new Set(products.map((p) => p.category.toLowerCase())))];

  // Filtering by subcategory
  const filteredProducts =
    activeSubFilter === "todos"
      ? products
      : products.filter((p) => p.category.toLowerCase() === activeSubFilter);

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: "featured", label: "Destacados" },
    { value: "price-asc", label: "Precio: Menor a Mayor" },
    { value: "price-desc", label: "Precio: Mayor a Menor" },
    { value: "name", label: "Nombre: A - Z" },
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-20">
        {/* KUNA-style Collection Products Section */}
        <section className="py-6 sm:py-10">
          <div className="w-full max-w-[1840px] mx-auto px-3 sm:px-6 lg:px-8">
            {/* KUNA Header Bar: Category title + clean divider */}
            <div className="mb-3">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#78716C] font-light">
                <Link href="/" className="hover:text-[#1C1917] transition-colors">
                  KAR
                </Link>
                <span className="text-[#C7BFB0]">|</span>
                <span className="text-[#1C1917] font-medium tracking-[0.2em]">
                  {config.name.toUpperCase()}
                  {activeSubFilter !== "todos" ? ` · ${activeSubFilter.toUpperCase()}` : ""}
                </span>
              </div>
            </div>

            {/* Subcategories Bar (horizontal tabs) */}
            {subCategories.length > 2 && (
              <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2.5 pt-1 scrollbar-hide border-b border-[#EAE5DC]">
                {subCategories.map((subCat) => {
                  const count =
                    subCat === "todos"
                      ? products.length
                      : products.filter((p) => p.category.toLowerCase() === subCat).length;
                  const isActive = activeSubFilter === subCat;
                  return (
                    <button
                      key={subCat}
                      onClick={() => setActiveSubFilter(subCat)}
                      className={`flex-shrink-0 text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all duration-200 py-1 relative ${
                        isActive
                          ? "text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1C1917]"
                          : "text-[#78716C] hover:text-[#1C1917] font-normal"
                      }`}
                    >
                      {subCat === "todos" ? "Todos" : subCat}
                      <span className="ml-1 text-[10px] text-[#A8A29E] font-light">
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* KUNA Minimalist Sub-Header: Count + Filter Controls */}
            <div className="flex items-center justify-between py-3.5 border-b border-[#EAE5DC] mb-6 sm:mb-8">
              {/* Left: Product count */}
              <div className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#78716C] font-medium">
                <span className="text-[#1C1917] font-semibold">{sortedProducts.length}</span>{" "}
                {sortedProducts.length === 1 ? "PIEZA" : "PIEZAS"}
              </div>

              {/* Right: Grid Switcher + Filter Dropdown */}
              <div className="flex items-center gap-5 sm:gap-6">
                {/* View Switcher (Desktop only) */}
                <div className="hidden lg:flex items-center gap-2 border-r border-[#EAE5DC] pr-5 text-[#78716C]">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 transition-colors ${
                      gridCols === 3 ? "text-[#1C1917]" : "text-[#C7BFB0] hover:text-[#78716C]"
                    }`}
                    title="Vista 3 columnas (Grandes)"
                    aria-label="3 columnas"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 transition-colors ${
                      gridCols === 4 ? "text-[#1C1917]" : "text-[#C7BFB0] hover:text-[#78716C]"
                    }`}
                    title="Vista 4 columnas"
                    aria-label="4 columnas"
                  >
                    <LayoutGrid size={18} />
                  </button>
                </div>

                {/* Sort & Filter Dropdown (KUNA Style) */}
                <div className="relative">
                  <button
                    onClick={() => setShowSort(!showSort)}
                    className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#1C1917] hover:text-[#8C7A6B] font-medium transition-colors"
                  >
                    <span>FILTRAR & ORDENAR</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 text-[#78716C] ${
                        showSort ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showSort && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl border border-[#EAE5DC] py-2 z-30 animate-scale-in">
                      <div className="px-4 py-2 border-b border-[#F5F2EB] text-[10px] tracking-[0.25em] uppercase text-[#A8A29E] font-medium">
                        Ordenar colección
                      </div>
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSort(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs tracking-wider uppercase transition-colors flex items-center justify-between ${
                            sortBy === option.value
                              ? "bg-[#F7F5F0] text-[#1C1917] font-semibold"
                              : "text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
                          }`}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && (
                            <Check size={13} className="text-[#1C1917]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid (KUNA Style: minimal gap, big imposing photos) */}
            {loading ? (
              <div className="py-32 text-center">
                <div className="w-8 h-8 border-2 border-[#1C1917] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs uppercase tracking-widest text-[#78716C]">Cargando colección...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="py-24 text-center bg-[#FAF8F5] border border-[#EAE5DC]">
                <h3 className="font-display text-lg text-[#1C1917] mb-2">No hay piezas en esta selección</h3>
                <p className="text-xs text-[#78716C] mb-6">
                  Explora todas las piezas de la colección {config.name}.
                </p>
                <button
                  onClick={() => setActiveSubFilter("todos")}
                  className="px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
                >
                  Ver Todas las Piezas
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 3
                    ? "md:grid-cols-3"
                    : "md:grid-cols-3 lg:grid-cols-4"
                } gap-x-2 sm:gap-x-3 lg:gap-x-4 gap-y-7 sm:gap-y-10`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Specialized Artisan Story Section at the bottom */}
        <section className="py-16 sm:py-20 bg-[#FBF9F6] border-t border-[#EAE5DC]">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="text-[11px] tracking-[0.32em] uppercase text-[#78716C] mb-3 block font-light">
                  {config.craftStory.subtitle}
                </span>
                <h2 className="font-display text-2xl sm:text-4xl text-[#1C1917] font-light leading-tight mb-4">
                  {config.craftStory.title}
                </h2>
                <p className="text-[#57534E] text-sm sm:text-base leading-relaxed font-light mb-6 max-w-xl">
                  {config.craftStory.text}
                </p>
                <div className="flex items-center gap-6">
                  <div className="border-l-2 border-[#1C1917] pl-4">
                    <p className="text-2xl font-display font-medium text-[#1C1917]">{config.craftStory.stat}</p>
                    <p className="text-[10px] text-[#78716C] uppercase tracking-wider">{config.craftStory.statLabel}</p>
                  </div>
                  <div className="border-l-2 border-[#DDD6C8] pl-4">
                    <p className="text-xs uppercase tracking-wider text-[#1C1917] font-medium">{config.craftStory.artisanOrigin}</p>
                    <p className="text-[10px] text-[#78716C]">Origen Certificado</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-8 border border-[#EAE5DC]">
                <h3 className="font-display text-lg text-[#1C1917] mb-2">¿Buscas pedidos especiales o a medida?</h3>
                <p className="text-xs text-[#57534E] font-light leading-relaxed mb-6">
                  Elaboramos piezas personalizadas para proyectos de arquitectura, mayoristas y coleccionistas en todo el mundo.
                </p>
                <a
                  href="mailto:ventas@kar.pe?subject=Consulta%20Especial%20Colección"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#1C1917] hover:text-[#A55223] transition-colors"
                >
                  <span>Contactar con nuestro Atelier</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
      <CartPanel />
    </>
  );
}
