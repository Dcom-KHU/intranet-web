import { useEffect, useState } from "react";

import { getMyPosts } from "../api/my-activity.api";
import type { MyPostDto } from "../types/my.types";

type MyPostsState = {
  data: MyPostDto[];
  total: number;
  loading: boolean;
  error: string;
};

export const useMyPosts = (page: number, size: number) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [state, setState] = useState<MyPostsState>({
    data: [],
    total: 0,
    loading: true,
    error: "",
  });

  useEffect(() => {
    let cancelled = false;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: "",
    }));

    getMyPosts(page, size)
      .then(({ posts, total }) => {
        if (!cancelled) {
          setState({
            data: posts,
            total,
            loading: false,
            error: "",
          });
        }
      })
      .catch((error: unknown) => {
        console.error(error);

        if (!cancelled) {
          setState({
            data: [],
            total: 0,
            loading: false,
            error: "게시글 활동 내역을 불러오지 못했습니다.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page, refreshKey, size]);

  return {
    ...state,
    refetch: () => setRefreshKey((key) => key + 1),
  };
};
