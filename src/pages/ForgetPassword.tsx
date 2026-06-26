import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputLabel from "../components/ui/InputLabel";
import Modal from "../components/ui/Modal";
import {
  PASSWORD_RESET_RESEND_COOLDOWN_MS,
  requestTemporaryPassword,
  validateEmail,
  type PasswordResetStatus,
} from "../features/auth/utils/auth.utils";

const formatRemainingTime = (milliseconds: number) => {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resetStatus, setResetStatus] = useState<PasswordResetStatus | null>(
    null
  );
  const [now, setNow] = useState(Date.now());
  const [modalMessage, setModalMessage] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!resetStatus) return;

    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [resetStatus]);

  const resendAvailableIn = resetStatus
    ? Math.max(
        0,
        resetStatus.sentAt + PASSWORD_RESET_RESEND_COOLDOWN_MS - now
      )
    : 0;
  const expiresIn = resetStatus
    ? Math.max(0, resetStatus.expiresAt - now)
    : 0;

  const requestPassword = () => {
    if (!validateEmail(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    const result = requestTemporaryPassword(email);

    // 이미 가입된 이메일인지 확인
    if (result.status === "userNotFound") {
      setError("가입된 이메일을 찾을 수 없습니다.");
      return;
    }

    if (result.status === "resendTooSoon") {
      setResetStatus(result.reset);
      setModalMessage({
        title: "잠시 후 다시 시도해주세요.",
        description: "임시 비밀번호는 60초마다 재전송할 수 있습니다.",
      });
      return;
    }

    setError("");
    setResetStatus(result.reset);
    setModalMessage({
      title: "임시 비밀번호를 전송했습니다.",
      description:
        "임시 비밀번호는 10분 동안 사용할 수 있습니다. 현재 mock 환경에서는 브라우저 콘솔에서 확인해주세요.",
    });
  };

  const resendPassword = () => {
    if (resendAvailableIn > 0) return;

    requestPassword();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8">
        <h1 className="mb-3 text-center text-2xl font-bold text-gray-900">
          비밀번호 찾기
        </h1>
        <p className="mb-8 text-center text-sm leading-6 text-gray-500">
          가입한 이메일로 임시 비밀번호를 전송합니다.
        </p>

        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            requestPassword();
          }}
        >
          <div className="mb-4">
            <InputLabel htmlFor="reset-email">이메일</InputLabel>
            <Input
              id="reset-email"
              type="email"
              placeholder="가입한 이메일을 입력해주세요"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <Button variant="secondary" type="submit" className="w-full">임시 비밀번호 전송</Button>
        </form>

        {resetStatus && (
          <div className="mt-6 border-t border-gray-100 pt-5 text-center text-xs text-gray-500">
            <p>임시 비밀번호 유효 시간: {formatRemainingTime(expiresIn)}</p>
            <button
              type="button"
              className="mt-3 font-medium text-blue-600 disabled:text-gray-400"
              disabled={resendAvailableIn > 0}
              onClick={resendPassword}
            >
              {resendAvailableIn > 0
                ? `재전송 가능까지 ${formatRemainingTime(resendAvailableIn)}`
                : "임시 비밀번호 재전송"}
            </button>
          </div>
        )}

        <button
          type="button"
          className="mx-auto mt-8 block text-xs font-medium text-blue-600 underline underline-offset-2"
          onClick={() => navigate("/")}
        >
          로그인 화면으로 돌아가기
        </button>
      </div>

      {modalMessage && (
        <Modal
          isOpen
          badge="비밀번호 찾기"
          title={modalMessage.title}
          description={modalMessage.description}
          actionLabel="확인"
          onAction={() => setModalMessage(null)}
          labelledById="password-reset-modal-title"
        />
      )}
    </div>
  );
}
