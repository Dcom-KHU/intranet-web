import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getMyComments } from "../api/my-activity.api";
import { logClientError } from "../../../utils/logger";

export const useMyComments = (page: number, size: number) => {
  const query = useQuery({
    queryKey: queryKeys.myActivity.comments(page, size),
    queryFn: async () => {
      try {
        return await getMyComments(page, size);
      } catch (error) {
        logClientError("내 댓글 조회 실패", error);
        throw error;
      }
    },
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data?.comments ?? [],
    total: query.data?.total ?? 0,
    loading: query.isPending,
    error: query.isError ? "댓글 활동 내역을 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
