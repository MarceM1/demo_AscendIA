import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Configuración de conexión (Neon/PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Exportamos una instancia tipada
export const db = drizzle(pool, { schema });

// Exportamos también el pool por si necesitás cerrarlo en tests
export { pool };

// Exportamos las tablas
export const {
  users,
  userProfiles,
  userSessions,
  userSkills,
  metrics,
  interviews,
} = schema;