import { examTypeOptions } from "../constants/uploadConfig";
import type {
  UploadEntry,
  UploadPostDraft,
} from "../types/upload.type";

export const createUploadEntry = (
  id: number,
  initialSubject = "",
  initialProfessor = "",
  initialPost?: Partial<UploadPostDraft>,
): UploadEntry => ({
  id,
  subject: initialSubject,
  professor: initialProfessor,
  examYear: null,
  semester: "",
  semesterCode: null,
  examType: examTypeOptions[0],
  examTypeCode: "MIDTERM",
  title: "",
  date: "",
  location: "",
  content: "",
  descriptionHtml: "",
  files: [],
  existingFiles: [],
  existingFileItems: [],
  deleteFileIds: [],
  ...initialPost,
});

export const getEntriesSignature = (entries: UploadEntry[]) =>
  JSON.stringify(
    entries.map(({ files, ...entry }) => ({
      ...entry,
      files: files.map(({ name, size, lastModified, type }) => ({
        name,
        size,
        lastModified,
        type,
      })),
    })),
  );
