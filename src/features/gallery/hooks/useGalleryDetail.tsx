import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getGalleryById } from "../api/gallery.api";

export const useGalleryDetail = (id: number) => {
  const isValidId = Number.isInteger(id) && id > 0;
  const query = useQuery({
    queryKey: queryKeys.gallery.detail(id),
    queryFn: () => getGalleryById(id),
    enabled: isValidId,
  });

  return {
    data: query.data ?? null,
    loading: isValidId && query.isPending,
    error: !isValidId
      ? new Error("올바르지 않은 활동사진 ID입니다.")
      : query.error,
    refetch: query.refetch,
  };
};
