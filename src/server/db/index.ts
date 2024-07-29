import Database from 'better-sqlite3';
// import { createClient, type Client } from "@libsql/client";
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { env } from '~/env';
import * as schema from './schema';
/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
// const globalForDb = globalThis as unknown as {
//   client: Client | undefined;
// };

// export const client =
//   globalForDb.client ?? createClient({ url: env.DATABASE_URL });
// if (env.NODE_ENV !== "production") globalForDb.client = client;

const sqlite = new Database(env.DATABASE_NAME);
export const db = drizzle(sqlite, { schema });
