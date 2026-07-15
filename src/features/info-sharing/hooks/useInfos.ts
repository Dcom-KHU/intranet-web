import { useEffect, useState } from "react"
import { type InfoPostList, type InfoPostPageInfo } from "../types/info-sharing.type"
import { getInfos } from "../api/info-sharing.api";
import { toInfoPostList } from "../mapper/info.mapper";

// 정보 게시판 글 전체 조회
export const useInfos = (page = 0, size = 10, keyword = "") => {
    const [data, setData] = useState<InfoPostList[]>([]);
    const [pageInfo, setPageInfo] = useState<InfoPostPageInfo>({
        page: 0,
        size,
        totalPages: 0,
        totalElements: 0,
    });

    useEffect(() => {
        getInfos({ page, size, keyword: keyword.trim() || undefined }).then((res) => {
            setData(res.postList.map(toInfoPostList));
            setPageInfo(res.pageInfo);
        });
    }, [page, size, keyword])

    return { data, pageInfo };
}
