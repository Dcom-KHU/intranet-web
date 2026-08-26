import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SAVED_LOGIN_ID_KEY,
} from "../constants/auth.constants";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const removeTokens = (storage: Storage) => {
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
};

const getToken = (key: string) => {
  // Remove tokens left by the previous persistent-login implementation.
  removeTokens(localStorage);
  localStorage.removeItem("auto_login");
  return sessionStorage.getItem(key);
};

export const getAccessToken = () => getToken(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => getToken(REFRESH_TOKEN_KEY);

export const clearAuthTokens = () => {
  removeTokens(localStorage);
  removeTokens(sessionStorage);
};

export const clearAuthSession = () => {
  clearAuthTokens();
  localStorage.removeItem("auto_login");
};

export const storeAuthTokens = (tokens: AuthTokens) => {
  clearAuthTokens();
  sessionStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

export const storeRefreshedTokens = (tokens: AuthTokens) => {
  storeAuthTokens(tokens);
};

export const getSavedLoginId = () =>
  localStorage.getItem(SAVED_LOGIN_ID_KEY) ?? "";

export const setSavedLoginId = (loginId: string | null) => {
  if (loginId) {
    localStorage.setItem(SAVED_LOGIN_ID_KEY, loginId);
    return;
  }

  localStorage.removeItem(SAVED_LOGIN_ID_KEY);
};
