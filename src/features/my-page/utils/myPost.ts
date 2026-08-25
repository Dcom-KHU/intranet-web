import type { MyPostDto } from "../types/my.types";

export const getMyPostDeletionId = (post: MyPostDto): number | null => {
  const targetId = post.type === "archives" ? Number(post.recordId) : post.id;

  return Number.isInteger(targetId) && targetId > 0 ? targetId : null;
};
