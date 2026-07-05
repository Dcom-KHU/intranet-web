import { useEffect, useState } from "react";

import { mockUsers } from "../../../mocks/user-data.mock";
import type { AuthUser } from "../../auth/types/auth-user.type";
import type { User } from "../../auth/types/user.type";
import {
  completePasswordReset,
  getCurrentUser,
} from "../../auth/utils/auth.utils";

const USER_STORAGE_KEY = "user";
const USERS_STORAGE_KEY = "users";

const getLocalUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const findUser = (authUser: AuthUser | null): User | undefined => {
  if (!authUser) return undefined;

  return [...mockUsers, ...getLocalUsers()].find(
    (user) => user.userID === authUser.userID || user.id === authUser.id
  );
};

const fetchUser = (): Promise<User> => {
  const user = findUser(getCurrentUser());

  return user
    ? Promise.resolve(user)
    : Promise.reject(new Error("로그인된 사용자를 찾을 수 없습니다."));
};

const saveCurrentUser = (user: User) => {
  const authUser = { ...user };
  Reflect.deleteProperty(authUser, "password");

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
  window.dispatchEvent(new Event("auth:user-updated"));
};

const updateUser = (updatedUser: User): Promise<User> => {
  const localUsers = getLocalUsers();
  const mockIndex = mockUsers.findIndex((user) => user.id === updatedUser.id);
  const localIndex = localUsers.findIndex(
    (user) => user.id === updatedUser.id || user.userID === updatedUser.userID
  );

  if (mockIndex === -1 && localIndex === -1) {
    return Promise.reject(new Error("유저를 찾을 수 없습니다."));
  }

  if (mockIndex !== -1) mockUsers[mockIndex] = updatedUser;

  if (localIndex !== -1) {
    localUsers[localIndex] = updatedUser;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(localUsers));
  }

  saveCurrentUser(updatedUser);
  return Promise.resolve(updatedUser);
};

export function useProfileEdit() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchUser()
      .then((fetchedUser) => {
        if (!cancelled) setUser(fetchedUser);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const saveUser = async (nextUser: User = user as User) => {
    if (!nextUser) return false;

    try {
      setSaving(true);

      const passwordChanged = user?.password !== nextUser.password;
      const updatedUser = await updateUser(nextUser);

      setUser(updatedUser);
      if (passwordChanged) completePasswordReset();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { user, loading, saving, saveUser };
}
