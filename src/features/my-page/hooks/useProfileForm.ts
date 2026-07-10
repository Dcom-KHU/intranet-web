import axios from "axios";
import { useState } from "react";

import type { User } from "../../auth/types/user.type";
import {
  validateEmail,
  validatePhoneNumber,
} from "../../auth/utils/auth.utils";
import {
  sendEmailChangeVerification,
  verifyEmailChangeVerification,
} from "../api/my-profile.api";
import type { SaveUser } from "../types/my.types";

type ProfileField = "name" | "email" | "phoneNumber";
type ProfileErrors = Partial<Record<ProfileField, string>>;

const EMAIL_FORMAT_ERROR = "올바른 이메일 형식이 아닙니다.";
const EMAIL_VERIFICATION_ERROR = "이메일 인증을 완료해주세요.";
const EMAIL_SEND_ERROR =
  "인증 메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.";
const EMAIL_VERIFY_ERROR = "인증 코드가 일치하지 않습니다.";
const EMAIL_DUPLICATE_ERROR =
  "이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.";
const PHONE_FORMAT_ERROR = "010-XXXX-XXXX 형식으로 입력해주세요.";

export default function useProfileForm(user: User, saveUser: SaveUser) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<User>(() => ({ ...user }));
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [message, setMessage] = useState("");
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false);
  const [isEmailCodeSending, setIsEmailCodeSending] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailVerificationError, setEmailVerificationError] = useState("");
  const [emailChangeToken, setEmailChangeToken] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const isEmailChanged = draft.email !== user.email;
  const isDirty =
    draft.name !== user.name ||
    draft.email !== user.email ||
    draft.phoneNumber !== user.phoneNumber;

  const clearFieldError = (field: ProfileField) => {
    setErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const resetEmailVerification = () => {
    setEmailCode("");
    setIsEmailVerified(false);
    setEmailVerificationError("");
    setEmailChangeToken("");
    setVerifiedEmail("");
  };

  const resetFormState = () => {
    setErrors({});
    setMessage("");
    setIsEmailCodeSent(false);
    setIsEmailCodeSending(false);
    resetEmailVerification();
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
    setIsEmailCodeSent(false);
    resetEmailVerification();

    setErrors((previous) => {
      if (!previous.email) return previous;

      const next = { ...previous };
      if (!validateEmail(value)) next.email = EMAIL_FORMAT_ERROR;
      else if (value !== user.email) next.email = EMAIL_VERIFICATION_ERROR;
      else delete next.email;
      return next;
    });
  };

  const handleEmailCodeChange = (value: string) => {
    setEmailCode(value);
    setEmailVerificationError("");
    setIsEmailVerified(false);
    setEmailChangeToken("");
    setVerifiedEmail("");
  };

  const handleSendEmailCode = async () => {
    if (!validateEmail(draft.email)) {
      setErrors((previous) => ({
        ...previous,
        email: EMAIL_FORMAT_ERROR,
      }));
      return;
    }

    try {
      setIsEmailCodeSending(true);
      resetEmailVerification();

      await sendEmailChangeVerification(draft.email);

      setIsEmailCodeSent(true);
      setMessage("인증 메일을 발송했습니다.");

      if (isEmailChanged) {
        setErrors((previous) => ({
          ...previous,
          email: EMAIL_VERIFICATION_ERROR,
        }));
      } else {
        clearFieldError("email");
      }
    } catch (error) {
      setErrors((previous) => ({
        ...previous,
        email:
          axios.isAxiosError(error) && error.response?.status === 409
            ? EMAIL_DUPLICATE_ERROR
            : EMAIL_SEND_ERROR,
      }));
    } finally {
      setIsEmailCodeSending(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!emailCode.trim()) {
      setEmailVerificationError("인증 코드를 입력해주세요.");
      return;
    }

    try {
      const data = await verifyEmailChangeVerification(draft.email, emailCode);

      setIsEmailVerified(true);
      setEmailVerificationError("");
      setEmailChangeToken(data.emailChangeToken);
      setVerifiedEmail(data.verifiedEmail);
      clearFieldError("email");
      setMessage(data.message);
    } catch {
      setIsEmailVerified(false);
      setEmailChangeToken("");
      setVerifiedEmail("");
      setEmailVerificationError(EMAIL_VERIFY_ERROR);
    }
  };

  const startEditing = () => {
    setDraft({ ...user });
    resetFormState();
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft({ ...user });
    resetFormState();
    setIsEditing(false);
  };

  const handleSave = async () => {
    const nextErrors: ProfileErrors = {};

    if (!draft.name.trim()) nextErrors.name = "이름을 입력해주세요.";
    if (!validateEmail(draft.email)) {
      nextErrors.email = EMAIL_FORMAT_ERROR;
    } else if (isEmailChanged && !isEmailVerified) {
      nextErrors.email = EMAIL_VERIFICATION_ERROR;
    }
    if (!validatePhoneNumber(draft.phoneNumber)) {
      nextErrors.phoneNumber = PHONE_FORMAT_ERROR;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const success = await saveUser(draft);
    setMessage(
      success ? "개인 정보가 저장되었습니다." : "저장에 실패했습니다.",
    );

    if (success) {
      setIsEditing(false);
      setIsEmailCodeSent(false);
      resetEmailVerification();
    }
  };

  return {
    isEditing,
    isDirty,
    draft,
    errors,
    message,
    isEmailCodeSent,
    isEmailCodeSending,
    emailCode,
    emailChangeToken,
    verifiedEmail,
    isEmailVerified,
    emailVerificationError,
    handleFieldChange,
    handleEmailChange,
    handleEmailCodeChange,
    handleSendEmailCode,
    handleVerifyEmailCode,
    startEditing,
    cancelEditing,
    handleSave,
  };
}
