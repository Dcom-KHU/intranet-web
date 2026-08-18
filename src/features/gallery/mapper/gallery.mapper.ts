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
import { htmlToText } from "../../../utils/html";

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
    imageUrl: album.coverImageUrl,
    title: album.eventName,
    date: album.activityDate,
    imageCount: album.imageCount,
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
  images: response.imageList,
});
