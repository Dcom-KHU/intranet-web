import { describe, expect, it } from "vitest";
import {
  MAX_FILE_SIZE_BYTES,
  MAX_UPLOAD_REQUEST_SIZE_BYTES,
} from "@/features/upload/constants/uploadConfig";
import { validateUploadFiles } from "@/features/upload/utils/fileValidation";

const sizedFile = (name: string, size: number, type = "application/octet-stream") => {
  const file = new File(["test"], name, { type, lastModified: 1 });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

describe("upload file validation", () => {
  it("파일 하나가 정확히 100MB이면 허용하고 1바이트 초과하면 거절한다", () => {
    const allowed = sizedFile("allowed.pdf", MAX_FILE_SIZE_BYTES);
    const oversized = sizedFile("oversized.pdf", MAX_FILE_SIZE_BYTES + 1);
    const result = validateUploadFiles({ selectedFiles: [allowed, oversized], existingFiles: [], mode: "notice", totalSelectedFileSize: 0 });

    expect(result.filesToAdd).toEqual([allowed]);
    expect(result.oversizedFiles).toEqual([oversized]);
  });

  it("전체 첨부가 정확히 100MB이면 허용하고 1바이트 초과하면 모두 추가하지 않는다", () => {
    const file = sizedFile("last.pdf", 10);
    const atLimit = validateUploadFiles({ selectedFiles: [file], existingFiles: [], mode: "info", totalSelectedFileSize: MAX_UPLOAD_REQUEST_SIZE_BYTES - 10 });
    const overLimit = validateUploadFiles({ selectedFiles: [file], existingFiles: [], mode: "info", totalSelectedFileSize: MAX_UPLOAD_REQUEST_SIZE_BYTES - 9 });

    expect(atLimit.filesToAdd).toEqual([file]);
    expect(atLimit.exceedsRequestLimit).toBe(false);
    expect(overLimit.filesToAdd).toEqual([]);
    expect(overLimit.exceedsRequestLimit).toBe(true);
  });

  it("활동사진은 jpg, jpeg, png, heic만 대소문자와 관계없이 허용한다", () => {
    const images = ["a.jpg", "b.JPEG", "c.png", "d.heic"].map((name) => sizedFile(name, 1));
    const pdf = sizedFile("document.pdf", 1);
    const result = validateUploadFiles({ selectedFiles: [...images, pdf], existingFiles: [], mode: "gallery", totalSelectedFileSize: 0 });

    expect(result.filesToAdd).toEqual(images);
    expect(result.invalidFormatFiles).toEqual([pdf]);
  });

  it("동일한 파일을 다시 선택해도 중복 첨부하지 않는다", () => {
    const existing = sizedFile("same.png", 10, "image/png");
    const duplicate = sizedFile("same.png", 10, "image/png");
    const result = validateUploadFiles({ selectedFiles: [duplicate], existingFiles: [existing], mode: "gallery", totalSelectedFileSize: 10 });
    expect(result.filesToAdd).toEqual([]);
  });
});
