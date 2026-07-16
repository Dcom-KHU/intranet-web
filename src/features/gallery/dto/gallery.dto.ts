export interface GalleryAlbumDto {
  albumId: number;
  coverImageUrl: string;
  eventName: string;
  activityDate: string;
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
