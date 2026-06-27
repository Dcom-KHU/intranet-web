import { useNavigate, useParams } from "react-router-dom";
import { useExamArchive } from "../../features/exam-archive/hooks/useExamArchiveDetail";
import Loading from "../../components/Loading";
import { HiUpload } from "react-icons/hi";
import { FiChevronLeft } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlinePencil } from "react-icons/hi";
import { Button } from "../../components/ui/Button";
import UserDisplayName from "../../components/ui/UserDisplay";
import useAuth from "../../features/auth/hooks/useAuth";

const ExamArchiveDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const archiveId = Number(id);
  const { data } = useExamArchive(archiveId);
  const { currentUser } = useAuth();

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <button
        type="button"
        onClick={() => navigate("/exam-archive")}
        className="flex items-center gap-1 mb-4 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
      >
        <FiChevronLeft /> 족보 아카이브로 돌아가기
      </button>

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
                  {post.date.replaceAll("-", ".")}
                </time>
              </div>

              {post.description && (
                <p className="mb-6 whitespace-pre-line text-sm leading-6 text-gray-900">
                  {post.description}
                </p>
              )}

              {post.files.length > 0 && (
                <ul className="space-y-3">
                  {post.files.map((file) => (
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
              )}

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
                  >
                    <GoTrash size={16} />
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExamArchiveDetail;
