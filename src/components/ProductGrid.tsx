"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Grid3X3, LayoutGrid, Check } from "lucide-react";
import ProductCard from "./ProductCard";
import { products as initialProducts } from "@/lib/products";
import { Product } from "@/context/CartContext";

export default function ProductGrid() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (data?.products && Array.isArray(data.products)) {
          setProductList(data.products);
        }
      } catch (err) {
        console.warn("Could not fetch latest products, using fallback:", err);
      }
    };
    loadProducts();
  }, []);

  const categoryOrder = [
    "Alfombras",
    "Pieles Curtidas",
    "Accesorios",
    "Gorros",
    "Calzado",
    "Bufandas",
    "Mantas",
    "Ponchos",
    "Sweaters",
  ];

  const presentCategories = Array.from(new Set(productList.map((p) => p.category)));
  const orderedCategoryNames = [
    ...categoryOrder.filter((cat) => presentCategories.some((c) => c.toLowerCase() === cat.toLowerCase())),
    ...presentCategories.filter((cat) => !categoryOrder.some((c) => c.toLowerCase() === cat.toLowerCase())),
  ];

  const dynamicCategories = [
    { name: "Todos", slug: "todos", count: productList.length },
    ...orderedCategoryNames.map((catName) => ({
      name: catName,
      slug: catName.toLowerCase(),
      count: productList.filter((p) => p.category.toLowerCase() === catName.toLowerCase()).length,
    })),
  ];

  const filteredProducts =
    activeCategory === "todos"
      ? productList
      : productList.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

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
    <section id="coleccion" className="py-10 sm:py-16 bg-white">
      {/* Full-width container like KUNA to maximize photo size */}
      <div className="w-full max-w-[1840px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* KUNA Header Bar: Category title + clean divider */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#78716C] font-light">
            <span>KAR</span>
            <span className="text-[#C7BFB0]">|</span>
            <span className="text-[#1C1917] font-medium tracking-[0.2em]">
              {activeCategory === "todos" ? "COLECCIÓN PERUANA" : activeCategory}
            </span>
          </div>
        </div>

        {/* Categories Bar (horizontal tabs) */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2.5 pt-1 scrollbar-hide border-b border-[#EAE5DC]">
          {dynamicCategories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex-shrink-0 text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all duration-200 py-1 relative ${
                  isActive
                    ? "text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1C1917]"
                    : "text-[#78716C] hover:text-[#1C1917] font-normal"
                }`}
              >
                {cat.name}
                <span className="ml-1 text-[10px] text-[#A8A29E] font-light">
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* KUNA Count & Filter Bar */}
        <div className="flex items-center justify-between py-3.5 border-b border-[#EAE5DC] mb-6 sm:mb-8">
          {/* Left: Product count */}
          <div className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#78716C] font-medium">
            <span className="text-[#1C1917] font-semibold">{sortedProducts.length}</span>{" "}
            {sortedProducts.length === 1 ? "PRODUCTO" : "PRODUCTOS"}
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
                    Ordenar catálogo
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

        {/* Product Grid (KUNA Style: minimal gap, big imposing photos) */}
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

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-24 bg-[#FAF8F5] mt-6 border border-[#EAE5DC]">
            <p className="text-[#78716C] text-sm tracking-widest uppercase">
              No hay productos disponibles en esta categoría
            </p>
            <button
              onClick={() => setActiveCategory("todos")}
              className="mt-4 px-6 py-2 bg-[#1C1917] text-white text-xs tracking-widest uppercase hover:bg-black transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
