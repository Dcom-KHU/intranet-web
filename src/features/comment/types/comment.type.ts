import { type postAuthor } from "../../auth/types/post-author.type";

export type Comment = {
    id: number;
    postId: number;
    author: postAuthor;
    content: string;
    createdAt: string;
};