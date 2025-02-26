import { defineConfig } from "drizzle-kit";
import config from './src/config';


if (!config.db.url) {
    throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
    out: "./migrations",
    schema: "./src/db/schema",
    dialect: "sqlite",
    dbCredentials: {
        url: config.db.url,
    },
});
