import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { InsertUser, users } from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Iniciando ejecucion del test");
  //Configuración de la conexión
  console.log("Iniciando conexion a la BD");

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const db = drizzle(pool);
  if (!db) {
    console.error("Error al conectar a la base de datos");
    process.exit(1);
  }

  console.log("Conectado correctamente a la base de datos");

  //Pruebas
  try {
    //Inserción de usuario de prueba
    const newUser: InsertUser = {
      clerkId: "test_clerk_001",
      email: "demo_user@example.com",
      firstName: "Demo",
      lastName: "User",
      imgUrl: "https://placeholder.co/100x100",
    };

    const inserted = await db.insert(users).values(newUser).returning();
    console.log("Usuario insertado: ", inserted[0]);

    //Lectura de usuario recién creado
    const fetchedUser = await db
      .select()
      .from(users)
      .where(eq(users.email, "demo_user@example.com"));

    console.log("Usuario encontrado: ", fetchedUser[0]);

    if (fetchedUser.length > 0) {
      console.log("Test exitoso: el usuario fue creado y leído correctamente.");
    } else {
      console.error("Test fallido: no se encontró el usuario insertado.");
    }

    //Desconexión
    console.log("Conexión finalizada correctamente");
  } catch (error) {
    console.error("Error al ejecutar test: ", error);
  } finally {
    await pool.end();

    console.log("Ejecucion del test finalizada");
    process.exit(0);
  }
}

main();
