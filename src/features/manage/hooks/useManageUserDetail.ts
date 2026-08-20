import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getManageUserDetail } from "../api/manage.api";

export const useManageUserDetail = (userId: number | null) => {
  const query = useQuery({
    queryKey: queryKeys.manage.userDetail(userId),
    queryFn: () => getManageUserDetail(userId as number),
    enabled: userId !== null,
  });

  return {
    data: query.data ?? null,
    loading: userId !== null && query.isPending,
    error: query.isError ? "회원 상세 정보를 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
