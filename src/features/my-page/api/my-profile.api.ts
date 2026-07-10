import { api } from "@/api/client";

type ApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

type SendEmailVerificationRequest = {
  newEmail: string;
};

type VerifyEmailVerificationRequest = {
  newEmail: string;
  verificationCode: string;
};

export type UpdateMySettingsRequest = {
  name: string;
  phoneNumber: string;
  emailChangeToken?: string;
};

export type UpdateMySettingsResponse = {
  name: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export type VerifyEmailVerificationResponse = {
  emailChangeToken: string;
  message: string;
  verifiedEmail: string;
};

export const sendEmailChangeVerification = async (newEmail: string) => {
  await api.post("/api/users/me/email/verification/send", {
    newEmail,
  } satisfies SendEmailVerificationRequest);
};

export const verifyEmailChangeVerification = async (
  newEmail: string,
  verificationCode: string,
) => {
  const response = await api.post<
    ApiResponse<VerifyEmailVerificationResponse>
  >("/api/users/me/email/verification/verify", {
    newEmail,
    verificationCode,
  } satisfies VerifyEmailVerificationRequest);

  return response.data.data;
};

export const updateMySettings = async (request: UpdateMySettingsRequest) => {
  const response = await api.patch<ApiResponse<UpdateMySettingsResponse>>(
    "/api/users/me/settings",
    request,
  );

  return response.data.data;
};
