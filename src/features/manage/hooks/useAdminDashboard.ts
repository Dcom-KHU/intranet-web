import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getAdminDashboard } from "../api/manage.api";

export const useAdminDashboard = () => {
  const query = useQuery({
    queryKey: queryKeys.manage.dashboard,
    queryFn: getAdminDashboard,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.isError ? "대시보드 정보를 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
