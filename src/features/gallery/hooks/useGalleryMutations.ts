import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { createGalleryPosts, deleteGalleryPost, updateGalleryPost } from "../api/gallery.api";

export function useGalleryMutations() {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.gallery.all });
  const create = useMutation({ mutationFn: createGalleryPosts, onSuccess: refresh });
  const update = useMutation({ mutationFn: ({ id, post }: { id: number; post: UploadPostDraft }) => updateGalleryPost(id, post), onSuccess: refresh });
  const remove = useMutation({ mutationFn: deleteGalleryPost, onSuccess: refresh });
  return { createGallery: create.mutateAsync, updateGallery: update.mutateAsync, deleteGallery: remove.mutateAsync };
}
