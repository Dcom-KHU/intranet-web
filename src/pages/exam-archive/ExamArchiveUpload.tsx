import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";
import { useExamArchiveMutations } from "../../features/exam-archive/hooks/useExamArchiveMutations";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";

export default function ExamArchiveUpload() {
  const navigate = useNavigate();
  const { createExamArchives } = useExamArchiveMutations();

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createExamArchives(posts);
    navigate("/exam-archive");
  };

  return (
    <UploadForm
      mode="exam"
      title="족보 업로드"
      submitLabel="업로드"
      onCreate={handleUpload}
      onCancel={() => navigate("/exam-archive")}
    />
  );
}
