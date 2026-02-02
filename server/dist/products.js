"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("./db");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const [rows] = await db_1.pool.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
});
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const [rows] = await db_1.pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (!rows.length)
        return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
});
router.post('/', async (req, res) => {
    const { name, price, rating, seller, category, image } = req.body;
    if (!name || price == null || !seller || !category || !image) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const [result] = await db_1.pool.query('INSERT INTO products (name, price, rating, seller, category, image) VALUES (?,?,?,?,?,?)', [name, price, rating ?? 4.5, seller, category, image]);
    const [rows] = await db_1.pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
});
router.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const updatable = ['name', 'price', 'rating', 'seller', 'category', 'image'];
    const fields = [];
    const values = [];
    for (const key of updatable) {
        if (req.body[key] !== undefined) {
            fields.push(`${key} = ?`);
            values.push(req.body[key]);
        }
    }
    if (!fields.length)
        return res.status(400).json({ error: 'No updates provided' });
    if (req.body.price !== undefined) {
        const [[cur]] = await db_1.pool.query('SELECT price FROM products WHERE id = ?', [id]);
        if (cur) {
            await db_1.pool.query('INSERT INTO product_price_history (product_id, old_price, new_price, changed_by) VALUES (?,?,?,?)', [id, cur.price, req.body.price, req.body.changed_by || 'admin']);
        }
    }
    values.push(id);
    await db_1.pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
    const [rows] = await db_1.pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (!rows.length)
        return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
});
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    await db_1.pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.status(204).send();
});
exports.default = router;
