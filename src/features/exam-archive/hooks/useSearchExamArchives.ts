import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getSearchExamArchives } from "../api/exam-archive.api";
import { toExamArchive } from "../mapper/exam-archives.mapper";

export const useSearchExamArchives = (
  searchKeyword: string,
  page: number,
  size: number,
) => {
  const normalizedKeyword = searchKeyword.trim();
  const query = useQuery({
    queryKey: queryKeys.examArchives.search(normalizedKeyword, page, size),
    queryFn: async () => {
      const response = await getSearchExamArchives({
        searchKeyword: normalizedKeyword,
        page,
        size,
      });
      return {
        data: response.content.map(toExamArchive),
        pageInfo: {
          page: response.page,
          size: response.size,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
        },
      };
    },
    enabled: Boolean(normalizedKeyword),
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
    loading: Boolean(normalizedKeyword) && query.isPending,
    error: query.isError ? "족보 검색 결과를 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
