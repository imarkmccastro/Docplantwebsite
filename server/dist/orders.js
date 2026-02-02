"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("./db");
const authMiddleware_1 = require("./authMiddleware");
const router = (0, express_1.Router)();
function genTracking() {
    const prefix = 'DP';
    const ts = Date.now().toString().slice(-8);
    const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${ts}${rand}`;
}
// Admin: list all orders
router.get('/', authMiddleware_1.authRequired, authMiddleware_1.adminOnly, async (_req, res) => {
    try {
        const [orders] = await db_1.pool.query(`SELECT o.id, o.user_id as userId, u.email as userEmail, u.name as userName, o.total, o.status, o.created_at as createdAt, o.delivery_address as deliveryAddress, o.payment_method as paymentMethod, o.tracking_number as trackingNumber
       FROM orders o
       JOIN users u ON u.id = o.user_id
       ORDER BY o.created_at DESC`);
        // @ts-ignore
        for (const o of orders) {
            const [items] = await db_1.pool.query('SELECT id, order_id, product_id, name, price, quantity, image FROM order_items WHERE order_id=?', [o.id]);
            // @ts-ignore
            o.items = items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image }));
        }
        res.json(orders);
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'orders-fetch-failed' });
    }
});
// Current user's orders
router.get('/my', authMiddleware_1.authRequired, async (req, res) => {
    try {
        const userId = req.user.id;
        const [orders] = await db_1.pool.query(`SELECT o.id, o.user_id as userId, u.email as userEmail, u.name as userName, o.total, o.status, o.created_at as createdAt, o.delivery_address as deliveryAddress, o.payment_method as paymentMethod, o.tracking_number as trackingNumber
       FROM orders o
       JOIN users u ON u.id = o.user_id
       WHERE o.user_id=?
       ORDER BY o.created_at DESC`, [userId]);
        // @ts-ignore
        for (const o of orders) {
            const [items] = await db_1.pool.query('SELECT id, order_id, product_id, name, price, quantity, image FROM order_items WHERE order_id=?', [o.id]);
            // @ts-ignore
            o.items = items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image }));
        }
        res.json(orders);
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'my-orders-fetch-failed' });
    }
});
// Create order from current cart
router.post('/', authMiddleware_1.authRequired, async (req, res) => {
    const { deliveryAddress, paymentMethod } = req.body || {};
    if (!deliveryAddress || !paymentMethod) {
        return res.status(400).json({ error: 'deliveryAddress-and-paymentMethod-required' });
    }
    try {
        const userId = req.user.id;
        // Load cart items
        const [cart] = await db_1.pool.query(`SELECT ci.id, ci.product_id as productId, ci.quantity, p.name, p.price, p.image
       FROM cart_items ci JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id=?`, [userId]);
        // @ts-ignore
        if (!cart.length)
            return res.status(400).json({ error: 'cart-empty' });
        // @ts-ignore
        const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
        const trackingNumber = genTracking();
        const [orderResult] = await db_1.pool.query('INSERT INTO orders (user_id, status, total, delivery_address, payment_method, tracking_number) VALUES (?,?,?,?,?,?)', [userId, 'Processing', total, deliveryAddress, paymentMethod, trackingNumber]);
        // @ts-ignore
        const orderId = orderResult.insertId;
        // @ts-ignore
        for (const c of cart) {
            await db_1.pool.query('INSERT INTO order_items (order_id, product_id, name, price, quantity, image) VALUES (?,?,?,?,?,?)', [orderId, c.productId, c.name, c.price, c.quantity, c.image]);
        }
        // Clear cart
        await db_1.pool.query('DELETE FROM cart_items WHERE user_id=?', [userId]);
        // Return order
        const [userRows] = await db_1.pool.query('SELECT email, name FROM users WHERE id=?', [userId]);
        // @ts-ignore
        const user = userRows[0];
        const [items] = await db_1.pool.query('SELECT id, order_id, product_id, name, price, quantity, image FROM order_items WHERE order_id=?', [orderId]);
        res.json({
            id: orderId,
            userId,
            userEmail: user.email,
            userName: user.name,
            items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
            total,
            status: 'Processing',
            createdAt: new Date().toISOString(),
            deliveryAddress,
            paymentMethod,
            trackingNumber,
        });
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'order-create-failed' });
    }
});
// Admin: update order status
router.patch('/:id/status', authMiddleware_1.authRequired, authMiddleware_1.adminOnly, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body || {};
    if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
        return res.status(400).json({ error: 'invalid-status' });
    }
    try {
        const [result] = await db_1.pool.query('UPDATE orders SET status=? WHERE id=?', [status, id]);
        // @ts-ignore
        if (!result.affectedRows)
            return res.status(404).json({ error: 'order-not-found' });
        res.json({ ok: true });
    }
    catch (e) {
        res.status(500).json({ error: e?.message || 'order-status-update-failed' });
    }
});
exports.default = router;
