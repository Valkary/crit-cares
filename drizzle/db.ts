import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const connection = await mysql.createConnection(process.env.VITE_DB_URL as string);
export const db = drizzle(connection);