import { api } from "@/api/client";
import { type UploadPostDraft } from "../../upload/types/upload.type";
import { infoPostList, infoPostDetail } from "../../../mocks/info-sharing.mock";
import type { InfosResponse } from "../types/info-sharing.type";


const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();


export interface InfosRequest {
  page?: number;
  size?: number;
  keyword?: string;
}

// 정보공유 게시글 목록 조회
export const getInfos = async ({
  page = 0,
  size = 10,
  keyword,
}: InfosRequest) => {
  const response = await api.get<{ data: InfosResponse }>(
    "/api/info-posts", {
      params: {
        page,
        size,
        ...(keyword ? { keyword } : {}),
      },
    });

    console.log(response.data)

    return response.data.data;
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
  listItem.fileCount = detail.attachments.length;
  return detail;
};
