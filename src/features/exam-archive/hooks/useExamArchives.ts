import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getExamArchives } from "../api/exam-archive.api";
import { toExamArchive } from "../mapper/exam-archives.mapper";

export const useExamArchives = (page: number, size: number) => {
  const query = useQuery({
    queryKey: queryKeys.examArchives.list(page, size),
    queryFn: async () => {
      const response = await getExamArchives(page, size);
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
    error: query.isError ? "족보 목록을 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
