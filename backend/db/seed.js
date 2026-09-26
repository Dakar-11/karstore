require("dotenv").config({ path: __dirname + "/../.env" });
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "kar_artesanias",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

async function seed() {
  try {
    // Insert categories
    const categories = [
      ["Alfombras", "alfombras", "Alfombras artesanales de fibra de alpaca"],
      ["Gorros", "gorros", "Gorros tejidos a mano en Baby Alpaca"],
      ["Calzado", "calzado", "Pantuflas y zapatos de cuero con forro de alpaca"],
      ["Bufandas", "bufandas", "Bufandas y chalinas de alpaca premium"],
      ["Accesorios", "accesorios", "Guantes, cinturones y más"],
      ["Pieles Curtidas", "pieles-curtidas", "Pieles de alpaca curtidas artesanalmente para decoración"],
      ["Mantas", "mantas", "Mantas throw de Baby Alpaca para el hogar"],
      ["Ponchos", "ponchos", "Ponchos ancestrales con diseños andinos"],
      ["Sweaters", "sweaters", "Sweaters de punto en Baby Alpaca"],
    ];

    for (const [name, slug, description] of categories) {
      await pool.query(
        `INSERT INTO categories (name, slug, description) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (slug) DO NOTHING`,
        [name, slug, description]
      );
    }
    console.log("✅ Categorías insertadas");

    // Get category IDs
    const catResult = await pool.query(
      "SELECT id, slug FROM categories ORDER BY id"
    );
    const catMap = {};
    catResult.rows.forEach((row) => {
      catMap[row.slug] = row.id;
    });

    // Insert products
    const products = [
      {
        name: "Alfombra Andina Tradicional",
        slug: "alfombra-andina-tradicional",
        description:
          "Alfombra artesanal tejida a mano con fibra de alpaca premium. Diseño geométrico andino en tonos tierra. Ideal para sala o dormitorio.",
        price: 389.0,
        category_slug: "alfombras",
        material: "100% Fibra de Alpaca",
        image_url: "/images/alpaca_rug.jpg",
        colors: ["Terracota", "Natural", "Gris"],
        sizes: ["120x180cm", "150x200cm", "200x300cm"],
        stock: 15,
        badge: "NEW",
        is_featured: true,
      },
      {
        name: "Gorro Baby Alpaca Pompón",
        slug: "gorro-baby-alpaca-pompon",
        description:
          "Gorro tejido a mano en fibra Baby Alpaca, suave y cálido. Pompón decorativo. Perfecto para bebés y niños.",
        price: 79.0,
        category_slug: "gorros",
        material: "100% Baby Alpaca",
        image_url: "/images/baby_alpaca_hat.jpg",
        colors: ["Crema", "Rosa Pálido", "Celeste"],
        sizes: ["0-6 meses", "6-12 meses", "1-3 años"],
        stock: 30,
        badge: "NEW",
        is_featured: true,
      },
      {
        name: "Pantuflas Cuero de Alpaca Bebé",
        slug: "pantuflas-cuero-alpaca-bebe",
        description:
          "Pantuflas artesanales de cuero genuino con forro de lana de alpaca. Suaves, cálidas y perfectas para los primeros pasos.",
        price: 65.0,
        category_slug: "calzado",
        material: "Cuero + Lana de Alpaca",
        image_url: "/images/alpaca_slippers.jpg",
        colors: ["Camel", "Chocolate", "Natural"],
        sizes: ["0-6 meses", "6-12 meses", "12-18 meses"],
        stock: 25,
        badge: "NEW",
        is_featured: true,
      },
      {
        name: "Bufanda Herringbone Camel",
        slug: "bufanda-herringbone-camel",
        description:
          "Bufanda de alpaca con elegante patrón herringbone. Suave al tacto, ligera y extremadamente cálida.",
        price: 129.0,
        original_price: 159.0,
        category_slug: "bufandas",
        material: "100% Alpaca Superfina",
        image_url: "/images/alpaca_scarf.jpg",
        colors: ["Camel", "Gris Oscuro", "Burdeos"],
        sizes: null,
        stock: 20,
        badge: "20% DTO",
        is_featured: true,
      },
      {
        name: "Guantes Alpaca Andinos",
        slug: "guantes-alpaca-andinos",
        description:
          "Guantes tejidos a mano con diseño geométrico andino. Fibra de alpaca para calidez y elegancia.",
        price: 59.0,
        category_slug: "accesorios",
        material: "100% Alpaca",
        image_url: "/images/alpaca_gloves.jpg",
        colors: ["Carbón", "Negro", "Gris Claro"],
        sizes: ["S", "M", "L"],
        stock: 35,
        badge: null,
        is_featured: false,
      },
      {
        name: "Manta Baby Alpaca Rayas",
        slug: "manta-baby-alpaca-rayas",
        description:
          "Manta throw de Baby Alpaca con rayas elegantes. Perfecta para el sofá o la cama.",
        price: 249.0,
        original_price: 319.0,
        category_slug: "mantas",
        material: "100% Baby Alpaca",
        image_url: "/images/alpaca_blanket.jpg",
        colors: ["Gris/Crema", "Azul/Natural", "Camel/Blanco"],
        sizes: null,
        stock: 12,
        badge: "22% DTO",
        is_featured: true,
      },
      {
        name: "Poncho Ancestral Terracota",
        slug: "poncho-ancestral-terracota",
        description:
          "Poncho ceremonial tejido artesanalmente con diseños ancestrales andinos. Pieza única de colección.",
        price: 459.0,
        category_slug: "ponchos",
        material: "100% Alpaca Premium",
        image_url: "/images/alpaca_poncho.jpg",
        colors: ["Terracota/Crema"],
        sizes: null,
        stock: 5,
        badge: "EXCLUSIVO",
        is_featured: true,
      },
      {
        name: "Sweater Cable Knit Navy",
        slug: "sweater-cable-knit-navy",
        description:
          "Sweater de punto trenzado en Baby Alpaca. Elegante, cálido y versátil. Confeccionado a mano.",
        price: 199.0,
        category_slug: "sweaters",
        material: "100% Baby Alpaca",
        image_url: "/images/alpaca_sweater.jpg",
        colors: ["Navy", "Charcoal", "Burgundy"],
        sizes: ["S", "M", "L", "XL"],
        stock: 18,
        badge: null,
        is_featured: true,
      },
    ];

    for (const product of products) {
      await pool.query(
        `INSERT INTO products (name, slug, description, price, original_price, category_id, material, image_url, colors, sizes, stock, badge, is_featured) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
         ON CONFLICT (slug) DO UPDATE SET 
           price = EXCLUDED.price, 
           stock = EXCLUDED.stock,
           updated_at = CURRENT_TIMESTAMP`,
        [
          product.name,
          product.slug,
          product.description,
          product.price,
          product.original_price || null,
          catMap[product.category_slug],
          product.material,
          product.image_url,
          product.colors,
          product.sizes,
          product.stock,
          product.badge,
          product.is_featured,
        ]
      );
    }
    console.log("✅ Productos insertados");

    // Insert admin user
    const defaultPass = process.env.ADMIN_PASSWORD || "ChangeMeImmediately_2026";
    const adminPassword = await bcrypt.hash(defaultPass, 10);
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role) 
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING`,
      ["Admin", "KAR", "admin@kar.pe", adminPassword, "admin"]
    );
    console.log("✅ Usuario admin creado (admin@kar.pe)");

    await pool.end();
    console.log("🎉 Seed completado exitosamente");
  } catch (error) {
    console.error("❌ Error en el seed:", error.message);
    process.exit(1);
  }
}

seed();
