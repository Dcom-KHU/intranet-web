import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { createInfoPosts, deleteInfoPost, updateInfoPost } from "../api/info-sharing.api";

export function useInfoMutations() {
  const queryClient = useQueryClient();
  const refreshLists = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.infoPosts.lists });
  const create = useMutation({
    mutationFn: createInfoPosts,
    onSuccess: refreshLists,
  });
  const update = useMutation({
    mutationFn: ({ id, post }: { id: number; post: UploadPostDraft }) =>
      updateInfoPost(id, post),
    onSuccess: (_, { id }) =>
      Promise.all([
        refreshLists(),
        queryClient.invalidateQueries({
          queryKey: queryKeys.infoPosts.detail(id),
        }),
      ]),
  });
  const remove = useMutation({
    mutationFn: deleteInfoPost,
    onSuccess: async (_, deletedId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.infoPosts.detail(deletedId),
      });
      return refreshLists();
    },
  });
  return { createInfo: create.mutateAsync, updateInfo: update.mutateAsync, deleteInfo: remove.mutateAsync };
}
