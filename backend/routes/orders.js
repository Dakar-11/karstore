const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "kar_secret";

// Middleware to verify token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token requerido" });
  }
  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// Generate unique order number
function generateOrderNumber() {
  const date = new Date();
  const prefix = "KR";
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}${year}${month}-${random}`;
}

// POST create order
router.post("/", authMiddleware, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const {
      items,
      shipping_address,
      shipping_city,
      shipping_department,
      shipping_postal_code,
      payment_method,
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "El pedido debe tener al menos un producto" });
    }

    // Calculate totals
    let subtotal = 0;
    const processedItems = [];

    for (const item of items) {
      const productResult = await client.query(
        "SELECT * FROM products WHERE id = $1 AND is_active = true",
        [item.product_id]
      );

      if (productResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          error: `Producto con ID ${item.product_id} no encontrado`,
        });
      }

      const product = productResult.rows[0];

      if (product.stock < item.quantity) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          error: `Stock insuficiente para "${product.name}". Disponible: ${product.stock}`,
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      processedItems.push({
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        unit_price: product.price,
        color: item.color || null,
        size: item.size || null,
        total: itemTotal,
      });

      // Update stock
      await client.query(
        "UPDATE products SET stock = stock - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [item.quantity, product.id]
      );
    }

    const shipping_cost = subtotal >= 299 ? 0 : 15;
    const tax = subtotal * 0.18; // IGV 18%
    const total = subtotal + shipping_cost;

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, order_number, subtotal, shipping_cost, tax, total, 
        shipping_address, shipping_city, shipping_department, shipping_postal_code,
        payment_method, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        req.user.id,
        generateOrderNumber(),
        subtotal,
        shipping_cost,
        tax,
        total,
        shipping_address,
        shipping_city,
        shipping_department,
        shipping_postal_code,
        payment_method || "card",
        notes,
      ]
    );

    const order = orderResult.rows[0];

    // Insert order items
    for (const item of processedItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, color, size, total)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          order.id,
          item.product_id,
          item.product_name,
          item.quantity,
          item.unit_price,
          item.color,
          item.size,
          item.total,
        ]
      );
    }

    await client.query("COMMIT");

    // Fetch complete order with items
    const completeOrder = await pool.query(
      `SELECT o.*, json_agg(
        json_build_object(
          'id', oi.id,
          'product_name', oi.product_name,
          'quantity', oi.quantity,
          'unit_price', oi.unit_price,
          'color', oi.color,
          'size', oi.size,
          'total', oi.total
        )
      ) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
      GROUP BY o.id`,
      [order.id]
    );

    res.status(201).json(completeOrder.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error al crear el pedido" });
  } finally {
    client.release();
  }
});

// GET user's orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.*, 
        (SELECT json_agg(
          json_build_object(
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'total', oi.total
          )
        ) FROM order_items oi WHERE oi.order_id = o.id) as items
      FROM orders o
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

// GET single order
router.get("/:orderNumber", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_name', oi.product_name,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'color', oi.color,
            'size', oi.size,
            'total', oi.total
          )
        ) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.order_number = $1 AND o.user_id = $2
      GROUP BY o.id`,
      [req.params.orderNumber, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
});

module.exports = router;
