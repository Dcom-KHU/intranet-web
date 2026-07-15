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

    console.log(response.data)

    return response.data.data;
};

// 정보공유 게시글 상세 조회
export const getInfoDetailById = async (id: number) => {
  const response = await api.get<{ data: InfoPostDetailResponse }>(
    `/api/info-posts/${id}`
  );

  console.log("상세:", response.data)

  return toInfoPostDetail(response.data.data);
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

  console.log('수정완료');

  return toUpdatedInfoPost(response.data.data);
};

// 정보공유 게시글 삭제
export const deleteInfoPost = async (id: number) => {
  const response = await api.delete(
    `/api/info-posts/${id}`,
  );

  return response.data;
}
