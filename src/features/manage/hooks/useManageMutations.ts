import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/app/query-keys";
import { approveUser, deleteManagedUser, rejectUser, transferAdmin } from "../api/manage.api";

export function useManageMutations() {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.manage.all });
  const approve = useMutation({ mutationFn: approveUser, onSuccess: refresh });
  const reject = useMutation({ mutationFn: rejectUser, onSuccess: refresh });
  const remove = useMutation({ mutationFn: deleteManagedUser, onSuccess: refresh });
  const transfer = useMutation({
    mutationFn: ({ userId, targetUserId }: { userId: number; targetUserId: number }) => transferAdmin(userId, targetUserId),
    onSuccess: () => queryClient.invalidateQueries(),
  });
  return { approveUser: approve.mutateAsync, rejectUser: reject.mutateAsync, deleteManagedUser: remove.mutateAsync, transferAdmin: transfer.mutateAsync };
}
