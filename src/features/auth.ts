export interface User {
  id: string;
  pw: string;
  studentNumber?: string;
}

export interface CurrentUser {
  username: string;
  isAdmin: boolean;
  studentNumber?: string;
}

const USER_STORAGE_KEY = "user";

// 아이디 유효성 검사 
const validateId = (id: string) => {
  return id.length >= 4 && id.length <= 20;
}

// 비밀번호 유효성 검사
const validatePassword = (pw: string) => {
  // 최소 8자 + 영문 + 숫자 포함
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(pw);
}

// 회원가입 함수 - 실제로는 서버 API 호출이 필요하지만, 여기서는 간단히 처리
export const register = (user: User) => {
  // 실제로는 서버 API 호출이 필요하지만, 여기서는 간단히 처리
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  // 중복 아이디 확인
  if (users.find((u) => u.id === user.id)) {
    return false; 
  }

  // 아이디와 비밀번호 유효성 검사
  if (!validateId(user.id) || !validatePassword(user.pw)) {
    return false;
  }

  // 새로운 사용자 추가
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

const saveUser = (user: CurrentUser) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

// 로그인 함수 - 실제로는 서버 API 호출이 필요하지만, 여기서는 간단히 처리
export const login = (id: string, pw: string) => {
  if (id === "admin" && pw === "1234") {
    localStorage.setItem("token", "mock-token-admin123456");
    saveUser({ username: id, isAdmin: true });
    return true;
  }

  if ((id === "user" || id === "1") && (pw === "1234" || pw === "1")) {
    localStorage.setItem("token", "mock-token-user123456");
    saveUser({ username: id, isAdmin: false });
    return true;
  }

  return false;
};


export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};


export const getCurrentUser = (): CurrentUser | null => {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (savedUser) {
    try {
      return JSON.parse(savedUser) as CurrentUser;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  const token = localStorage.getItem("token");

  if (token?.includes("admin")) {
    return { username: "admin", isAdmin: true, studentNumber: "23" };
  }

  if (token?.includes("user")) {
    return { username: "user", isAdmin: false, studentNumber: "22" };
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem(USER_STORAGE_KEY);
  window.location.href = "/";
};
