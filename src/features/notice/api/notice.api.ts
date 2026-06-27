import { notice_detail_mock, notice_mock } from "../../../mocks/notice.mock";
import type { UploadPostDraft } from "../../upload/types/upload.type";

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

// 공지사항 전체 목록 조회
export const getNotices = async () => {
  return Promise.resolve(notice_mock);
};

// 공지사항 상세 조회
export const getNoticeDetail = async () => {
  return Promise.resolve(notice_detail_mock)
}

export const updateNoticePost = async (id: number, post: UploadPostDraft) => {
  const detail = notice_detail_mock.find((item) => item.id === id);
  const listItem = notice_mock.find((item) => item.id === id);

  if (!detail || !listItem) throw new Error("공지사항을 찾을 수 없습니다.");

  detail.title = post.title;
  detail.description = htmlToText(post.descriptionHtml);
  detail.files = [
    ...post.existingFiles,
    ...post.files.map((file) => file.name),
  ];

  listItem.title = detail.title;
  listItem.hasAttachment = detail.files.length > 0;
  return detail;
};
