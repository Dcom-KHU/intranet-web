import { Navigate, useNavigate, useParams } from "react-router-dom";

import UploadForm from "../../features/upload/components/UploadForm";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import { updateExamPost } from "../../features/exam-archive/api/exam-archive.api";
import { useExamArchiveDetail } from "../../features/exam-archive/hooks/useExamArchiveDetail";
import DetailQueryError from "../../components/DetailQueryError";

const ExamArchiveEdit = () => {
  const navigate = useNavigate();
  const { archiveId, postId: postIdParam } = useParams();
  const archivePostId = Number(archiveId);
  const postId = Number(postIdParam);
  const { currentUser } = useAuth();
  const {
    data: archive,
    loading,
    errorType,
    errorMessage,
  } = useExamArchiveDetail(archivePostId);

  if (loading) return <Loading />;
  if (errorType || !archive) {
    return (
      <DetailQueryError
        message={errorMessage || "족보 데이터가 없습니다."}
        fallbackPath="/exam-archive"
      />
    );
  }

  if (!Number.isInteger(postId) || postId <= 0) {
    return (
      <DetailQueryError
        message="올바르지 않은 족보 게시글 ID입니다."
        fallbackPath={`/exam-archive/${archivePostId}`}
      />
    );
  }

  const post = archive.posts.find((item) => item.id === postId);
  if (!post) return <Navigate to={`/exam-archive/${archivePostId}`} replace />;

  if (currentUser?.studentNumber !== post.author.studentNumber) {
    return <Navigate to={`/exam-archive/${archivePostId}`} replace />;
  }

  const examTypeLabel = post.examType === "FINAL" ? "기말고사" : "중간고사";
  const semesterSuffix = {
    FIRST: "1",
    SECOND: "2",
    SUMMER: "SUMMER",
    WINTER: "WINTER",
    UNKNOWN: "UNKNOWN",
  }[post.semesterCode ?? "FIRST"];
  const existingFileItems = (post.files ?? []).filter(
    (file) => typeof file !== "string",
  );

  return (
    <UploadForm
      mode="exam"
      title="족보 수정"
      submitLabel="수정"
      initialSubject={post.subject}
      initialProfessor={post.professor}
      initialPost={{
        subject: post.subject,
        professor: post.professor,
        examYear: post.examYear,
        semester:
          post.semesterCode === "UNKNOWN" || post.examYear === null
            ? "Unknown"
            : post.examYear
              ? `${post.examYear}-${semesterSuffix}`
              : post.semester,
        semesterCode: post.semesterCode,
        examType: examTypeLabel,
        examTypeCode: post.examType,
        content: post.description,
        descriptionHtml: post.description,
        existingFiles: [],
        existingFileItems,
        deleteFileIds: [],
      }}
      onSubmit={async (draft) => {
        await updateExamPost(archivePostId, postId, draft);
        navigate(`/exam-archive/${archivePostId}`);
      }}
      onCancel={() => navigate(`/exam-archive/${archivePostId}`)}
    />
  );
};

export default ExamArchiveEdit;
