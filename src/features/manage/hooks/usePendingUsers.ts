import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getPendingUsers } from "../api/manage.api";

export const usePendingUsers = (page: number, size: number) => {
  const query = useQuery({
    queryKey: queryKeys.manage.pending(page, size),
    queryFn: () => getPendingUsers({ page, size, sort: "createdAt,desc" }),
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.isError ? "승인 대기 회원을 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
