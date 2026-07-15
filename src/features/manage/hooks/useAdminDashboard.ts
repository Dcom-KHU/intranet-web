import { useEffect, useState } from "react";

import { getAdminDashboard } from "../api/manage.api";
import type { AdminDashboard } from "../types/manage-dashboard.type";

export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getAdminDashboard()
      .then((dashboard) => {
        if (!cancelled) setData(dashboard);
      })
      .catch(() => {
        if (!cancelled) setError("대시보드 정보를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
