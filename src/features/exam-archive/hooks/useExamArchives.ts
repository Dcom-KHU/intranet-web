import { useEffect, useState } from "react";
import { getExamArchives } from "../api/exam-archive.api";
import type { ExamArchiveListType } from "../types/exam-archive.type";

export const useExamArchives = () => {
    const [data, setData] = useState<ExamArchiveListType[]>([]);

    useEffect(() => {
        getExamArchives().then(setData);
    }, []);

    return { data };
};
