import { api } from "@/api/client";

import type {
  MyCommentsResponseDto,
  MyPostsResponseDto,
} from "../types/my.types";

type ApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

export const getMyPosts = async (
  page: number,
  size: number,
): Promise<MyPostsResponseDto> => {
  const response = await api.get<ApiResponse<MyPostsResponseDto>>(
    "/api/users/me/posts",
    {
      params: {
        page,
        size,
      },
    },
  );

  console.log("getMyPosts response:", response.data);

  return response.data.data;
};

export const getMyComments = async (
  page: number,
  size: number,
): Promise<MyCommentsResponseDto> => {
  const response = await api.get<ApiResponse<MyCommentsResponseDto>>(
    "/api/users/me/comments",
    {
      params: {
        page,
        size,
      },
    },
  );

  console.log("getMyComments response:", response.data);

  return response.data.data;
};
