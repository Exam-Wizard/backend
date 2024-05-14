import { z } from "zod";
import { hashPassword } from "@package/auth";
import type { FacultyWithRelations } from "@package/db";

const permissionSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const roleSchema = z.object({
  name: z.string(),
  isUnique: z.boolean(),
  permissions: z.array(permissionSchema).default([]),
});

export const newFacultyFields = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .transform((data) => hashPassword(data)),
  image: z.string().url("Not a valid link").nullable().default(null),
});

export const facultySchema = newFacultyFields.extend({
  id: z.string(),
  password: z.string(),
  roles: z.array(roleSchema).default([]),
});

export type FacultySchema = z.infer<typeof facultySchema>;

export const facultyDTO = (data: FacultyWithRelations): FacultySchema =>
  facultySchema.parse({
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    image: data.image,
    roles: data.withRoles?.map(({ role }) => ({
      name: role.name,
      isUnique: role.isUnique,
      permissions: role.withPermissions?.map(({ permission }) => permission),
    })),
  });
