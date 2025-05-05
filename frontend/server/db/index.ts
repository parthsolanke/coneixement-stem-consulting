import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

// cache connection in development (avoids multiple connections during HMR)
const globalForDb = globalThis as unknown as {
	conn: Pool | undefined;
};

const conn = globalForDb.conn ?? new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

// attach schema explicitly
export const db = drizzle(conn, { schema });
