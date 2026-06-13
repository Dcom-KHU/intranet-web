import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";
import Input from "../components/ui/Input";
import { IoSearchOutline } from "react-icons/io5";
import { HiUpload } from "react-icons/hi";
import { Button } from "../components/ui/Button";

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
        <h1 className="text-xl font-bold text-[#4988C4]">족보 아카이브</h1>
        <p className="mt-2 text-sm text-gray-500">
          선배들이 남긴 귀중한 전공 자료를 확인해보세요.
        </p>
      </section>

      <section className="mb-12 flex items-center justify-between gap-4">
        <form
          className="relative w-full max-w-[450px]"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <Input
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="과목명 또는 교수명을 입력하세요"
            className="pr-10 text-xs"
          />

          <button
            type="submit"
            aria-label="검색"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4988C4]"
          >
            <IoSearchOutline size={18} />
          </button>
        </form>

        <Button
          variant="third"
          className="flex w-[140px] items-center justify-center gap-2 text-sm"
        >
          <HiUpload />
          UPLOAD
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">최근 업로드된 족보</h2>

        <div className="overflow-hidden">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[50%]" />
              <col className="w-[25%]" />
              <col className="w-[25%]" />
            </colgroup>

            <thead>
              <tr className="border-b border-t-2 border-black">
                <th className="px-5 py-4 text-center text-sm font-medium">
                  과목명
                </th>
                <th className="px-5 py-4 text-center text-sm font-medium">
                  교수명
                </th>
                <th className="px-5 py-4 text-center text-sm font-medium">
                  최근 수정일
                </th>
              </tr>
            </thead>

            <tbody>
              {isSearching ? (
                <tr>
                  <td colSpan={3} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center gap-3 text-sm text-gray-500">
                      <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#4988C4]" />
                      검색 중...
                    </div>
                  </td>
                </tr>
              ) : (
                filteredArchives.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer border-b text-center hover:bg-gray-50"
                    onClick={() => navigate(`/exam-archive/${item.id}`)}
                  >
                    <td className="px-5 py-5">
                      <div className="flex min-w-0 items-center gap-2 text-sm">
                        <span className="truncate">{item.subject}</span>
                        <span className="shrink-0 text-[#4988C4]">
                          [{item.count}]
                        </span>
                      </div>
                    </td>

                    <td className="truncate px-5 py-5 text-sm text-gray-700">
                      {item.professor}
                    </td>

                    <td className="truncate px-5 py-5 text-sm text-gray-500">
                      {item.date}
                    </td>
                  </tr>
                ))
              )}

              {!isSearching && filteredArchives.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ExamArchive;
