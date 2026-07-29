import { type UploadPostDraft } from "../../upload/types/upload.type";
import { htmlToText } from "../../../utils/html";
import type {
  CreateExamArchiveExamType,
  CreateExamArchiveRecordDto,
  CreateExamArchiveRequestDto,
  CreateExamArchiveSemester,
} from "../dto/create-exam-archive.dto";

export const normalizeExamSubject = (subject: string) =>
  subject.replace(/\s+/g, "");

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
  subjectName: normalizeExamSubject(post.subject),
  professorName: post.professor.trim(),
  records: [toCreateExamArchiveRecord(post)],
});
