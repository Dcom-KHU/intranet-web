import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../app/query-keys";
import {
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  getCommentsByPostId,
  updateComment as updateCommentApi,
  type CommentTarget,
} from "../api/comment.api";
import type { Comment } from "../types/comment.type";

export const useComments = (postId: number, target: CommentTarget) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.comments(target, postId);
  const query = useQuery({
    queryKey,
    queryFn: () => getCommentsByPostId(postId, target),
    enabled: Number.isInteger(postId) && postId > 0,
  });

  const createMutation = useMutation({
    mutationFn: (content: string) => createCommentApi(postId, target, content),
    onSuccess: (createdComment) => {
      queryClient.setQueryData<Comment[]>(queryKey, (comments = []) => [
        ...comments,
        createdComment,
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateCommentApi(postId, commentId, target, content),
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<Comment[]>(queryKey, (comments = []) =>
        comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) =>
      deleteCommentApi(postId, commentId, target).then(() => commentId),
    onSuccess: (deletedCommentId) => {
      queryClient.setQueryData<Comment[]>(queryKey, (comments = []) =>
        comments.filter((comment) => comment.id !== deletedCommentId),
      );
    },
  });

  return {
    data: query.data ?? [],
    loading: query.isPending,
    createComment: async (content: string) => {
      await createMutation.mutateAsync(content);
    },
    updateComment: async (commentId: number, content: string) => {
      await updateMutation.mutateAsync({ commentId, content });
    },
    deleteComment: async (commentId: number) => {
      await deleteMutation.mutateAsync(commentId);
    },
  };
};
