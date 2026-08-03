import axios from "axios";

export type DetailQueryErrorType =
  | "invalid-id"
  | "forbidden"
  | "not-found"
  | "network"
  | "empty"
  | "unknown";

export const classifyDetailQueryError = (
  error: unknown,
): Exclude<DetailQueryErrorType, "invalid-id" | "empty"> => {
  if (!axios.isAxiosError(error)) return "unknown";
  if (!error.response) return "network";
  if (error.response.status === 403) return "forbidden";
  if (error.response.status === 404) return "not-found";
  return "unknown";
};
