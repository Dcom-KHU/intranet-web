import type {
  GalleryAlbumDetailDto,
  GalleryAlbumsResponseDto,
} from "../dto/gallery.dto";
import type {
  GalleryPostDetail,
  GalleryPostsPage,
} from "../types/gallery-post.type";
import type { UploadPostDraft } from "../../upload/types/upload.type";
import type { CreateGalleryRequestDto } from "../dto/create-gallery.dto";
import type { UpdateGalleryRequestDto } from "../dto/update-gallery.dto";

const apiOrigin = new URL(import.meta.env.VITE_API_BASE_URL).origin;

export const toGalleryImageUrl = (url: string) => {
  if (!url) return "";

  try {
    return new URL(url, apiOrigin).toString();
  } catch {
    return url;
  }
};

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export const toCreateGalleryRequest = (
  post: UploadPostDraft,
): CreateGalleryRequestDto => ({
  eventName: post.title,
  activityDate: post.date,
  description: htmlToText(post.descriptionHtml),
});

export const toUpdateGalleryRequest = (
  post: UploadPostDraft,
): UpdateGalleryRequestDto => ({
  eventName: post.title,
  activityDate: post.date,
  description: htmlToText(post.descriptionHtml),
});

export const toGalleryPostsPage = (
  response: GalleryAlbumsResponseDto["data"],
): GalleryPostsPage => ({
  posts: response.albumList.map((album) => ({
    id: album.albumId,
    imageUrl: toGalleryImageUrl(album.coverImageUrl),
    title: album.eventName,
    date: album.activityDate,
  })),
  ...response.pageInfo,
});

export const toGalleryPostDetail = (
  response: GalleryAlbumDetailDto,
): GalleryPostDetail => ({
  id: response.albumId,
  title: response.eventName,
  date: response.activityDate,
  description: response.description,
  images: response.imageList.map(toGalleryImageUrl),
});
