import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";

import useAuth from "../../features/auth/hooks/useAuth";
import { useInfoDetail } from "../../features/info-sharing/hooks/useInfoDetail";
import Loading from "../../components/Loading";
import CommentSection from "../../features/comment/components/CommentSection";
import UserDisplayName from "../../components/ui/UserDisplay";
import PageBackButton from "../../components/ui/PageBackButton";
import { downloadInfoPostFile } from "@/features/info-sharing/api/info-sharing.api";
import { useInfoMutations } from "@/features/info-sharing/hooks/useInfoMutations";
import { logClientError } from "@/utils/logger";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import ConvertTime from "../../components/ConvertTime";
import DetailQueryError from "../../components/DetailQueryError";
import RichTextContent from "../../components/ui/RichTextContent";


const InfoSharingDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const postId = Number(id);
    const {
      data: info,
      loading,
      errorType,
      errorMessage,
    } = useInfoDetail(postId);
    const { currentUser } = useAuth();
    const { deleteInfo } = useInfoMutations();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    if (loading) return <Loading />;
    if (errorType || !info) {
      return (
        <DetailQueryError
          message={errorMessage || "정보공유 게시글 데이터가 없습니다."}
          fallbackPath="/info"
        />
      );
    }

    const handleDeletePost = async () => {
        setIsDeleting(true);
        try {
          await deleteInfo(postId);
          navigate("/info");
        } catch (error) {
          logClientError("정보공유 게시글 삭제 실패", error);
          window.alert("게시글 삭제에 실패했습니다.");
          setIsDeleting(false);
        }
    };
    
    return(
        <div className="px-4 py-8 sm:px-6 lg:px-20">
            <PageBackButton fallbackPath="/info" />

            <h1 className="text-2xl font-bold ml-1 text-[#0F2854]">
                {info.title}
            </h1>

            <section className="overflow-hidden mt-7 rounded-2xl border border-gray-200">
                
        
                <div className="bg-white">
                    <article
                        key={info.id}
                        className="relative min-h-[220px] border-b border-gray-200 px-7 py-7 last:border-b-0"
                    >
                        <div className="mb-8 flex items-start justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3 text-gray-900">
                            <UserDisplayName user={info.author} />
                        </div>
                        <time className="shrink-0 text-sm text-gray-500">
                            <ConvertTime date={info.createdAt} />
                        </time>
                        </div>
        
                        <RichTextContent
                          html={info.description}
                          className="mb-6"
                        />
        
                        {info.attachmentItems?.length ? (
                        <ul className="space-y-3">
                          {info.attachmentItems.map((file) => (
                            <li key={file.id}>
                              <button
                                type="button"
                                className="text-sm text-[#4988C4] underline underline-offset-2 transition-all [#0F2854]"
                                onClick={() =>
                                  downloadInfoPostFile(file.id, file.name)
                                }
                              >
                                {file.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                        ) : null}
        
                        <div className="absolute bottom-6 right-6 flex items-center gap-3">
                          {currentUser?.studentNumber === info.author.studentNumber && (
                            <button
                                type="button"
                                aria-label="게시글 수정"
                                className="text-gray-400 transition-all [#4988C4]"
                                onClick={() => navigate(`/info/${postId}/edit`)}
                            >
                                <HiOutlinePencil size={16} />
                            </button>
                          )}
                          {(
                            currentUser?.studentNumber === info.author.studentNumber || 
                            currentUser?.role === "ADMIN" 
                          ) && (
                            <button
                                type="button"
                                aria-label="삭제"
                                className="text-gray-400 transition-all red-400"
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                <GoTrash size={16} />
                            </button>
                          )}
                        </div>
                    </article>
                    
                </div>
            </section>

            <CommentSection postId={postId} target="info-sharing" />
            <ConfirmDeleteModal
              isOpen={isDeleteModalOpen}
              description="삭제한 정보공유 게시글은 복구할 수 없습니다."
              isDeleting={isDeleting}
              onConfirm={() => void handleDeletePost()}
              onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
}

export default InfoSharingDetail
