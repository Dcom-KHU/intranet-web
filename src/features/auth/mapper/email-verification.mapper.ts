import type { VerifyEmailCodeResponseDto } from "../dto/verify-email-code.dto";
import type { EmailVerification } from "../types/email-verification.type";

export const toEmailVerification = (
  dto: VerifyEmailCodeResponseDto,
): EmailVerification => ({
  message: dto.message,
  email: dto.email,
});
