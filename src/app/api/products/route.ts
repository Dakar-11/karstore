import { NextRequest, NextResponse } from "next/server";
import { getStoredProducts, addStoredProduct, deleteStoredProduct } from "@/lib/productsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getStoredProducts();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Error al cargar los productos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Los campos nombre, precio y categoría son obligatorios." },
        { status: 400 }
      );
    }

    const newProduct = await addStoredProduct({
      name: String(body.name).trim(),
      price: parseFloat(body.price),
      original_price: body.original_price ? parseFloat(body.original_price) : undefined,
      image: body.image || "/images/alpaca_poncho.jpg",
      category: String(body.category).trim(),
      branch: body.branch ? String(body.branch).trim().toLowerCase() : undefined,
      gender: body.gender || (body.branch === "mujer" ? "mujer" : body.branch === "hombre" ? "hombre" : "unisex"),
      description: body.description ? String(body.description).trim() : "Artesanía de alpaca peruana premium hecha a mano.",
      material: body.material ? String(body.material).trim() : "100% Fibra de Alpaca",
      badge: body.badge ? String(body.badge).trim() : undefined,
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string" && body.tags.length > 0
        ? body.tags.split(",").map((t: string) => t.trim().toLowerCase()).filter(Boolean)
        : [String(body.branch || "").toLowerCase(), String(body.category || "").toLowerCase()].filter(Boolean),
      colors: Array.isArray(body.colors)
        ? body.colors
        : typeof body.colors === "string" && body.colors.length > 0
        ? body.colors.split(",").map((c: string) => c.trim()).filter(Boolean)
        : undefined,
      sizes: Array.isArray(body.sizes)
        ? body.sizes
        : typeof body.sizes === "string" && body.sizes.length > 0
        ? body.sizes.split(",").map((s: string) => s.trim()).filter(Boolean)
        : undefined,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Error al guardar el producto" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {
        // body might be empty
      }
    }

    if (!id) {
      return NextResponse.json({ error: "ID del producto requerido" }, { status: 400 });
    }

    const numericId = parseInt(String(id), 10);
    const success = await deleteStoredProduct(numericId);

    if (!success) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 500 });
  }
}
