export type UploadMode = "exam" | "gallery" | "notice" | "info";

export type UploadExistingFile = {
  id: number;
  name: string;
  url: string;
};

export type UploadPostDraft = {
  subject: string;
  professor: string;
  examYear: number;
  semester: string;
  semesterCode: "FIRST" | "SECOND" | "SUMMER" | "WINTER";
  examType: string;
  examTypeCode: "MIDTERM" | "FINAL";
  title: string;
  date: string;
  location: string;
  content: string;
  descriptionHtml: string;
  files: File[];
  existingFiles: string[];
  existingFileItems: UploadExistingFile[];
  deleteFileIds: number[];
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
