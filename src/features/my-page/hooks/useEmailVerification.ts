import { useState } from "react";

import {
  sendEmailCode,
  validateEmail,
  verifyEmailCode,
} from "../../auth/utils/auth.utils";

export default function useEmailVerification() {
  const [emailCode, setEmailCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [emailCodeError, setEmailCodeError] = useState("");

  const reset = () => {
    setEmailCode("");
    setIsEmailVerified(false);
    setShowCodeInput(false);
    setEmailCodeError("");
  };

  const handleEmailChange = () => {
    reset();
  };

  const handleCodeChange = (value: string) => {
    setEmailCode(value);
    setEmailCodeError("");
  };

  const sendCode = (email: string) => {
    if (!validateEmail(email)) return false;

    setEmailCode("");
    setEmailCodeError("");
    setIsEmailVerified(false);
    setShowCodeInput(true);
    sendEmailCode(email);
    return true;
  };

  const verifyCode = (email: string) => {
    const isValid = verifyEmailCode(email, emailCode);

    setIsEmailVerified(isValid);
    setEmailCodeError(isValid ? "" : "인증 코드가 일치하지 않습니다.");
    return isValid;
  };

  return {
    emailCode,
    isEmailVerified,
    showCodeInput,
    emailCodeError,
    handleEmailChange,
    handleCodeChange,
    sendCode,
    verifyCode,
    reset,
  };
}
