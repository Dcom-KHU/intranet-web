import { useEffect, useState } from "react";
import { getHomeDashboard } from "../api/home.api";
import type { HomeDashboard } from "../types/home.type";

export const useHomeDashboard = () => {
  const [data, setData] = useState<HomeDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getHomeDashboard()
      .then((dashboard) => {
        setData(dashboard);
        setError("");
      })
      .catch(() => setError("홈 화면 데이터를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
