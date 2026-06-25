import { useNavigate, useParams } from "react-router-dom";
import { useNoticeDetail } from "../../features/notice/hooks/useNoticeDetail";
import { FiChevronLeft } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import Loading from "../../components/Loading";

const NoticeDetail = () => {
  const { id } = useParams();
  const { data: notice } = useNoticeDetail(Number(id));
  const navigate = useNavigate();

  if (!notice) return <Loading /> 
  

  return(
    <div className="px-4 py-8 sm:px-6 lg:px-20">
        <button
            type="button"
            className="flex items-center gap-1 mb-4 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
            onClick={() => navigate("/notice")}
        >
            <FiChevronLeft /> 공지사항 목록으로 돌아가기
        </button>

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
                        <div className="flex flex-wrap items-center gap-3 text-gray-900">
                        </div>
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
        
                      <button
                        type="button"
                        aria-label="삭제"
                        className="absolute bottom-6 right-6 text-gray-400 hover:text-gray-600"
                      >
                        <GoTrash size={16} />
                      </button>
                    </article>
                  
                </div>
              </section>
    </div>

  );

}

export default NoticeDetail;