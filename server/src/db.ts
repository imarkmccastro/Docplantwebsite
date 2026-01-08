import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({ path: process.env.DOTENV_PATH || undefined });

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || process.env.DB_NAME || 'docplant',
  waitForConnections: true,
  connectionLimit: 10,
});

export async function testConnection() {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
}
