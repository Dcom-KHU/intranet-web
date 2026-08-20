import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { createNotices, deleteNotice, updateNoticePost } from "../api/notice.api";

export function useNoticeMutations() {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.notices.all });
  const create = useMutation({ mutationFn: createNotices, onSuccess: refresh });
  const update = useMutation({ mutationFn: ({ id, post }: { id: number; post: UploadPostDraft }) => updateNoticePost(id, post), onSuccess: refresh });
  const remove = useMutation({ mutationFn: deleteNotice, onSuccess: refresh });
  return { createNotice: create.mutateAsync, updateNotice: update.mutateAsync, deleteNotice: remove.mutateAsync };
}
