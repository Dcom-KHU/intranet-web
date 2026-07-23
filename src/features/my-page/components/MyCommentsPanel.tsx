import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable, {
  type DataTableColumn,
} from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import { useMyComments } from "../hooks/useMyComments";
import type { MyCommentDto } from "../types/my.types";
import ActivityBoardBadge from "./ActivityBoardBadge";
import { GoTrash } from "react-icons/go";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";
import { deleteMyComment } from "../api/my-activity.api";

const ITEMS_PER_PAGE = 5;

const COMMENT_TYPE: Record<string, { label: string; path: string }> = {
  "info-posts": {
    label: "정보 공유",
    path: "/info",
  },
  "photo-posts": {
    label: "활동 사진",
    path: "/gallery",
  },
};

const getCommentTypeMeta = (type: string) =>
  COMMENT_TYPE[type] ?? {
    label: type,
    path: "",
  };

interface MyCommentsPanelProps {
  studentNumber: string;
}

export default function MyCommentsPanel({
  studentNumber: _studentNumber,
}: MyCommentsPanelProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<MyCommentDto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, total, loading, error, refetch } = useMyComments(
    currentPage - 1,
    ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleDelete = async () => {
    if (!deleteTarget || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteMyComment(deleteTarget.id, deleteTarget.type);
      setDeleteTarget(null);

      if (data.length === 1 && currentPage > 1) {
        setCurrentPage((page) => page - 1);
      } else {
        refetch();
      }
    } catch (requestError) {
      console.error("내가 쓴 댓글 삭제 실패:", requestError);
      window.alert("댓글 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: DataTableColumn<MyCommentDto>[] = [
    {
      key: "type",
      header: "게시판",
      width: "w-28",
      render: (comment) => (
        <ActivityBoardBadge label={getCommentTypeMeta(comment.type).label} />
      ),
    },
    {
      key: "content",
      header: "댓글",
      cellClassName: "text-left",
      render: (comment) => (
        <div className="min-w-0">
          <p className="truncate text-sm text-gray-700">{comment.content}</p>
          <p className="mt-1 truncate text-xs text-gray-400">
            원문: {comment.targetTitle}
          </p>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "작성일",
      width: "w-28",
      cellClassName: "text-xs text-gray-400",
      render: (comment) => comment.createdAt.slice(0, 10),
    },
    {
      key: "delete",
      header: "",
      width: "w-12",
      cellClassName: "text-gray-400",
      render: (comment) => (
        <button
          type="button"
          aria-label="댓글 삭제"
          className="rounded-full p-1 transition-colors hover:bg-red-50 hover:text-red-400"
          onClick={(event) => {
            event.stopPropagation();
            setDeleteTarget(comment);
          }}
        >
          <GoTrash size={16} />
        </button>
      ),
    },
  ];

  return (
    <section className="px-10 pt-10 pb-5">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-base font-bold text-[#0F2854]">내가 쓴 댓글</h2>
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
          rowKey={(comment) => `${comment.type}-${comment.id}`}
          onRowClick={(comment) => {
            const { path } = getCommentTypeMeta(comment.type);

            if (path) navigate(`${path}/${comment.targetId}`);
          }}
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
          ariaLabel="내가 쓴 댓글 페이지"
          className="mt-8"
        />
      )}
      <ConfirmDeleteModal
        isOpen={deleteTarget !== null}
        description="삭제한 댓글은 복구할 수 없습니다."
        isDeleting={isDeleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
}
