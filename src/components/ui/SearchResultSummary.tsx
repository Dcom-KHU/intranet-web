type SearchResultSummaryProps = {
  keyword: string;
  totalElements: number;
};

export default function SearchResultSummary({
  keyword,
  totalElements,
}: SearchResultSummaryProps) {
  if (!keyword.trim()) return null;

  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="min-w-0 truncate text-lg font-semibold">
        &quot;{keyword}&quot; 검색 결과
      </h2>
      <p className="shrink-0 text-sm text-gray-400">
        총{" "}
        <span className="text-base font-semibold text-[#4988C4]">
          {totalElements}
        </span>
        건
      </p>
    </div>
  );
}
