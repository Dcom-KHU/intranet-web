import type { postAuthor } from "../../auth/types/post-author.type";

export interface CommentDto {
  commentId: number;
  postId: number;
  content: string;
  author: postAuthor;
  createdAt: string;
  updatedAt: string | null;
}

export interface CommentsResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: {
    comments: CommentDto[];
  };
}
