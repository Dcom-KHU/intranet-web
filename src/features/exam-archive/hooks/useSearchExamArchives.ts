import { useEffect, useState } from "react";
import { getSearchExamArchives } from "../api/exam-archive.api";
import type { ExamArchiveListType } from "../types/exam-archive.type";
import { toExamArchive } from "../mapper/exam-archives.mapper";

export const useSearchExamArchives = (
  searchKeyword: string,
  page: number,
  size: number,
) => {
  const [data, setData] = useState<ExamArchiveListType[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 0,
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setData([]);
      setLoading(false);
      setError("");
      return;
    }

    let cancelled = false;
    setLoading(true);
    getSearchExamArchives({ searchKeyword, page, size })
      .then((res) => {
        if (cancelled) return;

        setData(res.content.map(toExamArchive));
        setPageInfo({
          page: res.page,
          size: res.size,
          totalPages: res.totalPages,
          totalElements: res.totalElements,
        });
        setError("");
      })
      .catch(() => {
        if (!cancelled) setError("족보 검색 결과를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchKeyword, page, size]);

  return { data, pageInfo, loading, error };
};
