import 'dotenv/config';
import { type Config } from "drizzle-kit";
 
export default {
  dialect: "mysql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations/",
  dbCredentials: {
    url: process.env.VITE_DB_URL as string,
  },
} satisfies Config;
