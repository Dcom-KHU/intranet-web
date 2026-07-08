import axios from "axios";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import InputLabel from "../../components/ui/InputLabel";
import Modal from "../../components/ui/Modal";
import usePasswordResetSend from "../../features/auth/hooks/usePasswordResetSend";
import { validateEmail } from "../../features/auth/utils/auth.utils";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();
  const passwordReset = usePasswordResetSend();

  const requestPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!validateEmail(normalizedEmail)) {
      setError("올바른 이메일 형식을 입력해 주세요.");
      return;
    }

    try {
      await passwordReset.mutateAsync({ email: normalizedEmail });
      setError("");
      setIsSuccessModalOpen(true);
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        const message = requestError.response?.data?.message;

        if (typeof message === "string" && message.length > 0) {
          setError(message);
          return;
        }

        if ([400, 404].includes(requestError.response?.status ?? 0)) {
          setError("가입된 이메일을 찾을 수 없습니다.");
          return;
        }
      }

      setError("임시 비밀번호 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8">
        <h1 className="mb-3 text-center text-2xl font-bold text-gray-900">
          비밀번호 찾기
        </h1>
        <p className="mb-8 text-center text-sm leading-6 text-gray-500">
          가입한 이메일로 일정 시간 동안 사용할 수 있는 임시 비밀번호를 보내드립니다.
        </p>

        <form onSubmit={requestPassword}>
          <div className="mb-4">
            <InputLabel htmlFor="reset-email">이메일</InputLabel>
            <Input
              id="reset-email"
              type="email"
              placeholder="가입한 이메일을 입력해 주세요"
              value={email}
              disabled={passwordReset.isPending}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
            {error && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>

          <Button
            variant="secondary"
            type="submit"
            className="w-full"
            disabled={passwordReset.isPending}
          >
            {passwordReset.isPending ? "전송 중..." : "임시 비밀번호 전송"}
          </Button>
        </form>

        <button
          type="button"
          className="mx-auto mt-8 block text-xs font-medium text-blue-600 underline underline-offset-2"
          onClick={() => navigate("/")}
        >
          로그인 화면으로 돌아가기
        </button>
      </div>

      {isSuccessModalOpen && (
        <Modal
          isOpen
          badge="비밀번호 찾기"
          title="임시 비밀번호를 전송했습니다."
          description="이메일에서 임시 비밀번호를 확인한 뒤 로그인해 주세요. 로그인 후 비밀번호를 변경해야 합니다."
          actionLabel="로그인하러 가기"
          onAction={() => navigate("/")}
          labelledById="password-reset-modal-title"
        />
      )}
    </div>
  );
}
