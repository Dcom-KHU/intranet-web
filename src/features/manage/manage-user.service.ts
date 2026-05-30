import { usersApi } from "./manage-users.api";
import type { User } from "../../data/user.type";

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    return await usersApi.getAllUsers();
  },

  searchUsers: async (keyword: string): Promise<User[]> => {
    const users = await usersApi.getAllUsers();

    const normalized = keyword.trim().toLowerCase();

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(normalized) ||
        user.userID.toLowerCase().includes(normalized) ||
        user.studentNumber.includes(normalized)
      );
    });
  },
};