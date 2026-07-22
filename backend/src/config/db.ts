import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Pool ini belum dipakai, hanya disiapkan untuk fitur history ntaran
// Ini buat menyimpan atau mengambil riwayat mixing.
export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
