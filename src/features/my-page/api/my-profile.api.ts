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
