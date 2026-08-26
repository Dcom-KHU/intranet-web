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
import { formatDate } from "../../../utils/date";

export const toCreateGalleryRequest = (
  post: UploadPostDraft,
): CreateGalleryRequestDto => ({
  eventName: post.title,
  activityDate: post.date,
  place: post.location.trim(),
  description: post.descriptionHtml,
});

export const toUpdateGalleryRequest = (
  post: UploadPostDraft,
): UpdateGalleryRequestDto => ({
  eventName: post.title,
  activityDate: post.date,
  place: post.location.trim(),
  description: post.descriptionHtml,
  deleteFileIds: post.deleteFileIds,
});

const toGalleryImageItem = (url: string) => {
  const imageId = Number(url.match(/\/images\/(\d+)(?:[/?#]|$)/)?.[1]);
  if (!Number.isInteger(imageId) || imageId <= 0) return null;

  return {
    id: imageId,
    name: `이미지 ${imageId}`,
    url,
  };
};

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
  imageItems: response.imageList
    .map(toGalleryImageItem)
    .filter((image): image is NonNullable<typeof image> => image !== null),
});
