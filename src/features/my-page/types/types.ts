import type { User } from "../../auth/types/user.type";

export type ActiveMenu = "profile" | "password" | "posts" | "comments";

export type MyPostType = "info" | "archives" | "gallery" | "notice";

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

export type MyPostItem = {
  key: string;
  id: number;
  number: number;
  board: MyPostType;
  boardLabel: string;
  title: string;
  date: string;
  href: string;
};

export type MyPostsPage = {
  total: number;
  posts: MyPostItem[];
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
