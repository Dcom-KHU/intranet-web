import { type UploadPostDraft } from "../../upload/types/upload.type";
import type {
  CreateExamArchiveExamType,
  CreateExamArchiveRecordDto,
  CreateExamArchiveRequestDto,
  CreateExamArchiveSemester,
} from "../dto/create-exam-archive.dto";


export const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

const toCreateSemester = (semester: string): CreateExamArchiveSemester => {
  const semesterNumber = semester.split("-")[1];

  return semesterNumber === "2" ? "SECOND" : "FIRST";
};

const toCreateExamType = (examType: string): CreateExamArchiveExamType => {
  const examTypeMap: Record<string, CreateExamArchiveExamType> = {
    중간고사: "MIDTERM",
    기말고사: "FINAL",
    퀴즈: "QUIZ",
    과제: "ASSIGNMENT",
  };

  return examTypeMap[examType] ?? "MIDTERM";
};

const toCreateExamArchiveRecord = (
  post: UploadPostDraft,
): CreateExamArchiveRecordDto => ({
  examYear: Number(post.semester.split("-")[0]),
  semester: toCreateSemester(post.semester),
  examType: toCreateExamType(post.examType),
  content: htmlToText(post.descriptionHtml),
});

export const toCreateExamArchiveRequest = (
  post: UploadPostDraft,
): CreateExamArchiveRequestDto => ({
  subjectName: post.subject.trim(),
  professorName: post.professor.trim(),
  records: [toCreateExamArchiveRecord(post)],
});
