import type { UploadPostDraft } from "../../upload/types/upload.type";
import { api } from "@/api/client";
import type {
  GalleryAlbumDetailResponseDto,
  GalleryAlbumsResponseDto,
} from "../dto/gallery.dto";
import {
  toGalleryPostDetail,
  toGalleryPostsPage,
  toCreateGalleryRequest,
  toUpdateGalleryRequest,
} from "../mapper/gallery.mapper";

// 활동사진 목록 조회
export const getGalleryPosts = async (page = 0, size = 8) => {
  const response = await api.get<GalleryAlbumsResponseDto>(
    "/api/photo-posts",
    { params: { page, size } },
  );

  return toGalleryPostsPage(response.data.data);
};

// 활동사진 상세 조회
export const getGalleryById = async (id: number) => {
  const response = await api.get<GalleryAlbumDetailResponseDto>(
    `/api/photo-posts/${id}`,
  );

  return toGalleryPostDetail(response.data.data);
};

// 활동사진 게시글 등록
export const createGalleryPosts = async (posts: UploadPostDraft[]) => {
  await Promise.all(
    posts.map((post) => {
      const formData = new FormData();

      formData.append(
        "request",
        JSON.stringify(toCreateGalleryRequest(post)),
      );
      post.files.forEach((file) => formData.append("files", file));

      return api.post("/api/photo-posts", formData);
    }),
  );
};

// 활동사진 게시글 수정
export const updateGalleryPost = async (id: number, post: UploadPostDraft) => {
  const formData = new FormData();

  formData.append(
    "request",
    JSON.stringify(toUpdateGalleryRequest(post)),
  );

  // 새 사진이 있으면 기존 사진 전체를 교체하고,
  // 없으면 files 파트를 생략해 기존 사진을 유지합니다.
  post.files.forEach((file) => formData.append("files", file));

  const response = await api.put(
    `/api/photo-posts/${id}`,
    formData,
  );

  return response.data;
};
