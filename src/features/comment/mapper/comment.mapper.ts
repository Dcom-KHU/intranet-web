import type { CommentDto } from "../dto/comment.dto";
import type { Comment } from "../types/comment.type";

export const toComment = (dto: CommentDto): Comment => ({
  id: dto.commentId,
  postId: dto.postId ?? dto.albumId ?? 0,
  content: dto.content,
  author: dto.author,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});
