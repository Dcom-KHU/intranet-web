interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = "페이지 이동",
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const moveTo = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={`flex items-center justify-center gap-1 text-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => moveTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-6 items-center justify-center rounded border border-gray-200 text-gray-500 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="이전 페이지"
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => moveTo(page)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`${page}페이지`}
              className={`flex size-6 items-center justify-center rounded border transition ${
                isActive
                  ? "border-[#4988C4] bg-[#4988C4] text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              {page}
            </button>
          );
        },
      )}

      <button
        type="button"
        onClick={() => moveTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-6 items-center justify-center rounded border border-gray-200 text-gray-500 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </nav>
  );
}
