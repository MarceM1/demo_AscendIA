import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import {
  users,
  userProfiles,
  userSessions,
  userSkills,
  metrics,
  type InsertUser,
  interviews,
} from "./schema";

async function main() {
  console.log("🚀 Iniciando test de integración de base de datos...");

  // Configuración de la conexión
  console.log("Iniciando conexion a la BD");


  if (!db) {
    console.error("Error al conectar a la base de datos");
    process.exit(1);
  }

  console.log("Conectado correctamente a la base de datos");

  //Transacciones de prueba
  try {
    // Crear usuario principal
    const newUser: InsertUser = {
      clerkId: "test_clerk_002",
      email: "integration_user@example.com",
      firstName: "Integration",
      lastName: "Tester",
      imgUrl: "https://placeholder.co/150x150",
    };

    // Eliminar usuario si ya existe (para pruebas repetibles) - Control de Idempotencia
    await db.delete(users).where(eq(users.email, newUser.email));

    const insertedUser = await db.insert(users).values(newUser).returning();
    const user = insertedUser[0];
    console.log(" Usuario insertado:", user);

    // Crear perfil relacionado (1:1)
    const insertedProfile = await db
      .insert(userProfiles)
      .values({
        userId: user.id,
        bio: "Desarrollador fullstack con experiencia en IA.",
        location: "Buenos Aires, Argentina",
        skills: ["React", "Next.js", "TypeScript"] as string[],
        preferences: { theme: "dark", notifications: true },
      })
      .returning();

    console.log("Perfil creado:", insertedProfile[0]);

    // Crear sesión activa (1:N)
    const insertedSession = await db
      .insert(userSessions)
      .values({
        userId: user.id,
        sessionToken: "session_abc_123",
        expiresAt: new Date(Date.now() + 3600 * 1000),
        deviceInfo: JSON.stringify({
          device: "Laptop",
          browser: "Chrome",
          os: "Windows 11",
        }),
      })
      .returning();

    console.log("Sesión creada:", insertedSession[0]);

    // Crear skills (1:N)
    const skillsList = ["React", "Node.js", "PostgreSQL"];

    const insertedSkills = await Promise.all(
      skillsList.map((skill) =>
        db
          .insert(userSkills)
          .values({
            userId: user.id,
            skill,
          })
          .returning()
      )
    );
    console.log(
      "Skills insertadas:",
      insertedSkills.map((s) => s[0])
    );

    const skills = await db
      .select({ skill: userSkills.skill })
      .from(userSkills)
      .where(eq(userSkills.userId, user.id));

    console.log("Skills recuperadas desde BD:", skills);

    //Crear Entrevistas (1:N)
    const insertedInterviews = await db
      .insert(interviews)
      .values({
        userId: user.id,
        area: "IT",
        interviewer: "MICHAEL",
        position: "Desarrollador Fullstack",
        feedback: "Excelente desempeño en la entrevista.",
        score: 90,
      })
      .returning();

    console.log("Entrevistas creadas:", insertedInterviews[0]);

    // Crear métricas (1:1 o 1:N según caso)
    const insertedMetrics = await db
      .insert(metrics)
      .values({
        userId: user.id,
        totalInterviews: 5,
        avgScore: 85,
        lastImprovement: new Date(),
      })
      .returning();

    console.log("Métricas creadas:", insertedMetrics[0]);

    // Consultar el usuario completo con joins manuales
    console.log("Recuperando información completa del usuario...");

    const fullUser = await db.query.users.findFirst({
      where: eq(users.email, "integration_user@example.com"),
      with: {
        profile: true,
        sessions: true,
        skills: true,
        metrics: true,
        interviews: true,
      },
    });

    const userDTO = {
      ...fullUser,
      metrics: fullUser?.metrics?.[0],
      interviews: fullUser?.interviews?.map((i) => ({
        position: i.position,
        score: i.score,
      })),
      skills: fullUser?.skills?.map((s) => s.skill),
    };

    console.log("Datos combinados del usuario:", fullUser);
    console.log("User DTO:", userDTO);

    console.log("Test de integración finalizado correctamente.");
  } catch (error) {
    console.error("Error durante la ejecución:", error);
  } finally {
    await db.delete(users).where(eq(users.id, users.id));
    await pool.end();
    console.log("Conexión cerrada correctamente");
  }
}

main();
