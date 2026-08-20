import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getHomeDashboard } from "../api/home.api";

export const useHomeDashboard = () => {
  const query = useQuery({
    queryKey: queryKeys.home,
    queryFn: getHomeDashboard,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.isError ? "홈 화면 데이터를 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
