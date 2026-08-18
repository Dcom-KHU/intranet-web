import type { ExamSemesterDto, ExamTypeDto } from "./exam-archives.dto";

export interface UpdateExamArchiveRequestDto {
  examYear: number | null;
  semester: ExamSemesterDto | null;
  examType: ExamTypeDto | null;
  content: string;
  deleteFileIds: number[];
}

export interface ExamArchiveResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: null;
}
