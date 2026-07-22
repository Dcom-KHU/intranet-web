import { type postAuthor } from "../../auth/types/post-author.type";

// 공지사항 목록 조회
export interface NoticeType {
  id: number;
  title: string;
  author: postAuthor;
  date: string;
  hasAttachment?: boolean;
}

export interface NoticePageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 공지사항 상세 조회
export interface NoticeDetailType {
  id: number;
  title: string;
  description: string;
  author: postAuthor;
  date: string;
  files?: string[];
  fileItems?: NoticeFile[];
}

export interface NoticeFile {
  id: number;
  name: string;
  url: string;
}
