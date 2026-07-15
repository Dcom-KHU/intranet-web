import { useCallback, useEffect, useState } from "react";

import { getAdminDashboard } from "../api/manage.api";
import type { AdminDashboard } from "../types/manage-dashboard.type";

export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      const dashboard = await getAdminDashboard();
      setData(dashboard);
      setError("");
    } catch {
      setError("대시보드 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
};
