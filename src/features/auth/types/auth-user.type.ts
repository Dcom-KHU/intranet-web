import type { User } from "./user.type";

export type AuthUser = Omit<
  User,
  "password"
>;