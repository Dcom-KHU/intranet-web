export const getApiErrorMessage = (payload: unknown): string | null => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("message" in payload) ||
    typeof payload.message !== "string"
  ) {
    return null;
  }

  const message = payload.message.trim();
  return message || null;
};
