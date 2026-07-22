import type { UploadPostDraft } from "../../upload/types/upload.type";
import { api } from "@/api/client";
import type {
  NoticeDetailResponseDto,
  NoticesResponseDto,
} from "../dto/notice.dto";
import {
  toCreateNoticeRequest,
  toUpdateNoticeRequest,
} from "../mapper/notice.mapper";

export interface NoticesRequest {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string;
}

// 공지사항 전체 목록 조회
export const getNotices = async ({
  keyword,
  page = 0,
  size = 10,
  sort,
}: NoticesRequest = {}) => {
  const response = await api.get<NoticesResponseDto>(
    "/api/notice",
    {
      params: {
        ...(keyword ? { keyword } : {}),
        page,
        size,
        ...(sort ? { sort } : {}),
      },
    },
  );

  console.log(response.data)
  return response.data.data;
};

// 공지사항 상세 조회
export const getNoticeDetail = async (noticeId: number) => {
  const response = await api.get<NoticeDetailResponseDto>(
    `/api/notice/${noticeId}`,
  );

  console.log(response.data)
  return response.data.data;
};

// 공지사항 작성
export const createNotices = async (posts: UploadPostDraft[]) => {
  await Promise.all(
    posts.map((post) => {
      const formData = new FormData();

      formData.append(
        "request",
        JSON.stringify(toCreateNoticeRequest(post)),
      );
      post.files.forEach((file) => formData.append("files", file));

      return api.post("/api/notice", formData);
    }),
  );
};

// 공지사항 수정
export const updateNoticePost = async (
  noticeId: number,
  post: UploadPostDraft,
) => {
  const formData = new FormData();

  formData.append(
    "request",
    JSON.stringify(toUpdateNoticeRequest(post)),
  );
  post.files.forEach((file) => formData.append("files", file));

  const response = await api.put(
    `/api/notice/${noticeId}`,
    formData,
  );

  return response.data;
};

// 공지사항 삭제
export const deleteNotice = async (noticeId: number) => {
  const response = await api.delete(`/api/notice/${noticeId}`);

  return response.data;
};
