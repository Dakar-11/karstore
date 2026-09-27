"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 bg-[#0F0D0A] relative overflow-hidden text-white">
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#C4A87C] mb-2 sm:mb-3 block font-light">
          Comunidad Exclusiva
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-light mb-3 sm:mb-4">
          Recibe lo más <span className="italic font-normal text-[#C4A87C]">exclusivo</span>
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm font-light mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
          Accede antes que nadie a nuevas colecciones de temporada, piezas de edición limitada y ofertas reservadas.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white text-xs sm:text-sm placeholder:text-stone-500 focus:outline-none focus:border-[#C4A87C] transition-colors rounded-none"
            required
          />
          <button
            type="submit"
            disabled={submitted}
            className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 text-xs tracking-[0.2em] font-medium uppercase transition-all duration-300 ${
              submitted
                ? "bg-[#2E5E3B] text-white"
                : "bg-white text-black hover:bg-[#C4A87C] hover:text-white"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle size={14} />
                <span>Suscrito</span>
              </>
            ) : (
              <span>Suscribirme</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
