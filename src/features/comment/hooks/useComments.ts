import { useState, useEffect } from "react";
import {
    createComment as createCommentApi,
    deleteComment as deleteCommentApi,
    getCommentsByPostId,
    updateComment as updateCommentApi,
    type CommentTarget,
} from "../api/comment.api";
import { type Comment } from "../types/comment.type";
import type { postAuthor } from "../../auth/types/post-author.type";

// 게시글에 해당하는 댓글 전체 조회
export const useComments = (postId: number, target: CommentTarget) => {
    const [data, setData] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        getCommentsByPostId(postId, target).then((comments) => {
            if (ignore) return;
            setData(comments);
            setLoading(false);
        });

        return () => {
            ignore = true;
        };
    }, [postId, target]);

    const createComment = async (author: postAuthor, content: string) => {
        const createdComment = await createCommentApi(
            postId,
            target,
            author,
            content,
        );
        setData((comments) => [...comments, createdComment]);
    };

    const updateComment = async (commentId: number, content: string) => {
        const updatedComment = await updateCommentApi(commentId, target, content);
        setData((comments) =>
            comments.map((comment) =>
                comment.id === commentId ? updatedComment : comment,
            ),
        );
    };

    const deleteComment = async (commentId: number) => {
        await deleteCommentApi(postId, commentId, target);
        setData((comments) =>
            comments.filter((comment) => comment.id !== commentId),
        );
    };

    return { data, loading, createComment, updateComment, deleteComment };
}
