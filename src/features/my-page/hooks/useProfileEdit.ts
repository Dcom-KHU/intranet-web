import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import useAuth from "../../auth/hooks/useAuth";
import { AUTH_QUERY_KEY } from "../../auth/constants/auth.constants";
import type UserDto from "../../auth/dto/user.dto";
import type { User } from "../../auth/types/user.type";
import { completePasswordReset } from "../../auth/utils/auth.utils";
import { updateMySettings } from "../api/my-profile.api";
import type { SaveUserOptions } from "../types/my.types";
import { logClientError } from "../../../utils/logger";

const toEditableUser = (
  user: Omit<User, "password"> | null,
): User | null => (user ? { ...user, password: "" } : null);

export function useProfileEdit() {
  const queryClient = useQueryClient();
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

      queryClient.setQueryData<UserDto>(AUTH_QUERY_KEY, (cachedUser) =>
        cachedUser
          ? {
              ...cachedUser,
              name: updated.name,
              email: updated.email,
              studentId: updated.studentId,
              phoneNumber: updated.phoneNumber,
            }
          : cachedUser,
      );

      if (nextUser.password) {
        completePasswordReset();
      }

      return true;
    } catch (error) {
      logClientError("프로필 수정 실패", error);
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
