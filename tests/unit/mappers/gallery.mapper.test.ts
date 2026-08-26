import { describe, expect, it } from "vitest";
import type { UploadPostDraft } from "@/features/upload/types/upload.type";
import {
  toCreateGalleryRequest,
  toGalleryPostDetail,
  toUpdateGalleryRequest,
} from "@/features/gallery/mapper/gallery.mapper";
import type { GalleryAlbumDetailDto } from "@/features/gallery/dto/gallery.dto";

const draft = {
  title: "개강총회",
  date: "2026-03-10",
  location: " 학생회관 ",
  descriptionHtml: "<p>활동 <strong>사진</strong></p>",
  deleteFileIds: [4, 7],
} as UploadPostDraft;

describe("gallery request mapper", () => {
  it("등록과 수정 요청에 행사 정보와 HTML 설명을 동일하게 전달한다", () => {
    expect(toCreateGalleryRequest(draft)).toEqual({
      eventName: "개강총회",
      activityDate: "2026-03-10",
      place: "학생회관",
      description: draft.descriptionHtml,
    });
    expect(toUpdateGalleryRequest(draft)).toEqual({
      ...toCreateGalleryRequest(draft),
      deleteFileIds: [4, 7],
    });

    const detail = toGalleryPostDetail({
      albumId: 1,
      eventName: "개강총회",
      activityDate: "2026-03-10",
      imageList: ["/api/photo-posts/1/images/4"],
      description: draft.descriptionHtml,
    } satisfies GalleryAlbumDetailDto);
    expect(detail.imageItems).toEqual([
      {
        id: 4,
        name: "이미지 4",
        url: "/api/photo-posts/1/images/4",
      },
    ]);
  });
});
