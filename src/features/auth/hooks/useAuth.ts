import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import toUser from "../mapper/user.mapper";
import { AUTH_QUERY_KEY } from "../constants/auth.constants";
import { getAccessToken } from "../utils/auth-storage";

export default function useAuth() {
  const hasAccessToken = Boolean(getAccessToken());
  const query = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authApi.me,
    enabled: hasAccessToken,
    select: toUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    ...query,
    currentUser: query.data ?? null,
    isLoggedIn: Boolean(query.data),
    isAuthLoading: hasAccessToken && query.isPending,
  };
}
