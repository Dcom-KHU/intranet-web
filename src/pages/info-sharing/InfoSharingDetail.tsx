import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import { useInfoDetail } from "../../features/info-sharing/hooks/useInfoDetail";

import { FiChevronLeft } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import UserDisplayName from "../../components/ui/UserDisplay";


const InfoSharingDetail = () => {
    const { id } = useParams();
    const { data: info } = useInfoDetail(Number(id));
    const navigate = useNavigate();

    if (!info) {
        console.log('[InfoSharingDetail.tsx] 데이터가 없습니다.')
        return <Loading />
    }  
    
    return(
        <div className="px-4 py-8 sm:px-6 lg:px-20">
            <button
                type="button"
                className="flex items-center gap-1 mb-4 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
                onClick={() => navigate("/info")}
            >
                <FiChevronLeft /> 목록으로 돌아가기
            </button>

            <section className="overflow-hidden mt-7 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-7 py-4">
                    <h2 className="text-sm font-semibold text-[#0F2854]">
                    {info.title}
                    </h2>
                </div>
        
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
                            {info.date.replaceAll("-", ".")}
                        </time>
                        </div>
        
                        <p className="mb-6 whitespace-pre-line text-sm leading-6 text-gray-900">
                            {info.description}
                        </p>
        
                        {info.attachments?.length ? (
                        <ul className="space-y-3">
                            {info.attachments.map((i) => (
                            <li key={i}>
                                <a
                                href={`/${i}`}
                                className="text-sm text-[#4988C4] underline underline-offset-2 hover:text-[#0F2854]"
                                onClick={(event) => event.preventDefault()}
                                >
                                {i}
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

export default InfoSharingDetail