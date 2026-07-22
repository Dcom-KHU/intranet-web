import type { NoticeDetailDto, NoticeListItemDto } from "../dto/notice.dto";
import type { NoticeDetailType, NoticeType } from "../types/notice.type";

export const toNotice = (dto: NoticeListItemDto): NoticeType => ({
  id: dto.noticeId,
  title: dto.title,
  author: dto.author,
  date: dto.createdAt.slice(0, 10),
});

export const toNoticeDetail = (dto: NoticeDetailDto): NoticeDetailType => ({
  id: dto.noticeId,
  title: dto.title,
  description: dto.content,
  author: dto.author,
  date: dto.createdAt.slice(0, 10),
  files: (dto.files ?? []).map((file) => file.originalFileName),
  fileItems: (dto.files ?? []).map((file) => ({
    id: file.fileId,
    name: file.originalFileName,
    url: file.fileUrl,
  })),
});
