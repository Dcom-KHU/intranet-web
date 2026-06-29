import type { User } from "../../auth/types/user.type";

export type ActiveMenu = "profile" | "password";

export type SaveUser = (nextUser?: User) => Promise<boolean>;
