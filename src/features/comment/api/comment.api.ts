import { Comments } from "../../../mocks/comments.mock";

export const getCommentsByPostId = async (postId: number) => {
  const comments = Comments.filter((comment) => comment.postId === postId);

  return Promise.resolve(comments);
};