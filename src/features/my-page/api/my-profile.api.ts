import { api } from "@/api/client";

type SendEmailVerificationRequest = {
  newEmail: string;
};

export const sendEmailChangeVerification = async (newEmail: string) => {
  await api.post("/api/users/me/email/verification/send", {
    newEmail,
  } satisfies SendEmailVerificationRequest);
};
