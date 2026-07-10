import { useState } from "react";

import useAuth from "../../auth/hooks/useAuth";
import type { User } from "../../auth/types/user.type";
import { completePasswordReset } from "../../auth/utils/auth.utils";
import { updateMySettings } from "../api/my-profile.api";
import type { SaveUserOptions } from "../types/my.types";

const toEditableUser = (
  user: Omit<User, "password"> | null,
): User | null => (user ? { ...user, password: "" } : null);

export function useProfileEdit() {
  const { currentUser, isAuthLoading } = useAuth();
  const [savedUser, setSavedUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  const user = savedUser ?? toEditableUser(currentUser);

  const saveUser = async (
    nextUser: User = user as User,
    options: SaveUserOptions = {},
  ) => {
    if (!nextUser) return false;

    try {
      setSaving(true);
      const updated = await updateMySettings({
        name: nextUser.name,
        phoneNumber: nextUser.phoneNumber,
        ...(options.emailChangeToken
          ? { emailChangeToken: options.emailChangeToken }
          : {}),
      });

      setSavedUser({
        ...nextUser,
        name: updated.name,
        email: updated.email,
        studentNumber: updated.studentId,
        phoneNumber: updated.phoneNumber,
      });

      if (nextUser.password) {
        completePasswordReset();
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
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
