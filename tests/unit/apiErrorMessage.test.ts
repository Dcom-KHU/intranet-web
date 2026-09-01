import { describe, expect, it } from "vitest";

import { getApiErrorMessage } from "@/utils/api-error-message";

describe("getApiErrorMessage", () => {
  it("API 응답의 message를 반환한다", () => {
    expect(
      getApiErrorMessage({
        success: false,
        status: 403,
        message: "승인되지 않은 회원입니다.",
        data: null,
      }),
    ).toBe("승인되지 않은 회원입니다.");
  });

  it.each([null, {}, { message: "" }, { message: 403 }])(
    "유효한 message가 없으면 null을 반환한다",
    (payload) => {
      expect(getApiErrorMessage(payload)).toBeNull();
    },
  );
});
