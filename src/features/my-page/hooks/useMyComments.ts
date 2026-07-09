import { useEffect, useState } from "react";

import { getMyComments } from "../api/my-activity.api";
import type { MyCommentItem } from "../types/my.types";

type MyCommentsState = {
  data: MyCommentItem[];
  loading: boolean;
  error: string;
};

export const useMyComments = (studentNumber: string) => {
  const [state, setState] = useState<MyCommentsState>({
    data: [],
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

    getMyComments(studentNumber)
      .then((data) => {
        if (!cancelled) {
          setState({
            data,
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
            loading: false,
            error: "댓글 활동 내역을 불러오지 못했습니다.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [studentNumber]);

  return state;
};
