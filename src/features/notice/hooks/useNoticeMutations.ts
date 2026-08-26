import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { createNotices, deleteNotice, updateNoticePost } from "../api/notice.api";

export function useNoticeMutations() {
  const queryClient = useQueryClient();
  const refreshLists = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.notices.lists });
  const create = useMutation({
    mutationFn: createNotices,
    onSuccess: refreshLists,
  });
  const update = useMutation({
    mutationFn: ({ id, post }: { id: number; post: UploadPostDraft }) =>
      updateNoticePost(id, post),
    onSuccess: (_, { id }) =>
      Promise.all([
        refreshLists(),
        queryClient.invalidateQueries({
          queryKey: queryKeys.notices.detail(id),
        }),
      ]),
  });
  const remove = useMutation({
    mutationFn: deleteNotice,
    onSuccess: async (_, deletedId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notices.detail(deletedId),
      });
      return refreshLists();
    },
  });
  return { createNotice: create.mutateAsync, updateNotice: update.mutateAsync, deleteNotice: remove.mutateAsync };
}
