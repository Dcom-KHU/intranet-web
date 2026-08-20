import { describe, expect, it } from "vitest";
import { validateEmail, validateId, validatePassword, validatePasswordMatch, validatePhoneNumber } from "@/features/auth/utils/auth.utils";

describe("authentication input validation", () => {
  it("아이디는 4자 이상 20자 이하만 허용한다", () => {
    expect(validateId("abc")).toBe(false);
    expect(validateId("abcd")).toBe(true);
    expect(validateId("a".repeat(21))).toBe(false);
  });

  it("비밀번호는 8자 이상이며 영문과 숫자를 모두 포함해야 한다", () => {
    expect(validatePassword("password")).toBe(false);
    expect(validatePassword("12345678")).toBe(false);
    expect(validatePassword("password1")).toBe(true);
  });

  it("비밀번호 확인값이 다르면 거절한다", () => {
    expect(validatePasswordMatch("password1", "password2")).toBe(false);
    expect(validatePasswordMatch("password1", "password1")).toBe(true);
  });

  it("올바르지 않은 이메일 형식을 거절한다", () => {
    expect(validateEmail("student@khu.ac.kr")).toBe(true);
    expect(validateEmail("student@khu")).toBe(false);
  });

  it("전화번호는 010-0000-0000 형식만 허용한다", () => {
    expect(validatePhoneNumber("010-1234-5678")).toBe(true);
    expect(validatePhoneNumber("01012345678")).toBe(false);
  });
});
