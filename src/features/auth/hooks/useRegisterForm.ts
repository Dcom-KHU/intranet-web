import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  register,
  validateEmail,
  validateId,
  validatePassword,
  validatePasswordMatch,
} from "../utils/auth.utils";
import useEmailVerification from "./useEmailVerification";
import usePasswordValidation from "./usePasswordValidation";
import usePhoneValidation from "./usePhoneValidation";
import useUserIdValidation from "./useUserIDValidation";

type RegisterField =
  | "name"
  | "studentNumber"
  | "userID"
  | "password"
  | "confirmPassword"
  | "email"
  | "emailCode"
  | "phoneNumber";

type TouchedFields = Partial<Record<RegisterField, boolean>>;

export type RegisterModalType =
  | "emailCodeSent"
  | "registerFailed"
  | "registerComplete";

export default function useRegisterForm() {
  const navigate = useNavigate();
  const emailVerification = useEmailVerification();
  const passwordValidation = usePasswordValidation();
  const phoneValidation = usePhoneValidation();
  const userIdValidation = useUserIdValidation();

  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [registerModalType, setRegisterModalType] =
    useState<RegisterModalType | null>(null);

  const showError = (field: RegisterField) =>
    Boolean(touched[field] || submitAttempted);

  const errors: Partial<Record<RegisterField, string>> = {
    name:
      showError("name") && !name.trim() ? "이름을 입력해주세요." : undefined,
    studentNumber:
      showError("studentNumber") && studentNumber.length !== 10
        ? "전체 학번은 10자리 숫자여야 합니다."
        : undefined,
    userID:
      showError("userID")
        ? userIdValidation.error ||
          (!userIdValidation.checked ? "아이디 중복 확인을 해주세요." : undefined)
        : undefined,
    password: showError("password")
      ? passwordValidation.passwordError
      : undefined,
    confirmPassword: showError("confirmPassword")
      ? passwordValidation.confirmPasswordError
      : undefined,
    email:
      showError("email") && !email
        ? "이메일을 입력해주세요."
        : showError("email") && !validateEmail(email)
          ? "올바른 이메일 형식이 아닙니다."
          : undefined,
    emailCode: showError("emailCode")
      ? emailVerification.error ||
        (!emailVerification.code
          ? "인증 코드를 입력해주세요."
          : !emailVerification.isVerified
            ? "이메일 인증을 완료해주세요."
            : undefined)
      : undefined,
    phoneNumber: showError("phoneNumber")
      ? phoneValidation.phoneError
      : undefined,
  };

  const touch = (field: RegisterField) => {
    setTouched((previous) => ({ ...previous, [field]: true }));
  };

  const handleNameChange = (value: string) => {
    setName(value);
    touch("name");
  };

  const handleStudentNumberChange = (value: string) => {
    setStudentNumber(value.replace(/\D/g, ""));
    touch("studentNumber");
  };

  const handleUserIDChange = (value: string) => {
    userIdValidation.setUserID(value);
    touch("userID");
  };

  const handlePasswordChange = (value: string) => {
    passwordValidation.setPassword(value);
    touch("password");
    if (passwordValidation.confirmPassword) touch("confirmPassword");
  };

  const handleConfirmPasswordChange = (value: string) => {
    passwordValidation.setConfirmPassword(value);
    touch("confirmPassword");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    emailVerification.reset();
    touch("email");
  };

  const handlePhoneNumberChange = (value: string) => {
    phoneValidation.setPhone(value);
    touch("phoneNumber");
  };

  const handleCheckDuplicateId = () => {
    touch("userID");
    userIdValidation.checkDuplicate();
  };

  const handleSendEmailCode = () => {
    touch("email");
    if (!emailVerification.sendCode(email)) return;

    setRegisterModalType("emailCodeSent");
  };

  const handleVerifyEmailCode = () => {
    touch("emailCode");
    emailVerification.verifyCode(email);
  };

  const setEmailCode = (value: string) => {
    emailVerification.setCode(value);
    touch("emailCode");
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const isValid =
      Boolean(name.trim()) &&
      studentNumber.length === 10 &&
      validateId(userIdValidation.userID) &&
      userIdValidation.checked &&
      validatePassword(passwordValidation.password) &&
      validatePasswordMatch(
        passwordValidation.password,
        passwordValidation.confirmPassword
      ) &&
      validateEmail(email) &&
      emailVerification.isVerified &&
      phoneValidation.isValid;

    if (!isValid) return;

    const success = register({
      id: Date.now(),
      userID: userIdValidation.userID,
      password: passwordValidation.password,
      studentNumber,
      email,
      name: name.trim(),
      phoneNumber: phoneValidation.phone,
      role: "USER",
      status: "PENDING",
      requirePasswordChange: false,
    });

    setRegisterModalType(success ? "registerComplete" : "registerFailed");
  };

  const handleGoLogin = () => navigate("/");
  const closeRegisterModal = () => setRegisterModalType(null);

  return {
    name,
    studentNumber,
    userID: userIdValidation.userID,
    password: passwordValidation.password,
    confirmPassword: passwordValidation.confirmPassword,
    email,
    emailCode: emailVerification.code,
    phoneNumber: phoneValidation.phone,
    errors,
    isUserIDValid:
      userIdValidation.checked && !userIdValidation.error,
    isPasswordValid:
      Boolean(passwordValidation.password) &&
      validatePassword(passwordValidation.password),
    isConfirmPasswordValid:
      Boolean(passwordValidation.confirmPassword) &&
      validatePasswordMatch(
        passwordValidation.password,
        passwordValidation.confirmPassword
      ),
    isEmailVerified: emailVerification.isVerified,
    registerModalType,
    handleNameChange,
    handleStudentNumberChange,
    handleUserIDChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handlePhoneNumberChange,
    handleCheckDuplicateId,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleRegister,
    handleGoLogin,
    closeRegisterModal,
    setEmailCode,
  };
}
