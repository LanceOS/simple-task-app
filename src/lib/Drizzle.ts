// Import private environment variables for database credentials
import { PRIVATE_POSTGRES_DB, PRIVATE_POSTGRES_PASSWORD, PRIVATE_POSTGRES_URL, PRIVATE_POSTGRES_USER } from "$env/static/private";

// Import core Drizzle ORM and node-postgres functionality
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Import database schemas
import * as authentication from "./server/schemas/authentication";
import * as example from "./server/schemas/example";
import * as relations from "./server/schemas/relations";

// Construct the database connection URL
const databaseUrl = `postgresql://${PRIVATE_POSTGRES_USER}:${PRIVATE_POSTGRES_PASSWORD}@${PRIVATE_POSTGRES_URL}/${PRIVATE_POSTGRES_DB}`;

// Create a new database connection pool
const pool = new Pool({
    connectionString: databaseUrl,
    max: 20, // Max number of connections
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 2000, // Timeout for acquiring a connection
});

// Asynchronously test the database connection
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

// Run the connection test on startup
testConnection();

// Aggregate all schema files into a single object
const schemas = {
    ...authentication,
    ...example,
    ...relations
};

// Initialize and export the Drizzle ORM database client
export const DrizzleDB = drizzle(pool, { schema: schemas });