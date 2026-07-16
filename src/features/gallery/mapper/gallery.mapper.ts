import type {
  GalleryAlbumDetailDto,
  GalleryAlbumsResponseDto,
} from "../dto/gallery.dto";
import type {
  GalleryPostDetail,
  GalleryPostsPage,
} from "../types/gallery-post.type";

const apiOrigin = new URL(import.meta.env.VITE_API_BASE_URL).origin;

const toGalleryImageUrl = (url: string) => {
  if (!url) return "";

  try {
    return new URL(url, apiOrigin).toString();
  } catch {
    return url;
  }
};

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
