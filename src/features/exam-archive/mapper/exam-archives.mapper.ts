import { type ExamArchivesDto } from "../dto/exam-archives.dto";
import { type ExamArchiveListType } from "../types/exam-archive.type";

export const toExamArchive = (dto: ExamArchivesDto): ExamArchiveListType => ({
  id: dto.archiveId,
  subject: dto.subjectName,
  professor: dto.professorName,
  count: dto.recordCount,
  date: dto.lastModifiedAt,
});