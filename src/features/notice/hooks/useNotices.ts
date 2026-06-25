import { useEffect, useState } from "react";
import { getNotices } from "../api/notice.api";
import type { NoticeType } from "../types/notice.type";

export const useNotices = () => {
  const [data, setData] = useState<NoticeType[]>([]);

  useEffect(() => {
    getNotices().then(setData);
  }, []);

  return { data };
};
