import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user.type";
import {
  isDuplicateUserId,
  register,
  sendEmailCode,
  validateEmail,
  validateId,
  validatePassword,
  verifyEmailCode,
} from "../utils/auth.utils";

const phoneRegex = /^010-\d{4}-\d{4}$/;
export type RegisterModalType =
  | "emailCodeSent"
  | "registerFailed"
  | "registerComplete";

export default function useRegisterForm() {
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [registerModalType, setRegisterModalType] =
    useState<RegisterModalType | null>(null);

  const navigate = useNavigate();

  const setFieldError = (field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!value.trim()) setFieldError("name", "이름을 입력해주세요.");
    else clearFieldError("name");
  };

  const handleStudentNumberChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    setStudentNumber(onlyNumbers);

    if (!onlyNumbers.trim()) {
      setFieldError("studentNumber", "학번을 입력해주세요.");
      return;
    }

    if (onlyNumbers.length !== 10) {
      setFieldError("studentNumber", "전체 학번은 10자리 숫자여야 합니다.");
      return;
    }

    clearFieldError("studentNumber");
  };

  const handleUserIDChange = (value: string) => {
    setUserID(value);
    setIsIdChecked(false);
    if (!value) setFieldError("userID", "아이디를 입력해주세요.");
    else if (!validateId(value)) setFieldError("userID", "아이디는 4자 이상 20자 이하여야 합니다.");
    else clearFieldError("userID");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!value) setFieldError("password", "비밀번호를 입력해주세요.");
    else if (!validatePassword(value)) setFieldError("password", "영문 + 숫자 조합 8자 이상이어야 합니다.");
    else clearFieldError("password");

    if (confirmPassword) {
      if (value !== confirmPassword) setFieldError("confirmPassword", "비밀번호가 일치하지 않습니다.");
      else clearFieldError("confirmPassword");
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (!value) setFieldError("confirmPassword", "비밀번호 확인을 입력해주세요.");
    else if (password !== value) setFieldError("confirmPassword", "비밀번호가 일치하지 않습니다.");
    else clearFieldError("confirmPassword");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailVerified(false);
    if (!value) setFieldError("email", "이메일을 입력해주세요.");
    else if (!validateEmail(value)) setFieldError("email", "올바른 이메일 형식이 아닙니다.");
    else clearFieldError("email");
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    if (!value) setFieldError("phoneNumber", "전화번호를 입력해주세요.");
    else if (!phoneRegex.test(value)) setFieldError("phoneNumber", "010-XXXX-XXXX 형식으로 입력해주세요.");
    else clearFieldError("phoneNumber");
  };

  const handleCheckDuplicateId = () => {
    if (!validateId(userID)) {
      setFieldError("userID", "아이디는 4자 이상 20자 이하여야 합니다.");
      return;
    }

    if (isDuplicateUserId(userID)) {
      setFieldError("userID", "이미 사용 중인 아이디입니다.");
      setIsIdChecked(false);
      return;
    }

    clearFieldError("userID");
    setIsIdChecked(true);
  };

  const handleSendEmailCode = () => {
    if (!validateEmail(email)) {
      setFieldError("email", "올바른 이메일 형식이 아닙니다.");
      return;
    }

    sendEmailCode(email);
    clearFieldError("emailCode");
    setRegisterModalType("emailCodeSent");
  };

  const handleVerifyEmailCode = () => {
    if (!emailCode) {
      setFieldError("emailCode", "인증 코드를 입력해주세요.");
      return;
    }

    if (verifyEmailCode(email, emailCode)) {
      setIsEmailVerified(true);
      clearFieldError("emailCode");
      return;
    }

    setFieldError("emailCode", "인증 코드가 올바르지 않습니다.");
    setIsEmailVerified(false);
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "이름을 입력해주세요.";
    if (!studentNumber.trim()) newErrors.studentNumber = "학번을 입력해주세요.";
    if (!validateId(userID)) newErrors.userID = "아이디는 4자 이상 20자 이하여야 합니다.";
    if (!isIdChecked) newErrors.userID = "아이디 중복 확인을 해주세요.";
    if (!validatePassword(password)) newErrors.password = "영문 + 숫자 조합 8자 이상이어야 합니다.";
    if (password !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!validateEmail(email)) newErrors.email = "올바른 이메일 형식이 아닙니다.";
    if (!isEmailVerified) newErrors.emailCode = "이메일 인증을 완료해주세요.";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "전화번호를 입력해주세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userInput: User = {
      id: Date.now(),
      userID,
      password,
      studentNumber,
      email,
      name,
      phoneNumber,
      image: "",
      role: "USER",
      approvalStatus: "PENDING",
    };

    const success = register(userInput);

    if (!success) {
      setRegisterModalType("registerFailed");
      return;
    }

    setRegisterModalType("registerComplete");
  };

  const handleGoLogin = () => {
    navigate("/");
  };

  const closeRegisterModal = () => {
    setRegisterModalType(null);
  };

  return {
    name,
    studentNumber,
    userID,
    password,
    confirmPassword,
    email,
    emailCode,
    phoneNumber,
    errors,
    isUserIDValid: isIdChecked && !errors.userID,
    isPasswordValid: !!password && validatePassword(password),
    isConfirmPasswordValid: !!confirmPassword && password === confirmPassword,
    isEmailVerified,
    isRegisterComplete: registerModalType === "registerComplete",
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
