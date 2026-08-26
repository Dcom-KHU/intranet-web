import axios from 'axios';
import { getAccessToken } from '@/features/auth/utils/auth-storage';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL is not defined');
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  const isPublicAuthRequest = [
    '/api/auth/login',
    '/api/auth/check-login-id',
    '/api/auth/email/send',
    '/api/auth/email/verify',
    '/api/auth/signup',
    '/api/auth/refresh',
    '/api/auth/password/reset/send',
  ].some((path) => config.url?.endsWith(path));

  if (token && !isPublicAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});
