import { toGalleryImageUrl } from "../../gallery/mapper/gallery.mapper";
import type { HomeDashboardResponseDto } from "../dto/home.dto";
import type { HomeDashboard } from "../types/home.type";

export const toHomeDashboard = (
  dto: HomeDashboardResponseDto["data"],
): HomeDashboard => ({
  recentNotices: dto.recentNotices,
  recentArchives: dto.recentArchives,
  recentInfoPosts: dto.recentInfoPosts,
  recentPhotoAlbums: dto.recentPhotoAlbums.map((album) => ({
    ...album,
    imageUrl: toGalleryImageUrl(album.imageUrl),
  })),
});
