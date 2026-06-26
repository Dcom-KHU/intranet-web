import { useEffect, useState } from "react"
import { type InfoPostList } from "../types/info-sharing.type"
import { getInfos } from "../api/info-sharing.api";

// 정보 게시판 글 전체 조회
export const useInfos = () => {
    const [data, setData] = useState<InfoPostList[]>([]);

    useEffect(() => {
        getInfos().then(setData)
    }, [])

    return { data };
}