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
import { formatDate } from "../../../utils/date";

export const toCreateGalleryRequest = (
  post: UploadPostDraft,
): CreateGalleryRequestDto => ({
  eventName: post.title,
  activityDate: post.date,
  place: post.location.trim(),
  description: htmlToText(post.descriptionHtml),
});

export const toUpdateGalleryRequest = (
  post: UploadPostDraft,
): UpdateGalleryRequestDto => ({
  eventName: post.title,
  activityDate: post.date,
  place: post.location.trim(),
  description: htmlToText(post.descriptionHtml),
});

export const toGalleryPostsPage = (
  response: GalleryAlbumsResponseDto["data"],
): GalleryPostsPage => ({
  posts: response.albumList.map((album) => ({
    id: album.albumId,
    imageUrl: album.coverImageUrl,
    title: album.eventName,
    date: formatDate(album.activityDate),
    imageCount: album.imageCount,
  })),
  ...response.pageInfo,
});

export const toGalleryPostDetail = (
  response: GalleryAlbumDetailDto,
): GalleryPostDetail => ({
  id: response.albumId,
  title: response.eventName,
  date: formatDate(response.activityDate),
  location: response.place?.trim() || undefined,
  description: response.description,
  images: response.imageList,
});
