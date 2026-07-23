import type {
  HomeArchiveDto,
  HomeInfoPostDto,
  HomeNoticeDto,
  HomePhotoAlbumDto,
} from "../dto/home.dto";

export interface HomeDashboard {
  recentNotices: HomeNoticeDto[];
  recentArchives: HomeArchiveDto[];
  recentInfoPosts: HomeInfoPostDto[];
  recentPhotoAlbums: HomePhotoAlbumDto[];
}
