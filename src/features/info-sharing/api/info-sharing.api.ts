import { api } from "@/api/client";
import { type UploadPostDraft } from "../../upload/types/upload.type";
import type {
  InfoPostDetailResponse,
  InfosResponse,
} from "../types/info-sharing.type";
import {
  toCreateInfoPostRequest,
  toInfoPostDetail,
  toUpdatedInfoPost,
  toUpdateInfoPostRequest,
} from "../mapper/info.mapper";
import type { UpdateInfoPostResponseDto } from "../dto/update-info-post.dto";


export interface InfosRequest {
  page?: number;
  size?: number;
  keyword?: string;
}

// 정보공유 게시글 목록 조회
export const getInfos = async ({
  page = 0,
  size = 10,
  keyword,
}: InfosRequest) => {
  const response = await api.get<{ data: InfosResponse }>(
    "/api/info-posts", {
      params: {
        page,
        size,
        ...(keyword ? { keyword } : {}),
      },
    });

    console.log("정보공유 게시글 목록 조회 응답:", response.data);
    return response.data.data;
};

// 정보공유 게시글 상세 조회
export const getInfoDetailById = async (
  id: number,
  signal?: AbortSignal,
) => {
  const response = await api.get<{ data: InfoPostDetailResponse | null }>(
    `/api/info-posts/${id}`,
    { signal },
  );

  return response.data.data
    ? toInfoPostDetail(response.data.data)
    : null;
};

// 정보공유 첨부파일 다운로드
export const downloadInfoPostFile = async (
  fileId: number,
  fileName: string,
) => {
  const response = await api.get<Blob>(
    `/api/attachments/info-posts/${fileId}/download`,
    { responseType: "blob" },
  );
  const objectUrl = URL.createObjectURL(response.data);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
};

// 정보공유 게시글 등록
export const createInfoPosts = async (posts: UploadPostDraft[]) => {
  await Promise.all(
    posts.map((post) => {
      const formData = new FormData();

      formData.append(
        "request",
        JSON.stringify(toCreateInfoPostRequest(post)),
      );
      post.files.forEach((file) => formData.append("files", file));

      return api.post("/api/info-posts", formData);
    }),
  );
};

// 정보공유 게시글 수정
export const updateInfoPost = async (id: number, post: UploadPostDraft) => {
  const formData = new FormData();

  formData.append(
    "request",
    JSON.stringify(toUpdateInfoPostRequest(post)),
  );
  post.files.forEach((file) => formData.append("files", file));

  const response = await api.put<UpdateInfoPostResponseDto>(
    `/api/info-posts/${id}`,
    formData,
  );


  return toUpdatedInfoPost(response.data.data);
};

// 정보공유 게시글 삭제
export const deleteInfoPost = async (id: number) => {
  const response = await api.delete(
    `/api/info-posts/${id}`,
  );

  return response.data;
}
