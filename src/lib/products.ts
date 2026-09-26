import { Product } from "@/context/CartContext";

export const products: Product[] = [
  {
    id: 1,
    name: "Alfombra Andina Tradicional",
    price: 389.0,
    image: "/images/alpaca_rug.jpg",
    category: "Alfombras",
    description:
      "Alfombra artesanal tejida a mano con fibra de alpaca premium. Diseño geométrico andino en tonos tierra. Ideal para sala o dormitorio.",
    material: "100% Fibra de Alpaca",
    badge: "NEW",
    colors: ["Terracota", "Natural", "Gris"],
    sizes: ["120x180cm", "150x200cm", "200x300cm"],
  },
  {
    id: 2,
    name: "Gorro Baby Alpaca Pompón",
    price: 79.0,
    image: "/images/baby_alpaca_hat.jpg",
    category: "Gorros",
    description:
      "Gorro tejido a mano en fibra Baby Alpaca, suave y cálido. Pompón decorativo. Perfecto para bebés y niños.",
    material: "100% Baby Alpaca",
    badge: "NEW",
    colors: ["Crema", "Rosa Pálido", "Celeste"],
    sizes: ["0-6 meses", "6-12 meses", "1-3 años"],
  },
  {
    id: 3,
    name: "Pantuflas Cuero de Alpaca Bebé",
    price: 65.0,
    image: "/images/alpaca_slippers.jpg",
    category: "Calzado",
    description:
      "Pantuflas artesanales de cuero genuino con forro de lana de alpaca. Suaves, cálidas y perfectas para los primeros pasos.",
    material: "Cuero + Lana de Alpaca",
    badge: "NEW",
    colors: ["Camel", "Chocolate", "Natural"],
    sizes: ["0-6 meses", "6-12 meses", "12-18 meses"],
  },
  {
    id: 4,
    name: "Bufanda Herringbone Camel",
    price: 129.0,
    original_price: 159.0,
    image: "/images/alpaca_scarf.jpg",
    category: "Bufandas",
    description:
      "Bufanda de alpaca con elegante patrón herringbone. Suave al tacto, ligera y extremadamente cálida. Un accesorio imprescindible.",
    material: "100% Alpaca Superfina",
    badge: "20% DTO",
    colors: ["Camel", "Gris Oscuro", "Burdeos"],
  },
  {
    id: 5,
    name: "Guantes Alpaca Andinos",
    price: 59.0,
    image: "/images/alpaca_gloves.jpg",
    category: "Accesorios",
    description:
      "Guantes tejidos a mano con diseño geométrico andino. Fibra de alpaca que brinda calidez sin perder elegancia.",
    material: "100% Alpaca",
    colors: ["Carbón", "Negro", "Gris Claro"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 6,
    name: "Manta Baby Alpaca Rayas",
    price: 249.0,
    original_price: 319.0,
    image: "/images/alpaca_blanket.jpg",
    category: "Mantas",
    description:
      "Manta throw de Baby Alpaca con rayas elegantes. Perfecta para el sofá o la cama. Suavidad incomparable.",
    material: "100% Baby Alpaca",
    badge: "22% DTO",
    colors: ["Gris/Crema", "Azul/Natural", "Camel/Blanco"],
  },
  {
    id: 7,
    name: "Poncho Ancestral Terracota",
    price: 459.0,
    image: "/images/alpaca_poncho.jpg",
    category: "Ponchos",
    description:
      "Poncho ceremonial tejido artesanalmente con diseños ancestrales andinos. Pieza única de colección.",
    material: "100% Alpaca Premium",
    badge: "EXCLUSIVO",
    colors: ["Terracota/Crema"],
  },
  {
    id: 8,
    name: "Sweater Cable Knit Navy",
    price: 199.0,
    image: "/images/alpaca_sweater.jpg",
    category: "Sweaters",
    description:
      "Sweater de punto trenzado en Baby Alpaca. Elegante, cálido y versátil. Confeccionado a mano en los Andes peruanos.",
    material: "100% Baby Alpaca",
    colors: ["Navy", "Charcoal", "Burgundy"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Piel Curtida de Alpaca Natural",
    price: 349.0,
    image: "/images/alpaca_rug.jpg",
    category: "Pieles Curtidas",
    description:
      "Piel de alpaca curtida con proceso artesanal ecológico. Pelo largo, suave y brillante. Pieza exclusiva para decoración de interiores de lujo.",
    material: "100% Piel Natural de Alpaca",
    badge: "EXCLUSIVO",
    colors: ["Blanco Puro", "Camel", "Gris Andino"],
    sizes: ["Estándar (~110x85cm)"],
  },
];

export const categories = [
  { name: "Todos", slug: "todos", count: products.length },
  {
    name: "Alfombras",
    slug: "alfombras",
    count: products.filter((p) => p.category === "Alfombras").length,
  },
  {
    name: "Pieles Curtidas",
    slug: "pieles curtidas",
    count: products.filter((p) => p.category === "Pieles Curtidas").length,
  },
  {
    name: "Accesorios",
    slug: "accesorios",
    count: products.filter((p) => p.category === "Accesorios").length,
  },
  {
    name: "Gorros",
    slug: "gorros",
    count: products.filter((p) => p.category === "Gorros").length,
  },
  {
    name: "Calzado",
    slug: "calzado",
    count: products.filter((p) => p.category === "Calzado").length,
  },
  {
    name: "Bufandas",
    slug: "bufandas",
    count: products.filter((p) => p.category === "Bufandas").length,
  },
  {
    name: "Mantas",
    slug: "mantas",
    count: products.filter((p) => p.category === "Mantas").length,
  },
  {
    name: "Ponchos",
    slug: "ponchos",
    count: products.filter((p) => p.category === "Ponchos").length,
  },
  {
    name: "Sweaters",
    slug: "sweaters",
    count: products.filter((p) => p.category === "Sweaters").length,
  },
];
