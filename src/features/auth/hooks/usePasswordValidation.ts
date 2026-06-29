import { useState } from "react";
import {
  validatePassword,
  validatePasswordMatch,
} from "../utils/auth.utils";

export default function usePasswordValidation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordError =
    !password
      ? "비밀번호를 입력해주세요."
      : !validatePassword(password)
      ? "영문 + 숫자 조합 8자 이상이어야 합니다."
      : "";

  const confirmPasswordError =
    !confirmPassword
      ? "비밀번호 확인을 입력해주세요."
      : !validatePasswordMatch(password, confirmPassword)
      ? "비밀번호가 일치하지 않습니다."
      : "";

  const isValid =
    !!password &&
    !!confirmPassword &&
    validatePassword(password) &&
    validatePasswordMatch(password, confirmPassword);

  return {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    passwordError,
    confirmPasswordError,
    isValid,
  };
}