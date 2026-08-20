import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";

import { getExamArchiveById } from "../api/exam-archive.api";
import {
  classifyDetailQueryError,
  type DetailQueryErrorType,
} from "../../../utils/detail-query-error";

const ERROR_MESSAGES: Record<DetailQueryErrorType, string> = {
  "invalid-id": "올바르지 않은 족보 ID입니다.",
  forbidden: "이 족보를 조회할 권한이 없습니다.",
  "not-found": "족보를 찾을 수 없습니다.",
  network: "네트워크 오류로 족보를 불러오지 못했습니다.",
  empty: "족보 데이터가 없습니다.",
  unknown: "족보를 불러오는 중 오류가 발생했습니다.",
};

export const useExamArchiveDetail = (id: number) => {
  const isValidId = Number.isInteger(id) && id > 0;
  const query = useQuery({
    queryKey: queryKeys.examArchives.detail(id),
    queryFn: ({ signal }) => getExamArchiveById(id, signal),
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
