import { useState } from "react";

import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import InputLabel from "../../../components/ui/InputLabel";
import type { User } from "../../auth/types/user.type";
import {
  validateEmail,
  validatePhoneNumber,
} from "../../auth/utils/auth.utils";
import useEmailVerification from "../hooks/useEmailVerification";
import type { SaveUser } from "../types/types";
import LabeledInput from "./LabeledInput";

type ProfileField = "name" | "email" | "phoneNumber";
type ProfileErrors = Partial<Record<ProfileField, string>>;

interface ProfilePanelProps {
  user: User;
  saveUser: SaveUser;
  saving: boolean;
}

const EMAIL_FORMAT_ERROR = "올바른 이메일 형식이 아닙니다.";
const EMAIL_VERIFICATION_ERROR = "이메일 인증을 완료해주세요.";

export default function ProfilePanel({
  user,
  saveUser,
  saving,
}: ProfilePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<User>(user);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [message, setMessage] = useState("");
  const emailVerification = useEmailVerification();
  const isEmailChanged = draft.email !== user.email;

  const clearFieldError = (field: ProfileField) => {
    setErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleFieldChange = (field: "name" | "phoneNumber", value: string) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setMessage("");

    const isValid =
      field === "name" ? Boolean(value.trim()) : validatePhoneNumber(value);
    if (isValid) clearFieldError(field);
  };

  const handleEmailChange = (value: string) => {
    setDraft((previous) => ({ ...previous, email: value }));
    setMessage("");
    emailVerification.handleEmailChange();

    setErrors((previous) => {
      if (!previous.email) return previous;

      const next = { ...previous };
      if (!validateEmail(value)) {
        next.email = EMAIL_FORMAT_ERROR;
      } else if (value !== user.email) {
        next.email = EMAIL_VERIFICATION_ERROR;
      } else {
        delete next.email;
      }
      return next;
    });
  };

  const handleSendCode = () => {
    if (!emailVerification.sendCode(draft.email)) {
      setErrors((previous) => ({
        ...previous,
        email: EMAIL_FORMAT_ERROR,
      }));
      return;
    }

    if (isEmailChanged) {
      setErrors((previous) => ({
        ...previous,
        email: EMAIL_VERIFICATION_ERROR,
      }));
    } else {
      clearFieldError("email");
    }
  };

  const handleVerifyCode = () => {
    if (emailVerification.verifyCode(draft.email)) {
      clearFieldError("email");
    }
  };

  const startEditing = () => {
    setDraft({ ...user });
    setErrors({});
    setMessage("");
    emailVerification.reset();
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(user);
    setErrors({});
    setMessage("");
    emailVerification.reset();
    setIsEditing(false);
  };

  const handleSave = async () => {
    const nextErrors: ProfileErrors = {};

    if (!draft.name.trim()) nextErrors.name = "이름을 입력해주세요.";
    if (!validateEmail(draft.email)) {
      nextErrors.email = EMAIL_FORMAT_ERROR;
    } else if (isEmailChanged && !emailVerification.isEmailVerified) {
      nextErrors.email = EMAIL_VERIFICATION_ERROR;
    }
    if (!validatePhoneNumber(draft.phoneNumber)) {
      nextErrors.phoneNumber = "010-XXXX-XXXX 형식으로 입력해주세요.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const success = await saveUser(draft);
    setMessage(success ? "개인 정보가 저장되었습니다." : "저장에 실패했습니다.");

    if (success) {
      emailVerification.reset();
      setIsEditing(false);
    }
  };

  return (
    <section>
      <h2 className="mb-8 text-base font-bold text-[#0F2854]">회원 정보</h2>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <LabeledInput label="이름" error={errors.name}>
            <Input
              value={isEditing ? draft.name : user.name}
              readOnly={!isEditing}
              className={!isEditing ? "bg-[#F7F8FA]" : "bg-white"}
              onChange={(event) => handleFieldChange("name", event.target.value)}
            />
          </LabeledInput>

          <LabeledInput label="학번">
            <Input value={user.studentNumber} readOnly className="bg-[#F7F8FA]" />
          </LabeledInput>
        </div>

        <LabeledInput label="ID">
          <Input value={user.userID} readOnly className="bg-[#F7F8FA]" />
        </LabeledInput>

        <div>
          <InputLabel>E-mail</InputLabel>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="email"
                value={isEditing ? draft.email : user.email}
                readOnly={!isEditing}
                className={!isEditing ? "bg-[#F7F8FA]" : "bg-white"}
                onChange={(event) => handleEmailChange(event.target.value)}
              />
            </div>
            {isEditing && (
              <Button
                type="button"
                variant="secondary"
                fullWidth={false}
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleSendCode}
              >
                인증
              </Button>
            )}
          </div>

          {isEditing && emailVerification.showCodeInput && (
            <div className="mt-2 flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="인증 코드 입력"
                  value={emailVerification.emailCode}
                  onChange={(event) =>
                    emailVerification.handleCodeChange(event.target.value)
                  }
                  className={emailVerification.isEmailVerified ? "pr-8" : ""}
                />
                {emailVerification.isEmailVerified && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-base text-green-500">
                    ✓
                  </span>
                )}
              </div>
              <Button
                type="button"
                variant="secondary"
                fullWidth={false}
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleVerifyCode}
              >
                확인
              </Button>
            </div>
          )}

          {emailVerification.emailCodeError && (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {emailVerification.emailCodeError}
            </p>
          )}
          {errors.email && (
            <p className="mt-1 text-xs text-red-500" role="alert">
              {errors.email}
            </p>
          )}
          {emailVerification.isEmailVerified && (
            <p className="mt-1 text-xs text-green-500">
              이메일 인증이 완료되었습니다.
            </p>
          )}
        </div>

        <LabeledInput label="Phone" error={errors.phoneNumber}>
          <Input
            value={isEditing ? draft.phoneNumber : user.phoneNumber}
            readOnly={!isEditing}
            className={!isEditing ? "bg-[#F7F8FA]" : "bg-white"}
            onChange={(event) =>
              handleFieldChange("phoneNumber", event.target.value)
            }
          />
        </LabeledInput>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-end gap-2">
        {message && (
          <p className="mr-auto text-xs text-gray-500" role="status">
            {message}
          </p>
        )}
        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            fullWidth={false}
            className="px-4 text-xs"
            onClick={cancelEditing}
          >
            취소
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          disabled={saving}
          className="px-4 text-xs"
          onClick={isEditing ? handleSave : startEditing}
        >
          {saving ? "저장 중..." : isEditing ? "저장" : "정보 수정"}
        </Button>
      </div>
    </section>
  );
}
