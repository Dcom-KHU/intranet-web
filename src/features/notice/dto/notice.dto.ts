import type { postAuthor } from "../../auth/types/post-author.type";

export interface NoticeListItemDto {
  noticeId: number;
  title: string;
  author: postAuthor;
  createdAt: string;
  hasFiles: boolean;
}

export interface NoticeFileDto {
  fileId: number;
  originalFileName: string;
  fileUrl: string;
}

export interface NoticeDetailDto {
  noticeId: number;
  title: string;
  content: string;
  author: postAuthor;
  createdAt: string;
  files: NoticeFileDto[];
}

export interface NoticeDetailResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: NoticeDetailDto;
}

export interface NoticesResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: {
    noticeList: NoticeListItemDto[];
    pageInfo: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
  };
}
