import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamArchives } from "../../features/exam-archive/hooks/useExamArchives";
import { useSearchExamArchives } from "../../features/exam-archive/hooks/useSearchExamArchives";
import { type ExamArchiveListType } from "../../features/exam-archive/types/exam-archive.type";
import { HiUpload } from "react-icons/hi";
import { Button } from "../../components/ui/Button";
import DataTable, {
  type DataTableColumn,
} from "../../components/ui/DataTable";
import SearchBar from "../../components/ui/SearchBar";
import ConvertTime from "@/components/ConvertTime";
import Pagination from "@/components/ui/Pagination";

const SEARCH_LOADING_TIME = 250;

const ExamArchive = () => {
  const navigate = useNavigate();

  const size = 10;
  const [page, setPage] = useState(0);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchTimerRef = useRef<number | null>(null);

  const archiveQuery = useExamArchives(page, size);

  const searchQuery = useSearchExamArchives(
    appliedKeyword,
    page,
    size,
  );

  const { data, pageInfo } = appliedKeyword.trim()
    ? searchQuery
    : archiveQuery;

  const columns: DataTableColumn<ExamArchiveListType>[] = [
    {
      key: "subject",
      header: "과목명",
      width: "w-[50%]",
      render: (item) => (
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="truncate">{item.subject}</span>
          <span className="shrink-0 text-[#4988C4]">
            [{item.count}]
          </span>
        </div>
      ),
    },
    {
      key: "professor",
      header: "교수명",
      width: "w-[20%]",
      cellClassName: "truncate text-sm text-gray-700",
      render: (item) => item.professor,
    },
    {
      key: "date",
      header: "최근 수정일",
      width: "w-[17%]",
      cellClassName: "truncate text-sm text-gray-500",
      render: (item) => <ConvertTime date={item.date} />,
    },
  ];

  const handleSearch = () => {
    if (searchTimerRef.current) {
      window.clearTimeout(searchTimerRef.current);
    }

    setIsSearching(true);

    searchTimerRef.current = window.setTimeout(() => {
      setPage(0);
      setAppliedKeyword(searchKeyword.trim());
      setIsSearching(false);
    }, SEARCH_LOADING_TIME);
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        window.clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">
          족보 아카이브
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          선배들이 남긴 귀중한 전공 자료를 확인해보세요.
        </p>
      </section>

      <section className="mb-12 flex items-center justify-between gap-4">
        <SearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={handleSearch}
          placeholder="과목명 또는 교수명을 입력하세요"
        />

        <Button
          variant="third"
          className="flex w-40 items-center justify-center gap-2 text-sm"
          onClick={() => navigate("/exam-archive/upload")}
        >
          <HiUpload />
          UPLOAD
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">
          {appliedKeyword ? (
            <div className="flex items-end justify-between">
              <span>
                "{appliedKeyword}" 검색 결과
              </span>

              <span className="text-sm font-normal text-gray-400">
                <span className="text-base font-semibold text-[#4988C4]">
                  {pageInfo.totalElements}
                </span>{" "}
                개의 게시물
              </span>
            </div>
          ) : (
            "최근 업로드된 족보"
          )}
        </h2>

        <DataTable
          columns={columns}
          data={data}
          rowKey={(item) => item.id}
          isLoading={isSearching}
          loadingMessage="검색 중..."
          emptyMessage="검색 결과가 없습니다."
          onRowClick={(item) =>
            navigate(`/exam-archive/${item.id}`)
          }
        />

        <Pagination
          className="mt-6"
          currentPage={pageInfo.page + 1}
          totalPages={pageInfo.totalPages}
          onPageChange={(nextPage) =>
            setPage(nextPage - 1)
          }
        />
      </section>
    </div>
  );
};

export default ExamArchive;