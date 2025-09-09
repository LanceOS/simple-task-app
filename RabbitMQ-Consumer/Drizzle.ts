import 'dotenv/config'

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schemas/barrel/SchemaBarrel"

const databaseUrl = `postgresql://${process.env.PRIVATE_POSTGRES_USER}:${process.env.PRIVATE_POSTGRES_PASSWORD}@${process.env.PRIVATE_POSTGRES_URL}/${process.env.PRIVATE_POSTGRES_DB}`;

const pool = new Pool({
    connectionString: databaseUrl,
    max: 20, // Max number of connections
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Timeout for acquiring a connection
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("Database connection test successful");
        client.release();
    }
    catch(error) {
        console.error("Failed to connect to the database:", error);
    }
}

testConnection();

export const DrizzleDB = drizzle(pool, { schema });