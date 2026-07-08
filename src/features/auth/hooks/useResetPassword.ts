import { useMutation, useQueryClient } from "@tanstack/react-query";

import { passwordApi } from "../api/password.api";
import { AUTH_QUERY_KEY } from "../constants/auth.constants";

export default function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: passwordApi.resetPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}
