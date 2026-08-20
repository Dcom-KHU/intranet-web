import type { CommentDto } from "../dto/comment.dto";
import type { Comment } from "../types/comment.type";
import { formatDate } from "../../../utils/date";

export const toComment = (dto: CommentDto): Comment => ({
  id: dto.commentId,
  postId: dto.postId ?? dto.albumId ?? 0,
  content: dto.content,
  author: dto.author,
  createdAt: formatDate(dto.createdAt),
  updatedAt: dto.updatedAt ? formatDate(dto.updatedAt) : null,
});
