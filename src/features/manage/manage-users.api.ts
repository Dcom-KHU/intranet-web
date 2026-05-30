import type { User } from "../../data/user.type";
import { mockUsers } from "../../data/user-data.mock";

// 나중에 axios로 바뀔 파일
export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 300);
    });
  },
};