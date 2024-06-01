import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from './db';

console.log("Started migration!");
await migrate(db, { migrationsFolder: './drizzle/migrations' });
console.log("Finished migration!");

await connection.end();
