import type {
  InfoPostDetail,
  InfoPostDetailResponse,
  InfoPostList,
  InfoPostListResponse,
  UpdatedInfoPost,
} from "../types/info-sharing.type";
import type { UploadPostDraft } from "../../upload/types/upload.type";
import type {
  UpdateInfoPostRequestDto,
  UpdateInfoPostResponseDataDto,
} from "../dto/update-info-post.dto";

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
  attachmentItems: (response.files ?? [])
    .filter((file) => typeof file !== "string")
    .map((file) => ({
      id: file.fileId,
      name: file.originalFileName,
      url: file.fileUrl,
    })),
});

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export const toUpdateInfoPostRequest = (
  post: UploadPostDraft,
): UpdateInfoPostRequestDto => ({
  title: post.title,
  content: htmlToText(post.descriptionHtml),
  deleteFileIds: post.deleteFileIds,
});

export const toUpdatedInfoPost = (
  response: UpdateInfoPostResponseDataDto,
): UpdatedInfoPost => ({
  id: response.postId,
  title: response.title,
  description: response.content,
  updatedAt: response.updatedAt,
  attachments: response.files.map((file) => ({
    id: file.fileId,
    name: file.originalFileName,
    url: file.fileUrl,
  })),
});
