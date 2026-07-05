import { useState } from "react";
import {
  sendEmailCode,
  validateEmail,
  verifyEmailCode,
} from "../utils/auth.utils";

export default function useEmailVerification() {
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (value: string) => {
    setCode(value);
    setError("");
  };

  const sendCode = (email: string) => {
    if (!validateEmail(email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    sendEmailCode(email);
    setCode("");
    setIsVerified(false);
    setError("");
    return true;
  };

  const verifyCode = (email: string) => {
    const ok = verifyEmailCode(email, code);

    setIsVerified(ok);
    setError(ok ? "" : "인증 코드가 일치하지 않습니다.");

    return ok;
  };

  const reset = () => {
    setCode("");
    setIsVerified(false);
    setError("");
  };

  return {
    code,
    setCode: handleCodeChange,
    isVerified,
    error,
    sendCode,
    verifyCode,
    reset,
  };
}
