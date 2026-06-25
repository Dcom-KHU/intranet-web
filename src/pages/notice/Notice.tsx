import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiUpload } from "react-icons/hi";
import { MdAttachFile } from "react-icons/md";

import { Button } from "../../components/ui/Button";
import DataTable, { type DataTableColumn } from "../../components/ui/DataTable";
import SearchBar from "../../components/ui/SearchBar";
import useAuth from "../../features/auth/hooks/useAuth";
import { useNotices } from "../../features/notice/hooks/useNotices";
import type { NoticeType } from "../../features/notice/types/notice.type";

const NOTICE_TEXT = {
  pageTitle: "\uACF5\uC9C0\uC0AC\uD56D",
  description:
    "D.COM \uB0B4\uC758 \uACF5\uC9C0\uC0AC\uD56D\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694.",
  number: "\uBC88\uD638",
  title: "\uC81C\uBAA9",
  author: "\uC791\uC131\uC790",
  date: "\uC791\uC131\uC77C",
  empty: "\uB4F1\uB85D\uB41C \uACF5\uC9C0\uC0AC\uD56D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
  searchPlaceholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694",
};

const Notice = () => {
  const navigate = useNavigate();
  const { data: notices } = useNotices();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");

  const filteredNotices = useMemo(() => {
    const keyword = appliedKeyword.trim().toLowerCase();

    if (!keyword) {
      return notices ?? [];
    }

    return (notices ?? []).filter(
      (notice) =>
        notice.title.toLowerCase().includes(keyword) ||
        notice.author.toLowerCase().includes(keyword),
    );
  }, [notices, appliedKeyword]);

  const columns: DataTableColumn<NoticeType>[] = [
    {
      key: "id",
      header: NOTICE_TEXT.number,
      width: "w-[8%]",
      cellClassName: "text-sm text-gray-500",
      render: (notice) => notice.id,
    },
    {
      key: "title",
      header: NOTICE_TEXT.title,
      width: "w-[55%]",
      headerClassName: "text-left",
      cellClassName: "text-left",
      render: (notice) => (
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="truncate font-medium text-gray-800">
            {notice.title}
          </span>

          {notice.hasAttachment && (
            <MdAttachFile className="text-gray-400" />
          )}
        </div>
      ),
    },
    {
      key: "author",
      header: NOTICE_TEXT.author,
      width: "w-[20%]",
      cellClassName: "truncate text-sm text-gray-600",
      render: (notice) => notice.author,
    },
    {
      key: "date",
      header: NOTICE_TEXT.date,
      width: "w-[17%]",
      cellClassName: "truncate text-sm text-gray-500",
      render: (notice) => notice.date,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">
          {NOTICE_TEXT.pageTitle}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {NOTICE_TEXT.description}
        </p>
      </section>

      <section className="mb-12 flex items-center justify-between gap-4">
        <SearchBar
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={() => setAppliedKeyword(searchKeyword)}
          placeholder={NOTICE_TEXT.searchPlaceholder}
        />

        {isAdmin && (
          <Button
            variant="third"
            className="flex w-40 items-center justify-center gap-2 text-sm"
            onClick={() => navigate("/notice/upload")}
          >
            <HiUpload />
            UPLOAD
          </Button>
        )}
      </section>

      <section>
        <DataTable
          columns={columns}
          data={filteredNotices}
          rowKey={(notice) => notice.id}
          emptyMessage={NOTICE_TEXT.empty}
          onRowClick={(notice) => navigate(`/notice/${notice.id}`)}
        />
      </section>
    </div>
  );
};

export default Notice;
