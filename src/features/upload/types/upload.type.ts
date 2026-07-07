export type UploadMode = "exam" | "gallery" | "notice" | "info";

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
  existingFiles: string[];
};

export type UploadEntry = UploadPostDraft & {
  id: number;
};

export type UploadFormProps = {
  mode: UploadMode;
  title: string;
  initialSubject?: string;
  initialProfessor?: string;
  initialPost?: Partial<UploadPostDraft>;
  submitLabel?: string;
  onSubmit?: (post: UploadPostDraft) => Promise<void>;
  onCreate?: (posts: UploadPostDraft[]) => Promise<void>;
  onCancel?: () => void;
  cancelLabel?: string;
};

export type UploadPostsRequest = {
  mode: UploadMode;
  posts: UploadPostDraft[];
};

export type UploadPostsResponse = {
  success: boolean;
  uploadedCount: number;
};
