import { useEffect, useState } from "react";

import { getMyComments, getMyPosts } from "../api/my-activity.api";
import type { MyCommentItem, MyPostItem } from "../types/types";

type ActivityState<T> = {
  data: T[];
  loading: boolean;
  error: string;
};

const useActivityItems = <T,>(
  studentNumber: string,
  includeAdminContent: boolean,
  loader: (
    studentNumber: string,
    includeAdminContent: boolean,
  ) => Promise<T[]>,
) => {
  const [state, setState] = useState<ActivityState<T>>({
    data: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    let cancelled = false;

    loader(studentNumber, includeAdminContent)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: "" });
      })
      .catch((error: unknown) => {
        console.error(error);
        if (!cancelled) {
          setState({
            data: [],
            loading: false,
            error: "활동 내역을 불러오지 못했습니다.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [includeAdminContent, loader, studentNumber]);

  return state;
};

const loadMyComments = (studentNumber: string) => getMyComments(studentNumber);

export const useMyPosts = (
  studentNumber: string,
  includeAdminContent: boolean,
) =>
  useActivityItems<MyPostItem>(
    studentNumber,
    includeAdminContent,
    getMyPosts,
  );

export const useMyComments = (studentNumber: string) =>
  useActivityItems<MyCommentItem>(studentNumber, false, loadMyComments);
