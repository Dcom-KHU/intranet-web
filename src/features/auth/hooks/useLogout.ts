import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, AUTH_QUERY_KEY } from "../constants/auth.constants";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
    
    onSettled: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      queryClient.removeQueries({ 
        queryKey: AUTH_QUERY_KEY 
      });
    },
  });
}
