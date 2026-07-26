import type { SendEmailCodeResponseDto } from "../dto/send-email-code.dto";
import type { EmailCodeDelivery } from "../types/email-code-delivery.type";

export const toEmailCodeDelivery = (
  dto: SendEmailCodeResponseDto,
): EmailCodeDelivery => ({
  message: dto.message,
  expiresInSeconds: dto.expiresIn,
});
