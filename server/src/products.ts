import { Router } from 'express';
import { pool } from './db';
import { Product } from './types';

const router = Router();

router.get('/', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY id');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { name, price, rating, seller, category, image } = req.body as Partial<Product>;
  if (!name || price == null || !seller || !category || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const [result]: any = await pool.query(
    'INSERT INTO products (name, price, rating, seller, category, image) VALUES (?,?,?,?,?,?)',
    [name, price, rating ?? 4.5, seller, category, image]
  );
  const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatable: (keyof Product)[] = ['name', 'price', 'rating', 'seller', 'category', 'image'];
  const fields: string[] = [];
  const values: any[] = [];
  for (const key of updatable) {
    if (req.body[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  }
  if (!fields.length) return res.status(400).json({ error: 'No updates provided' });

  if (req.body.price !== undefined) {
    const [[cur]]: any = await pool.query('SELECT price FROM products WHERE id = ?', [id]);
    if (cur) {
      await pool.query(
        'INSERT INTO product_price_history (product_id, old_price, new_price, changed_by) VALUES (?,?,?,?)',
        [id, cur.price, req.body.price, req.body.changed_by || 'admin']
      );
    }
  }

  values.push(id);
  await pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
  const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM products WHERE id = ?', [id]);
  res.status(204).send();
});

export default router;
