import { type postAuthor } from "../../auth/types/post-author.type";

/**
 * 게시글 목록용
 */
export interface InfoPostList {
    id: number;
    title: string;
    author: postAuthor;
    date: string;
    hasAttachment: boolean;
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