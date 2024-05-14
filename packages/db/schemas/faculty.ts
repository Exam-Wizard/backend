import { relations } from "drizzle-orm";
import {
  index,
  uniqueIndex,
  pgTable,
  uuid,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";
import { type RoleWithRelations, role } from "./roles";

export const faculty = pgTable(
  "faculties",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }),
  },
  ({ name, email }) => ({
    nameIdx: index("name_idx").on(name),
    emailIdx: uniqueIndex("email_idx").on(email),
  }),
);

export const facultyRelations = relations(faculty, ({ many }) => ({
  withRoles: many(facultiesOnRoles),
}));

// bridge table for faculty and roles

export const facultiesOnRoles = pgTable(
  "faculties_roles",
  {
    faculty: uuid("faculty")
      .notNull()
      .references(() => faculty.id, { onDelete: "set null" }),
    role: varchar("role", { length: 255 })
      .notNull()
      .references(() => role.name, { onDelete: "set null" }),
  },
  ({ faculty, role }) => ({
    key: primaryKey({ columns: [faculty, role] }),
  }),
);

export const facultyRolesRelations = relations(facultiesOnRoles, ({ one }) => ({
  faculty: one(faculty, {
    fields: [facultiesOnRoles.faculty],
    references: [faculty.id],
  }),
  role: one(role, {
    fields: [facultiesOnRoles.role],
    references: [role.name],
  }),
}));

export type Faculty = typeof faculty.$inferSelect;
export type NewFaculty = typeof faculty.$inferInsert;
export type FacultyRelations = {
  withRoles: { role: Omit<RoleWithRelations, "withFaculties"> }[];
};
export type FacultyWithRelations = Faculty & Partial<FacultyRelations>;
