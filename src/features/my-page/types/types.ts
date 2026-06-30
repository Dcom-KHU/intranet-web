import type { User } from "../../auth/types/user.type";

export type ActiveMenu = "profile" | "password" | "posts" | "comments";

export type MyPostItem = {
  key: string;
  board: "notice" | "info-sharing" | "exam-archive" | "gallery";
  boardLabel: string;
  title: string;
  date: string;
  href: string;
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
