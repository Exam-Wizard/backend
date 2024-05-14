import { z } from "zod";
import { RoleWithRelations } from "@package/db";

const permissionSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const facultySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  image: z.string().url().nullable().optional(),
});

const newRoleData = z.object({
  name: z.string(),
  isUnique: z.boolean().default(false),
});

export const roleSchema = newRoleData.extend({
  assignees: z.array(facultySchema).default([]),
  permissions: z.array(permissionSchema).default([]),
});

export type NewRoleSchema = z.infer<typeof newRoleData>;
export type RoleSchema = z.infer<typeof roleSchema>;

export const roleDTO = (data: RoleWithRelations): RoleSchema =>
  roleSchema.parse({
    name: data.name,
    isUnique: data.isUnique,
    assignees: data.withUsers?.map(({ faculty }) => faculty),
    permissions: data.withPermissions?.map(({ permission }) => permission),
  });
