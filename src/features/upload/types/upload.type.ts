export type UploadMode = "exam" | "gallery" | "notice";

export type UploadPostDraft = {
  subject: string;
  professor: string;
  semester: string;
  examType: string;
  title: string;
  date: string;
  location: string;
  descriptionHtml: string;
  files: File[];
};

export type UploadPostsRequest = {
  mode: UploadMode;
  posts: UploadPostDraft[];
};

export type UploadPostsResponse = {
  success: boolean;
  uploadedCount: number;
};
