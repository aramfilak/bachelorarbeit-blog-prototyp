import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/neon-http/migrator";

interface NeonDbError {
  code?: string;
  message: string;
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed");
    process.exit(0);
  } catch (error) {
    // If the error is that the table already exists, we can consider this a success
    const dbError = error as NeonDbError;
    if (dbError?.code === "42P07") {
      console.log("Tables already exist, skipping migration");
      process.exit(0);
    } else {
      console.error("Migration failed", error);
      process.exit(1);
    }
  }
}

main();
