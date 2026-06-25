// 공지사항 목록 조회
export interface NoticeType {
  id: number;
  title: string;
  author: string;
  date: string;
  hasAttachment: boolean;
}

// 공지사항 상세 조회
export interface NoticeDetailType {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  files?: string[];
}