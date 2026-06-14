// useAuth.ts

import { useEffect, useState } from "react";
import type { AuthUser } from "../types/authuser.type";
import {
  getCurrentUser,
  isLoggedIn as checkIsLoggedIn,
  login as authLogin,
  logout as authLogout,
} from "../utils/auth.utils";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    checkIsLoggedIn()
  );

  const [currentUser, setCurrentUser] =
    useState<AuthUser | null>(
      getCurrentUser()
    );

  useEffect(() => {
    syncAuth();
    window.addEventListener("auth:user-updated", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("auth:user-updated", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  function syncAuth() {
    setIsLoggedIn(checkIsLoggedIn());
    setCurrentUser(getCurrentUser());
  }

  function login(id: string, pw: string) {
    const success = authLogin(id, pw);

    syncAuth();

    return success;
  }

  function logout() {
    authLogout();
  }

  return {
    isLoggedIn,
    currentUser,

    login,
    logout,
    syncAuth,
  };
}
