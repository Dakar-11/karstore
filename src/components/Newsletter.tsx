"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

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
    <section className="py-20 md:py-28 bg-earth-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-warm-700/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
        <span className="text-[11px] tracking-[0.4em] uppercase text-brand-400 mb-4 block">
          Únete a la comunidad
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-4">
          Recibe lo más
          <span className="italic font-normal"> exclusivo</span>
        </h2>
        <p className="text-earth-400 text-sm md:text-base font-light mb-10 max-w-lg mx-auto">
          Suscríbete para acceder a lanzamientos exclusivos, ofertas
          especiales y las historias detrás de nuestras artesanías.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white text-sm placeholder:text-earth-500 focus:outline-none focus:border-brand-500 transition-colors rounded-none"
            required
          />
          <button
            type="submit"
            disabled={submitted}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
              submitted
                ? "bg-green-600 text-white"
                : "bg-white text-earth-950 hover:bg-brand-500 hover:text-white"
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle size={16} />
                ¡Suscrito!
              </>
            ) : (
              <>
                Suscribirse
                <Send size={14} />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-earth-600 mt-4 tracking-wide">
          Sin spam. Cancela cuando quieras. Respetamos tu privacidad.
        </p>
      </div>
    </section>
  );
}
