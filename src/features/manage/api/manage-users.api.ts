import type { User } from "../../auth/types/user.type";
import { mockUsers } from "../../../mocks/user-data.mock";

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
