import { api } from "@/api/client";
import type { CheckLoginIdResponseDto } from "../dto/check-login-id.dto";
import type UserDto from "../dto/user.dto";
import { toLoginIdAvailability } from "../mapper/login-id.mapper";
import { type LoginRequest, type LoginResponse } from "../types/auth.type";

// 로그인 아이디 중복 확인
export const checkLoginId = async (loginId: string) => {
  const response = await api.get<CheckLoginIdResponseDto>(
    "/api/auth/check-login-id",
    { params: { loginId } },
  );

  console.log(response.data)
  return toLoginIdAvailability(response.data);
};

export const authApi = {
  checkLoginId,

  login: async (credentials: LoginRequest) => {
    const { data } = await api.post<LoginResponse>(
      "/api/auth/login", 
      credentials
    );

    console.log("Login response data:", data); 
    return data;
  },

  me: async () => {
    const { data: response } = await api.get<UserDto>(
      "/api/auth/me"
    );

    console.log("Me response data:", response);

    return response;
  },

  logout: async (refreshToken: string) => {

    const response = await api.post(
      "/api/auth/logout", 
      { refreshToken }
    );

    console.log("logout response:", response);
  },
};
