import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import config from "../config";

if (!config.db.url) {
    throw new Error("DATABASE_URL, ensure the database is provisioned");
}
const client = createClient({ url: config.db.url });
export const db = drizzle({ client });