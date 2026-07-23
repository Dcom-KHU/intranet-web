import { useEffect, useState } from "react";
import { getManageUserDetail } from "../api/manage.api";
import type { ManageUserDetail } from "../types/manage-users.type";

export const useManageUserDetail = (userId: number | null) => {
  const [data, setData] = useState<ManageUserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId === null) {
      setData(null);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    getManageUserDetail(userId)
      .then((user) => {
        setData(user);
        setError("");
      })
      .catch(() => {
        setData(null);
        setError("회원 상세 정보를 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
};
