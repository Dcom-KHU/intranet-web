import { describe, expect, it } from "vitest";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import { toCreateGalleryRequest, toUpdateGalleryRequest } from "@/features/gallery/mapper/gallery.mapper";

const draft = { title: "개강총회", date: "2026-03-10", descriptionHtml: "<p>활동 <strong>사진</strong></p>" } as UploadPostDraft;

describe("gallery request mapper", () => {
  it("등록 요청에 행사명, 활동 날짜, 텍스트 설명을 전달한다", () => {
    expect(toCreateGalleryRequest(draft)).toEqual({ eventName: "개강총회", activityDate: "2026-03-10", description: "활동 사진" });
  });

  it("수정 요청도 등록 요청과 동일한 서버 계약을 사용한다", () => {
    expect(toUpdateGalleryRequest(draft)).toEqual(toCreateGalleryRequest(draft));
  });
});
