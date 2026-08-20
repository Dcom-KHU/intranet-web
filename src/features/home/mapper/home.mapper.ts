import type { HomeDashboardResponseDto } from "../dto/home.dto";
import type { HomeDashboard } from "../types/home.type";
import { formatDate } from "../../../utils/date";

export const toHomeDashboard = (
  dto: HomeDashboardResponseDto["data"],
): HomeDashboard => ({
  recentNotices: dto.recentNotices.map((notice) => ({
    ...notice,
    date: formatDate(notice.date),
  })),
  recentArchives: dto.recentArchives.map((archive) => ({
    ...archive,
    date: formatDate(archive.date),
  })),
  recentInfoPosts: dto.recentInfoPosts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  })),
  recentPhotoAlbums: dto.recentPhotoAlbums.map((album) => ({
    ...album,
    date: formatDate(album.date),
  })),
});
