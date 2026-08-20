import {
  MAX_FILE_SIZE_BYTES,
  MAX_UPLOAD_REQUEST_SIZE_BYTES,
} from "../constants/uploadConfig";
import type { UploadMode } from "../types/upload.type";

export const GALLERY_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "heic"] as const;

const fileKey = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}-${file.type}`;

export type FileValidationResult = {
  filesToAdd: File[];
  invalidFormatFiles: File[];
  oversizedFiles: File[];
  exceedsRequestLimit: boolean;
};

export function validateUploadFiles({
  selectedFiles,
  existingFiles,
  mode,
  totalSelectedFileSize,
}: {
  selectedFiles: File[];
  existingFiles: File[];
  mode: UploadMode;
  totalSelectedFileSize: number;
}): FileValidationResult {
  const knownKeys = new Set(existingFiles.map(fileKey));
  const uniqueFiles = selectedFiles.filter((file) => {
    const key = fileKey(file);
    if (knownKeys.has(key)) return false;
    knownKeys.add(key);
    return true;
  });
  const invalidFormatFiles = mode === "gallery"
    ? uniqueFiles.filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
        return !GALLERY_IMAGE_EXTENSIONS.includes(
          extension as (typeof GALLERY_IMAGE_EXTENSIONS)[number],
        );
      })
    : [];
  const validFormatFiles = uniqueFiles.filter(
    (file) => !invalidFormatFiles.includes(file),
  );
  const oversizedFiles = validFormatFiles.filter(
    (file) => file.size > MAX_FILE_SIZE_BYTES,
  );
  const sizeValidFiles = validFormatFiles.filter(
    (file) => file.size <= MAX_FILE_SIZE_BYTES,
  );
  const addedSize = sizeValidFiles.reduce((sum, file) => sum + file.size, 0);
  const exceedsRequestLimit =
    totalSelectedFileSize + addedSize > MAX_UPLOAD_REQUEST_SIZE_BYTES;

  return {
    filesToAdd: exceedsRequestLimit ? [] : sizeValidFiles,
    invalidFormatFiles,
    oversizedFiles,
    exceedsRequestLimit,
  };
}
