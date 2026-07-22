import type { NoticeListItemDto } from "../dto/notice.dto";
import type { NoticeType } from "../types/notice.type";

export const toNotice = (dto: NoticeListItemDto): NoticeType => ({
  id: dto.noticeId,
  title: dto.title,
  author: dto.author,
  date: dto.createdAt.slice(0, 10),
});
