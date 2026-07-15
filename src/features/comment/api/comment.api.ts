import { GalleryComments } from "../../../mocks/comments.mock";
import type { postAuthor } from "../../auth/types/post-author.type";
import type { Comment } from "../types/comment.type";
import { api } from "@/api/client";
import type {
  CommentResponseDto,
  CommentsResponseDto,
  CreateCommentRequestDto,
  UpdateCommentRequestDto,
} from "../dto/comment.dto";
import { toComment } from "../mapper/comment.mapper";

export type CommentTarget = "photo-posts" | "info-sharing";

type CommentApi = {
  getByPostId: (postId: number) => Promise<Comment[]>;
  create: (
    postId: number,
    author: postAuthor,
    content: string,
  ) => Promise<Comment>;
  update: (
    postId: number,
    commentId: number,
    content: string,
  ) => Promise<Comment>;
  delete: (postId: number, commentId: number) => Promise<void>;
};

/**
 * 현재는 mock 데이터를 사용한다.
 * 실제 API 연결 시 target별 구현체만 교체하면 호출부는 변경하지 않아도 된다.
 */
const createMockCommentApi = (initialComments: Comment[]): CommentApi => {
  let comments = [...initialComments];
  let nextCommentId =
    Math.max(0, ...initialComments.map((comment) => comment.id)) + 1;

  return {
    getByPostId: async (postId) =>
      comments.filter((comment) => comment.postId === postId),

    create: async (postId, author, content) => {
      const comment: Comment = {
        id: nextCommentId++,
        postId,
        author,
        content,
        createdAt: "방금 전",
      };

      comments = [...comments, comment];
      return comment;
    },

    update: async (_postId, commentId, content) => {
      const existingComment = comments.find(
        (comment) => comment.id === commentId,
      );

      if (!existingComment) throw new Error("댓글을 찾을 수 없습니다.");

      const updatedComment = { ...existingComment, content };
      comments = comments.map((comment) =>
        comment.id === commentId ? updatedComment : comment,
      );

      return updatedComment;
    },

    delete: async (_postId, commentId) => {
      comments = comments.filter((comment) => comment.id !== commentId);
    },
  };
};

let infoComments: Comment[] = [];

const infoSharingCommentApi: CommentApi = {
  getByPostId: async (postId) => {
    const response = await api.get<CommentsResponseDto>(
      `/api/info-posts/${postId}/comments`,
    );

    infoComments = response.data.data.comments.map(toComment);
    return infoComments;
  },
  create: async (postId, _author, content) => {
    const request: CreateCommentRequestDto = { content };
    const response = await api.post<CommentResponseDto>(
      `/api/info-posts/${postId}/comments`,
      request,
    );
    const comment = toComment(response.data.data);

    infoComments = [...infoComments, comment];
    return comment;
  },
  update: async (postId, commentId, content) => {
    const request: UpdateCommentRequestDto = { content };
    const response = await api.put<CommentResponseDto>(
      `/api/info-posts/${postId}/comments/${commentId}`,
      request,
    );
    const updatedComment = toComment(response.data.data);

    infoComments = infoComments.map((item) =>
      item.id === commentId ? updatedComment : item,
    );
    return updatedComment;
  },
  delete: async (postId, commentId) => {
    await api.delete(
      `/api/info-posts/${postId}/comments/${commentId}`,
    );

    infoComments = infoComments.filter((comment) => comment.id !== commentId);
  },
};

const commentApiByTarget: Record<CommentTarget, CommentApi> = {
  "photo-posts": createMockCommentApi(GalleryComments),
  "info-sharing": infoSharingCommentApi,
};

const getCommentApi = (target: CommentTarget) => commentApiByTarget[target];

export const getCommentsByPostId = (
  postId: number,
  target: CommentTarget,
) => getCommentApi(target).getByPostId(postId);

export const createComment = (
  postId: number,
  target: CommentTarget,
  author: postAuthor,
  content: string,
) => getCommentApi(target).create(postId, author, content);

export const updateComment = (
  postId: number,
  commentId: number,
  target: CommentTarget,
  content: string,
) => getCommentApi(target).update(postId, commentId, content);

export const deleteComment = (
  postId: number,
  commentId: number,
  target: CommentTarget,
) => getCommentApi(target).delete(postId, commentId);
