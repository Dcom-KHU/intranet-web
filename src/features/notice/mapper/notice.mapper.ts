import type { NoticeDetailDto, NoticeListItemDto } from "../dto/notice.dto";
import type { NoticeDetailType, NoticeType } from "../types/notice.type";
import type { UploadPostDraft } from "../../upload/types/upload.type";
import type { CreateNoticeRequestDto } from "../dto/create-notice.dto";
import type { UpdateNoticeRequestDto } from "../dto/update-notice.dto";

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

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

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
