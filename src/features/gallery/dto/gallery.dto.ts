// 활동사진 목록 조회
export interface GalleryAlbumDto {
  albumId: number;
  coverImageUrl: string;
  eventName: string;
  activityDate: string;
  imageCount: number;
}

export interface GalleryAlbumsResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: {
    albumList: GalleryAlbumDto[];
    pageInfo: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
  };
}

export interface GalleryAlbumDetailDto {
  albumId: number;
  eventName: string;
  activityDate: string;
  place?: string | null;
  imageList: string[];
  description: string;
}

export interface GalleryAlbumDetailResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: GalleryAlbumDetailDto;
}
