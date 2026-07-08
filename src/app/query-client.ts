import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// retry false: 인증 API 실패 시, 계속 재시도하는 것을 방지하기 위해 설정
// refetchOnWindowFocus false: 탭 이동마다 /me 호출 방지 위해 설정