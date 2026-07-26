import type { RefreshTokenResponseDto } from "../dto/refresh-token.dto";
import type { TokenRefresh } from "../types/token-refresh.type";

export const toTokenRefresh = (
  dto: RefreshTokenResponseDto,
): TokenRefresh => ({
  accessToken: dto.accessToken,
  refreshToken: dto.refreshToken,
  expiresInSeconds: dto.expiresIn,
});
