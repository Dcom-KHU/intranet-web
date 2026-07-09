import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable, {
  type DataTableColumn,
} from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import { useMyComments } from "../hooks/useMyComments";
import type { MyCommentItem } from "../types/types";
import ActivityBoardBadge from "./ActivityBoardBadge";

const ITEMS_PER_PAGE = 5;

const columns: DataTableColumn<MyCommentItem>[] = [
  {
    key: "board",
    header: "게시판",
    width: "w-28",
    render: (comment) => <ActivityBoardBadge label={comment.boardLabel} />,
  },
  {
    key: "content",
    header: "댓글",
    cellClassName: "text-left",
    render: (comment) => (
      <div className="min-w-0">
        <p className="truncate text-sm text-gray-700">{comment.content}</p>
        <p className="mt-1 truncate text-xs text-gray-400">
          원문: {comment.postTitle}
        </p>
      </div>
    ),
  },
  {
    key: "date",
    header: "작성일",
    width: "w-28",
    cellClassName: "text-xs text-gray-400",
    render: (comment) => comment.date,
  },
];

interface MyCommentsPanelProps {
  studentNumber: string;
}

export default function MyCommentsPanel({
  studentNumber,
}: MyCommentsPanelProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useMyComments(studentNumber);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentComments = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="px-10 pt-10 pb-5">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-base font-bold text-[#0F2854]">내가 단 댓글</h2>
        {!loading && !error && (
          <span className="text-xs text-gray-400">총 {data.length}개</span>
        )}
      </div>

      {error ? (
        <p className="py-16 text-center text-sm text-red-500" role="alert">
          {error}
        </p>
      ) : (
        <DataTable
          columns={columns}
          data={currentComments}
          rowKey={(comment) => comment.key}
          onRowClick={(comment) => navigate(comment.href)}
          isLoading={loading}
          loadingMessage="작성한 댓글을 불러오는 중입니다."
          emptyMessage="아직 작성한 댓글이 없습니다."
        />
      )}

      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          ariaLabel="내가 단 댓글 페이지"
          className="mt-8"
        />
      )}
    </section>
  );
}
