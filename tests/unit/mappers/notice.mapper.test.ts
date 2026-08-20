import { describe, expect, it } from "vitest";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { toCreateNoticeRequest, toUpdateNoticeRequest } from "@/features/notice/mapper/notice.mapper";

const draft = {
  title: "공지 제목",
  descriptionHtml: "<p>중요한 <strong>공지</strong></p>",
  deleteFileIds: [3, 7],
} as UploadPostDraft;

describe("notice request mapper", () => {
  it("에디터 HTML을 서버 요청용 일반 문자열로 변환한다", () => {
    expect(toCreateNoticeRequest(draft)).toEqual({ title: "공지 제목", content: "중요한 공지" });
  });

  it("수정 요청에는 삭제할 첨부파일 ID를 빠뜨리지 않는다", () => {
    expect(toUpdateNoticeRequest(draft)).toEqual({ title: "공지 제목", content: "중요한 공지", deleteFileIds: [3, 7] });
  });
});
