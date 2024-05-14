import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { getClient } from "../client";

async function initiateMigration() {
  const client = getClient(process.env.DB_URL);
  const db = drizzle(client);

  await migrate(db, {
    migrationsFolder: "./drizzle",
  });

  await client.end();
  console.log("Migration successful");
  process.exit(0);
}

initiateMigration().catch((error) => {
  console.log("Migration failed", error);
  process.exit(1);
});
