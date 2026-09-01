export default class SessionFetchError extends Error {
  constructor(cause?: unknown) {
    super("로그인 세션 정보를 확인하지 못했습니다.", { cause });
    this.name = "SessionFetchError";
  }
}
