import { type GalleryComment } from "../features/gallery/types/gallery-post.type";

export const galleryComments: GalleryComment[] = [
  {
    id: 1,
    galleryId: 1,
    authorName: "23 User",
    content: "커리어 세션 내용이 정말 유익했어요. 다음에도 이런 자리 기대합니다!",
    createdAt: "2026.05.16",
  },
  {
    id: 2,
    galleryId: 1,
    authorName: "22 User",
    content: "선배님들 경험담 들을 수 있어서 좋았습니다.",
    createdAt: "2026.05.17",
  },
  {
    id: 3,
    galleryId: 2,
    authorName: "24 User",
    content: "발표 준비하신 분들 모두 고생 많으셨습니다.",
    createdAt: "2026.05.09",
  },
  {
    id: 4,
    galleryId: 3,
    authorName: "21 User",
    content: "네트워킹 데이 분위기 너무 좋았어요.",
    createdAt: "2026.04.27",
  },
];
