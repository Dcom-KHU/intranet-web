import { useEffect, useState } from "react";
import { getExamArchives } from "../exam-archive.api";
import { type ExamArchiveType } from "../exam-archive.type";

export const useExamArchives = () => {
    const [data, setData] = useState<ExamArchiveType[]>([]);

    useEffect(() => {
        getExamArchives().then(setData);
    }, []);

    return { data };
};