import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";

export default function ExamArchiveUpload() {
  const navigate = useNavigate();

  return (
    <UploadForm
      mode="exam"
      title="족보 업로드"
      onCancel={() => navigate("/exam-archive")}
    />
  );
}
