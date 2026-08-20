import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getInfos } from "../api/info-sharing.api";
import { toInfoPostList } from "../mapper/info.mapper";

export const useInfos = (page = 0, size = 10, keyword = "") => {
  const normalizedKeyword = keyword.trim();
  const query = useQuery({
    queryKey: queryKeys.infoPosts.list(page, size, normalizedKeyword),
    queryFn: async () => {
      const response = await getInfos({
        page,
        size,
        keyword: normalizedKeyword || undefined,
      });
      return {
        data: response.postList.map(toInfoPostList),
        pageInfo: response.pageInfo,
      };
    },
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data?.data ?? [],
    pageInfo: query.data?.pageInfo ?? {
      page: 0,
      size,
      totalPages: 0,
      totalElements: 0,
    },
    loading: query.isPending,
    error: query.isError ? "정보공유 게시글을 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
