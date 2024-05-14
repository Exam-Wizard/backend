import { pgTable, varchar } from "drizzle-orm/pg-core";

export const classes = pgTable("classes", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
});
