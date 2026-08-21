import {
  type ExamArchiveDetailDto,
  type ExamArchiveRecordDto,
  type ExamArchivesDto,
  type ExamSemesterDto,
  type ExamTypeDto,
} from "../dto/exam-archives.dto";
import {
  type ExamArchiveDetailType,
  type ExamArchiveListType,
  type ExamArchiveType,
} from "../types/exam-archive.type";
import { formatDate } from "../../../utils/date";
import { htmlToText } from "../../../utils/html";
import type { UploadPostDraft } from "../../upload/types/upload.type";
import type {
  CreateExamArchiveExamType,
  CreateExamArchiveRecordDto,
  CreateExamArchiveRequestDto,
} from "../dto/create-exam-archive.dto";
import type { UpdateExamArchiveRequestDto } from "../dto/update-exam-archive.dto";
import { normalizeExamSubject } from "../utils/exam-archive.utils";

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
  examYear: post.examYear,
  semester:
    post.semesterCode === "FIRST" || post.semesterCode === "SECOND"
      ? post.semesterCode
      : null,
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

export const toUpdateExamArchiveRequest = (
  post: UploadPostDraft,
): UpdateExamArchiveRequestDto => {
  const selectedExamType = post.examType.trim()
    ? toCreateExamType(post.examType)
    : post.examTypeCode;

  return {
    subjectName: normalizeExamSubject(post.subject),
    professorName: post.professor.trim(),
    examYear: post.examYear,
    semester:
      post.semesterCode === "FIRST" || post.semesterCode === "SECOND"
        ? post.semesterCode
        : null,
    examType: selectedExamType,
    content: htmlToText(post.descriptionHtml),
    deleteFileIds: post.deleteFileIds,
  };
};

export const toExamArchive = (dto: ExamArchivesDto): ExamArchiveListType => ({
  id: dto.archiveId,
  subject: dto.subjectName,
  professor: dto.professorName,
  count: dto.recordCount,
  date: formatDate(dto.lastModifiedAt),
});

const semesterLabels: Record<ExamSemesterDto, string> = {
  FIRST: "1학기",
  SECOND: "2학기",
  SUMMER: "여름학기",
  WINTER: "겨울학기",
};

const examTypeLabels: Record<ExamTypeDto, string> = {
  MIDTERM: "중간고사",
  FINAL: "기말고사",
  QUIZ: "퀴즈",
  ASSIGNMENT: "과제",
};

const toSemesterLabel = (dto: ExamArchiveRecordDto) => {
  return [
    dto.examYear !== null ? `${dto.examYear}년` : null,
    dto.semester ? semesterLabels[dto.semester] : null,
    dto.examType ? examTypeLabels[dto.examType] : null,
  ]
    .filter((label): label is string => label !== null)
    .join(" ");
};

const toExamArchiveRecord = (
  dto: ExamArchiveRecordDto,
  archive: Pick<ExamArchiveDetailDto, "subjectName" | "professorName">,
): ExamArchiveType => ({
  id: dto.recordId,
  subject: archive.subjectName,
  professor: archive.professorName,
  semester: toSemesterLabel(dto),
  examYear: dto.examYear,
  semesterCode: dto.semester,
  examType: dto.examType,
  author: {
    studentNumber: dto.author.studentNumber,
    name: dto.author.name,
  },
  date: formatDate(dto.createdAt),
  description: dto.content,
  files: (dto.files ?? []).map((file) => ({
    id: file.fileId,
    name: file.originalFileName,
    url: file.fileUrl,
  })),
});

export const toExamArchiveDetail = (
  dto: ExamArchiveDetailDto,
): ExamArchiveDetailType => ({
  id: dto.archiveId,
  subject: dto.subjectName,
  professor: dto.professorName,
  posts: dto.records.map((record) => toExamArchiveRecord(record, dto)),
});
