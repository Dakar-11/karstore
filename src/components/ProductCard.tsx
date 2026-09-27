"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart, Product } from "@/context/CartContext";
import { ShoppingBag, Heart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const formatPrice = (price: number) => `S/ ${price.toFixed(2)}`;

  const discountPercent =
    product.original_price && product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) * 100
        )
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div className="group block text-left" id={`product-${product.id}`}>
      {/* Visual Frame */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F4EE] rounded-none transition-all duration-300">
        {/* Subtle Discount / Badge in KUNA luxury style */}
        {discountPercent ? (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-1.5 sm:px-2 py-0.5 bg-[#EAE4D9]/95 backdrop-blur-xs text-[#423C34] text-[9px] sm:text-[10px] tracking-[0.14em] font-medium uppercase">
            {discountPercent}% DTO
          </span>
        ) : product.badge ? (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-1.5 sm:px-2 py-0.5 bg-[#EAE4D9]/95 backdrop-blur-xs text-[#423C34] text-[9px] sm:text-[10px] tracking-[0.14em] font-medium uppercase">
            {product.badge}
          </span>
        ) : null}

        {/* Wishlist Heart Button (discreet top-right, visible on mobile) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? "bg-white text-red-600 opacity-100 shadow-sm"
              : "bg-white/80 hover:bg-white text-[#57534E] opacity-75 sm:opacity-0 sm:group-hover:opacity-100 shadow-xs"
          }`}
          aria-label="Guardar en favoritos"
        >
          <Heart
            size={13}
            className={isWishlisted ? "fill-red-600 text-red-600" : ""}
          />
        </button>

        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Vignette on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Desktop: Slide-up Quick Add Button */}
        <div className="hidden sm:block absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 text-xs tracking-[0.18em] uppercase font-medium transition-all duration-300 shadow-md ${
              addedAnimation
                ? "bg-[#2E5E3B] text-white"
                : "bg-[#1C1917]/95 hover:bg-black text-white backdrop-blur-xs"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check size={14} />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Agregar al Carrito</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile: Floating Quick Add Icon on bottom-right */}
        <div className="sm:hidden absolute bottom-2 right-2 z-10">
          <button
            onClick={handleAddToCart}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              addedAnimation
                ? "bg-[#2E5E3B] text-white scale-110"
                : "bg-white/95 text-[#1C1917] active:scale-95"
            }`}
            aria-label="Agregar al carrito"
          >
            {addedAnimation ? <Check size={14} /> : <ShoppingBag size={14} />}
          </button>
        </div>
      </div>

      {/* Typography & Pricing directly below image */}
      <div className="pt-2 pb-1">
        {/* Product Name */}
        <h3 className="text-xs sm:text-[13px] md:text-sm text-[#1C1917] font-normal tracking-[0.01em] leading-snug line-clamp-1 group-hover:text-[#8C7A6B] transition-colors">
          {product.name}
        </h3>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
          <span className="text-xs sm:text-[13px] md:text-sm font-semibold text-[#1C1917] tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-[10px] sm:text-[12px] text-[#A8A29E] line-through font-normal">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        {/* Color Dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5">
            {product.colors.map((color, idx) => (
              <span
                key={color}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border transition-transform ${
                  idx === 0
                    ? "border-[#1C1917] ring-1 ring-[#1C1917]/20 ring-offset-1"
                    : "border-black/15"
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
