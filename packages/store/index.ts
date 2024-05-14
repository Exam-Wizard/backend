import { RoleAPI } from "./models/role";
import { FacultyAPI } from "./models/faculty";
import type { DB } from "@package/db";

export const getDataSource = (db: DB) => ({
  role: new RoleAPI(db),
  faculty: new FacultyAPI(db),
});

export type DataSources = ReturnType<typeof getDataSource>;
