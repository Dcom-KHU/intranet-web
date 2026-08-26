import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { AUTH_QUERY_KEY } from "../constants/auth.constants";
import type { LoginRequest } from "../types/auth.type";
import {
  clearAuthTokens,
  setSavedLoginId,
  storeAuthTokens,
} from "../utils/auth-storage";

type LoginVariables = LoginRequest & {
  saveLoginId: boolean;
};

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ loginId, password }: LoginVariables) =>
      authApi.login({ loginId, password }),
    onMutate: () => {
      clearAuthTokens();
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
    onSuccess: async (data, variables) => {
      storeAuthTokens(data);

      try {
        await queryClient.fetchQuery({
          queryKey: AUTH_QUERY_KEY,
          queryFn: authApi.me,
        });
        setSavedLoginId(variables.saveLoginId ? variables.loginId : null);
      } catch (meError) {
        // /me 실패는 "로그인 실패"가 아니라 "세션 확인 실패"임을 구분
        clearAuthTokens();
        queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
        throw new Error("SESSION_FETCH_FAILED", { cause: meError });
      }
    },
    onError: () => {
      clearAuthTokens();
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}
