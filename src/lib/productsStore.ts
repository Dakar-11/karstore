import { Product } from "@/context/CartContext";
import { products as defaultProducts } from "@/lib/products";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://nwmquvjshaioufddfrct.supabase.co";

const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bXF1dmpzaGFpb3VmZGRmcmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NTcwMjksImV4cCI6MjEwNjAzMzAyOX0.vSr2Io80feZD-S8TrH8jY0fWVTtrDhqL0NjQ53sDSR8";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

export async function getStoredProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=id.asc`, {
      headers,
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          id: Number(item.id),
          name: item.name,
          price: Number(item.price),
          original_price: item.original_price ? Number(item.original_price) : undefined,
          image: item.image || "/images/alpaca_rug.jpg",
          category: item.category,
          branch: item.branch || undefined,
          description: item.description || "",
          material: item.material || "100% Fibra de Alpaca",
          badge: item.badge || undefined,
          colors: item.colors || undefined,
          sizes: item.sizes || undefined,
          tags: item.tags || undefined,
          gender: item.gender || undefined,
        }));
      }
    }
    return defaultProducts;
  } catch (error) {
    console.warn("Could not fetch products from Supabase, falling back to default:", error);
    return defaultProducts;
  }
}

export async function addStoredProduct(newProductData: Omit<Product, "id">): Promise<Product> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: newProductData.name,
      price: newProductData.price,
      original_price: newProductData.original_price,
      image: newProductData.image,
      category: newProductData.category,
      branch: newProductData.branch,
      description: newProductData.description,
      material: newProductData.material,
      badge: newProductData.badge,
      colors: newProductData.colors,
      sizes: newProductData.sizes,
      tags: newProductData.tags,
      gender: newProductData.gender,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error en Supabase al insertar: ${errText}`);
  }

  const inserted = await res.json();
  const item = Array.isArray(inserted) ? inserted[0] : inserted;

  return {
    id: Number(item.id),
    name: item.name,
    price: Number(item.price),
    original_price: item.original_price ? Number(item.original_price) : undefined,
    image: item.image,
    category: item.category,
    branch: item.branch,
    description: item.description,
    material: item.material,
    badge: item.badge,
    colors: item.colors,
    sizes: item.sizes,
    tags: item.tags,
    gender: item.gender,
  };
}

export async function deleteStoredProduct(id: number): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });

  return res.ok;
}
