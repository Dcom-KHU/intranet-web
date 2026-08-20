import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyComment, deleteMyPost } from "../api/my-activity.api";
import type { MyCommentType, MyPostType } from "../types/my.types";

export function useMyActivityMutations() {
  const queryClient = useQueryClient();
  const removePost = useMutation({
    mutationFn: ({ id, type }: { id: number; type: MyPostType }) => deleteMyPost(id, type),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-activity", "posts"] }),
  });
  const removeComment = useMutation({
    mutationFn: ({ id, type }: { id: number; type: MyCommentType }) => deleteMyComment(id, type),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-activity", "comments"] }),
  });
  return { deleteMyPost: removePost.mutateAsync, deleteMyComment: removeComment.mutateAsync };
}
