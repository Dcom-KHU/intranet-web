import { useEffect } from "react";

import { Button } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import type { User } from "../../auth/types/user.type";
import useProfileForm from "../hooks/useProfileForm";
import type { DirtyChangeHandler, SaveUser } from "../types/my.types";
import LabeledInput from "./LabeledInput";
import ProfileEmailField from "./ProfileEmailField";

interface ProfilePanelProps {
  user: User;
  saveUser: SaveUser;
  saving: boolean;
  onDirtyChange: DirtyChangeHandler;
}

export default function ProfilePanel({
  user,
  saveUser,
  saving,
  onDirtyChange,
}: ProfilePanelProps) {
  const form = useProfileForm(user, saveUser);

  useEffect(() => {
    onDirtyChange(form.isDirty);
  }, [form.isDirty, onDirtyChange]);

  useEffect(
    () => () => {
      onDirtyChange(false);
    },
    [onDirtyChange],
  );

  return (
    <section className="px-10 pt-10 pb-5">
      <h2 className="mb-8 text-base font-bold text-[#0F2854]">회원 정보</h2>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <LabeledInput label="이름" error={form.errors.name}>
            <Input
              value={form.isEditing ? form.draft.name : user.name}
              readOnly={!form.isEditing}
              className={!form.isEditing ? "bg-[#F7F8FA]" : "bg-white"}
              onChange={(event) =>
                form.handleFieldChange("name", event.target.value)
              }
            />
          </LabeledInput>

          <LabeledInput label="학번">
            <Input value={user.studentNumber} readOnly className="bg-[#F7F8FA]" />
          </LabeledInput>
        </div>

        <LabeledInput label="아이디">
          <Input value={user.userID} readOnly className="bg-[#F7F8FA]" />
        </LabeledInput>

        <ProfileEmailField
          email={form.isEditing ? form.draft.email : user.email}
          isEditing={form.isEditing}
          isCodeSent={form.isEmailCodeSent}
          isSendingCode={form.isEmailCodeSending}
          code={form.emailCode}
          isVerified={form.isEmailVerified}
          error={form.errors.email}
          verificationError={form.emailVerificationError}
          onEmailChange={form.handleEmailChange}
          onCodeChange={form.handleEmailCodeChange}
          onSendCode={form.handleSendEmailCode}
          onVerifyCode={form.handleVerifyEmailCode}
        />

        <LabeledInput label="전화번호" error={form.errors.phoneNumber}>
          <Input
            value={form.isEditing ? form.draft.phoneNumber : user.phoneNumber}
            readOnly={!form.isEditing}
            className={!form.isEditing ? "bg-[#F7F8FA]" : "bg-white"}
            onChange={(event) =>
              form.handleFieldChange("phoneNumber", event.target.value)
            }
          />
        </LabeledInput>
      </div>

      <div className="mt-12 flex justify-end gap-2">
        {form.message && (
          <p className="mr-auto text-xs text-gray-500" role="status">
            {form.message}
          </p>
        )}

        {form.isEditing && (
          <Button
            type="button"
            variant="secondary"
            className="px-4 text-xs"
            onClick={form.cancelEditing}
          >
            취소
          </Button>
        )}

        <Button
          type="button"
          variant="secondary"
          className="px-4 text-xs"
          onClick={form.isEditing ? form.handleSave : form.startEditing}
          disabled={saving}
        >
          {saving ? "저장 중..." : form.isEditing ? "저장" : "정보 수정"}
        </Button>
      </div>
    </section>
  );
}
