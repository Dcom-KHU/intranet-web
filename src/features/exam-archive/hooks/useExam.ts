import { useEffect, useState } from "react";
import { getExam } from "../api/exam-archive.api";
import type { ExamArchiveType } from "../types/exam-archive.type";

// 족보 포스트 조회
export const useExam = () => {
    const [data, setData] = useState<ExamArchiveType[]>([]);

    useEffect(() => {
        getExam().then(setData);
    }, []);

    return { data };
};
