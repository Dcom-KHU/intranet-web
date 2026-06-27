import { galleryPosts, galleryPostDetails } from "../../../mocks/gallery.mock";
import type { UploadPostDraft } from "../../upload/types/upload.type";

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export const getGalleryPosts = async () => {
  return Promise.resolve(galleryPosts);
};

export const getGalleryById = async (id: number) => {
  const gallery = galleryPostDetails.find((item) => item.id === id);

  if (!gallery) {
    return null;
  }

  return Promise.resolve(gallery);
};

export const updateGalleryPost = async (id: number, post: UploadPostDraft) => {
  const detail = galleryPostDetails.find((item) => item.id === id);
  const listItem = galleryPosts.find((item) => item.id === id);

  if (!detail || !listItem) throw new Error("활동 사진을 찾을 수 없습니다.");

  const images = [
    ...post.existingFiles,
    ...post.files.map((file) => URL.createObjectURL(file)),
  ];

  detail.title = post.title;
  detail.description = htmlToText(post.descriptionHtml);
  detail.date = post.date;
  detail.images = images;

  listItem.title = detail.title;
  listItem.date = detail.date;
  listItem.imageCount = images.length;
  listItem.imageUrl = images[0];
  return detail;
};
