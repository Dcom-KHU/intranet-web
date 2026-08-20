import { describe, expect, it } from "vitest";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { toCreateExamArchiveRequest, toUpdateExamArchiveRequest } from "@/features/exam-archive/mapper/exam-archives.mapper";

const draft = {
  subject: "  자료구조  ", professor: "  홍길동  ", examYear: null,
  semesterCode: null, examType: "", examTypeCode: "FINAL",
  descriptionHtml: "<p>시험 <em>범위</em></p>", deleteFileIds: [11],
} as UploadPostDraft;

describe("exam archive request mapper", () => {
  it("선택하지 않은 연도와 학기는 null로 전달한다", () => {
    const request = toCreateExamArchiveRequest(draft);
    expect(request.professorName).toBe("홍길동");
    expect(request.records[0]).toMatchObject({ examYear: null, semester: null, content: "시험 범위" });
  });

  it("수정 요청에서 시험 유형 코드와 삭제 파일 ID를 유지한다", () => {
    expect(toUpdateExamArchiveRequest(draft)).toMatchObject({ examYear: null, semester: null, examType: "FINAL", deleteFileIds: [11], content: "시험 범위" });
  });
});
