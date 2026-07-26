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

export interface LoginIdAvailability {
  isAvailable: boolean;
  message: string;
}
