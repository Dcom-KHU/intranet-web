import { IoCheckmark } from "react-icons/io5";
import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import InputLabel from "../../../components/ui/InputLabel";

interface ProfileEmailFieldProps {
  email: string;
  isEditing: boolean;
  isCodeSent: boolean;
  isSendingCode?: boolean;
  code: string;
  isVerified: boolean;
  error?: string;
  verificationError?: string;
  onEmailChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onSendCode: () => void;
  onVerifyCode: () => void;
}

export default function ProfileEmailField({
  email,
  isEditing,
  isCodeSent,
  isSendingCode = false,
  code,
  isVerified,
  error,
  verificationError,
  onEmailChange,
  onCodeChange,
  onSendCode,
  onVerifyCode,
}: ProfileEmailFieldProps) {
  const displayedError = verificationError || error;

  return (
    <div>
      <InputLabel>이메일</InputLabel>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="email"
            value={email}
            readOnly={!isEditing}
            className={!isEditing ? "bg-[#F7F8FA]" : "bg-white"}
            onChange={(event) => onEmailChange(event.target.value)}
          />
        </div>

        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            className="w-16 text-xs disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onSendCode}
            disabled={isSendingCode}
          >
            {isSendingCode ? "발송중" : "인증"}
          </Button>
        )}
      </div>

      {isEditing && isCodeSent && (
        <div className="mt-2 flex gap-3">
          <div className="relative flex-1">
            <Input
              value={code}
              onChange={(event) => onCodeChange(event.target.value)}
              placeholder="인증 코드 입력"
            />
            {isVerified && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                <IoCheckmark />
              </span>
            )}
          </div>

          <Button
            type="button"
            variant="secondary"
            className="w-16 text-xs"
            onClick={onVerifyCode}
          >
            확인
          </Button>
        </div>
      )}

      {displayedError && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {displayedError}
        </p>
      )}
      
    </div>
  );
}
