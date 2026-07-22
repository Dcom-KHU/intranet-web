import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExamArchiveDetail } from "../../features/exam-archive/hooks/useExamArchiveDetail";
import useAuth from "../../features/auth/hooks/useAuth";

import { HiUpload } from "react-icons/hi";
import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";

import { Button } from "../../components/ui/Button";
import Loading from "../../components/Loading";
import UserDisplayName from "../../components/ui/UserDisplay";
import PageBackButton from "../../components/ui/PageBackButton";
import { deleteExamPost, downloadExamArchiveFile } from "../../features/exam-archive/api/exam-archive.api";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import ConvertTime from "../../components/ConvertTime";


const ExamArchiveDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const archiveId = Number(id);
  const { data } = useExamArchiveDetail(archiveId);
  const { currentUser } = useAuth();
  const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!data) {
    return <Loading />;
  }

  const handleDeletePost = async () => {
    if (deleteRecordId === null) return;

    setIsDeleting(true);
    try {
      await deleteExamPost(archiveId, deleteRecordId);
      navigate("/exam-archive");
    } catch (error) {
      console.error("족보 게시글 삭제 실패:", error);
      window.alert("족보 게시글 삭제에 실패했습니다.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <PageBackButton 
        onClick={() => navigate('/exam-archive')}
      />

      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#4988C4] whitespace-nowrap">족보</h1>

        <Button
          variant="third"
          className="flex w-40 items-center justify-center gap-2"
          onClick={() => navigate("/exam-archive/upload")}
        >
          <HiUpload />
          UPLOAD
        </Button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-7 py-4">
          <h2 className="text-sm font-semibold text-[#0F2854]">
            {data.subject}
          </h2>
          <span className="text-sm text-gray-500">{data.professor} 교수님</span>
        </div>

        <div className="bg-white">
          {data.posts.map((post) => (
            <article
              key={post.id}
              className="relative min-h-[220px] border-b border-gray-200 px-7 py-7 last:border-b-0"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 text-gray-900">
                  <UserDisplayName user={post.author} /> |
                  <span className="text-sm font-medium">{post.semester}</span>
                </div>
                <time className="shrink-0 text-sm text-gray-500">
                  <ConvertTime date={post.date} />
                </time>
              </div>

              {post.description && (
                <p className="mb-6 whitespace-pre-line text-sm leading-6 text-gray-900">
                  {post.description}
                </p>
              )}

              {post.files && post.files.length > 0 ? (
                <ul className="space-y-3">
                  {post.files.map((file) => {
                    const isApiFile = typeof file !== "string";
                    const fileName = isApiFile ? file.name : file;

                    return (
                      <li key={isApiFile ? file.id : fileName}>
                        {isApiFile ? (
                          <button
                            type="button"
                            className="text-sm text-[#4988C4] underline underline-offset-2 hover:text-[#0F2854]"
                            onClick={() =>
                              downloadExamArchiveFile(
                                archiveId,
                                post.id,
                                file.id,
                                file.name,
                              )
                            }
                          >
                            {file.name}
                          </button>
                        ) : (
                          <span className="text-sm text-[#4988C4]">{file}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              {currentUser?.studentNumber === post.author.studentNumber && (
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="족보 수정"
                    className="text-gray-400 hover:text-[#4988C4]"
                    onClick={() =>
                      navigate(`/exam-archive/${archiveId}/edit/${post.id}`)
                    }
                  >
                    <HiOutlinePencil size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="삭제"
                    className="text-gray-400 hover:text-red-400"
                    onClick={() => setDeleteRecordId(post.id)}
                  >
                    <GoTrash size={16} />
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      <ConfirmDeleteModal
        isOpen={deleteRecordId !== null}
        description="삭제한 족보 게시글은 복구할 수 없습니다."
        isDeleting={isDeleting}
        onConfirm={() => void handleDeletePost()}
        onCancel={() => setDeleteRecordId(null)}
      />
    </div>
  );
};

export default ExamArchiveDetail;
