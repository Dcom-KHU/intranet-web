import { useEffect, useState } from "react"
import { type InfoPostList, type InfoPostPageInfo } from "../types/info-sharing.type"
import { getInfos } from "../api/info-sharing.api";
import { toInfoPostList } from "../mapper/info.mapper";

// 정보 게시판 글 전체 조회
export const useInfos = (page = 0, size = 10, keyword = "") => {
    const [data, setData] = useState<InfoPostList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pageInfo, setPageInfo] = useState<InfoPostPageInfo>({
        page: 0,
        size,
        totalPages: 0,
        totalElements: 0,
    });

    useEffect(() => {
        setLoading(true);
        getInfos({ page, size, keyword: keyword.trim() || undefined })
            .then((res) => {
                setData(res.postList.map(toInfoPostList));
                setPageInfo(res.pageInfo);
                setError("");
            })
            .catch(() => setError("정보공유 게시글을 불러오지 못했습니다."))
            .finally(() => setLoading(false));
    }, [page, size, keyword])

    return { data, pageInfo, loading, error };
}
