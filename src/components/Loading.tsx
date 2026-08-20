import type { ReactNode } from "react";

type LoadingProps = {
  variant?: "page" | "inline";
  message?: ReactNode;
  className?: string;
};

export default function Loading({
  variant = "page",
  message = "Loading...",
  className = "",
}: LoadingProps) {
  const containerClassName =
    variant === "page"
      ? "min-h-[calc(100vh-10.25rem)] min-h-[calc(100dvh-10.25rem)]"
      : "min-h-32";

  return (
    <div
      className={`flex w-full items-center justify-center ${containerClassName} ${className}`}
    >
      <div
        className="flex flex-col items-center gap-3 text-sm text-gray-500"
        role="status"
        aria-live="polite"
      >
        <div className="size-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#4988C4]" />
        <p>{message}</p>
        <span className="sr-only">콘텐츠를 불러오는 중입니다.</span>
      </div>
    </div>
  );
}
