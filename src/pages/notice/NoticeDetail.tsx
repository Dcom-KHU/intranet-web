import { useNavigate, useParams } from "react-router-dom";
import { useNoticeDetail } from "../../features/notice/hooks/useNoticeDetail";

import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";

import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import UserDisplayName from "../../components/ui/UserDisplay";
import PageBackButton from "../../components/ui/PageBackButton";


const NoticeDetail = () => {
  const { id } = useParams();
  const { data: notice } = useNoticeDetail(Number(id));
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";

  if (!notice) return <Loading /> 
  
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
        
                      {notice.files?.length ? (
                        <ul className="space-y-3">
                            {notice.files.map((file) => (
                            <li key={file}>
                                <a
                                href={`/${file}`}
                                className="text-sm text-[#4988C4] underline underline-offset-2 hover:text-[#0F2854]"
                                onClick={(event) => event.preventDefault()}
                                >
                                {file}
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
                            aria-label="삭제"
                            className="text-gray-400 hover:text-red-400"
                          >
                            <GoTrash size={16} />
                          </button>
                        </div>
                      )}
                    </article>
                  
                </div>
              </section>
    </div>

  );

}

export default NoticeDetail;
