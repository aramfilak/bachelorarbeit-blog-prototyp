import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// import { blogs } from "./schema";
// import { blogSeeds } from "./seed";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

// async function main() {
//   console.log("🌱 Seeding database...");

//   try {
//     await db.insert(blogs).values(blogSeeds);
//     console.log("✅ Database seeded successfully!");
//   } catch (error) {
//     console.error("❌ Error seeding database:", error);
//   }
// }

// main();
