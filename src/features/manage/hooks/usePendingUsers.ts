import { useCallback, useEffect, useState } from "react";

import { getPendingUsers } from "../api/manage.api";
import type { PendingUsersPage } from "../types/pending-users.type";

export const usePendingUsers = (page: number, size: number) => {
  const [data, setData] = useState<PendingUsersPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingUsers = useCallback(async () => {
    try {
      const response = await getPendingUsers({
        page,
        size,
        sort: ["createdAt,desc"],
      });
      setData(response);
      setError("");
    } catch {
      setError("승인 대기 회원을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    setLoading(true);
    void fetchPendingUsers();
  }, [fetchPendingUsers]);

  return { data, loading, error, refetch: fetchPendingUsers };
};
