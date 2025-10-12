import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Iniciando ejecucion del test");
  try {
    //Configuración de la conexión
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    const db = drizzle(pool);

    console.log("Conectado correctamente a la base de datos");

    //Inserción de usuario de prueba
    const insertedUser = await db
      .insert(users)
      .values({
        clerkId: "test_clerk_001",
        email: "demo_user@example.com",
        firstName: "demo",
        lastName: "User",
        imgUrl: "https://placeholder.co/100x100",
      })
      .returning();

    console.log("Usuario insertado: ", insertedUser[0]);

    //Lectura de usuario recién creado
    const fetchedUser = await db
      .select()
      .from(users)
      .where(eq(users.email, "demo_user@example.com"));

    console.log("Usuario encontrado: ", fetchedUser[0]);

    //Desconexión
    await pool.end();
    console.log("Conexión finalizada correctamente");
  } catch (error) {
    console.error("Error al ejecutar test: ", error);
  } finally {
    console.log("Ejecucion del test finalizada");
    process.exit(1);
  }
}

main();
