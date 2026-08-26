import { describe, expect, it } from "vitest";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { toUpdateInfoPostRequest } from "@/features/info-sharing/mapper/info.mapper";

describe("info post request mapper", () => {
  it("수정 요청에서 본문과 삭제 첨부파일 ID를 누락하지 않는다", () => {
    const draft = { title: "인턴 정보", descriptionHtml: "<p>지원 <b>마감</b></p>", deleteFileIds: [2, 9] } as UploadPostDraft;
    expect(toUpdateInfoPostRequest(draft)).toEqual({
      title: "인턴 정보",
      content: draft.descriptionHtml,
      deleteFileIds: [2, 9],
    });
  });
});
