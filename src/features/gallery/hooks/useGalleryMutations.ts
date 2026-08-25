import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import type { GalleryPostsPage } from "../types/gallery-post.type";
import { createGalleryPosts, deleteGalleryPost, updateGalleryPost } from "../api/gallery.api";

export function useGalleryMutations() {
  const queryClient = useQueryClient();
  const refreshLists = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.gallery.lists });
  const create = useMutation({
    mutationFn: createGalleryPosts,
    onSuccess: refreshLists,
  });
  const update = useMutation({
    mutationFn: ({ id, post }: { id: number; post: UploadPostDraft }) =>
      updateGalleryPost(id, post),
    onSuccess: (_, { id }) =>
      Promise.all([
        refreshLists(),
        queryClient.invalidateQueries({
          queryKey: queryKeys.gallery.detail(id),
        }),
      ]),
  });
  const remove = useMutation({
    mutationFn: deleteGalleryPost,
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<GalleryPostsPage>(
        { queryKey: queryKeys.gallery.lists },
        (page) =>
          page
            ? {
                ...page,
                posts: page.posts.filter((post) => post.id !== deletedId),
                totalElements: Math.max(0, page.totalElements - 1),
              }
            : page,
      );
      queryClient.removeQueries({
        queryKey: queryKeys.gallery.detail(deletedId),
        exact: true,
      });
      return refreshLists();
    },
  });
  return { createGallery: create.mutateAsync, updateGallery: update.mutateAsync, deleteGallery: remove.mutateAsync };
}
