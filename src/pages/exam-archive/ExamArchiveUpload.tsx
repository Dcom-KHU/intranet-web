import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate, useParams } from "react-router-dom";
import { useExamArchiveMutations } from "../../features/exam-archive/hooks/useExamArchiveMutations";
import { useExamArchiveDetail } from "../../features/exam-archive/hooks/useExamArchiveDetail";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";
import Loading from "../../components/Loading";
import DetailQueryError from "../../components/DetailQueryError";

export default function ExamArchiveUpload() {
  const navigate = useNavigate();
  const { archiveId: archiveIdParam } = useParams();
  const hasArchiveContext = archiveIdParam !== undefined;
  const archiveId = Number(archiveIdParam);
  const { createExamArchives } = useExamArchiveMutations();
  const {
    data: archive,
    loading,
    errorType,
    errorMessage,
  } = useExamArchiveDetail(archiveId);
  const returnPath = hasArchiveContext
    ? `/exam-archive/${archiveId}`
    : "/exam-archive";

  if (hasArchiveContext && loading) return <Loading />;
  if (hasArchiveContext && (errorType || !archive)) {
    return (
      <DetailQueryError
        message={errorMessage || "족보 정보를 불러올 수 없습니다."}
        fallbackPath="/exam-archive"
      />
    );
  }

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createExamArchives(posts);
    navigate(returnPath);
  };

  return (
    <UploadForm
      mode="exam"
      title="족보 업로드"
      submitLabel="업로드"
      initialSubject={archive?.subject ?? ""}
      initialProfessor={archive?.professor ?? ""}
      onCreate={handleUpload}
      onCancel={() => navigate(returnPath)}
    />
  );
}
