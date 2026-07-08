import { api } from "@/api/client";

// 비밀번호 찾기 이메일 전송 요청(임시 비밀번호)
export interface PasswordResetSendRequest {
  email: string;
}

export interface PasswordResetSendResponse {
  message?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export const passwordApi = {
  sendTemporaryPassword: async (
    request: PasswordResetSendRequest
  ) => {
    console.log("sendTemporaryPassword request:", request);

    const { data } = await api.post<PasswordResetSendResponse>(
      "/api/auth/password/reset/send",
      request
    );

    return data;
  },

  changePassword: async (request: ChangePasswordRequest) => {
    const { data } = await api.patch(
      "/api/users/me/password",
      request,
    );

    return data;
  },

  resetPassword: async (request: ResetPasswordRequest) => {
    const { data } = await api.post(
      "/api/auth/password",
      request,
    );

    return data;
  },
};
