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
