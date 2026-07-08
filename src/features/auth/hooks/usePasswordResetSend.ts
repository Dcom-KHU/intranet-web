import { useMutation } from "@tanstack/react-query";
import { passwordApi } from "../api/password.api";

// 비밀번호 찾기 임시 비밀번호 전송 요청 훅
export default function usePasswordResetSend() {
  return useMutation({
    mutationFn: passwordApi.sendTemporaryPassword,
  });
}