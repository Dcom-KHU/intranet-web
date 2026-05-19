// useAuth.ts

import { useEffect, useState } from "react";

import {
  type CurrentUser,
  getCurrentUser,
  isLoggedIn as checkIsLoggedIn,
  login as authLogin,
  logout as authLogout,
} from "./auth";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    checkIsLoggedIn()
  );

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(
      getCurrentUser()
    );

  useEffect(() => {
    syncAuth();
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