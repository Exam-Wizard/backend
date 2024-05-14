import { and, eq } from "drizzle-orm";
import { type DB, role, facultiesOnRoles } from "@package/db";
import { type NewRoleSchema, roleDTO } from "../validation/role";

export class RoleAPI {
  private readonly db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  async findAll() {
    try {
      const roles = await this.db.query.role.findMany({
        with: {
          withPermissions: {
            columns: {
              role: false,
              permission: false,
            },
            with: {
              permission: true,
            },
          },
          withUsers: {
            columns: {
              role: false,
              faculty: false,
            },
            with: {
              faculty: true,
            },
          },
        },
      });

      return roles.map((role) => roleDTO(role));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findOne(name: string) {
    try {
      const data = await this.db.query.role.findFirst({
        where: eq(role.name, name),
        with: {
          withPermissions: {
            columns: {
              role: false,
              permission: false,
            },
            with: {
              permission: true,
            },
          },
          withUsers: {
            columns: {
              role: false,
              faculty: false,
            },
            with: {
              faculty: true,
            },
          },
        },
      });

      return data ? roleDTO(data) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(data: NewRoleSchema) {
    try {
      const res = await this.db.insert(role).values(data).returning();
      return res[0] ? roleDTO(res[0]) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async assign({ role, faculty }: { role: string; faculty: string }) {
    try {
      await this.db.insert(facultiesOnRoles).values({ faculty, role });
      return faculty;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async unassign({ role, faculty }: { role: string; faculty: string }) {
    try {
      await this.db
        .delete(facultiesOnRoles)
        .where(
          and(
            eq(facultiesOnRoles.faculty, faculty),
            eq(facultiesOnRoles.role, role),
          ),
        );
      return faculty;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
