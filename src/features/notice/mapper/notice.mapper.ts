import type { NoticeDetailDto, NoticeListItemDto } from "../dto/notice.dto";
import type { NoticeDetailType, NoticeType } from "../types/notice.type";
import type { UploadPostDraft } from "../../upload/types/upload.type";
import type { CreateNoticeRequestDto } from "../dto/create-notice.dto";
import type { UpdateNoticeRequestDto } from "../dto/update-notice.dto";
import { htmlToText } from "../../../utils/html";
import { formatDate } from "../../../utils/date";

export const toNotice = (dto: NoticeListItemDto): NoticeType => ({
  id: dto.noticeId,
  title: dto.title,
  author: dto.author,
  date: formatDate(dto.createdAt),
  hasAttachment: dto.hasFiles,
});

export const toNoticeDetail = (dto: NoticeDetailDto): NoticeDetailType => ({
  id: dto.noticeId,
  title: dto.title,
  description: dto.content,
  author: dto.author,
  date: formatDate(dto.createdAt),
  files: (dto.files ?? []).map((file) => file.originalFileName),
  fileItems: (dto.files ?? []).map((file) => ({
    id: file.fileId,
    name: file.originalFileName,
    url: file.fileUrl,
  })),
});

export const toCreateNoticeRequest = (
  post: UploadPostDraft,
): CreateNoticeRequestDto => ({
  title: post.title,
  content: htmlToText(post.descriptionHtml),
});

export const toUpdateNoticeRequest = (
  post: UploadPostDraft,
): UpdateNoticeRequestDto => ({
  title: post.title,
  content: htmlToText(post.descriptionHtml),
  deleteFileIds: post.deleteFileIds,
});
