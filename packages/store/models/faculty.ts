import { eq } from "drizzle-orm";
import { faculty, type DB, type NewFaculty } from "@package/db";
import {
  facultyDTO,
  newFacultyFields,
  type FacultySchema,
} from "../validation/faculty";
import { encode, verifyPassword } from "@package/auth";

export class FacultyAPI {
  private readonly db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  private async findByEmail(email: string) {
    try {
      const data = await this.db.query.faculty.findFirst({
        where: eq(faculty.email, email),
        with: {
          withRoles: {
            columns: {
              faculty: false,
              role: false,
            },
            with: {
              role: {
                columns: {
                  name: true,
                  isUnique: true,
                },
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
                },
              },
            },
          },
        },
      });

      return data ? facultyDTO(data) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findAll(): Promise<FacultySchema[]> {
    try {
      const data = await this.db.query.faculty.findMany({
        with: {
          withRoles: {
            columns: {
              faculty: false,
              role: false,
            },
            with: {
              role: {
                columns: {
                  name: true,
                  isUnique: true,
                },
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
                },
              },
            },
          },
        },
      });

      return data.map((val) => facultyDTO(val));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findOne(id: string): Promise<FacultySchema | null> {
    try {
      const data = await this.db.query.faculty.findFirst({
        where: eq(faculty.id, id),
        with: {
          withRoles: {
            columns: {
              faculty: false,
              role: false,
            },
            with: {
              role: {
                columns: {
                  name: true,
                  isUnique: true,
                },
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
                },
              },
            },
          },
        },
      });

      return data ? facultyDTO(data) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(data: NewFaculty) {
    try {
      const parsedData = await newFacultyFields.parseAsync(data);
      const [user] = await this.db
        .insert(faculty)
        .values(parsedData)
        .returning();
      if (!user) return null;

      const token = encode({
        id: user.id,
        email: user.email,
        permissions: [],
      });
      return { token, user };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.findByEmail(email);
      if (!user?.password) return null;

      const res = await verifyPassword(password, user.password);
      const token = encode({
        id: user.id,
        email: user.email,
        permissions: getPermissions(user.roles),
      });
      return res ? { token, user } : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const getPermissions = (roles: FacultySchema["roles"]) => {
  let permission: string[] = [];
  roles.forEach(({ permissions: perm }) =>
    perm.forEach(({ name }) => {
      permission = [...permission, name];
    }),
  );

  return permission;
};
