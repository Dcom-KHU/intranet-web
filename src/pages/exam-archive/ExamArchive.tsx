import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamArchives } from "../../features/exam-archive/hooks/useExamArchives";
import type { ExamArchiveListType } from "../../features/exam-archive/types/exam-archive.type";
import { HiUpload } from "react-icons/hi";
import { Button } from "../../components/ui/Button";
import DataTable, { type DataTableColumn } from "../../components/ui/DataTable";
import SearchBar from "../../components/ui/SearchBar";

const SEARCH_LOADING_TIME = 250;

const ExamArchive = () => {
  const navigate = useNavigate();
  const { data } = useExamArchives();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef<number | null>(null);

  const filteredArchives = useMemo(() => {
    const keyword = appliedKeyword.trim().toLowerCase();

    if (!keyword) {
      return data;
    }

    return data.filter(
      (item) =>
        item.subject.toLowerCase().includes(keyword) ||
        item.professor.toLowerCase().includes(keyword),
    );
  }, [data, appliedKeyword]);

  const columns: DataTableColumn<ExamArchiveListType>[] = [
    {
      key: "subject",
      header: "\uACFC\uBAA9\uBA85",
      width: "w-[50%]",
      render: (item) => (
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="truncate">{item.subject}</span>
          <span className="shrink-0 text-[#4988C4]">[{item.count}]</span>
        </div>
      ),
    },
    {
      key: "professor",
      header: "\uAD50\uC218\uBA85",
      width: "w-[25%]",
      cellClassName: "truncate text-sm text-gray-700",
      render: (item) => item.professor,
    },
    {
      key: "date",
      header: "\uCD5C\uADFC \uC218\uC815\uC77C",
      width: "w-[25%]",
      cellClassName: "truncate text-sm text-gray-500",
      render: (item) => item.date,
    },
  ];

  const handleSearch = () => {
    if (searchTimerRef.current) {
      window.clearTimeout(searchTimerRef.current);
    }

    setIsSearching(true);
    searchTimerRef.current = window.setTimeout(() => {
      setAppliedKeyword(searchKeyword);
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
          {"\uC871\uBCF4 \uC544\uCE74\uC774\uBE0C"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {"\uC120\uBC30\uB4E4\uC774 \uB0A8\uAE34 \uADC0\uC911\uD55C \uC804\uACF5 \uC790\uB8CC\uB97C \uD655\uC778\uD574\uBCF4\uC138\uC694."}
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
          {"\uCD5C\uADFC \uC5C5\uB85C\uB4DC\uB41C \uC871\uBCF4"}
        </h2>

        <DataTable
          columns={columns}
          data={filteredArchives}
          rowKey={(item) => item.id}
          isLoading={isSearching}
          loadingMessage={"\uAC80\uC0C9 \uC911..."}
          emptyMessage={"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."}
          onRowClick={(item) => navigate(`/exam-archive/${item.id}`)}
        />

      </section>
    </div>
  );
};

export default ExamArchive;
