import { useState } from "react";
import {
  validateId,
  isDuplicateUserId,
} from "../utils/auth.utils";

export default function useUserIdValidation() {
  const [userID, setUserID] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setUserID(value);
    setChecked(false);

    if (!value) {
      setError("아이디를 입력해주세요.");
    } else if (!validateId(value)) {
      setError("아이디는 4~20자입니다.");
    } else {
      setError("");
    }
  };

  const checkDuplicate = () => {
    if (!validateId(userID)) {
      setError("아이디는 4~20자입니다.");
      return false;
    }

    if (isDuplicateUserId(userID)) {
      setError("이미 사용 중인 아이디입니다.");
      setChecked(false);
      return false;
    }

    setError("");
    setChecked(true);
    return true;
  };

  return {
    userID,
    setUserID: handleChange,
    checked,
    error,
    checkDuplicate,
  };
}