import { relations } from "drizzle-orm";
import { boolean, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { Faculty, facultiesOnRoles } from "./faculty";
import { permission, type Permission } from "./permissions";

export const role = pgTable("roles", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  isUnique: boolean("is_unique").notNull().default(false),
});

export const roleRelations = relations(role, ({ many }) => ({
  withUsers: many(facultiesOnRoles),
  withPermissions: many(rolesOnPermissions),
}));

// bridge table for roles and permissions

export const rolesOnPermissions = pgTable(
  "roles_permissions",
  {
    role: varchar("role", { length: 255 })
      .notNull()
      .references(() => role.name, { onDelete: "set null" }),
    permission: varchar("permission", { length: 255 })
      .notNull()
      .references(() => permission.name, { onDelete: "set null" }),
  },
  ({ role, permission }) => ({
    key: primaryKey({ columns: [role, permission] }),
  }),
);

export const rolePermissionsRelations = relations(
  rolesOnPermissions,
  ({ one }) => ({
    role: one(role, {
      fields: [rolesOnPermissions.role],
      references: [role.name],
    }),
    permission: one(permission, {
      fields: [rolesOnPermissions.permission],
      references: [permission.name],
    }),
  }),
);

export type Role = typeof role.$inferSelect;
export type NewRole = typeof role.$inferInsert;
export type RoleRelations = {
  withUsers: { faculty: Omit<Faculty, "withRoles"> }[];
  withPermissions: { permission: Omit<Permission, "withRoles"> }[];
};
export type RoleWithRelations = Role & Partial<RoleRelations>;
