import { useEffect, useState } from "react"
import { type InfoPostDetail } from "../types/info-sharing.type"
import { getInfoDetailById } from "../api/info-sharing.api";

// 정보 공유글 상세 조회
export const useInfoDetail = (id: number) => {
    const [data, setData] = useState<InfoPostDetail | null>(null);

    useEffect(() => {
        if (!id) return;

        getInfoDetailById(id).then(setData)
    }, [id])

    return { data };
}