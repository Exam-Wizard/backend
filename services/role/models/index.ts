import { Role as TRole } from "../generated";

const roles: TRole[] = [
  {
    name: "Admin",
    users: [{ name: "Alice" }, { name: "Bob" }],
    permissions: ["read", "write", "delete"],
  },
  {
    name: "User",
    users: [{ name: "Charlie" }, { name: "Dave" }],
    permissions: ["read"],
  },
];

export class Role {
  findAll() {
    return roles;
  }

  findOne(name: string) {
    return roles.find((role) => role.name === name) ?? null;
  }
}
