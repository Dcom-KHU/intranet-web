import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineTrash } from "react-icons/hi";

import { Button } from "../../../components/ui/Button";
import useAuth from "../../auth/hooks/useAuth";
import type { CommentTarget } from "../api/comment.api";
import { useComments } from "../hooks/useComments";
import CommentItem from "./CommentItem";

type CommentSectionProps = {
  postId: number;
  target: CommentTarget;
};

const CommentSection = ({ postId, target }: CommentSectionProps) => {
  const formId = useId();
  const { currentUser } = useAuth();
  const {
    data: comments,
    loading,
    createComment,
    updateComment,
    deleteComment,
  } = useComments(postId, target);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = commentText.trim();

    if (!currentUser || !content || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createComment(content);
      setCommentText("");
      setIsCommenting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelCommenting = () => {
    setCommentText("");
    setIsCommenting(false);
  };

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="whitespace-nowrap text-lg font-bold text-[#4988C4]">
            댓글
          </h2>
          <span className="flex size-5 items-center justify-center rounded-full bg-[#4988C4] text-xs text-white">
            {comments.length}
          </span>
        </div>

        {isCommenting ? (
          <Button
            type="submit"
            form={formId}
            variant="third"
            disabled={!commentText.trim() || isSubmitting}
            className="w-20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            작성 완료
          </Button>
        ) : (
          <Button
            type="button"
            variant="third"
            onClick={() => setIsCommenting(true)}
            disabled={!currentUser}
            title={currentUser ? undefined : "로그인이 필요합니다."}
            className="w-20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            댓글 작성
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {isCommenting && (
            <motion.form
              id={formId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mt-5 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <textarea
                value={commentText}
                placeholder="댓글을 입력하세요"
                className="min-h-20 flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 pr-10 text-sm outline-none transition-colors placeholder:text-gray-300 focus:border-[#4988C4]"
                onChange={(event) => setCommentText(event.target.value)}
                autoFocus
              />
              <button
                type="button"
                onClick={cancelCommenting}
                className="absolute right-4 top-4 cursor-pointer text-black/25 transition-colors hover:text-red-400"
                aria-label="댓글 작성 취소"
              >
                <HiOutlineTrash size={18} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {loading ? (
          <p className="px-4 py-6 text-center text-sm text-gray-400">
            댓글을 불러오는 중입니다.
          </p>
        ) : comments.length === 0 ? (
          <p className="rounded-xl border border-gray-200 px-4 py-6 text-center text-sm text-gray-400">
            아직 작성된 댓글이 없습니다.
          </p>
        ) : (
          <AnimatePresence>
            {comments.map((comment) => {
              const isOwner =
                currentUser?.studentNumber === comment.author.studentNumber;
              const isAdmin = currentUser?.role === "ADMIN";

              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  canEdit={isOwner}
                  canDelete={Boolean(isOwner || isAdmin)}
                  onUpdate={updateComment}
                  onDelete={deleteComment}
                />
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
