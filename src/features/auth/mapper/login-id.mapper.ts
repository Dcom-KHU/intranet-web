import type { CheckLoginIdResponseDto } from "../dto/check-login-id.dto";
import type { LoginIdAvailability } from "../types/auth.type";

export const toLoginIdAvailability = (
  dto: CheckLoginIdResponseDto,
): LoginIdAvailability => ({
  isAvailable: dto.isAvailable,
  message: dto.message,
});
