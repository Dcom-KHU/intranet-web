import type { UploadPostsRequest, UploadPostsResponse } from "../types/upload.type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const uploadPosts = async ({
  mode,
  posts,
}: UploadPostsRequest): Promise<UploadPostsResponse> => {
  const formData = new FormData();
  const metadata = posts.map(({ files: _files, ...post }) => post);

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

  const response = await fetch(`${API_BASE_URL}/api/uploads/${mode}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`업로드 실패: ${response.status}`);
  }

  return response.json() as Promise<UploadPostsResponse>;
};
