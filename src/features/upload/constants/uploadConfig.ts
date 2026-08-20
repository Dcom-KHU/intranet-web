import type { UploadMode } from "../types/upload.type";

export type UploadModeConfig = {
  requireTitle: boolean;
  requireDescription: boolean;
  requireImage: boolean;
  showExamFields: boolean;
  showGalleryFields: boolean;
  allowMultiplePosts: boolean;
};

const baseNoticeConfig: UploadModeConfig = {
  requireTitle: true,
  requireDescription: true,
  requireImage: false,
  showExamFields: false,
  showGalleryFields: false,
  allowMultiplePosts: false,
};

export const uploadModeConfig: Record<UploadMode, UploadModeConfig> = {
  exam: {
    requireTitle: false,
    requireDescription: true,
    requireImage: false,
    showExamFields: true,
    showGalleryFields: false,
    allowMultiplePosts: true,
  },
  gallery: {
    requireTitle: true,
    requireDescription: true,
    requireImage: true,
    showExamFields: false,
    showGalleryFields: true,
    allowMultiplePosts: false,
  },
  notice: baseNoticeConfig,
  info: baseNoticeConfig,
};

export const emptyExamPeriodOption = "선택 안 함";

const currentYear = new Date().getFullYear();
export const examYearOptions = [
  emptyExamPeriodOption,
  ...Array.from(
    { length: currentYear - 1998 },
    (_, index) => String(currentYear - index),
  ),
];

export const semesterOptions = [emptyExamPeriodOption, "1학기", "2학기"];

export const examTypeOptions = ["중간고사", "기말고사", "퀴즈", "과제"];

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
export const MAX_UPLOAD_REQUEST_SIZE_BYTES = 100 * 1024 * 1024;
