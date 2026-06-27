import { examTypeOptions, semesterOptions } from "../constants/uploadConfig";
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
  semester: semesterOptions[0],
  examType: examTypeOptions[0],
  title: "",
  date: "",
  location: "",
  descriptionHtml: "",
  files: [],
  existingFiles: [],
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
