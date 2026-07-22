import { useEffect, useState } from "react";
import { getNotices } from "../api/notice.api";
import type { NoticeType } from "../types/notice.type";
import type { NoticePageInfo } from "../types/notice.type";
import { toNotice } from "../mapper/notice.mapper";

// 공지사항 목록 조회
export const useNotices = (page = 0, size = 10, keyword = "") => {
  const [data, setData] = useState<NoticeType[]>([]);
  const [pageInfo, setPageInfo] = useState<NoticePageInfo>({
    page: 0,
    size,
    totalElements: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getNotices({ page, size, keyword: keyword.trim() || undefined })
      .then((response) => {
        setData(response.noticeList.map(toNotice));
        setPageInfo(response.pageInfo);
        setError("");
      })
      .catch(() => setError("공지사항을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [keyword, page, size]);

  return { data, pageInfo, loading, error };
};
