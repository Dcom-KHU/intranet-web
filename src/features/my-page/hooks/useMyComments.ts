import { useEffect, useState } from "react";

import { getMyComments } from "../api/my-activity.api";
import type { MyCommentDto } from "../types/my.types";

type MyCommentsState = {
  data: MyCommentDto[];
  total: number;
  loading: boolean;
  error: string;
};

export const useMyComments = (page: number, size: number) => {
  const [state, setState] = useState<MyCommentsState>({
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

    getMyComments(page, size)
      .then(({ comments, total }) => {
        if (!cancelled) {
          setState({
            data: comments,
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
            error: "댓글 활동 내역을 불러오지 못했습니다.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page, size]);

  return state;
};
