export type CreateExamArchiveSemester = "FIRST" | "SECOND";

export type CreateExamArchiveExamType =
  | "MIDTERM"
  | "FINAL"
  | "QUIZ"
  | "ASSIGNMENT";

export interface CreateExamArchiveRecordDto {
  examYear: number;
  semester: CreateExamArchiveSemester;
  examType: CreateExamArchiveExamType;
  content: string;
}

export interface CreateExamArchiveRequestDto {
  subjectName: string;
  professorName: string;
  records: CreateExamArchiveRecordDto[];
}
