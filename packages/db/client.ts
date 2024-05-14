import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Options } from "postgres";
import * as schema from "./schemas";

const options: Options<{}> =
  process.env.NODE_ENV === "migration"
    ? { max: 1 }
    : { max: 10, prepare: false };

export const getClient = (connectionString: string | undefined) => {
  if (!connectionString || connectionString === "") {
    throw new Error("Missing DB_URL environment variable");
  }

  return postgres(connectionString, options);
};

export const db = drizzle(getClient(process.env.DB_URL), { schema });

export type DB = typeof db;
