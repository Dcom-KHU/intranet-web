import { useQuery } from "@tanstack/react-query";

import { getInfoDetailById } from "../api/info-sharing.api";
import {
  classifyDetailQueryError,
  type DetailQueryErrorType,
} from "../../../utils/detail-query-error";

const ERROR_MESSAGES: Record<DetailQueryErrorType, string> = {
  "invalid-id": "올바르지 않은 정보공유 게시글 ID입니다.",
  forbidden: "이 정보공유 게시글을 조회할 권한이 없습니다.",
  "not-found": "정보공유 게시글을 찾을 수 없습니다.",
  network: "네트워크 오류로 정보공유 게시글을 불러오지 못했습니다.",
  empty: "정보공유 게시글 데이터가 없습니다.",
  unknown: "정보공유 게시글을 불러오는 중 오류가 발생했습니다.",
};

export const useInfoDetail = (id: number) => {
  const isValidId = Number.isInteger(id) && id > 0;
  const query = useQuery({
    queryKey: ["info-post-detail", id],
    queryFn: ({ signal }) => getInfoDetailById(id, signal),
    enabled: isValidId,
    retry: false,
  });

  let errorType: DetailQueryErrorType | null = null;
  if (!isValidId) errorType = "invalid-id";
  else if (query.isError) errorType = classifyDetailQueryError(query.error);
  else if (query.isSuccess && !query.data) errorType = "empty";

  return {
    ...query,
    data: query.data ?? null,
    loading: isValidId && query.isPending,
    errorType,
    errorMessage: errorType ? ERROR_MESSAGES[errorType] : "",
  };
};
