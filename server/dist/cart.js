"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("./db");
const authMiddleware_1 = require("./authMiddleware");
const router = (0, express_1.Router)();
// Get current user's cart with product details
router.get('/', authMiddleware_1.authRequired, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db_1.pool.query(`SELECT ci.id, ci.product_id as productId, ci.quantity, p.name, p.price, p.seller, p.image, p.category
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = ?
       ORDER BY ci.added_at DESC`, [userId]);
        res.json(rows);
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'cart-fetch-failed' });
    }
});
// Add item (or increment) to cart
router.post('/', authMiddleware_1.authRequired, async (req, res) => {
    const { productId, quantity } = req.body || {};
    if (!productId)
        return res.status(400).json({ error: 'productId-required' });
    const qty = Math.max(1, Number(quantity) || 1);
    try {
        const userId = req.user.id;
        // Ensure product exists to avoid FK errors
        const [prodRows] = await db_1.pool.query('SELECT id FROM products WHERE id = ?', [productId]);
        if (!prodRows.length) {
            return res.status(404).json({ error: 'product-not-found' });
        }
        const [existing] = await db_1.pool.query('SELECT id, quantity FROM cart_items WHERE user_id=? AND product_id=?', [userId, productId]);
        // @ts-ignore
        if (existing.length) {
            // @ts-ignore
            const row = existing[0];
            await db_1.pool.query('UPDATE cart_items SET quantity=? WHERE id=?', [row.quantity + qty, row.id]);
        }
        else {
            await db_1.pool.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,?)', [userId, productId, qty]);
        }
        res.json({ ok: true });
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'cart-add-failed' });
    }
});
// Update quantity
router.patch('/:id', authMiddleware_1.authRequired, async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body || {};
    const qty = Math.max(1, Number(quantity) || 1);
    try {
        const userId = req.user.id;
        const [result] = await db_1.pool.query('UPDATE cart_items SET quantity=? WHERE id=? AND user_id=?', [qty, id, userId]);
        // @ts-ignore
        if (!result.affectedRows)
            return res.status(404).json({ error: 'cart-item-not-found' });
        res.json({ ok: true });
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'cart-update-failed' });
    }
});
// Delete item
router.delete('/:id', authMiddleware_1.authRequired, async (req, res) => {
    const { id } = req.params;
    try {
        const userId = req.user.id;
        const [result] = await db_1.pool.query('DELETE FROM cart_items WHERE id=? AND user_id=?', [id, userId]);
        // @ts-ignore
        if (!result.affectedRows)
            return res.status(404).json({ error: 'cart-item-not-found' });
        res.json({ ok: true });
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'cart-delete-failed' });
    }
});
exports.default = router;
