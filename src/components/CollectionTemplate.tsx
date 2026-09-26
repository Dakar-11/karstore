"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { Product } from "@/context/CartContext";
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutGrid, Sparkles, Feather, ShieldCheck, ArrowRight } from "lucide-react";

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
  const [gridCols, setGridCols] = useState(4);
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

  return (
    <>
      <Header />
      <main className="bg-[#FAF8F5] min-h-screen">
        {/* Editorial Collection Hero Banner */}
        <section className="relative bg-[#F5F2EB] border-b border-[#E5E0D5] py-14 sm:py-20 md:py-24">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#78716C] mb-6">
              <Link href="/" className="hover:text-[#1C1917] transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span>Colecciones</span>
              <span>/</span>
              <span className="text-[#1C1917] font-medium">{config.name}</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              {/* Left Column: Big Editorial Title */}
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DDD6C8] bg-white/70 text-[#78716C] text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-5 w-fit">
                  <Sparkles size={12} className="text-[#8C7A6B]" />
                  <span>{config.pretitle}</span>
                </div>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1C1917] font-light leading-[1.02] tracking-tight mb-5">
                  {config.title}
                </h1>
                <p className="text-[#57534E] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                  {config.description}
                </p>
              </div>

              {/* Right Column: Highlights pills */}
              <div className="lg:col-span-4 flex flex-col justify-end">
                <div className="p-6 bg-white/80 border border-[#E5E0D5] rounded-sm backdrop-blur-xs">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#78716C] block mb-3 font-medium">
                    Compromiso Artesanal
                  </span>
                  <ul className="space-y-2.5">
                    {config.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-[#1C1917] font-light">
                        <Feather size={14} className="text-[#8C7A6B] flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Products Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-16">
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E5E0D5] scrollbar-hide">
              {subCategories.map((subCat) => {
                const count =
                  subCat === "todos"
                    ? products.length
                    : products.filter((p) => p.category.toLowerCase() === subCat).length;
                return (
                  <button
                    key={subCat}
                    onClick={() => setActiveSubFilter(subCat)}
                    className={`flex-shrink-0 px-4 py-2 text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-300 border-b-2 -mb-[17px] ${
                      activeSubFilter === subCat
                        ? "border-[#1C1917] text-[#1C1917]"
                        : "border-transparent text-[#78716C] hover:text-[#1C1917]"
                    }`}
                  >
                    {subCat === "todos" ? "Todos" : subCat}
                    <span className="ml-1 text-[#A8A29E]">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Toolbar: Counter, Layout Toggle, Sort */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4">
              <p className="text-xs sm:text-sm text-[#78716C]">
                Mostrando <span className="font-semibold text-[#1C1917]">{sortedProducts.length}</span> piezas exclusivas
              </p>

              <div className="flex items-center gap-4">
                {/* Grid columns toggle (Desktop) */}
                <div className="hidden md:flex items-center gap-1 border border-[#DDD6C8] p-0.5 rounded-sm bg-white">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded-xs transition-colors ${
                      gridCols === 3 ? "bg-[#1C1917] text-white" : "text-[#78716C] hover:text-[#1C1917]"
                    }`}
                    title="Vista 3 columnas"
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 rounded-xs transition-colors ${
                      gridCols === 4 ? "bg-[#1C1917] text-white" : "text-[#78716C] hover:text-[#1C1917]"
                    }`}
                    title="Vista 4 columnas"
                  >
                    <LayoutGrid size={15} />
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSort(!showSort)}
                    className="flex items-center gap-2 px-3.5 py-2 border border-[#DDD6C8] bg-white rounded-sm text-xs font-medium text-[#1C1917] hover:border-[#1C1917] transition-colors"
                  >
                    <SlidersHorizontal size={13} />
                    <span>
                      {sortBy === "featured" && "Destacados"}
                      {sortBy === "price-asc" && "Precio: Menor a Mayor"}
                      {sortBy === "price-desc" && "Precio: Mayor a Menor"}
                      {sortBy === "name" && "Nombre: A - Z"}
                    </span>
                    <ChevronDown size={14} />
                  </button>

                  {showSort && (
                    <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-[#DDD6C8] shadow-xl rounded-sm py-1.5 z-20 animate-scale-in text-xs">
                      {[
                        { label: "Destacados", value: "featured" },
                        { label: "Precio: Menor a Mayor", value: "price-asc" },
                        { label: "Precio: Mayor a Menor", value: "price-desc" },
                        { label: "Nombre: A - Z", value: "name" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setShowSort(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-[#FAF8F5] transition-colors ${
                            sortBy === opt.value ? "font-semibold text-[#1C1917] bg-[#FAF8F5]" : "text-[#57534E]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="py-24 text-center">
                <div className="w-8 h-8 border-2 border-[#1C1917] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs uppercase tracking-widest text-[#78716C]">Cargando colección...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="py-20 text-center bg-white border border-[#E5E0D5] p-12">
                <h3 className="font-display text-xl text-[#1C1917] mb-2">No hay piezas en esta subcategoría</h3>
                <p className="text-xs text-[#78716C] mb-6">
                  Explora todas las piezas de la colección {config.name}.
                </p>
                <button
                  onClick={() => setActiveSubFilter("todos")}
                  className="px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium"
                >
                  Ver Todos
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                } gap-6 md:gap-8`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Specialized Artisan Story Section */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E5E0D5]">
          <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="text-[11px] tracking-[0.35em] uppercase text-[#78716C] mb-3 block font-light">
                  {config.craftStory.subtitle}
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-[#1C1917] font-light leading-tight mb-6">
                  {config.craftStory.title}
                </h2>
                <p className="text-[#57534E] text-base leading-relaxed font-light mb-8 max-w-xl">
                  {config.craftStory.text}
                </p>
                <div className="flex items-center gap-6">
                  <div className="border-l-2 border-[#1C1917] pl-4">
                    <p className="text-3xl font-display font-medium text-[#1C1917]">{config.craftStory.stat}</p>
                    <p className="text-[11px] text-[#78716C] uppercase tracking-wider">{config.craftStory.statLabel}</p>
                  </div>
                  <div className="border-l-2 border-[#DDD6C8] pl-4">
                    <p className="text-xs uppercase tracking-wider text-[#1C1917] font-medium">{config.craftStory.artisanOrigin}</p>
                    <p className="text-[11px] text-[#78716C]">Origen Certificado</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FAF8F5] p-8 border border-[#E5E0D5]">
                <h3 className="font-display text-xl text-[#1C1917] mb-3">¿Buscas pedidos especiales o tallas a medida?</h3>
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
