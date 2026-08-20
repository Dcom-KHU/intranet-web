import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import { getGalleryPosts } from "../api/gallery.api";

export const useGallery = (page = 0, size = 8, keyword = "") => {
  const normalizedKeyword = keyword.trim();
  const query = useQuery({
    queryKey: queryKeys.gallery.list(page, size, normalizedKeyword),
    queryFn: () =>
      getGalleryPosts(page, size, normalizedKeyword || undefined),
    placeholderData: keepPreviousData,
  });

  const { posts = [], ...pageInfo } = query.data ?? {
    posts: [],
    page: 0,
    size,
    totalElements: 0,
    totalPages: 0,
  };

  return {
    data: posts,
    pageInfo,
    loading: query.isPending,
    error: query.isError ? "활동 사진을 불러오지 못했습니다." : "",
    refetch: query.refetch,
  };
};
