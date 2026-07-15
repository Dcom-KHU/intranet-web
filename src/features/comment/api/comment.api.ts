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
  create: (postId: number, content: string) => Promise<Comment>;
  update: (
    postId: number,
    commentId: number,
    content: string,
  ) => Promise<Comment>;
  delete: (postId: number, commentId: number) => Promise<void>;
};

// 정보공유 게시글
const infoSharingCommentApi: CommentApi = {
  // 게시글 댓글
  getByPostId: async (postId) => {
    const response = await api.get<CommentsResponseDto>(
      `/api/info-posts/${postId}/comments`,
    );

    console.log(response.data.data)
    return response.data.data.comments.map(toComment);
  },
  // 댓글 작성
  create: async (postId, content) => {
    const request: CreateCommentRequestDto = { content };
    const response = await api.post<CommentResponseDto>(
      `/api/info-posts/${postId}/comments`,
      request,
    );
    return toComment(response.data.data);
  },
  // 댓글 수정
  update: async (postId, commentId, content) => {
    const request: UpdateCommentRequestDto = { content };
    const response = await api.put<CommentResponseDto>(
      `/api/info-posts/${postId}/comments/${commentId}`,
      request,
    );
    return toComment(response.data.data);
  },
  // 댓글 삭제
  delete: async (postId, commentId) => {
    await api.delete(
      `/api/info-posts/${postId}/comments/${commentId}`,
    );
  },
};

// 활동사진 게시글
const photoPostsCommentApi: CommentApi = {
  // 댓글 목록
  getByPostId: async (albumId) => {
    const response = await api.get<CommentsResponseDto>(
      `/api/photo-posts/${albumId}/comments`,
    );

    console.log(response.data.data)
    return response.data.data.comments.map(toComment);
  },
  // 댓글 생성
  create: async (albumId, content) => {
    const request: CreateCommentRequestDto = { content };
    const response = await api.post<CommentResponseDto>(
      `/api/photo-posts/${albumId}/comments`,
      request,
    );

    return toComment(response.data.data);
  },
  // 댓글 수정
  update: async (albumId, commentId, content) => {
    const request: UpdateCommentRequestDto = { content };
    const response = await api.put<CommentResponseDto>(
      `/api/photo-posts/${albumId}/comments/${commentId}`,
      request,
    );
    return toComment(response.data.data);
  },
  // 댓글 삭제 
  delete: async (albumId, commentId) => {
    await api.delete(
      `/api/photo-posts/${albumId}/comments/${commentId}`,
    );
  },
};

const commentApiByTarget: Record<CommentTarget, CommentApi> = {
  "photo-posts": photoPostsCommentApi,
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
  content: string,
) => getCommentApi(target).create(postId, content);

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
