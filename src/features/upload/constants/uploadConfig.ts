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

export const semesterOptions = ["2026-1", "2025-2", "2025-1", "2024-2"];

export const examTypeOptions = ["중간고사", "기말고사", "퀴즈", "과제"];
