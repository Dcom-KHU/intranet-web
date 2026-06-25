import { useNavigate } from "react-router-dom";
import DataTable, { type DataTableColumn } from "../../components/ui/DataTable";
import { useNotices } from "../../features/notice/hooks/useNotices";
import type { NoticeType } from "../../features/notice/types/notice.type";

const NOTICE_TEXT = {
  number: "번호",
  title: "제목",
  author: "작성자",
  date: "작성일",
  empty: "등록된 공지사항이 없습니다.",
};

const Notice = () => {
  const navigate = useNavigate();
  const { data: notices } = useNotices();

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
        <h1 className="text-xl font-bold text-[#4988C4]">공지사항</h1>
        <p className="mt-2 text-sm text-gray-500">
          D.COM 내의 공지사항을 확인해보세요.
        </p>
      </section>

      <section>
        <DataTable
          columns={columns}
          data={notices ?? []}
          rowKey={(notice) => notice.id}
          emptyMessage={NOTICE_TEXT.empty}
          onRowClick={() => navigate('/notice/:id')}
        />
      </section>
    </div>
  );
};

export default Notice;