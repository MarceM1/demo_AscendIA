import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Configuración de conexión (Neon/PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Exportacion de una instancia tipada
export const db = drizzle(pool, { schema });

// Exportación del pool por si es necesario cerrarlo en tests
export { pool };

// Exportación de las tablas
export const {
  users,
  userProfiles,
  userSessions,
  userSkills,
  metrics,
  interviews,
  webhookLogs,
} = schema;