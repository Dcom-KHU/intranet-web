import { useEffect, useState } from "react";

const LOADING_INDICATOR_DELAY = 1000;

export default function Loading() {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIndicator(true);
    }, LOADING_INDICATOR_DELAY);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-10.25rem)] min-h-[calc(100dvh-10.25rem)] w-full items-center justify-center">
      {showIndicator && (
        <div
          className="flex flex-col items-center gap-3"
          role="status"
          aria-live="polite"
        >
        
          {/* Spinner */}
          <div
            className="
              w-10 h-10
              rounded-full
              border-4
              border-gray-200
              border-t-blue-400
              animate-spin
            "
          />

          <p className="text-sm text-gray-500">
            Loading...
          </p>
          <span className="sr-only">콘텐츠를 불러오는 중입니다.</span>

        </div>
      )}

    </div>
  );
}
