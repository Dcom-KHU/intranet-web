import { useCallback, useEffect, useState } from "react";

import { getManageUsers } from "../api/manage.api";
import type { ManageUsersPage } from "../types/manage-users.type";

export const useManageUsers = (
  page: number,
  size: number,
  keyword: string,
  sort: string,
) => {
  const [data, setData] = useState<ManageUsersPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getManageUsers({
        page,
        size,
        keyword: keyword || undefined,
        sort: [sort],
      });
      setData(response);
      setError("");
    } catch {
      setError("회원 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [keyword, page, size, sort]);

  useEffect(() => {
    setLoading(true);
    void fetchUsers();
  }, [fetchUsers]);

  return { data, loading, error, refetch: fetchUsers };
};
