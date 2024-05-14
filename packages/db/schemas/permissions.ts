import { relations } from "drizzle-orm";
import { pgTable, varchar, text } from "drizzle-orm/pg-core";
import { rolesOnPermissions } from "./roles";

export const permission = pgTable("permissions", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  description: text("description").notNull(),
});

export const permissionsRelations = relations(permission, ({ many }) => ({
  withRoles: many(rolesOnPermissions),
}));

export type Permission = typeof permission.$inferSelect;
export type NewPermission = typeof permission.$inferInsert;
