import { galleryPosts, galleryPostDetails } from "../../../mocks/gallery.mock";
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
} from "../mapper/gallery.mapper";

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

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
  const detail = galleryPostDetails.find((item) => item.id === id);
  const listItem = galleryPosts.find((item) => item.id === id);

  if (!detail || !listItem) throw new Error("활동 사진을 찾을 수 없습니다.");

  const images = [
    ...post.existingFiles,
    ...post.files.map((file) => URL.createObjectURL(file)),
  ];

  detail.title = post.title;
  detail.description = htmlToText(post.descriptionHtml);
  detail.date = post.date;
  detail.images = images;

  listItem.title = detail.title;
  listItem.date = detail.date;
  listItem.imageCount = images.length;
  listItem.imageUrl = images[0];
  return detail;
};
