"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import { products as initialProducts } from "@/lib/products";
import { Product } from "@/context/CartContext";

export default function ProductGrid() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState(4);
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

  return (
    <section id="coleccion" className="py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-[11px] tracking-[0.4em] uppercase text-brand-600 mb-3 block">
            Catálogo
          </span>
          <h2 className="section-title mb-4">Nuestra Colección</h2>
          <p className="section-subtitle mx-auto">
            Cada pieza es única, tejida a mano por artesanos que heredaron el
            arte ancestral de trabajar la fibra de alpaca.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-4 mb-8 border-b border-earth-200 scrollbar-hide">
          {dynamicCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex-shrink-0 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 border-b-2 -mb-[1px] ${
                activeCategory === cat.slug
                  ? "border-earth-950 text-earth-950"
                  : "border-transparent text-earth-400 hover:text-earth-700"
              }`}
            >
              {cat.name}
              <span className="ml-1 text-earth-300">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-earth-500">
            <span className="font-medium text-earth-800">
              {sortedProducts.length}
            </span>{" "}
            productos
          </p>

          <div className="flex items-center gap-4">
            {/* Grid toggle */}
            <div className="hidden md:flex items-center gap-2 border-r border-earth-200 pr-4">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1 transition-colors ${
                  gridCols === 3 ? "text-earth-950" : "text-earth-300"
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1 transition-colors ${
                  gridCols === 4 ? "text-earth-950" : "text-earth-300"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 text-xs tracking-wider uppercase text-earth-700 hover:text-earth-950 transition-colors"
              >
                <SlidersHorizontal size={14} />
                Filtrar & Ordenar
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    showSort ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showSort && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-xl border border-earth-100 py-2 z-20 animate-scale-in">
                  {[
                    { value: "featured", label: "Destacados" },
                    { value: "price-asc", label: "Precio: Menor a Mayor" },
                    { value: "price-desc", label: "Precio: Mayor a Menor" },
                    { value: "name", label: "Nombre A-Z" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSort(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs tracking-wide transition-colors ${
                        sortBy === option.value
                          ? "bg-earth-50 text-brand-700 font-medium"
                          : "text-earth-600 hover:bg-earth-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div
          className={`grid gap-4 md:gap-6 ${
            gridCols === 3
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {sortedProducts.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-earth-400 text-lg">
              No hay productos en esta categoría
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
