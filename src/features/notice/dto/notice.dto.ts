import type { postAuthor } from "../../auth/types/post-author.type";

export interface NoticeListItemDto {
  noticeId: number;
  title: string;
  author: postAuthor;
  createdAt: string;
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
