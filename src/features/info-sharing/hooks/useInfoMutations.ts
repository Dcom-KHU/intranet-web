import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { createInfoPosts, deleteInfoPost, updateInfoPost } from "../api/info-sharing.api";

export function useInfoMutations() {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.infoPosts.all });
  const create = useMutation({ mutationFn: createInfoPosts, onSuccess: refresh });
  const update = useMutation({ mutationFn: ({ id, post }: { id: number; post: UploadPostDraft }) => updateInfoPost(id, post), onSuccess: refresh });
  const remove = useMutation({ mutationFn: deleteInfoPost, onSuccess: refresh });
  return { createInfo: create.mutateAsync, updateInfo: update.mutateAsync, deleteInfo: remove.mutateAsync };
}
