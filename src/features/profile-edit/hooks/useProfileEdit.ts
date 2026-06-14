// features/profile-edit/hooks/useProfileEdit.ts

import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "../api/profile-edit.api";
import { type User } from "../../auth/types/user.type";

export function useProfileEdit() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialInfo, setInitialInfo] = useState<User | null>(null);

  useEffect(() => {
    fetchUser().then((data: User) => {
      setUser(data);
      setInitialInfo(data); // 초기값 저장
      setLoading(false);
    });
  }, []);

  const isDirty = JSON.stringify(user) !== JSON.stringify(initialInfo);

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
    isDirty
  };
}
