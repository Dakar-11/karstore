"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Search,
  ArrowLeft,
  Package,
  Layers,
  Tag,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  RefreshCw,
  Lock,
  LogOut,
  Shield,
  Eye,
  EyeOff,
  Compass,
} from "lucide-react";
import { Product } from "@/context/CartContext";

const PRESET_IMAGES = [
  { label: "Poncho Andino", src: "/images/alpaca_poncho.jpg" },
  { label: "Manta Rayas", src: "/images/alpaca_blanket.jpg" },
  { label: "Alfombra Geométrica", src: "/images/alpaca_rug.jpg" },
  { label: "Bufanda Herringbone", src: "/images/alpaca_scarf.jpg" },
  { label: "Sweater Trenzado", src: "/images/alpaca_sweater.jpg" },
  { label: "Gorro Pompón", src: "/images/baby_alpaca_hat.jpg" },
  { label: "Pantuflas Cuero", src: "/images/alpaca_slippers.jpg" },
  { label: "Guantes Andinos", src: "/images/alpaca_gloves.jpg" },
];

const BRANCH_OPTIONS = [
  { value: "mujer", label: "Colección Mujer (/mujer)", description: "Ponchos, ruanas, bufandas y prendas para dama" },
  { value: "hombre", label: "Colección Hombre (/hombre)", description: "Sweaters, cardigans y prendas para caballero" },
  { value: "alfombras", label: "Alfombras & Hogar (/alfombras)", description: "Alfombras de piso, tapices y mantas" },
  { value: "accesorios", label: "Accesorios (/accesorios)", description: "Bufandas, gorros, guantes y calzado" },
  { value: "pieles-curtidas", label: "Pieles Curtidas (/pieles-curtidas)", description: "Pieles naturales de alpaca y cojines" },
  { value: "unisex", label: "Unisex / Todas las Ramas", description: "Apto para todas las secciones compatibles" },
];

const DEFAULT_CATEGORIES = [
  "Ponchos",
  "Sweaters",
  "Bufandas",
  "Gorros",
  "Calzado",
  "Alfombras",
  "Mantas",
  "Pieles Curtidas",
  "Accesorios",
];

export default function AdminDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Products & Dashboard State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State for New Product
  const [formData, setFormData] = useState({
    name: "",
    branch: "mujer",
    category: "Ponchos",
    price: "",
    original_price: "",
    image: "/images/alpaca_poncho.jpg",
    customImage: "",
    material: "100% Baby Alpaca",
    badge: "NEW",
    colors: "Natural, Terracota, Gris",
    sizes: "Estándar",
    description: "",
  });

  // Check auth session on load
  useEffect(() => {
    try {
      const session = localStorage.getItem("kar_admin_session");
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed?.authenticated) {
          setIsAuthenticated(true);
          return;
        }
      }
      setIsAuthenticated(false);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    setTimeout(() => {
      const email = loginEmail.trim().toLowerCase();
      const password = loginPassword.trim();

      // Pre-registered admin accounts
      const isValidAdmin =
        (email === "admin@kar.pe" || email === "admin@qori.pe" || email === "admin" || email === "admin@karstore.shop") &&
        password === "KarAdmin2026!";

      if (isValidAdmin) {
        localStorage.setItem(
          "kar_admin_session",
          JSON.stringify({
            authenticated: true,
            user: email,
            loginTime: new Date().toISOString(),
          })
        );
        setIsAuthenticated(true);
        showToast("Sesión iniciada como Administrador");
      } else {
        setLoginError("Credenciales incorrectas. Verifica el correo y la contraseña.");
      }
      setLoginLoading(false);
    }, 400);
  };

  const handleLogout = () => {
    localStorage.removeItem("kar_admin_session");
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
    showToast("Sesión cerrada correctamente");
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (data?.products && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch {
      showToast("Error al cargar los productos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  // Filter products by search and branch
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.material.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesBranch =
      selectedBranch === "all" ||
      p.branch?.toLowerCase() === selectedBranch.toLowerCase() ||
      (selectedBranch === "mujer" && (p.gender === "mujer" || p.tags?.includes("mujer"))) ||
      (selectedBranch === "hombre" && (p.gender === "hombre" || p.tags?.includes("hombre"))) ||
      (selectedBranch === "alfombras" && (p.category.toLowerCase().includes("alfombra") || p.tags?.includes("alfombras"))) ||
      (selectedBranch === "accesorios" && (["accesorios", "bufandas", "gorros", "calzado"].includes(p.category.toLowerCase()) || p.tags?.includes("accesorios"))) ||
      (selectedBranch === "pieles-curtidas" && (p.category.toLowerCase().includes("piel") || p.tags?.includes("pieles-curtidas")));

    return matchesSearch && matchesBranch;
  });

  // Metrics
  const totalProducts = products.length;
  const avgPrice = totalProducts > 0 ? (products.reduce((acc, p) => acc + p.price, 0) / totalProducts).toFixed(2) : "0.00";
  const discountedCount = products.filter((p) => p.original_price && p.original_price > p.price).length;

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.category) {
      showToast("Por favor completa los campos requeridos", "error");
      return;
    }

    try {
      setSubmitting(true);
      const chosenImage = formData.customImage.trim() || formData.image;

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          branch: formData.branch,
          category: formData.category,
          price: parseFloat(formData.price),
          original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
          image: chosenImage,
          material: formData.material,
          badge: formData.badge || undefined,
          colors: formData.colors,
          sizes: formData.sizes,
          description: formData.description,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Producto "${data.product.name}" agregado con éxito`);
        setIsAddModalOpen(false);
        // Reset form
        setFormData({
          name: "",
          branch: "mujer",
          category: "Ponchos",
          price: "",
          original_price: "",
          image: "/images/alpaca_poncho.jpg",
          customImage: "",
          material: "100% Baby Alpaca",
          badge: "NEW",
          colors: "Natural, Terracota, Gris",
          sizes: "Estándar",
          description: "",
        });
        await loadProducts();
      } else {
        showToast(data.error || "No se pudo crear el producto", "error");
      }
    } catch {
      showToast("Error de conexión al crear producto", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      setSubmitting(true);
      const res = await fetch(`/api/products?id=${productToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Producto "${productToDelete.name}" eliminado correctamente`);
        setProductToDelete(null);
        await loadProducts();
      } else {
        showToast(data.error || "No se pudo eliminar el producto", "error");
      }
    } catch {
      showToast("Error de conexión al eliminar producto", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // 1. Initial Loading State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <RefreshCw size={24} className="animate-spin text-[#1C1917]" />
      </div>
    );
  }

  // 2. Login Screen (if not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-md w-full mx-auto my-auto">
          {/* Brand Mark */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="font-display text-4xl font-bold tracking-[0.2em] text-[#1C1917]">KAR</span>
            </Link>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#78716C] mt-2 font-light">
              Portal Privado de Administración
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-[#E5E0D5] p-8 shadow-xl rounded-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0ECE3]">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#DDD6C8] flex items-center justify-center flex-shrink-0 text-[#1C1917]">
                <Lock size={18} />
              </div>
              <div>
                <h2 className="font-display text-lg text-[#1C1917] font-medium tracking-tight">Acceso Restringido</h2>
                <p className="text-xs text-[#78716C] font-light">Ingresa tus credenciales autorizadas</p>
              </div>
            </div>

            {loginError && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm flex items-center gap-2.5">
                <AlertCircle size={16} className="flex-shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Correo o Usuario de Administrador
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin@kar.pe"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-sm text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-sm text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 py-3 bg-[#1C1917] text-white hover:bg-[#332D28] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 rounded-sm shadow-sm disabled:opacity-50"
              >
                {loginLoading ? "Verificando..." : "Ingresar al Panel"}
              </button>
            </form>

            {/* Quick credentials hint */}
            <div className="mt-6 pt-5 border-t border-[#F0ECE3] bg-[#FAF8F5] -mx-8 -mb-8 p-4 text-[11px] text-[#78716C] rounded-b-sm">
              <div className="flex items-center gap-2 mb-1 text-[#1C1917] font-medium">
                <Shield size={13} className="text-[#8C7A6B]" />
                <span>Acceso Administrativo Seguro</span>
              </div>
              <p className="text-[11px] text-[#78716C]">
                Ingresa con tu correo de administrador y tu contraseña segura.
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-[#78716C] hover:text-[#1C1917] transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              <span>Volver a la tienda pública</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard Screen
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C1917] font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in-up">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded shadow-xl text-sm font-medium ${
              toast.type === "success"
                ? "bg-[#1C1917] text-white border border-[#3E3832]"
                : "bg-red-900 text-white border border-red-700"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-400" />
            ) : (
              <AlertCircle size={18} className="text-red-300" />
            )}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-white/60 hover:text-white">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="bg-white border-b border-[#E6E1D6] sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Ver Tienda</span>
            </Link>
            <span className="text-[#D6D0C4]">|</span>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-[0.1em] text-[#1C1917]">KAR</span>
              <span className="text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded bg-[#1C1917] text-white font-medium">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={loadProducts}
              className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded transition-colors"
              title="Refrescar catálogo"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-[#1C1917] text-white hover:bg-[#332D28] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 rounded-sm shadow-sm"
            >
              <Plus size={16} />
              <span>Nuevo Producto</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-red-700 hover:text-red-900 hover:bg-red-50 rounded transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1536px] mx-auto px-4 sm:px-8 py-8 md:py-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 border border-[#E6E1D6] rounded-sm shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#78716C]">Total Catálogo</span>
              <Package size={18} className="text-[#8C7A6B]" />
            </div>
            <p className="text-3xl font-display font-medium text-[#1C1917]">{totalProducts}</p>
            <p className="text-[11px] text-[#A8A29E] mt-1">Visible en &ldquo;Nueva Colección&rdquo;</p>
          </div>

          <div className="bg-white p-6 border border-[#E6E1D6] rounded-sm shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#78716C]">Ramas / Secciones</span>
              <Compass size={18} className="text-[#8C7A6B]" />
            </div>
            <p className="text-3xl font-display font-medium text-[#1C1917]">5</p>
            <p className="text-[11px] text-[#A8A29E] mt-1">Mujer, Hombre, Alfombras, etc.</p>
          </div>

          <div className="bg-white p-6 border border-[#E6E1D6] rounded-sm shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#78716C]">Precio Promedio</span>
              <DollarSign size={18} className="text-[#8C7A6B]" />
            </div>
            <p className="text-3xl font-display font-medium text-[#1C1917]">S/ {avgPrice}</p>
            <p className="text-[11px] text-[#A8A29E] mt-1">Valor medio por prenda</p>
          </div>

          <div className="bg-white p-6 border border-[#E6E1D6] rounded-sm shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#78716C]">Con Descuento</span>
              <Tag size={18} className="text-[#8C7A6B]" />
            </div>
            <p className="text-3xl font-display font-medium text-[#1C1917]">{discountedCount}</p>
            <p className="text-[11px] text-[#A8A29E] mt-1">Ofertas vigentes</p>
          </div>
        </div>

        {/* Filter Bar with Branch Tabs */}
        <div className="bg-white p-4 sm:p-5 border border-[#E6E1D6] rounded-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              placeholder="Buscar por nombre, material o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD6C8] rounded-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1C1917]"
            />
          </div>

          {/* Branch filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full md:w-auto px-4 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD6C8] rounded-sm text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
            >
              <option value="all">Todas las Ramas (Catálogo Completo)</option>
              <option value="mujer">Rama: Mujer</option>
              <option value="hombre">Rama: Hombre</option>
              <option value="alfombras">Rama: Alfombras & Hogar</option>
              <option value="accesorios">Rama: Accesorios</option>
              <option value="pieles-curtidas">Rama: Pieles Curtidas</option>
            </select>

            <span className="text-xs text-[#78716C] whitespace-nowrap hidden sm:inline">
              Mostrando <b>{filteredProducts.length}</b> de {totalProducts}
            </span>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-[#E6E1D6] rounded-sm shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-[#78716C]">
              <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-[#1C1917]" />
              <p className="text-xs uppercase tracking-widest">Cargando catálogo...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-16 text-center">
              <Package size={36} className="mx-auto mb-3 text-[#A8A29E]" />
              <h3 className="font-display text-lg text-[#1C1917] mb-1">No se encontraron productos</h3>
              <p className="text-xs text-[#78716C] max-w-sm mx-auto mb-6">
                Prueba con otro término de búsqueda o agrega un nuevo producto a esta rama.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedBranch("all");
                }}
                className="px-5 py-2.5 bg-[#F2EFE8] text-xs font-medium uppercase tracking-wider text-[#1C1917] hover:bg-[#E5E0D5] transition-colors rounded-sm"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E6E1D6] bg-[#FAF8F5] text-[10px] tracking-[0.2em] uppercase text-[#78716C]">
                    <th className="py-3.5 px-4 font-medium">Producto</th>
                    <th className="py-3.5 px-4 font-medium">Rama / Destino</th>
                    <th className="py-3.5 px-4 font-medium">Tipo / Categoría</th>
                    <th className="py-3.5 px-4 font-medium">Precio</th>
                    <th className="py-3.5 px-4 font-medium">Material</th>
                    <th className="py-3.5 px-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E1D6]/70 text-xs">
                  {filteredProducts.map((product) => {
                    const branchName =
                      product.branch ||
                      (product.gender === "mujer"
                        ? "mujer"
                        : product.gender === "hombre"
                        ? "hombre"
                        : product.category.toLowerCase().includes("piel")
                        ? "pieles-curtidas"
                        : product.category.toLowerCase().includes("alfombra")
                        ? "alfombras"
                        : "accesorios");

                    return (
                      <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors group">
                        {/* Thumbnail & Name */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-14 h-16 bg-[#F2EFE8] rounded-sm overflow-hidden flex-shrink-0 border border-[#E6E1D6]">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-medium text-[#1C1917] block text-sm group-hover:text-[#A55223] transition-colors">
                                {product.name}
                              </span>
                              <span className="text-[11px] text-[#78716C] line-clamp-1 max-w-md font-light mt-0.5">
                                {product.description}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Branch / Rama */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-xs font-semibold ${
                              branchName === "mujer"
                                ? "bg-rose-50 text-rose-800 border border-rose-200"
                                : branchName === "hombre"
                                ? "bg-slate-100 text-slate-800 border border-slate-300"
                                : branchName === "alfombras"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : branchName === "pieles-curtidas"
                                ? "bg-orange-50 text-orange-800 border border-orange-200"
                                : "bg-neutral-100 text-neutral-800 border border-neutral-300"
                            }`}
                          >
                            {branchName === "mujer" && "🌸 Mujer"}
                            {branchName === "hombre" && "👔 Hombre"}
                            {branchName === "alfombras" && "🧶 Alfombras"}
                            {branchName === "pieles-curtidas" && "✨ Pieles"}
                            {branchName === "accesorios" && "🧣 Accesorios"}
                            {branchName === "unisex" && "🌐 Unisex"}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 bg-[#F2EFE8] text-[#57534E] text-[10px] tracking-wider uppercase rounded-sm">
                            {product.category}
                          </span>
                          {product.badge && (
                            <span className="ml-1.5 text-[9px] tracking-wider uppercase font-semibold px-1.5 py-0.5 bg-[#1C1917] text-white rounded-xs">
                              {product.badge}
                            </span>
                          )}
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-semibold text-sm text-[#1C1917]">
                            S/ {product.price.toFixed(2)}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="block text-[11px] text-[#A8A29E] line-through font-light">
                              S/ {product.original_price.toFixed(2)}
                            </span>
                          )}
                        </td>

                        {/* Material */}
                        <td className="py-4 px-4">
                          <span className="text-xs text-[#57534E] font-light">{product.material}</span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setProductToDelete(product)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-700 hover:text-white hover:bg-red-700 border border-red-200 hover:border-red-700 rounded transition-all duration-200"
                            title="Eliminar producto"
                          >
                            <Trash2 size={13} />
                            <span>Quitar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Agregar Nuevo Producto */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E6E1D6] rounded-sm max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E6E1D6] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#8C7A6B]" />
                <h3 className="font-display text-lg text-[#1C1917] font-medium tracking-tight">
                  Agregar Nuevo Producto al Catálogo
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#78716C] hover:text-[#1C1917] p-1 rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateProduct} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              {/* Product Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Poncho Ceremonial Andino en Baby Alpaca"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-sm text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              {/* BRANCH SELECTOR: Where it will go */}
              <div className="p-4 bg-[#FAF8F5] border border-[#E5E0D5] rounded-sm space-y-2">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1C1917]">
                  ¿En qué Rama / Instancia se mostrará? *
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-sm text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                >
                  {BRANCH_OPTIONS.map((branch) => (
                    <option key={branch.value} value={branch.value}>
                      {branch.label} — {branch.description}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#78716C] italic">
                  ✓ Aparecerá en la rama seleccionada Y automáticamente en la sección global de &ldquo;Nueva Colección&rdquo;.
                </p>
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Tipo de Producto / Categoría *
                  </label>
                  <input
                    type="text"
                    list="categories-list"
                    required
                    placeholder="Ponchos, Sweaters, etc."
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                  <datalist id="categories-list">
                    {DEFAULT_CATEGORIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Badge / Etiqueta (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="NEW, 20% DTO, EXCLUSIVO..."
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Precio en Soles (PEN S/.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="Ej: 389.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-sm text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Precio Anterior (Opcional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ej: 459.00"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-sm text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              {/* Image Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Fotografía de la Prenda
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-2.5">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.src}
                      onClick={() => setFormData({ ...formData, image: img.src, customImage: "" })}
                      className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                        formData.image === img.src && !formData.customImage
                          ? "border-[#1C1917] scale-105 shadow-md"
                          : "border-[#E6E1D6] opacity-70 hover:opacity-100"
                      }`}
                      title={img.label}
                    >
                      <Image src={img.src} alt={img.label} fill className="object-cover" />
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="O ingresa la URL de una foto externa..."
                  value={formData.customImage}
                  onChange={(e) => setFormData({ ...formData, customImage: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              {/* Material & Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Composición / Material
                  </label>
                  <input
                    type="text"
                    placeholder="100% Baby Alpaca, Alpaca Superfina..."
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                    Colores Disponibles
                  </label>
                  <input
                    type="text"
                    placeholder="Natural, Terracota, Gris"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-[#1C1917] mb-1.5">
                  Descripción Detallada
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe la técnica de tejido a mano, origen andino y cuidados..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-sm text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#E6E1D6] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs text-[#78716C] hover:text-[#1C1917] uppercase tracking-wider font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-2.5 bg-[#1C1917] text-white hover:bg-[#332D28] text-xs font-medium tracking-[0.2em] uppercase transition-all rounded-sm disabled:opacity-50"
                >
                  {submitting ? "Guardando..." : "Guardar Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirm Delete */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E6E1D6] rounded-sm max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 size={20} />
              </div>
              <h3 className="font-display text-lg font-medium text-[#1C1917]">
                ¿Eliminar este producto?
              </h3>
            </div>

            <p className="text-xs text-[#78716C] leading-relaxed mb-4">
              Estás a punto de quitar <b>&ldquo;{productToDelete.name}&rdquo;</b> (S/ {productToDelete.price.toFixed(2)}).
              Esta acción lo removerá inmediatamente tanto de su rama como de la sección global de Nueva Colección.
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6E1D6]">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs text-[#78716C] hover:text-[#1C1917] uppercase tracking-wider font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                disabled={submitting}
                className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-medium tracking-wider uppercase rounded-sm transition-colors disabled:opacity-50"
              >
                {submitting ? "Eliminando..." : "Sí, Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
