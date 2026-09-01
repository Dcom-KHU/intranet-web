import { describe, expect, it } from "vitest";

import SessionFetchError from "@/features/auth/errors/SessionFetchError";

describe("SessionFetchError", () => {
  it("사용자 정보 조회 실패 원인을 보존한다", () => {
    const cause = new Error("me request failed");
    const error = new SessionFetchError(cause);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("SessionFetchError");
    expect(error.message).toBe("로그인 세션 정보를 확인하지 못했습니다.");
    expect(error.cause).toBe(cause);
  });
});
