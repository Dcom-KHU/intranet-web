import { useEffect, useState } from "react";
import { getNotices } from "../api/notice.api";
import type { NoticeType } from "../types/notice.type";

// 공지사항 목록 조회
export const useNotices = () => {
  const [data, setData] = useState<NoticeType[]>([]);

  useEffect(() => {
    getNotices().then(setData);
  }, []);

  return { data };
};
