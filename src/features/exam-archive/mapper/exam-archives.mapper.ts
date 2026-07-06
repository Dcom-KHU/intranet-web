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

export const toExamArchive = (dto: ExamArchivesDto): ExamArchiveListType => ({
  id: dto.archiveId,
  subject: dto.subjectName,
  professor: dto.professorName,
  count: dto.recordCount,
  date: dto.lastModifiedAt,
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

const toExamArchiveRecord = (
  dto: ExamArchiveRecordDto,
  archive: Pick<ExamArchiveDetailDto, "subjectName" | "professorName">,
): ExamArchiveType => ({
  id: dto.recordId,
  subject: archive.subjectName,
  professor: archive.professorName,
  semester: `${dto.examYear}년 ${semesterLabels[dto.semester]} ${examTypeLabels[dto.examType]}`,
  author: {
    studentNumber: dto.author.studentNumber,
    name: dto.author.nickname,
  },
  date: dto.createdAt.slice(0, 10),
  description: dto.content,
  files: dto.files.map((file) => file.originalFileName),
});

export const toExamArchiveDetail = (
  dto: ExamArchiveDetailDto,
): ExamArchiveDetailType => ({
  id: dto.archiveId,
  subject: dto.subjectName,
  professor: dto.professorName,
  posts: dto.records.map((record) => toExamArchiveRecord(record, dto)),
});
