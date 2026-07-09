import { useEffect, useState } from "react";

import { getMyPosts } from "../api/my-activity.api";
import type { MyPostItem } from "../types/types";

type MyPostsState = {
  data: MyPostItem[];
  total: number;
  loading: boolean;
  error: string;
};

export const useMyPosts = (page: number, size: number) => {
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
  }, [page, size]);

  return state;
};
