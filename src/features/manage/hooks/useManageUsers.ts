import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getManageUsers } from "../api/manage.api";

export const useManageUsers = (
  page: number,
  size: number,
  keyword: string,
  sort: string,
) => {
  const normalizedKeyword = keyword.trim();
  const query = useQuery({
    queryKey: queryKeys.manage.users(page, size, normalizedKeyword, sort),
    queryFn: () =>
      getManageUsers({
        page,
        size,
        keyword: normalizedKeyword || undefined,
        sort,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.isError ? "회원 목록을 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
