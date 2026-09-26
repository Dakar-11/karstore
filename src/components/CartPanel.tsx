"use client";

import React from "react";
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-400 ${
          state.isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl cart-panel flex flex-col ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-earth-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-earth-700" />
            <h2 className="text-sm font-semibold tracking-wider uppercase text-earth-900">
              Shopping Bag
            </h2>
            <span className="text-xs text-earth-400">({totalItems})</span>
          </div>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="text-earth-500 hover:text-earth-900 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {totalItems > 0 && (
          <div className="px-6 py-3 bg-earth-50 border-b border-earth-100">
            <div className="flex items-center gap-2 mb-2">
              <Truck size={14} className="text-earth-500" />
              {remainingForFreeShipping > 0 ? (
                <p className="text-[11px] text-earth-600">
                  Agrega{" "}
                  <span className="font-semibold text-brand-600">
                    {formatPrice(remainingForFreeShipping)}
                  </span>{" "}
                  más para envío gratis
                </p>
              ) : (
                <p className="text-[11px] text-green-700 font-medium">
                  ¡Envío gratis! 🎉
                </p>
              )}
            </div>
            <div className="w-full h-1 bg-earth-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500"
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

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag
                size={48}
                className="text-earth-200 mb-4"
              />
              <h3 className="text-sm font-medium text-earth-700 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-xs text-earth-400 mb-6 max-w-[200px]">
                Explora nuestra colección y encuentra piezas únicas de alpaca
              </p>
              <button
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="btn-primary text-xs"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 animate-fade-in"
                >
                  <div className="relative w-20 h-24 bg-earth-100 flex-shrink-0 overflow-hidden">
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
                        <p className="text-[10px] tracking-[0.15em] uppercase text-earth-400">
                          {item.category}
                        </p>
                        <h4 className="text-xs font-medium text-earth-900 mt-0.5 truncate">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-earth-300 hover:text-earth-700 transition-colors flex-shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-earth-500 mt-1">
                      {item.material}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-earth-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-earth-500 hover:text-earth-900 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-earth-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-earth-500 hover:text-earth-900 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-earth-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-earth-100 px-6 py-5 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-earth-500">Subtotal</span>
                <span className="text-sm font-medium text-earth-800">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-earth-500">Envío</span>
                <span className="text-xs text-earth-500">
                  {remainingForFreeShipping > 0
                    ? "Calculado al checkout"
                    : "GRATIS"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-earth-100">
              <span className="text-sm font-semibold text-earth-900 tracking-wide">
                TOTAL
              </span>
              <span className="text-lg font-bold text-earth-950">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button className="w-full btn-primary justify-center gap-2">
              Ir al Checkout
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="w-full text-center text-xs text-earth-500 hover:text-brand-600 transition-colors tracking-wider uppercase py-2"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>

      {/* Floating cart trigger when items exist and cart is closed */}
      {totalItems > 0 && !state.isOpen && (
        <button
          onClick={() => dispatch({ type: "OPEN_CART" })}
          className="fixed bottom-6 right-6 z-40 bg-[#1C1917] text-white px-4 py-3 shadow-2xl hover:bg-[#2F2925] flex items-center gap-2.5 transition-all duration-300 text-xs tracking-wider uppercase font-medium border border-white/20 animate-fade-in group"
          aria-label="Ver bolsa de compras"
        >
          <ShoppingBag size={16} />
          <span>Bolsa</span>
          <span className="w-5 h-5 rounded-full bg-white text-[#1C1917] text-[10px] font-bold flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
    </>
  );
}
