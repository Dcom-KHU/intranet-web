import { useEffect, useState } from "react";
import { getNoticeDetail } from "../api/notice.api";
import type { NoticeDetailType } from "../types/notice.type";
import { toNoticeDetail } from "../mapper/notice.mapper";

// 공지사항 상세 조회
export const useNoticeDetail = (id: number) => {
  const [data, setData] = useState<NoticeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!Number.isFinite(id)) {
      setData(null);
      setError("올바르지 않은 공지사항 ID입니다.");
      setLoading(false);
      return;
    }

    setLoading(true);
    getNoticeDetail(id)
      .then((notice) => {
        setData(toNoticeDetail(notice));
        setError("");
      })
      .catch(() => {
        setData(null);
        setError("공지사항을 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
};
