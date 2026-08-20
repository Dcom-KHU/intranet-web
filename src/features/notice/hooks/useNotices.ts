import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getNotices } from "../api/notice.api";
import { toNotice } from "../mapper/notice.mapper";

export const useNotices = (page = 0, size = 10, keyword = "") => {
  const normalizedKeyword = keyword.trim();
  const query = useQuery({
    queryKey: queryKeys.notices.list(page, size, normalizedKeyword),
    queryFn: async () => {
      const response = await getNotices({
        page,
        size,
        keyword: normalizedKeyword || undefined,
      });
      return {
        data: response.noticeList.map(toNotice),
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
      totalElements: 0,
      totalPages: 0,
    },
    loading: query.isPending,
    error: query.isError ? "공지사항을 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
