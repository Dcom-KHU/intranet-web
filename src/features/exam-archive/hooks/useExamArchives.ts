import { useEffect, useState } from "react";
import { getExamArchives } from "../api/exam-archive.api";
import type { ExamArchiveListType } from "../types/exam-archive.type";
import { toExamArchive } from "../mapper/exam-archives.mapper";

export const useExamArchives = (page: number, size: number) => {
    const [data, setData] = useState<ExamArchiveListType[]>([]);
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        size: 0,
        totalPages: 0,
        totalElements: 0,
    });

    useEffect(() => {
        getExamArchives(page, size).then((res) => {
            setData(res.content.map(toExamArchive));
            setPageInfo({
                page: res.page,
                size: res.size,
                totalPages: res.totalPages,
                totalElements: res.totalElements,
            });
        });
    }, [page, size]);

    console.log("useExamArchives data, pageInfo:", data, pageInfo);

    return { data, pageInfo };
};
