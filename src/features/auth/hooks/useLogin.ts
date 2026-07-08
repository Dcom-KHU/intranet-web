import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { ACCESS_TOKEN_KEY, AUTH_QUERY_KEY, REFRESH_TOKEN_KEY } from "../constants/auth.constants";

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
    onSuccess: async (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

      try {
        await queryClient.fetchQuery({
          queryKey: AUTH_QUERY_KEY,
          queryFn: authApi.me,
        });
      } catch (meError) {
        // /me 실패는 "로그인 실패"가 아니라 "세션 확인 실패"임을 구분
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
        throw new Error("SESSION_FETCH_FAILED");
      }
    },
    onError: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}
