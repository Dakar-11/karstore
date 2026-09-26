const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, 
        (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.is_active = true) as product_count
      FROM categories c
      WHERE c.is_active = true
      ORDER BY c.sort_order, c.name`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// GET single category with products
router.get("/:slug", async (req, res) => {
  try {
    const catResult = await pool.query(
      "SELECT * FROM categories WHERE slug = $1 AND is_active = true",
      [req.params.slug]
    );

    if (catResult.rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const category = catResult.rows[0];

    const productsResult = await pool.query(
      `SELECT * FROM products 
       WHERE category_id = $1 AND is_active = true
       ORDER BY is_featured DESC, created_at DESC`,
      [category.id]
    );

    res.json({
      category,
      products: productsResult.rows,
    });
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
});

module.exports = router;
