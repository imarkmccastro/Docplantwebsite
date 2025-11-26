import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './db';
import productsRouter from './products';
import authRouter from './auth';
import cartRouter from './cart';
import ordersRouter from './orders';

dotenv.config({ path: process.env.DOTENV_PATH || undefined });

const app = express();
const allowed = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001,http://localhost:5173')
  .split(',')
  .map(s => s.trim());

app.use(cors({ origin: allowed }));
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await testConnection();
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || 'db-error' });
  }
});

app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);

const port = Number(process.env.PORT || 4001);

// Probe DB connection on startup (non-fatal)
testConnection()
  .then(() => console.log('DB connection: OK'))
  .catch((e: any) => console.error('DB connection: FAILED ->', e?.message || e));

console.log('CORS allowed origins:', allowed.join(', '));
console.log('Starting API on port', port);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
