import fs from "fs/promises";
import path from "path";
import { Product } from "@/context/CartContext";
import { products as defaultProducts } from "@/lib/products";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "products.json");

export async function getStoredProducts(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaultProducts;
  } catch (error) {
    console.warn("Could not read products.json, falling back to default products:", error);
    return defaultProducts;
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export async function addStoredProduct(newProductData: Omit<Product, "id">): Promise<Product> {
  const currentProducts = await getStoredProducts();
  const maxId = currentProducts.reduce((max, p) => (p.id > max ? p.id : max), 0);
  const newProduct: Product = {
    ...newProductData,
    id: maxId + 1,
  };
  const updatedList = [newProduct, ...currentProducts];
  await saveProducts(updatedList);
  return newProduct;
}

export async function deleteStoredProduct(id: number): Promise<boolean> {
  const currentProducts = await getStoredProducts();
  const initialLength = currentProducts.length;
  const filtered = currentProducts.filter((p) => p.id !== id);
  if (filtered.length === initialLength) {
    return false;
  }
  await saveProducts(filtered);
  return true;
}
