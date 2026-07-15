import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import UserDisplayName from "../../../components/ui/UserDisplay";
import type { Comment } from "../types/comment.type";

type CommentItemProps = {
  comment: Comment;
  canEdit: boolean;
  canDelete: boolean;
  onUpdate: (commentId: number, content: string) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
};

const formatCommentDate = (createdAt: string) =>
  createdAt.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? createdAt;

const CommentItem = ({
  comment,
  canEdit,
  canDelete,
  onUpdate,
  onDelete,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextContent = content.trim();

    if (!nextContent || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onUpdate(comment.id, nextContent);
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEditing = () => {
    setContent(comment.content);
    setIsEditing(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      layout
      className="rounded-xl border border-gray-200 bg-white px-4 py-3"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <UserDisplayName user={comment.author} />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <p className="text-xs text-gray-400">
            {formatCommentDate(comment.createdAt)}
          </p>

          {canEdit && !isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-black/25 transition-colors hover:text-[#4988C4]"
              aria-label="댓글 수정"
            >
              <HiOutlinePencil size={16} />
            </button>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => void onDelete(comment.id)}
              className="text-black/25 transition-colors hover:text-red-400"
              aria-label="댓글 삭제"
            >
              <HiOutlineTrash size={16} />
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-2">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="min-h-20 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#4988C4]"
            aria-label="댓글 수정 내용"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="rounded-lg bg-[#4988C4] px-3 py-1.5 text-xs text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              수정 완료
            </button>
          </div>
        </form>
      ) : (
        <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
          {comment.content}
        </p>
      )}
    </motion.article>
  );
};

export default CommentItem;
