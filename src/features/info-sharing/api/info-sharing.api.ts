import { infoPostList, infoPostDetail } from "../../../mocks/info-sharing.mock";
import type { UploadPostDraft } from "../../upload/types/upload.type";

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export const getInfos = async () => {
  return Promise.resolve(infoPostList);
};

export const getInfoDetailById = async (id: number) => {
  const info = infoPostDetail.find((item) => item.id === id);

  if (!info) {
    return null;
  }

  return Promise.resolve(info);
};

export const updateInfoPost = async (id: number, post: UploadPostDraft) => {
  const detail = infoPostDetail.find((item) => item.id === id);
  const listItem = infoPostList.find((item) => item.id === id);

  if (!detail || !listItem) throw new Error("게시글을 찾을 수 없습니다.");

  detail.title = post.title;
  detail.description = htmlToText(post.descriptionHtml);
  detail.attachments = [
    ...post.existingFiles,
    ...post.files.map((file) => file.name),
  ];

  listItem.title = detail.title;
  listItem.hasAttachment = detail.attachments.length > 0;
  return detail;
};
