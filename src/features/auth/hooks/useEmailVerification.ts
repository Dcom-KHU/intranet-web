import { useEffect, useRef, useState } from "react";

import { sendEmailVerificationCode } from "../api/auth.api";
import {
  validateEmail,
  verifyEmailCode,
} from "../utils/auth.utils";

export default function useEmailVerification() {
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [sendError, setSendError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const requestVersionRef = useRef(0);

  useEffect(() => {
    if (expiresAt === null) return;

    const updateRemainingTime = () => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        setExpiresAt(null);
        setIsVerified(false);
        setError("인증코드 유효시간이 만료되었습니다.");
      }
    };

    updateRemainingTime();
    const timerId = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(timerId);
  }, [expiresAt]);

  const handleCodeChange = (value: string) => {
    setCode(value);
    setError("");
  };

  const sendCode = async (email: string) => {
    if (!validateEmail(email)) {
      setSendError("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    setIsSending(true);
    setSendError("");
    const requestVersion = ++requestVersionRef.current;

    try {
      const delivery = await sendEmailVerificationCode(email);
      if (requestVersion !== requestVersionRef.current) return false;

      setCode("");
      setIsVerified(false);
      setError("");
      setExpiresAt(Date.now() + delivery.expiresInSeconds * 1000);
      setRemainingSeconds(delivery.expiresInSeconds);
      return true;
    } catch {
      setSendError("인증코드 발송에 실패했습니다. 다시 시도해 주세요.");
      return false;
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = (email: string) => {
    const ok = verifyEmailCode(email, code);

    setIsVerified(ok);
    setError(ok ? "" : "인증 코드가 일치하지 않습니다.");

    return ok;
  };

  const reset = () => {
    requestVersionRef.current += 1;
    setCode("");
    setIsVerified(false);
    setError("");
    setSendError("");
    setExpiresAt(null);
    setRemainingSeconds(0);
  };

  return {
    code,
    setCode: handleCodeChange,
    isVerified,
    error,
    sendError,
    isSending,
    remainingSeconds,
    hasActiveCode: remainingSeconds > 0,
    sendCode,
    verifyCode,
    reset,
  };
}
