import axios from "axios";

type SafeErrorMetadata = {
  kind: "http" | "error" | "unknown";
  status?: number;
  code?: string;
  name?: string;
};

export function logClientError(context: string, error: unknown) {
  let metadata: SafeErrorMetadata;

  if (axios.isAxiosError(error)) {
    metadata = {
      kind: "http",
      status: error.response?.status,
      code: error.code,
    };
  } else if (error instanceof Error) {
    metadata = { kind: "error", name: error.name };
  } else {
    metadata = { kind: "unknown" };
  }

  console.error(context, metadata);
}
