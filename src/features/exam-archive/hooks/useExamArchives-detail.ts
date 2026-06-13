import { useEffect, useState } from "react";
import { getExamArchiveById } from "../exam-archive.api";
import { type ExamArchiveDetailType } from "../exam-archive.type";

export const useExamArchive = (id: number) => {
  const [data, setData] = useState<ExamArchiveDetailType | null>(null);

  useEffect(() => {
    if (!id) return;

    getExamArchiveById(id).then(setData);
  }, [id]);

  return { data };
};
