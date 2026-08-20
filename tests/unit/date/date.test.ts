import { describe, expect, it } from "vitest";
import { formatDate, formatDateTime } from "@/utils/date";

describe("date formatting", () => {
  it("일반 화면 날짜는 서버 시각 문자열에서 날짜만 표시한다", () => {
    expect(formatDate("2026-08-21T15:30:45.123Z")).toBe("2026-08-21");
    expect(formatDate("2026.08.21 15:30")).toBe("2026-08-21");
  });

  it("관리자 회원 날짜는 분 단위까지 표시한다", () => {
    expect(formatDateTime("2026-08-21T15:30:45")).toBe("2026-08-21 15:30");
  });

  it("비어 있거나 형식이 잘못된 서버 값은 그대로 노출하지 않는다", () => {
    expect(formatDate(null)).toBe("-");
    expect(formatDate("unexpected server value")).toBe("-");
    expect(formatDateTime(undefined)).toBe("-");
  });
});
