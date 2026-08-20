import { uploadModeConfig } from "../constants/uploadConfig";
import type { UploadEntry, UploadMode } from "../types/upload.type";
import { htmlToText } from "../../../utils/html";

export function getUploadValidationError(
  mode: UploadMode,
  entries: UploadEntry[],
): string | null {
  const config = uploadModeConfig[mode];

  if (config.showExamFields && entries.some((entry) => !entry.subject.trim() || !entry.professor.trim())) {
    return "과목명과 교수명을 입력해주세요.";
  }
  if (config.requireTitle && entries.some((entry) => !entry.title.trim())) {
    return "제목을 입력해주세요.";
  }
  if (config.requireDescription && entries.some((entry) => !htmlToText(entry.descriptionHtml))) {
    return "내용을 입력해주세요.";
  }
  if (config.showGalleryFields && entries.some((entry) => !entry.date)) {
    return "활동 날짜를 입력해주세요.";
  }
  if (config.requireImage && entries.some((entry) =>
    entry.files.length === 0 &&
    entry.existingFiles.length === 0 &&
    entry.existingFileItems.length === 0
  )) {
    return "사진을 최소 1개 이상 첨부해주세요.";
  }
  return null;
}
