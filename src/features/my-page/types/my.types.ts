import type { User } from "../../auth/types/user.type";

export type ActiveMenu = "profile" | "password" | "posts" | "comments";

export type MyPostType = "info-posts" | "archives" | "photo-posts" | "notices";

export type MyPostDto = {
  id: number;
  number: number;
  title: string;
  type: MyPostType;
  createdAt: string;
};

export type MyPostsResponseDto = {
  total: number;
  posts: MyPostDto[];
};

export type MyCommentItem = {
  key: string;
  board: "gallery" | "info-sharing";
  boardLabel: string;
  postTitle: string;
  content: string;
  date: string;
  href: string;
};

export type SaveUser = (nextUser?: User) => Promise<boolean>;

export type DirtyChangeHandler = (isDirty: boolean) => void;
