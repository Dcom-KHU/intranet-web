import axios from "axios";
import { api } from "@/api/client";
import { type User } from "../types/user.type";
import { mockUsers } from "../../../mocks/user-data.mock";
import { type AuthUser } from "../types/auth-user.type";

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "access_token";
const EMAIL_CODE_KEY = "email_code";
const PASSWORD_RESET_KEY = "password_reset";
const PASSWORD_RESET_REQUIRED_KEY = "password_reset_required";

export const PASSWORD_RESET_RESEND_COOLDOWN_MS = 60 * 1000;
export const PASSWORD_RESET_TTL_MS = 10 * 60 * 1000;

type PasswordResetRequest = {
  email: string;
  userID: string;
  temporaryPassword: string;
  sentAt: number;
  expiresAt: number;
};

export type PasswordResetStatus = Pick<
  PasswordResetRequest,
  "email" | "sentAt" | "expiresAt"
>;

export type PasswordResetRequestResult =
  | { status: "sent"; reset: PasswordResetStatus }
  | { status: "userNotFound" }
  | { status: "resendTooSoon"; reset: PasswordResetStatus };

export type LoginResult =
  | { success: true }
  | {
      success: false;
      reason: "invalidCredentials" | "pendingApproval" | "rejected" | "networkError";
    };

const getPasswordResetRequest = (): PasswordResetRequest | null => {
  const saved = localStorage.getItem(PASSWORD_RESET_KEY);

  if (!saved) return null;

  try {
    const reset = JSON.parse(saved) as PasswordResetRequest;

    if (Date.now() > reset.expiresAt) {
      localStorage.removeItem(PASSWORD_RESET_KEY);
      return null;
    }

    return reset;
  } catch {
    localStorage.removeItem(PASSWORD_RESET_KEY);
    return null;
  }
};

// -----------------------------
//   Validation Utils (EXPORT)
// -----------------------------

// userID 유효성 검사
export const validateId = (userID: string) => {
  return userID.length >= 4 && userID.length <= 20;
};

// userID 중복성 검사


// 비밀번호 유효성 검사 (영문 + 숫자 + 8자 이상)
export const validatePassword = (pw: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(pw);
};

// 비밀번호 확인 일치 여부
export const validatePasswordMatch = (
  pw: string,
  confirmPw: string
) => {
  return pw === confirmPw;
};

// 이메일 형식 검사
export const validateEmail = (email: string) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  return /^010-\d{4}-\d{4}$/.test(phoneNumber);
};

// -----------------------------
//   ID 중복 체크 (EXPORT)
// -----------------------------
export const isDuplicateUserId = (
  userID: string
) => {
  const localUsers: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const allUsers = [...mockUsers, ...localUsers];

  return allUsers.some(
    (u) => u.userID === userID
  );
};



// 인증 코드 확인
// TODO: 회원가입 이메일 인증 API 연동 시 제거합니다.
export const sendEmailCode = (email: string) => {
  const code = String(Math.floor(100000 + Math.random() * 900000));

  localStorage.setItem(
    EMAIL_CODE_KEY,
    JSON.stringify({
      email,
      code,
      createdAt: Date.now(),
    }),
  );

  console.info("Email verification code (mock):", code);
  return code;
};

export const verifyEmailCode = (
  email: string,
  inputCode: string
) => {
  const saved = localStorage.getItem(
    EMAIL_CODE_KEY
  );

  if (!saved) return false;

  const data = JSON.parse(saved);

  const isValid =
    data.email === email &&
    data.code === inputCode;

  if (isValid) {
    localStorage.removeItem(EMAIL_CODE_KEY);
  }

  return isValid;
};

export const verifyCurrentPassword = (userID: string, password: string) => {
  const localUsers: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );
  const user = [...mockUsers, ...localUsers].find(
    (candidate) => candidate.userID === userID
  );
  const resetRequest = getPasswordResetRequest();

  return (
    user?.password === password ||
    (!!resetRequest &&
      resetRequest.userID === userID &&
      resetRequest.temporaryPassword === password)
  );
};

export const completePasswordReset = () => {
  localStorage.removeItem(PASSWORD_RESET_KEY);
  localStorage.removeItem(PASSWORD_RESET_REQUIRED_KEY);
};

// -----------------------------
//   회원가입
// -----------------------------
export const register = (user: User) => {
  const users: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const isExist =
    isDuplicateUserId(user.userID);

  if (isExist) return false;

  if (
    !validateId(user.userID) ||
    !validatePassword(user.password) ||
    !validateEmail(user.email)
  ) {
    return false;
  }

  users.push(user);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  return true;
};

// -----------------------------
//   로그인
// -----------------------------
export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}


export const login = async (
  loginId: string,
  password: string
): Promise<LoginResult> => {
  try {
    const { data } = await api.post<LoginResponse>(
      "/api/auth/login", 
      {
        loginId,
        password,
      } satisfies LoginRequest);

    localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
    console.log("로그인 성공", data);
    
    return {
      success: true,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        reason: "invalidCredentials",
      };
    }

      return {
        success: false,
        reason: "networkError",
      };
  }
};




// -----------------------------
//   로그아웃
// -----------------------------
export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  window.location.href = "/";
};

// TODO: 마이페이지를 React Query로 옮길 때 제거할 임시 호환 함수입니다.
export const getCurrentUser = (): AuthUser | null => {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};
