import type { InternalAxiosRequestConfig } from "axios";

import { api } from "@/api/client";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "../constants/auth.constants";
import type { TokenRefresh } from "../types/token-refresh.type";
import { refreshTokens } from "./auth.api";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<TokenRefresh> | null = null;
let interceptorId: number | null = null;

const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const redirectToSessionExpired = () => {
  clearTokens();

  if (window.location.pathname !== "/session-expired") {
    window.location.replace("/session-expired");
  }
};

export const setupAuthResponseInterceptor = () => {
  if (interceptorId !== null) return;

  interceptorId = api.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (
        typeof error !== "object" ||
        error === null ||
        !("config" in error) ||
        !("response" in error)
      ) {
        return Promise.reject(error);
      }

      const axiosError = error as {
        config?: RetryableRequestConfig;
        response?: { status?: number };
      };
      const originalRequest = axiosError.config;
      const hadAccessToken = Boolean(
        originalRequest?.headers?.Authorization,
      );

      if (
        axiosError.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        !hadAccessToken ||
        originalRequest.url?.endsWith("/api/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        redirectToSessionExpired();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        refreshPromise ??= refreshTokens(refreshToken);
        const tokens = await refreshPromise;

        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        redirectToSessionExpired();
        return Promise.reject(refreshError);
      } finally {
        refreshPromise = null;
      }
    },
  );
};
