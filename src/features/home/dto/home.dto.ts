import type { postAuthor } from "../../auth/types/post-author.type";

export interface HomeNoticeDto {
  id: number;
  title: string;
  author: postAuthor;
  date: string;
  hasAttachment: boolean;
}

export interface HomeArchiveDto {
  id: number;
  subject: string;
  professor: string;
  author: postAuthor;
  date: string;
}

export interface HomeInfoPostDto {
  id: number;
  title: string;
  author: postAuthor;
  date: string;
  hasAttachment: boolean;
}

export interface HomePhotoAlbumDto {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  imageCount: number;
}

export interface HomeDashboardResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: {
    recentNotices: HomeNoticeDto[];
    recentArchives: HomeArchiveDto[];
    recentInfoPosts: HomeInfoPostDto[];
    recentPhotoAlbums: HomePhotoAlbumDto[];
  };
}
