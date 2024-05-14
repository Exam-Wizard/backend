import { compare, hash } from "bcrypt";

export const hashPassword = (password: string) => hash(password, 10);

export const verifyPassword = (password: string, hash: string) =>
  compare(password, hash);
