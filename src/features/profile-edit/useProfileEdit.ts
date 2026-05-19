// features/profile-edit/useProfileEdit.ts

import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "./profile-edit.api";
import { type User } from "../user.type";

export function useProfileEdit() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUser().then((data: User) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

   const saveUser = async () => {
    if (!user) return;

    try {
      setSaving(true);

      await updateUser(user);

      alert("저장되었습니다.");
    } catch (error) {
      console.error(error);

      alert("저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return {
    user,
    setUser,
    loading,
    saving,
    saveUser,
  };
}