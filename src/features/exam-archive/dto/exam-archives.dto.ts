// 족보 목록 조회
export interface ExamArchivesDto {
  archiveId: number;
  subjectName: string;
  professorName: string;
  recordCount: number;
  lastModifiedAt: string;
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
  content: string;
  createdAt: string;
  updatedAt: string | null;
  author: {
    nickname: string;
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
