"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Truck } from "lucide-react";

export default function CartPanel() {
  const {
    state,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    dispatch,
  } = useCart();

  const formatPrice = (price: number) => `S/ ${price.toFixed(2)}`;
  const freeShippingThreshold = 299;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - totalPrice
  );

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state.isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          state.isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      />

      {/* Slide-out Drawer Panel (Responsive for phone & tablet) */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[440px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-stone-200">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ShoppingBag size={18} className="text-[#1C1917]" />
            <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1C1917]">
              Bolsa de Compras
            </h2>
            <span className="text-xs text-stone-400">({totalItems})</span>
          </div>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-black rounded-md transition-colors"
            aria-label="Cerrar bolsa"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping progress */}
        {totalItems > 0 && (
          <div className="px-5 sm:px-6 py-2.5 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Truck size={13} className="text-stone-600" />
              {remainingForFreeShipping > 0 ? (
                <p className="text-[11px] text-stone-600">
                  Agrega{" "}
                  <span className="font-semibold text-[#1C1917]">
                    {formatPrice(remainingForFreeShipping)}
                  </span>{" "}
                  más para envío gratis
                </p>
              ) : (
                <p className="text-[11px] text-[#2E5E3B] font-medium">
                  ¡Envío gratuito a todo el Perú! 🎉
                </p>
              )}
            </div>
            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1C1917] rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (totalPrice / freeShippingThreshold) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag size={42} className="text-stone-300 mb-3" />
              <h3 className="text-sm font-medium text-stone-800 mb-1">
                Tu bolsa está vacía
              </h3>
              <p className="text-xs text-stone-500 mb-6 max-w-[220px] font-light">
                Explora nuestras colecciones y descubre la suavidad de la alpaca peruana.
              </p>
              <button
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
              >
                Ver Colección
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 sm:gap-4 pb-4 border-b border-stone-100 last:border-b-0"
                >
                  <div className="relative w-18 h-24 sm:w-20 sm:h-26 bg-[#F6F4EE] flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[9px] sm:text-[10px] tracking-wider uppercase text-stone-400 font-light">
                          {item.category}
                        </p>
                        <h4 className="text-xs sm:text-sm font-normal text-stone-900 mt-0.5 truncate">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-300 hover:text-black transition-colors p-1"
                        aria-label="Eliminar producto"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {item.material && (
                      <p className="text-[11px] text-stone-500 mt-0.5 font-light">
                        {item.material}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-black transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-7 text-center text-xs font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-black transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-stone-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout (Fixed to bottom, safe area aware) */}
        {state.items.length > 0 && (
          <div className="border-t border-stone-200 px-5 sm:px-6 py-4 sm:py-5 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600 font-light">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Envío</span>
                <span className="text-stone-500">
                  {remainingForFreeShipping > 0
                    ? "Calculado al checkout"
                    : "GRATIS"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-900">
                Total
              </span>
              <span className="text-base sm:text-lg font-bold text-stone-950">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button className="w-full py-3 px-4 bg-[#1C1917] hover:bg-black text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2">
              <span>Proceder al Pago</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="w-full text-center text-[11px] text-stone-500 hover:text-black transition-colors tracking-wider uppercase py-1"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>

      {/* Floating cart pill on mobile when closed */}
      {totalItems > 0 && !state.isOpen && (
        <button
          onClick={() => dispatch({ type: "OPEN_CART" })}
          className="fixed bottom-5 right-5 z-30 bg-[#1C1917] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xl hover:bg-black flex items-center gap-2 transition-all duration-300 text-xs tracking-wider uppercase font-medium border border-white/20 group"
          aria-label="Ver bolsa de compras"
        >
          <ShoppingBag size={15} />
          <span className="hidden sm:inline">Bolsa</span>
          <span className="w-5 h-5 rounded-full bg-white text-[#1C1917] text-[10px] font-bold flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
    </>
  );
}
