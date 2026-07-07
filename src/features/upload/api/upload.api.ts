import type { UploadPostsRequest, UploadPostsResponse } from "../types/upload.type";
import { api } from "@/api/client";

export const uploadPosts = async ({
  mode,
  posts,
}: UploadPostsRequest): Promise<UploadPostsResponse> => {
  const formData = new FormData();
  const metadata = posts.map((post) => {
    const { files, ...postMetadata } = post;
    void files;
    return postMetadata;
  });

  formData.append("mode", mode);
  formData.append(
    "metadata",
    new Blob([JSON.stringify({ posts: metadata })], {
      type: "application/json",
    }),
  );

  posts.forEach((post, postIndex) => {
    post.files.forEach((file) => {
      formData.append(`posts[${postIndex}].files`, file);
    });
  });

  const response = await api.post<UploadPostsResponse>(
    `/api/uploads/${mode}`,
    formData,
  );

  return response.data;
};
