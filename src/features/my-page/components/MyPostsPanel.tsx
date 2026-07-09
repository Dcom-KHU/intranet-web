import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable, {
  type DataTableColumn,
} from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import { useMyPosts } from "../hooks/useMyPosts";
import type { MyPostItem } from "../types/types";
import ActivityBoardBadge from "./ActivityBoardBadge";

const ITEMS_PER_PAGE = 5;

const columns: DataTableColumn<MyPostItem>[] = [
  {
    key: "board",
    header: "게시판",
    width: "w-28",
    render: (post) => <ActivityBoardBadge label={post.boardLabel} />,
  },
  {
    key: "title",
    header: "제목",
    cellClassName: "truncate text-left text-sm text-gray-700",
    render: (post) => post.title,
  },
  {
    key: "date",
    header: "작성일",
    width: "w-28",
    cellClassName: "text-xs text-gray-400",
    render: (post) => post.date,
  },
];

interface MyPostsPanelProps {
  studentNumber: string;
  isAdmin: boolean;
}

export default function MyPostsPanel({
  studentNumber: _studentNumber,
  isAdmin: _isAdmin,
}: MyPostsPanelProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, total, loading, error } = useMyPosts(
    currentPage - 1,
    ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <section className="px-10 pt-10 pb-5">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-base font-bold text-[#0F2854]">내가 쓴 글</h2>
        {!loading && !error && (
          <span className="text-xs text-gray-400">총 {total}개</span>
        )}
      </div>

      {error ? (
        <p className="py-16 text-center text-sm text-red-500" role="alert">
          {error}
        </p>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          rowKey={(post) => post.key}
          onRowClick={(post) => navigate(post.href)}
          isLoading={loading}
          loadingMessage="작성한 글을 불러오는 중입니다."
          emptyMessage="아직 작성한 글이 없습니다."
        />
      )}

      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          ariaLabel="내가 쓴 글 페이지"
          className="mt-8"
        />
      )}
    </section>
  );
}
