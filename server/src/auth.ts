import { Router } from 'express';
import { pool } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

function signToken(payload: any) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email-and-password-required' });
  }
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    // @ts-ignore
    if (rows.length) return res.status(409).json({ error: 'email-already-exists' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
      [email, hash, name || null]
    );
    // @ts-ignore
    const userId = result.insertId;
    const token = signToken({ sub: userId, email });
    res.json({ token, user: { id: userId, email, name: name || null } });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'register-failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email-and-password-required' });
  }
  try {
    const [rows] = await pool.query('SELECT id, password_hash, name FROM users WHERE email = ?', [email]);
    // @ts-ignore
    if (!rows.length) return res.status(401).json({ error: 'invalid-credentials' });
    // @ts-ignore
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid-credentials' });
    const token = signToken({ sub: user.id, email });
    res.json({ token, user: { id: user.id, email, name: user.name || null } });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'login-failed' });
  }
});

export default router;