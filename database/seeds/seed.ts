import { pool } from "../db";
import { seedAreas } from "./areas";
import { seedInterviewers } from "./interviewers";

async function main() {
    console.log("Starting seeding process...");

  await seedAreas();
  await seedInterviewers();

  console.log("Seeding process completed.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});