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
  views: number;
}

export interface InfoPostListResponse {
  postId: number;
  title: string;
  author: postAuthor;
  createdAt: string;
  hasFiles: boolean;
  fileCount: number;
  views: number;
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

/**
 * 게시글 상세용
 */
export interface InfoPostDetail {
  id: number;
  title: string;
  description: string;
  author: postAuthor;
  date: string;
  attachments: string[];
}
