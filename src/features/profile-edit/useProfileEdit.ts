// features/profile-edit/useProfileEdit.ts

import { useEffect, useState } from "react";
import { fetchUser } from "./profile-edit.api";
import { type User } from "../user.type";

export function useProfileEdit() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser().then((data: User) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return { user, setUser, loading };
}