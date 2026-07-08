import type { ExamSemesterDto, ExamTypeDto } from "./exam-archives.dto";

export interface UpdateExamArchiveRequestDto {
  examYear: number;
  semester: ExamSemesterDto;
  examType: ExamTypeDto;
  content: string;
  deleteFileIds: number[];
}

export interface UpdateExamArchiveResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: null;
}
