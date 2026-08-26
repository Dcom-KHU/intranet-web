import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_QUERY_KEY } from "../constants/auth.constants";
import { clearAuthSession } from "../utils/auth-storage";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
    
    onSettled: () => {
      clearAuthSession();

      queryClient.removeQueries({ 
        queryKey: AUTH_QUERY_KEY 
      });
    },
  });
}
