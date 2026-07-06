import { useEffect, useState } from "react";
import { getExamArchiveById } from "../api/exam-archive.api";
import { type ExamArchiveDetailType } from "../types/exam-archive.type";

// 족보 상세 조회
export const useExamArchiveDetail = (id: number) => {
  const [data, setData] = useState<ExamArchiveDetailType | null>(null);

  useEffect(() => {
    if (!id) return;

    getExamArchiveById(id).then(setData);
  }, [id]);

  // console.log("useExamArchiveDetail data:", data);

  return { data };
};
