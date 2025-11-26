import { Router } from 'express';
import { pool } from './db';
import { authRequired } from './authMiddleware';

const router = Router();

// Get current user's cart with product details
router.get('/', authRequired, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT ci.id, ci.product_id as productId, ci.quantity, p.name, p.price, p.seller, p.image, p.category
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = ?
       ORDER BY ci.added_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'cart-fetch-failed' });
  }
});

// Add item (or increment) to cart
router.post('/', authRequired, async (req: any, res) => {
  const { productId, quantity } = req.body || {};
  if (!productId) return res.status(400).json({ error: 'productId-required' });
  const qty = Math.max(1, Number(quantity) || 1);
  try {
    const userId = req.user.id;
    // Ensure product exists to avoid FK errors
    const [prodRows]: any = await pool.query('SELECT id FROM products WHERE id = ?', [productId]);
    if (!prodRows.length) {
      return res.status(404).json({ error: 'product-not-found' });
    }
    const [existing] = await pool.query('SELECT id, quantity FROM cart_items WHERE user_id=? AND product_id=?', [userId, productId]);
    // @ts-ignore
    if (existing.length) {
      // @ts-ignore
      const row = existing[0];
      await pool.query('UPDATE cart_items SET quantity=? WHERE id=?', [row.quantity + qty, row.id]);
    } else {
      await pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,?)', [userId, productId, qty]);
    }
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'cart-add-failed' });
  }
});

// Update quantity
router.patch('/:id', authRequired, async (req: any, res) => {
  const { id } = req.params;
  const { quantity } = req.body || {};
  const qty = Math.max(1, Number(quantity) || 1);
  try {
    const userId = req.user.id;
    const [result] = await pool.query('UPDATE cart_items SET quantity=? WHERE id=? AND user_id=?', [qty, id, userId]);
    // @ts-ignore
    if (!result.affectedRows) return res.status(404).json({ error: 'cart-item-not-found' });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'cart-update-failed' });
  }
});

// Delete item
router.delete('/:id', authRequired, async (req: any, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const [result] = await pool.query('DELETE FROM cart_items WHERE id=? AND user_id=?', [id, userId]);
    // @ts-ignore
    if (!result.affectedRows) return res.status(404).json({ error: 'cart-item-not-found' });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'cart-delete-failed' });
  }
});

export default router;
