import type { MyPostDto, MyPostType } from "../types/my.types";

const ADMIN_ONLY_POST_TYPES = new Set<MyPostType>([
  "notices",
  "photo-posts",
]);

export const canDeleteMyPost = (
  post: MyPostDto,
  currentRole?: "USER" | "ADMIN",
) => !ADMIN_ONLY_POST_TYPES.has(post.type) || currentRole === "ADMIN";

export const getMyPostDeletionId = (post: MyPostDto): number | null => {
  const targetId = post.type === "archives" ? Number(post.recordId) : post.id;

  return Number.isInteger(targetId) && targetId > 0 ? targetId : null;
};
