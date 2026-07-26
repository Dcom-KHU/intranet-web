import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  validateEmail,
  validateId,
  validatePassword,
  validatePasswordMatch,
} from "../utils/auth.utils";
import { signup } from "../api/auth.api";
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

const validateStudentNumber = (value: string) =>
  value.length >= 8 && value.length <= 10;

const validationLabels: Record<RegisterField, string> = {
  name: "이름",
  studentNumber: "학번",
  userID: "아이디 중복 확인",
  password: "비밀번호",
  confirmPassword: "비밀번호 확인",
  email: "이메일",
  emailCode: "이메일 인증",
  phoneNumber: "전화번호",
};

export type RegisterModalType =
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerModalType, setRegisterModalType] =
    useState<RegisterModalType | null>(null);

  const showError = (field: RegisterField) =>
    Boolean(touched[field] || submitAttempted);

  const errors: Partial<Record<RegisterField, string>> = {
    name:
      showError("name") && !name.trim() ? "이름을 입력해주세요." : undefined,
    studentNumber:
      showError("studentNumber") && !validateStudentNumber(studentNumber)
        ? "학번은 8~10자리 숫자여야 합니다."
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
          : emailVerification.sendError || undefined,
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

  const validationStatus: Record<RegisterField, boolean> = {
    name: Boolean(name.trim()),
    studentNumber: validateStudentNumber(studentNumber),
    userID:
      validateId(userIdValidation.userID) && userIdValidation.checked,
    password: validatePassword(passwordValidation.password),
    confirmPassword:
      Boolean(passwordValidation.confirmPassword) &&
      validatePasswordMatch(
        passwordValidation.password,
        passwordValidation.confirmPassword,
      ),
    email: validateEmail(email),
    emailCode: emailVerification.isVerified,
    phoneNumber: phoneValidation.isValid,
  };

  const invalidFields = (
    Object.entries(validationStatus) as [RegisterField, boolean][]
  )
    .filter(([, isValid]) => !isValid)
    .map(([field]) => validationLabels[field]);

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

  const handleCheckDuplicateId = async () => {
    touch("userID");
    await userIdValidation.checkDuplicate();
  };

  const handleSendEmailCode = async () => {
    touch("email");
    await emailVerification.sendCode(email);
  };

  const handleVerifyEmailCode = async () => {
    touch("emailCode");
    await emailVerification.verifyCode(email);
  };

  const setEmailCode = (value: string) => {
    emailVerification.setCode(value);
    touch("emailCode");
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmitAttempted(true);

    if (invalidFields.length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({
        userID: userIdValidation.userID,
        password: passwordValidation.password,
        studentNumber,
        email,
        name: name.trim(),
        phoneNumber: phoneValidation.phone,
      });
      setRegisterModalType("registerComplete");
    } catch {
      setRegisterModalType("registerFailed");
    } finally {
      setIsSubmitting(false);
    }
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
    hasValidationErrors:
      submitAttempted && invalidFields.length > 0,
    invalidFieldLabels: submitAttempted ? invalidFields : [],
    isUserIDValid:
      userIdValidation.checked && !userIdValidation.error,
    isCheckingUserID: userIdValidation.isChecking,
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
    isSendingEmailCode: emailVerification.isSending,
    isVerifyingEmailCode: emailVerification.isVerifying,
    emailCodeRemainingSeconds: emailVerification.remainingSeconds,
    hasActiveEmailCode: emailVerification.hasActiveCode,
    registerModalType,
    isSubmitting,
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
