import { useState } from "react";

import useAuth from "../../auth/hooks/useAuth";
import type { User } from "../../auth/types/user.type";
import { completePasswordReset } from "../../auth/utils/auth.utils";

const toEditableUser = (
  user: Omit<User, "password"> | null,
): User | null => (user ? { ...user, password: "" } : null);

export function useProfileEdit() {
  const { currentUser, isAuthLoading } = useAuth();
  const [savedUser, setSavedUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  const user = savedUser ?? toEditableUser(currentUser);

  const saveUser = async (nextUser: User = user as User) => {
    if (!nextUser) return false;

    try {
      setSaving(true);
      setSavedUser(nextUser);

      if (nextUser.password) {
        completePasswordReset();
      }

      return true;
    } finally {
      setSaving(false);
    }
  };

  return {
    user,
    loading: isAuthLoading,
    saving,
    saveUser,
  };
}
