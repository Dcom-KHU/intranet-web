// 족보 목록 조회
export interface ExamArchivesDto {
  archiveId: number;
  subjectName: string;
  professorName: string;
  recordCount: number;
  lastModifiedAt: string;
}

export interface ExamArchivesPageDto {
  content: ExamArchivesDto[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export type ExamSemesterDto = "FIRST" | "SECOND" | "SUMMER" | "WINTER";
export type ExamTypeDto = "MIDTERM" | "FINAL";

export interface ExamArchiveFileDto {
  fileId: number;
  originalFileName: string;
  fileUrl: string;
}

export interface ExamArchiveRecordDto {
  recordId: number;
  examYear: number;
  semester: ExamSemesterDto;
  examType: ExamTypeDto;
  label: string | null;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  author: {
    name: string;
    studentNumber: string;
  };
  files: ExamArchiveFileDto[];
}

export interface ExamArchiveDetailDto {
  archiveId: number;
  subjectName: string;
  professorName: string;
  records: ExamArchiveRecordDto[];
}
