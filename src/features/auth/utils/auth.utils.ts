import type { User } from "../types/user.type";
import { mockUsers } from "../../../mocks/user-data.mock";
import type { AuthUser } from "../types/auth-user.type";

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "token";
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
      reason: "invalidCredentials" | "pendingApproval" | "rejected";
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

const toPasswordResetStatus = (
  reset: PasswordResetRequest
): PasswordResetStatus => ({
  email: reset.email,
  sentAt: reset.sentAt,
  expiresAt: reset.expiresAt,
});

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

// -----------------------------
//   password 제거 helper
// -----------------------------
const excludePassword = (
  user: User
): AuthUser => {
  const { password, ...safeUser } = user;
  return safeUser;
};

// -----------------------------
//   이메일 인증 (MOCK)
// -----------------------------

// 인증 코드 발송 (실제 API 대신 localStorage)
export const sendEmailCode = (email: string) => {
  const code = String(
    Math.floor(100000 + Math.random() * 900000)
  );

  localStorage.setItem(
    EMAIL_CODE_KEY,
    JSON.stringify({
      email,
      code,
      createdAt: Date.now(),
    })
  );

  console.log("📩 인증 코드 (mock):", code);

  return code;
};

// 인증 코드 확인
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

export const requestTemporaryPassword = (
  email: string
): PasswordResetRequestResult => {
  const users: User[] = [
    ...mockUsers,
    ...JSON.parse(localStorage.getItem("users") || "[]"),
  ];
  const user = users.find((candidate) => candidate.email === email);

  if (!user) return { status: "userNotFound" };

  const existingRequest = getPasswordResetRequest();
  const now = Date.now();

  if (
    existingRequest?.email === email &&
    now - existingRequest.sentAt < PASSWORD_RESET_RESEND_COOLDOWN_MS
  ) {
    return {
      status: "resendTooSoon",
      reset: toPasswordResetStatus(existingRequest),
    };
  }

  const temporaryPassword = `Temp${Math.floor(
    100000 + Math.random() * 900000
  )}`;
  const reset: PasswordResetRequest = {
    email,
    userID: user.userID,
    temporaryPassword,
    sentAt: now,
    expiresAt: now + PASSWORD_RESET_TTL_MS,
  };

  localStorage.setItem(PASSWORD_RESET_KEY, JSON.stringify(reset));
  console.log("Temporary password (mock):", temporaryPassword);

  return { status: "sent", reset: toPasswordResetStatus(reset) };
};

export const isPasswordResetRequired = () =>
  !!localStorage.getItem(PASSWORD_RESET_REQUIRED_KEY);

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
    !validateEmail((user as any).email)
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
export const login = (
  userID: string,
  pw: string
): LoginResult => {
  const localUsers: User[] = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const users = [...mockUsers, ...localUsers];

  const user = users.find((u) => u.userID === userID);
  const resetRequest = getPasswordResetRequest();
  const isTemporaryPassword =
    !!resetRequest &&
    resetRequest.userID === userID &&
    resetRequest.temporaryPassword === pw;

  if (!user || (user.password !== pw && !isTemporaryPassword)) {
    return { success: false, reason: "invalidCredentials" };
  }

  if (user.approvalStatus === "PENDING") {
    return { success: false, reason: "pendingApproval" };
  }

  if (user.approvalStatus === "REJECTED") {
    return { success: false, reason: "rejected" };
  }

  localStorage.setItem(
    TOKEN_STORAGE_KEY,
    "mock-token"
  );

  saveUser(excludePassword(user));

  if (isTemporaryPassword) {
    localStorage.setItem(PASSWORD_RESET_REQUIRED_KEY, userID);
  } else {
    localStorage.removeItem(PASSWORD_RESET_REQUIRED_KEY);
  }

  return { success: true };
};

// -----------------------------
//   로그인 상태
// -----------------------------
export const isLoggedIn = () => {
  return !!localStorage.getItem(
    TOKEN_STORAGE_KEY
  );
};

// -----------------------------
//   현재 유저
// -----------------------------
export const getCurrentUser =
  (): AuthUser | null => {
    const savedUser =
      localStorage.getItem(USER_STORAGE_KEY);

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem(
        USER_STORAGE_KEY
      );
      return null;
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

// -----------------------------
//   내부 저장 함수
// -----------------------------
const saveUser = (user: AuthUser) => {
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(user)
  );
};
