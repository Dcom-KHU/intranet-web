import { api } from "@/api/client";
import type UserDto from "../dto/user.dto";

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  role: string;
  status: string;
  requirePasswordChange: boolean;
}

export interface LogoutRequest {
  refreshToken: string;
}

export const authApi = {
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
