import { useState, useEffect } from "react";
import { getCommentsByPostId } from "../api/comment.api";
import { type Comment } from "../types/comment.type";

// 게시글에 해당하는 댓글 전체 조회
export const useComments = (id: number) => {
    const [data, setData] = useState<Comment[]>([]);

    useEffect(() => {
        getCommentsByPostId(id).then(setData)
    }, [id]);

    return { data };
}