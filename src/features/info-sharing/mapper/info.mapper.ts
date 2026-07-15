import type {
  InfoPostDetail,
  InfoPostDetailResponse,
  InfoPostList,
  InfoPostListResponse,
} from "../types/info-sharing.type";

export const toInfoPostList = (
  response: InfoPostListResponse,
): InfoPostList => ({
  id: response.postId,
  title: response.title,
  author: response.author,
  createdAt: response.createdAt,
  hasAttachment: response.hasFiles,
  fileCount: response.fileCount,
  views: response.views,
});

export const toInfoPostDetail = (
  response: InfoPostDetailResponse,
): InfoPostDetail => ({
  id: response.postId,
  title: response.title,
  description: response.content,
  author: response.author,
  createdAt: response.createdAt,
  attachments: (response.files ?? []).map((file) =>
    typeof file === "string" ? file : file.originalFileName,
  ),
});
