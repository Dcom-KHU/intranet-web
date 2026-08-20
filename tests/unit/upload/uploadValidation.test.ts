import { describe, expect, it } from "vitest";
import { createUploadEntry } from "@/features/upload/utils/uploadEntry";
import { getUploadValidationError } from "@/features/upload/utils/uploadValidation";

describe("upload required field validation", () => {
  it("족보는 과목명과 교수명이 없으면 제출을 막는다", () => {
    const entry = createUploadEntry(1, "", "교수", { descriptionHtml: "내용" });
    expect(getUploadValidationError("exam", [entry])).toBe("과목명과 교수명을 입력해주세요.");
  });

  it("공지 제목이 공백뿐이면 제출을 막는다", () => {
    const entry = createUploadEntry(1, "", "", { title: "   ", descriptionHtml: "내용" });
    expect(getUploadValidationError("notice", [entry])).toBe("제목을 입력해주세요.");
  });

  it("HTML 태그만 있는 본문은 빈 내용으로 판단한다", () => {
    const entry = createUploadEntry(1, "", "", { title: "제목", descriptionHtml: "<p><br></p>" });
    expect(getUploadValidationError("info", [entry])).toBe("내용을 입력해주세요.");
  });

  it("활동사진 날짜가 없으면 제출을 막는다", () => {
    const entry = createUploadEntry(1, "", "", { title: "행사", descriptionHtml: "내용", files: [new File(["x"], "a.jpg")] });
    expect(getUploadValidationError("gallery", [entry])).toBe("활동 날짜를 입력해주세요.");
  });

  it("활동사진 파일이 한 장도 없으면 제출을 막는다", () => {
    const entry = createUploadEntry(1, "", "", { title: "행사", descriptionHtml: "내용", date: "2026-08-21" });
    expect(getUploadValidationError("gallery", [entry])).toBe("사진을 최소 1개 이상 첨부해주세요.");
  });

  it("필수값이 모두 있으면 제출을 허용한다", () => {
    const entry = createUploadEntry(1, "", "", { title: "행사", descriptionHtml: "<p>내용</p>", date: "2026-08-21", existingFiles: ["saved.jpg"] });
    expect(getUploadValidationError("gallery", [entry])).toBeNull();
  });
});
