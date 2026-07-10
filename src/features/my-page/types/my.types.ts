import type { User } from "../../auth/types/user.type";

export type ActiveMenu = "profile" | "password" | "posts" | "comments";

export type MyPostType = "info-posts" | "archives" | "photo-posts" | "notices";

export type MyPostDto = {
  id: number;
  title: string;
  type: MyPostType;
  professor?: string;
  recordId?: string;
  createdAt: string;
};

export type MyPostsResponseDto = {
  total: number;
  posts: MyPostDto[];
};

export type MyCommentDto = {
  id: number;
  number: number;
  type: string;
  targetId: number;
  targetTitle: string;
  content: string;
  createdAt: string;
};

export type MyCommentsResponseDto = {
  total: number;
  comments: MyCommentDto[];
};

export type SaveUserOptions = {
  emailChangeToken?: string;
};

export type SaveUser = (
  nextUser?: User,
  options?: SaveUserOptions,
) => Promise<boolean>;

export type DirtyChangeHandler = (isDirty: boolean) => void;
