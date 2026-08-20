import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getNoticeDetail } from "../api/notice.api";
import { toNoticeDetail } from "../mapper/notice.mapper";

export const useNoticeDetail = (id: number) => {
  const isValidId = Number.isInteger(id) && id > 0;
  const query = useQuery({
    queryKey: queryKeys.notices.detail(id),
    queryFn: async () => toNoticeDetail(await getNoticeDetail(id)),
    enabled: isValidId,
  });

  return {
    data: query.data ?? null,
    loading: isValidId && query.isPending,
    error: !isValidId
      ? "올바르지 않은 공지사항 ID입니다."
      : query.isError
        ? "공지사항을 불러오지 못했습니다."
        : "",
    refetch: query.refetch,
  };
};
