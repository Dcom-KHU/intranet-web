import { api } from "@/api/client";
import axios from "axios";

import { getCommentsByAuthor } from "../../comment/api/comment.api";
import { getGalleryPosts } from "../../gallery/api/gallery.api";
import { getInfos } from "../../info-sharing/api/info-sharing.api";
import type {
  MyCommentItem,
  MyPostDto,
  MyPostItem,
  MyPostsPage,
  MyPostsResponseDto,
  MyPostType,
} from "../types/types";

const byNewestDate = <T extends { date: string }>(left: T, right: T) =>
  right.date.localeCompare(left.date);

const POST_TYPE: Record<MyPostType, { boardLabel: string; path: string }> = {
  info: {
    boardLabel: "정보 공유",
    path: "/info",
  },
  archives: {
    boardLabel: "족보",
    path: "/exam-archive",
  },
  gallery: {
    boardLabel: "활동 사진",
    path: "/gallery",
  },
  notice: {
    boardLabel: "공지사항",
    path: "/notice",
  },
};

const POST_TYPE_ALIASES: Record<string, MyPostType> = {
  info: "info",
  "info-posts": "info",
  info_posts: "info",
  "info-sharing": "info",
  info_sharing: "info",
  archives: "archives",
  archive: "archives",
  "exam-archive": "archives",
  exam_archive: "archives",
  gallery: "gallery",
  "photo-posts": "gallery",
  photo_posts: "gallery",
  notice: "notice",
  notices: "notice",
};

type MyPostsApiResponse =
  | MyPostsResponseDto
  | {
      data: MyPostsResponseDto;
    };

const unwrapMyPostsResponse = (
  response: MyPostsApiResponse,
): MyPostsResponseDto => {
  if ("posts" in response) return response;

  return response.data;
};

const normalizePostType = (type: string | undefined): MyPostType => {
  const normalizedType = type?.toLowerCase() ?? "";

  return POST_TYPE_ALIASES[normalizedType] ?? "info";
};

const toMyPostItem = (post: MyPostDto): MyPostItem => {
  const board = normalizePostType(post.type);
  const postType = POST_TYPE[board];

  return {
    key: `${board}-${post.id}`,
    id: post.id,
    number: post.number,
    board,
    boardLabel: postType.boardLabel,
    title: post.title,
    date: post.createdAt?.slice(0, 10) ?? "",
    href: `${postType.path}/${post.id}`,
  };
};

export const getMyPosts = async (
  page: number,
  size: number,
): Promise<MyPostsPage> => {
  try {
    const response = await api.get<MyPostsApiResponse>("/api/users/me/posts", {
      params: {
        page,
        size,
      },
    });
    const data = unwrapMyPostsResponse(response.data);

    return {
      total: data.total,
      posts: data.posts.map(toMyPostItem),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("status:", error.response?.status);
      console.error("response:", error.response?.data);
    }

    throw error;
  }
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
