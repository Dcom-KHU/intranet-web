import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNoticeDetail } from "../../features/notice/hooks/useNoticeDetail";

import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";

import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import UserDisplayName from "../../components/ui/UserDisplay";
import PageBackButton from "../../components/ui/PageBackButton";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import { deleteNotice } from "../../features/notice/api/notice.api";


const NoticeDetail = () => {
  const { id } = useParams();
  const noticeId = Number(id);
  const { data: notice, loading, error } = useNoticeDetail(noticeId);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteNotice(noticeId);
      navigate("/notice");
    } catch (deleteError) {
      console.error("공지사항 삭제 실패:", deleteError);
      window.alert("공지사항 삭제에 실패했습니다.");
      setIsDeleting(false);
    }
  };

  if (loading) return <Loading />;
  if (error || !notice) {
    return <p className="px-4 py-8 text-center text-sm text-red-500">{error}</p>;
  }
  
  return(
    <div className="px-4 py-8 sm:px-6 lg:px-20">
        <PageBackButton 
          onClick={() => navigate('/notice')}
        />

        <section className="overflow-hidden mt-7 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-7 py-4">
                  <h2 className="text-sm font-semibold text-[#0F2854]">
                    {notice.title}
                  </h2>
                </div>
        
                <div className="bg-white">
                    <article
                      key={notice.id}
                      className="relative min-h-[220px] border-b border-gray-200 px-7 py-7 last:border-b-0"
                    >
                      <div className="mb-8 flex items-start justify-between gap-4">
                        <UserDisplayName user={notice.author} />
                        <time className="shrink-0 text-sm text-gray-500">
                          {notice.date.replaceAll("-", ".")}
                        </time>
                      </div>
        
                        <p className="mb-6 whitespace-pre-line text-sm leading-6 text-gray-900">
                          {notice.description}
                        </p>
        
                      {notice.fileItems?.length ? (
                        <ul className="space-y-3">
                            {notice.fileItems.map((file) => (
                            <li key={file.id}>
                                <a
                                href={file.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-[#4988C4] underline underline-offset-2 hover:text-[#0F2854]"
                                >
                                {file.name}
                                </a>
                            </li>
                            ))}
                        </ul>
                        ) : null}
        
                      {isAdmin && (
                        <div className="absolute bottom-6 right-6 flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="공지사항 수정"
                            className="text-gray-400 hover:text-[#4988C4]"
                            onClick={() => navigate(`/notice/${notice.id}/edit`)}
                          >
                            <HiOutlinePencil size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label="공지사항 삭제"
                            disabled={isDeleting}
                            className="text-gray-400 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={() => setIsDeleteModalOpen(true)}
                          >
                            <GoTrash size={16} />
                          </button>
                        </div>
                      )}
                    </article>
                  
                </div>
              </section>
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          description="삭제한 공지사항은 복구할 수 없습니다."
          isDeleting={isDeleting}
          onConfirm={() => void handleDelete()}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
    </div>

  );

}

export default NoticeDetail;
