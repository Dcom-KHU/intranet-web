// 족보 목록 조회
export interface ExamArchivesDto {
  archiveId: number;
  subjectName: string;
  professorName: string;
  recordCount: number;
  lastModifiedAt: string;
}