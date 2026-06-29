import { useState } from "react";
import { validatePhoneNumber } from "../utils/auth.utils";

export default function usePhoneValidation() {
  const [phone, setPhone] = useState("");

  const phoneError =
    !phone
      ? "전화번호를 입력해주세요."
      : !validatePhoneNumber(phone)
      ? "010-XXXX-XXXX 형식으로 입력해주세요."
      : "";

  const isValid = validatePhoneNumber(phone);

  const handleChange = (value: string) => {
    setPhone(value);
  };

  return {
    phone,
    setPhone: handleChange,
    phoneError,
    isValid,
  };
}