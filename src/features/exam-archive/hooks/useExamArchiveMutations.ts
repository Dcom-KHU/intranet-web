import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { createExamArchives, deleteExamPost, updateExamPost } from "../api/exam-archive.api";

export function useExamArchiveMutations() {
  const queryClient = useQueryClient();
  const refreshLists = () =>
    [
      queryClient.invalidateQueries({
        queryKey: queryKeys.examArchives.lists,
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.examArchives.searches,
      }),
    ];
  const create = useMutation({
    mutationFn: createExamArchives,
    onSuccess: () => Promise.all(refreshLists()),
  });
  const update = useMutation({
    mutationFn: ({ archiveId, recordId, post }: { archiveId: number; recordId: number; post: UploadPostDraft }) =>
      updateExamPost(archiveId, recordId, post),
    onSuccess: (_, { archiveId }) =>
      Promise.all([
        ...refreshLists(),
        queryClient.invalidateQueries({
          queryKey: queryKeys.examArchives.detail(archiveId),
        }),
      ]),
  });
  const remove = useMutation({
    mutationFn: ({ archiveId, recordId }: { archiveId: number; recordId: number }) =>
      deleteExamPost(archiveId, recordId),
    onSuccess: async (_, { archiveId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.examArchives.detail(archiveId),
      });
      return Promise.all(refreshLists());
    },
  });
  return { createExamArchives: create.mutateAsync, updateExamArchive: update.mutateAsync, deleteExamArchive: remove.mutateAsync };
}
