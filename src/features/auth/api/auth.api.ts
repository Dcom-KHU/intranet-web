import { api } from "@/api/client";
import type { CheckLoginIdResponseDto } from "../dto/check-login-id.dto";
import type {
  SendEmailCodeRequestDto,
  SendEmailCodeResponseDto,
} from "../dto/send-email-code.dto";
import type { SignupRequestDto } from "../dto/signup.dto";
import type {
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
} from "../dto/refresh-token.dto";
import type {
  VerifyEmailCodeRequestDto,
  VerifyEmailCodeResponseDto,
} from "../dto/verify-email-code.dto";
import type UserDto from "../dto/user.dto";
import { toEmailCodeDelivery } from "../mapper/email-code.mapper";
import { toEmailVerification } from "../mapper/email-verification.mapper";
import { toLoginIdAvailability } from "../mapper/login-id.mapper";
import { toSignupRequestDto } from "../mapper/signup.mapper";
import { toTokenRefresh } from "../mapper/token-refresh.mapper";
import type { SignupInput } from "../types/signup.type";
import { type LoginRequest, type LoginResponse } from "../types/auth.type";

// 로그인 아이디 중복 확인
export const checkLoginId = async (loginId: string) => {
  const response = await api.get<CheckLoginIdResponseDto>(
    "/api/auth/check-login-id",
    { params: { loginId } },
  );

  const payload = response.data;
  const result = "data" in payload ? payload.data : payload;
  const isAvailable =
    "isAvailable" in result ? result.isAvailable : result.available;

  if (typeof isAvailable !== "boolean") {
    throw new Error("Invalid check-login-id response");
  }

  const dto = {
    isAvailable,
    message:
      ("message" in result ? result.message : undefined) ?? payload.message,
  };

  return toLoginIdAvailability(dto);
};

export const sendEmailVerificationCode = async (email: string) => {
  const request: SendEmailCodeRequestDto = { email };
  const response = await api.post<SendEmailCodeResponseDto>(
    "/api/auth/email/send",
    request,
  );

  return toEmailCodeDelivery(response.data);
};

export const verifyEmailVerificationCode = async (
  email: string,
  verificationCode: string,
) => {
  const request: VerifyEmailCodeRequestDto = { email, verificationCode };
  const response = await api.post<VerifyEmailCodeResponseDto>(
    "/api/auth/email/verify",
    request,
  );

  return toEmailVerification(response.data);
};

export const signup = async (input: SignupInput) => {
  const request: SignupRequestDto = toSignupRequestDto(input);
  await api.post("/api/auth/signup", request);
};

export const refreshTokens = async (refreshToken: string) => {
  const request: RefreshTokenRequestDto = { refreshToken };
  const response = await api.post<RefreshTokenResponseDto>(
    "/api/auth/refresh",
    request,
  );

  return toTokenRefresh(response.data);
};

export const authApi = {
  checkLoginId,
  sendEmailVerificationCode,
  verifyEmailVerificationCode,
  signup,
  refreshTokens,

  login: async (credentials: LoginRequest) => {
    const { data } = await api.post<LoginResponse>(
      "/api/auth/login", 
      credentials
    );

    return data;
  },

  me: async () => {
    const { data: response } = await api.get<UserDto>(
      "/api/auth/me"
    );

    return response;
  },

  logout: async (refreshToken: string) => {

    const response = await api.post(
      "/api/auth/logout", 
      { refreshToken }
    );

    return response.data;
  },
};
