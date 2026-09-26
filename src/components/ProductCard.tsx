"use client";

import React from "react";
import Image from "next/image";
import { useCart, Product } from "@/context/CartContext";
import { ShoppingBag, Heart, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) =>
    `S/ ${price.toFixed(2)}`;

  return (
    <div className="product-card group" id={`product-${product.id}`}>
      {/* Badge */}
      {product.badge && (
        <span
          className={
            product.badge.includes("DTO") || product.badge.includes("%")
              ? "badge-discount"
              : product.badge === "EXCLUSIVO"
              ? "absolute top-4 left-4 px-3 py-1 bg-warm-700 text-white text-[10px] font-semibold tracking-[0.15em] uppercase z-10"
              : "badge-new"
          }
        >
          {product.badge}
        </span>
      )}

      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-earth-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="product-image object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="product-overlay" />

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-earth-950 text-white text-xs font-medium tracking-wider uppercase hover:bg-brand-700 transition-colors"
            >
              <ShoppingBag size={14} />
              Agregar
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-white text-earth-700 hover:text-brand-600 transition-colors">
              <Heart size={16} />
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-white text-earth-700 hover:text-brand-600 transition-colors">
              <Eye size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-earth-400 mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-earth-900 mb-2 group-hover:text-brand-700 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-earth-950">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-xs text-earth-400 line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        {/* Color dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex gap-1.5 mt-3">
            {product.colors.map((color, idx) => (
              <button
                key={color}
                className={`w-3 h-3 rounded-full border transition-transform hover:scale-125 ${
                  idx === 0
                    ? "border-earth-950 ring-1 ring-earth-300 ring-offset-1"
                    : "border-earth-300"
                }`}
                style={{
                  backgroundColor:
                    color === "Terracota"
                      ? "#c76a28"
                      : color === "Natural" || color === "Crema"
                      ? "#f3e8e0"
                      : color === "Gris" || color === "Gris Oscuro" || color === "Gris Claro"
                      ? "#8a8a8a"
                      : color === "Camel" || color === "Camel/Crema"
                      ? "#c4a87a"
                      : color === "Chocolate"
                      ? "#5c3a21"
                      : color === "Rosa Pálido"
                      ? "#f5c6d0"
                      : color === "Celeste"
                      ? "#a8d1e7"
                      : color === "Burdeos" || color === "Burgundy"
                      ? "#722f37"
                      : color === "Negro" || color === "Carbón"
                      ? "#2a2a2a"
                      : color === "Navy"
                      ? "#1b2a4a"
                      : color === "Charcoal"
                      ? "#4a4a4a"
                      : color === "Gris/Crema"
                      ? "#a0a0a0"
                      : color === "Azul/Natural"
                      ? "#4a6fa5"
                      : color === "Camel/Blanco"
                      ? "#d4b896"
                      : color === "Terracota/Crema"
                      ? "#c76a28"
                      : "#d9d1b8",
                }}
                title={color}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
