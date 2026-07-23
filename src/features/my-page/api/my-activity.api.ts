import { api } from "@/api/client";

import type {
  MyCommentsResponseDto,
  MyCommentType,
  MyPostsResponseDto,
  MyPostType,
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

export const deleteMyPost = async (
  postId: number,
  type: MyPostType,
) => {
  const response = await api.delete(
    `/api/users/me/posts/${postId}`,
    {
      params: { type },
    },
  );

  return response.data;
};

export const deleteMyComment = async (
  commentId: number,
  type: MyCommentType,
) => {
  const response = await api.delete(
    `/api/users/me/comments/${commentId}`,
    {
      params: { type },
    },
  );

  return response.data;
};

export const withdrawMe = async () => {
  await api.patch("/api/users/me/withdraw");
};
