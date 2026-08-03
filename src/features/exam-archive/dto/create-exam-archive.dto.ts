export type CreateExamArchiveSemester = "FIRST" | "SECOND" | "UNKNOWN";

export type CreateExamArchiveExamType =
  | "MIDTERM"
  | "FINAL"
  | "QUIZ"
  | "ASSIGNMENT";

export interface CreateExamArchiveRecordDto {
  examYear: number | null;
  semester: CreateExamArchiveSemester;
  examType: CreateExamArchiveExamType;
  content: string;
}

export interface CreateExamArchiveRequestDto {
  subjectName: string;
  professorName: string;
  records: CreateExamArchiveRecordDto[];
}
