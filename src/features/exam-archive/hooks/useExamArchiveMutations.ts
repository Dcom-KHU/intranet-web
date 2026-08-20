import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { createExamArchives, deleteExamPost, updateExamPost } from "../api/exam-archive.api";

export function useExamArchiveMutations() {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.examArchives.all });
  const create = useMutation({ mutationFn: createExamArchives, onSuccess: refresh });
  const update = useMutation({ mutationFn: ({ archiveId, recordId, post }: { archiveId: number; recordId: number; post: UploadPostDraft }) => updateExamPost(archiveId, recordId, post), onSuccess: refresh });
  const remove = useMutation({ mutationFn: ({ archiveId, recordId }: { archiveId: number; recordId: number }) => deleteExamPost(archiveId, recordId), onSuccess: refresh });
  return { createExamArchives: create.mutateAsync, updateExamArchive: update.mutateAsync, deleteExamArchive: remove.mutateAsync };
}
