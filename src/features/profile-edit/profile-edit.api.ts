// profile-edit/profile-edit.api.ts

import { type User } from "../user.type";
import { mockUser } from "./profile-edit.mock";

// 조회
export function fetchUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500); // 일부러 실제 서버처럼 대기 500
  });
}

// 수정
export function updateUser(
  user: User
): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("서버로 보낸 데이터:", user);

      resolve(user);
    }, 1000);
  });
}