export interface NoticeType {
  id: number;
  title: string;
  author: string;
  date: string;
}

export interface NoticeDetailType {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  files?: string[];
}