import { api } from "@/api/client";

import { getCommentsByAuthor } from "../../comment/api/comment.api";
import { getGalleryPosts } from "../../gallery/api/gallery.api";
import { getInfos } from "../../info-sharing/api/info-sharing.api";
import type { MyCommentItem, MyPostsResponseDto } from "../types/my.types";

type ApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

const byNewestDate = <T extends { date: string }>(left: T, right: T) =>
  right.date.localeCompare(left.date);

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
  studentNumber: string,
): Promise<MyCommentItem[]> => {
  const [comments, infos, galleryPosts] = await Promise.all([
    getCommentsByAuthor(studentNumber),
    getInfos(),
    getGalleryPosts(),
  ]);

  return comments
    .flatMap((comment): MyCommentItem[] => {
      const isGallery = comment.target === "gallery";
      const post = isGallery
        ? galleryPosts.find((item) => item.id === comment.postId)
        : infos.find((item) => item.id === comment.postId);

      if (!post) return [];

      return [
        {
          key: `${comment.target}-${comment.id}`,
          board: comment.target,
          boardLabel: isGallery ? "활동 사진" : "정보공유",
          postTitle: post.title,
          content: comment.content,
          date: comment.createdAt,
          href: isGallery
            ? `/gallery/${comment.postId}`
            : `/info/${comment.postId}`,
        },
      ];
    })
    .sort(byNewestDate);
};
