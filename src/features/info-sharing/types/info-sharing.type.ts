import { type postAuthor } from "../../auth/types/post-author.type";

/**
 * 게시글 목록용
 */
export interface InfoPostList {
  id: number;
  title: string;
  author: postAuthor;
  createdAt: string;
  hasAttachment: boolean;
  fileCount: number;
}

export interface InfoPostListResponse {
  postId: number;
  title: string;
  author: postAuthor;
  createdAt: string;
  hasFiles: boolean;
  fileCount: number;
}

export interface InfoPostPageInfo {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface InfosResponse {
  postList: InfoPostListResponse[];
  pageInfo: InfoPostPageInfo;
}

export interface InfoPostFileResponse {
  fileId: number;
  originalFileName: string;
  fileUrl: string;
  fileSize?: number;
  contentType?: string;
}

export interface InfoPostDetailResponse {
  postId: number;
  title: string;
  content: string;
  author: postAuthor;
  createdAt: string;
  files: Array<InfoPostFileResponse | string>;
}

/**
 * 게시글 상세용
 */
export interface InfoPostDetail {
  id: number;
  title: string;
  description: string;
  author: postAuthor;
  createdAt: string;
  attachments: string[];
  attachmentItems: InfoPostFile[];
}

export interface InfoPostFile {
  id: number;
  name: string;
  url: string;
}

export interface UpdatedInfoPost {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  attachments: InfoPostFile[];
}
