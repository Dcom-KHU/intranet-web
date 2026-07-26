import type { CheckLoginIdResultDto } from "../dto/check-login-id.dto";
import type { LoginIdAvailability } from "../types/auth.type";

export const toLoginIdAvailability = (
  dto: CheckLoginIdResultDto,
): LoginIdAvailability => ({
  isAvailable: dto.isAvailable,
  message: dto.message,
});
