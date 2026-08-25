import { describe, expect, it } from "vitest";
import type { MyPostDto } from "@/features/my-page/types/my.types";
import { getMyPostDeletionId } from "@/features/my-page/utils/myPost";

describe("my post deletion target", () => {
  it("족보는 recordId를, 다른 게시판은 게시글 id를 삭제 대상으로 사용한다", () => {
    const archive = { id: 10, recordId: "27", type: "archives" } as MyPostDto;
    const infoPost = { id: 31, type: "info-posts" } as MyPostDto;
    const invalidArchive = { id: 10, type: "archives" } as MyPostDto;

    expect(getMyPostDeletionId(archive)).toBe(27);
    expect(getMyPostDeletionId(infoPost)).toBe(31);
    expect(getMyPostDeletionId(invalidArchive)).toBeNull();
  });
});
