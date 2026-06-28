// profile-edit/profile-edit.api.ts

import type { AuthUser } from "../../auth/types/auth-user.type";
import type { User } from "../../auth/types/user.type";
import { mockUsers } from "../../../mocks/user-data.mock";
import { getCurrentUser } from "../../auth/utils/auth.utils";

const USER_STORAGE_KEY = "user";

const getLocalUsers = (): User[] =>
  JSON.parse(localStorage.getItem("users") || "[]");

const saveCurrentUser = (user: User) => {
  const { password, ...authUser } = user;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
  window.dispatchEvent(new Event("auth:user-updated"));
};

const findFullUser = (authUser: AuthUser | null): User | undefined => {
  if (!authUser) return undefined;

  const localUsers = getLocalUsers();
  const allUsers = [...mockUsers, ...localUsers];

  return allUsers.find(
    (u) => u.userID === authUser.userID || u.id === authUser.id
  );
};

// 조회
export function fetchUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const authUser = getCurrentUser();

      if (!authUser) {
        reject(new Error("로그인된 사용자가 없습니다."));
        return;
      }

      const user = findFullUser(authUser);

      if (!user) {
        reject(new Error("유저를 찾을 수 없습니다."));
        return;
      }

      resolve(user);
    }, 500);
  });
}

// 수정
export function updateUser(
  updatedUser: User
): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const localUsers = getLocalUsers();
      const mockIndex = mockUsers.findIndex(
        (u) => u.id === updatedUser.id
      );
      const localIndex = localUsers.findIndex(
        (u) => u.id === updatedUser.id || u.userID === updatedUser.userID
      );

      if (mockIndex === -1 && localIndex === -1) {
        reject(new Error("유저를 찾을 수 없습니다."));
        return;
      }

      if (mockIndex !== -1) {
        mockUsers[mockIndex] = updatedUser;
      }

      if (localIndex !== -1) {
        localUsers[localIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(localUsers));
      }

      saveCurrentUser(updatedUser);

      resolve(updatedUser);
    }, 1000);
  });
}
