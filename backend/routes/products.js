const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

// GET all products (with filtering, sorting, pagination)
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      sort = "featured",
      page = 1,
      limit = 20,
      featured,
      min_price,
      max_price,
    } = req.query;

    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
    `;
    const params = [];
    let paramCount = 0;

    if (category && category !== "todos") {
      paramCount++;
      query += ` AND c.slug = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    if (featured === "true") {
      query += ` AND p.is_featured = true`;
    }

    if (min_price) {
      paramCount++;
      query += ` AND p.price >= $${paramCount}`;
      params.push(parseFloat(min_price));
    }

    if (max_price) {
      paramCount++;
      query += ` AND p.price <= $${paramCount}`;
      params.push(parseFloat(max_price));
    }

    // Sorting
    switch (sort) {
      case "price-asc":
        query += " ORDER BY p.price ASC";
        break;
      case "price-desc":
        query += " ORDER BY p.price DESC";
        break;
      case "name":
        query += " ORDER BY p.name ASC";
        break;
      case "newest":
        query += " ORDER BY p.created_at DESC";
        break;
      default:
        query += " ORDER BY p.is_featured DESC, p.created_at DESC";
    }

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    params.push(parseInt(limit));
    paramCount++;
    query += ` OFFSET $${paramCount}`;
    params.push(offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
    `;
    const countParams = [];
    let countParamIdx = 0;

    if (category && category !== "todos") {
      countParamIdx++;
      countQuery += ` AND c.slug = $${countParamIdx}`;
      countParams.push(category);
    }
    if (search) {
      countParamIdx++;
      countQuery += ` AND (p.name ILIKE $${countParamIdx} OR p.description ILIKE $${countParamIdx})`;
      countParams.push(`%${search}%`);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      products: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// GET single product by slug
router.get("/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = $1 AND p.is_active = true`,
      [req.params.slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Get related products
    const related = await pool.query(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.category_id = $1 AND p.id != $2 AND p.is_active = true
       LIMIT 4`,
      [result.rows[0].category_id, result.rows[0].id]
    );

    res.json({
      product: result.rows[0],
      related: related.rows,
    });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// POST create product (admin)
router.post("/", async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      original_price,
      category_id,
      material,
      image_url,
      colors,
      sizes,
      stock,
      badge,
      is_featured,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, slug, description, price, original_price, category_id, material, image_url, colors, sizes, stock, badge, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        name,
        slug,
        description,
        price,
        original_price,
        category_id,
        material,
        image_url,
        colors,
        sizes,
        stock || 0,
        badge,
        is_featured || false,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;
    const updates = [];
    const values = [];
    let paramIdx = 0;

    for (const [key, value] of Object.entries(fields)) {
      if (
        [
          "name",
          "slug",
          "description",
          "price",
          "original_price",
          "category_id",
          "material",
          "image_url",
          "colors",
          "sizes",
          "stock",
          "badge",
          "is_featured",
          "is_active",
        ].includes(key)
      ) {
        paramIdx++;
        updates.push(`${key} = $${paramIdx}`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }

    paramIdx++;
    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(parseInt(id));

    const result = await pool.query(
      `UPDATE products SET ${updates.join(", ")} WHERE id = $${paramIdx} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// DELETE product (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE products SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;
