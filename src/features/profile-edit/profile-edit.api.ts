// profile-edit/profile-edit.api.ts
import { type User } from "../user.type";
import { mockUser } from "./profile-edit.mock";

// 서버 요청처럼 흉내
export function fetchUser():Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500); // 딜레이도 일부러 줌 (진짜 API처럼)
  });
}