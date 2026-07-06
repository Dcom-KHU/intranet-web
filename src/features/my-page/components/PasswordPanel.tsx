import { useEffect, useState } from "react";

import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import type { User } from "../../auth/types/user.type";
import {
  validatePassword,
  validatePasswordMatch,
  verifyCurrentPassword,
} from "../../auth/utils/auth.utils";
import type { DirtyChangeHandler, SaveUser } from "../types/types";
import LabeledInput from "./LabeledInput";

type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";
type PasswordErrors = Partial<Record<PasswordField, string>>;

interface PasswordPanelProps {
  user: User;
  saveUser: SaveUser;
  saving: boolean;
  onDirtyChange: DirtyChangeHandler;
}

export default function PasswordPanel({
  user,
  saveUser,
  saving,
  onDirtyChange,
}: PasswordPanelProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [message, setMessage] = useState("");
  const isDirty = newPassword.length > 0;

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(
    () => () => {
      onDirtyChange(false);
    },
    [onDirtyChange],
  );

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
    setMessage("");

    if (verifyCurrentPassword(user.userID, value)) {
      setErrors((previous) => {
        if (!previous.currentPassword) return previous;
        const next = { ...previous };
        delete next.currentPassword;
        return next;
      });
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setMessage("");

    setErrors((previous) => {
      const next = { ...previous };
      if (validatePassword(value)) delete next.newPassword;
      if (validatePasswordMatch(value, confirmPassword)) {
        delete next.confirmPassword;
      }
      return next;
    });
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setMessage("");

    if (validatePasswordMatch(newPassword, value)) {
      setErrors((previous) => {
        if (!previous.confirmPassword) return previous;
        const next = { ...previous };
        delete next.confirmPassword;
        return next;
      });
    }
  };

  const handlePasswordSave = async () => {
    const nextErrors: PasswordErrors = {};

    if (!verifyCurrentPassword(user.userID, currentPassword)) {
      nextErrors.currentPassword = "현재 비밀번호가 일치하지 않습니다.";
    }
    if (!validatePassword(newPassword)) {
      nextErrors.newPassword = "영문과 숫자를 포함해 8자 이상 입력해주세요.";
    }
    if (!validatePasswordMatch(newPassword, confirmPassword)) {
      nextErrors.confirmPassword = "새 비밀번호가 일치하지 않습니다.";
    }

    setErrors(nextErrors);
    setMessage("");
    if (Object.keys(nextErrors).length > 0) return;

    const success = await saveUser({ ...user, password: newPassword });
    setMessage(success ? "비밀번호가 변경되었습니다." : "변경에 실패했습니다.");

    if (success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <section className="px-10 pt-10 pb-5">
      <h2 className="mb-2 text-base font-bold text-[#0F2854]">비밀번호 변경</h2>
      <p className="mb-8 text-xs text-gray-500">
        영문과 숫자를 포함한 8자 이상의 비밀번호를 사용해주세요.
      </p>

      <div className="space-y-5">
        <LabeledInput label="현재 비밀번호" error={errors.currentPassword}>
          <Input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => handleCurrentPasswordChange(event.target.value)}
          />
        </LabeledInput>
        <LabeledInput label="새 비밀번호" error={errors.newPassword}>
          <Input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => handleNewPasswordChange(event.target.value)}
          />
        </LabeledInput>
        <LabeledInput label="새 비밀번호 확인" error={errors.confirmPassword}>
          <Input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) =>
              handleConfirmPasswordChange(event.target.value)
            }
          />
        </LabeledInput>
      </div>

      <div className="mt-10 flex items-center justify-end gap-4">
        {message && (
          <p className="mr-auto text-xs text-gray-500" role="status">
            {message}
          </p>
        )}
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          disabled={saving}
          className="px-4 text-xs"
          onClick={handlePasswordSave}
        >
          {saving ? "변경 중..." : "비밀번호 변경"}
        </Button>
      </div>
    </section>
  );
}
