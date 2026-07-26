import { useRef, useState } from "react";

import { checkLoginId } from "../api/auth.api";
import { validateId } from "../utils/auth.utils";

export default function useUserIdValidation() {
  const [userID, setUserID] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const userIDRef = useRef(userID);

  const handleChange = (value: string) => {
    userIDRef.current = value;
    setUserID(value);
    setChecked(false);

    if (!value) {
      setError("아이디를 입력해 주세요.");
    } else if (!validateId(value)) {
      setError("아이디는 4~20자입니다.");
    } else {
      setError("");
    }
  };

  const checkDuplicate = async () => {
    if (!validateId(userID)) {
      setError("아이디는 4~20자입니다.");
      return false;
    }

    const checkedLoginId = userID;
    setIsChecking(true);

    try {
      const result = await checkLoginId(checkedLoginId);

      if (checkedLoginId !== userIDRef.current) return false;

      setError(result.isAvailable ? "" : result.message);
      setChecked(result.isAvailable);
      return result.isAvailable;
    } catch {
      if (checkedLoginId === userIDRef.current) {
        setError("아이디 중복 확인에 실패했습니다. 다시 시도해 주세요.");
        setChecked(false);
      }
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  return {
    userID,
    setUserID: handleChange,
    checked,
    error,
    isChecking,
    checkDuplicate,
  };
}
