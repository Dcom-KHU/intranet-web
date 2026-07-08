import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import toUser from "../mapper/user.mapper";
import { ACCESS_TOKEN_KEY, AUTH_QUERY_KEY } from "../constants/auth.constants";

export default function useAuth() {
  const hasAccessToken = Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
  const query = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authApi.me,
    enabled: hasAccessToken,
    select: toUser,
    staleTime: 5 * 60 * 1000,
  });

  console.log("useAuth query data:", query.data); 
  return {
    ...query,
    currentUser: query.data ?? null,
    isLoggedIn: Boolean(query.data),
    isAuthLoading: hasAccessToken && query.isPending,
  };
}
