import { useEffect, useState } from "react";
import { getNoticeDetail } from "../api/notice.api";
import type { NoticeDetailType } from "../types/notice.type";

// 공지사항 상세 조회
export const useNoticeDetail = (id: number) => {
  const [data, setData] = useState<NoticeDetailType | null>(null);

  useEffect(() => {
    getNoticeDetail().then((notices) => {
      const notice = notices.find((notice) => notice.id === id) ?? null;
      setData(notice);
    });
  }, [id]);

  return { data };
};